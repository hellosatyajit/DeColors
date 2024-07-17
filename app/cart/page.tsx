'use client';
import Breadcrumb from "@/components/Breadcrumb";
import { DeleteItemButton } from "@/components/DeleteItemButton";
import { EditItemQuantityButton } from "@/components/EditItemQuantityButton";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { getCartData } from "@/utils/cart";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createOrder } from "@/server/actions/checkout";

const breadcrumb = [
    {
        label: 'Home',
        link: '/'
    },
    {
        label: 'Cart',
        link: '/cart'
    },
]

export default function CartPage() {
    const [items, setItems] = useState([]);
    const [user, setUser] = useState<{ id: string; email: string; name: string; } | undefined>(undefined);
    const totalCost = items.reduce((acc, item: any) => acc + (item.price.mrp - item.price.discount) * item.quantity, 0);
    const { data: session } = useSession();
    const userinfo = session?.user;
    const fetchCart = () => {
        const cartItems = getCartData();
        setItems(cartItems.items);
    }

    const fetchUser = async () => {
        setUser(userinfo);
    }

    useEffect(() => {
        fetchUser();
        fetchCart();
    }, []);

    const handleCheckout = async () => {
        const order = await createOrder(totalCost);
        displayRazorpay(totalCost * 100, order.id)
    }

    function loadScript(src: any) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay(amount: number, order_id: string) {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: amount.toString(),
            currency: "INR",
            name: "Decolores Lifestyle",
            description: "Test Transaction",
            order_id: order_id,
            handler: async function (response: any) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                console.log(data);
            },
            // get this data from the db
            prefill: {
                name: "Soumya Dey",
                email: "SoumyaDey@example.com",
                contact: "9999999999",
            },
            // get this data from the db
            notes: {
                address: "Soumya Dey Corporate Office",
            },
            theme: {
                color: "#61dafb",
            },
        };

        // @ts-ignore
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <section className="max-w-7xl m-auto p-5">
            <div className="space-y-2">
                <Breadcrumb links={breadcrumb} />
                <p className="font-bold text-lg sm:text-3xl">Cart</p>
            </div>
            <div className="flex flex-col md:flex-row gap-10">
                {items.length === 0
                    ? <div className="mt-10 flex flex-col items-center gap-5 m-auto mb-20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-shopping-cart w-20 h-20"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
                        <p className="font-bold text-2xl">Your cart is empty!</p>
                    </div>
                    : <ul className="flex-grow py-4 flex-1">
                        {items.map((item: any, i) => {
                            return (
                                <li
                                    key={i}
                                    className="flex w-full max-w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
                                >
                                    <div className="relative flex w-full flex-row justify-between px-1 py-4">
                                        <div className="absolute z-40 -mt-2 ml-[55px]">
                                            <DeleteItemButton item={item} fetchCart={fetchCart} />
                                        </div>
                                        <div
                                            //   href={merchandiseUrl}
                                            //   onClick={closeCart}
                                            className="z-30 flex flex-row space-x-4"
                                        >
                                            <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300">
                                                <img
                                                    className="h-full w-full object-cover"
                                                    width={64}
                                                    height={64}
                                                    alt={
                                                        item.name
                                                    }
                                                    src={item?.images ? item.images[0] : item?.variants.find(
                                                        (i: any) => i.sku === item.sku
                                                    ).image}
                                                />
                                            </div>

                                            <div className="flex flex-1 flex-col text-base">
                                                <span className="leading-tight font-medium text-rose-600">
                                                    {item.name}
                                                </span>
                                                {
                                                    item.sku && <span className="leading-tight text-black/50">
                                                        Variant: {item.sku}
                                                    </span>
                                                }
                                                <span className="leading-tight text-black/50">
                                                    {item.subheading}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex h-16 flex-col justify-between">
                                            <p className="flex justify-end space-y-2 text-right text-sm">
                                                {item.price.mrp - item.price.discount} ₹
                                            </p>
                                            <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                                                <EditItemQuantityButton item={item} type="minus" fetchCart={fetchCart} />
                                                <p className="w-6 text-center">
                                                    <span className="w-full text-sm">{item.quantity}</span>
                                                </p>
                                                <EditItemQuantityButton item={item} type="plus" fetchCart={fetchCart} />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>}
                {items.length !== 0
                    && <div className="w-full md:w-80 h-min p-4 flex flex-col gap-4 sticky md:top-0">
                        <p className="font-bold text-lg sm:text-3xl">Summary</p>
                        <p className="flex justify-between">Total: <strong>{totalCost} ₹</strong></p>
                        {
                            user
                                ? <Button
                                    variant={'secondary'}
                                    type="submit"
                                    className="w-fit self-end md:w-full bg-rose-600 rounded-full text-white"
                                    onClick={handleCheckout}>Proceed to Checkout</Button>
                                : <Link href="/login" className="w-fit self-end md:w-full px-4 py-2 text-center bg-rose-600 rounded-full text-white">Login first to proceed to checkout</Link>
                        }
                    </div>
                }
            </div>
        </section>
    )
}