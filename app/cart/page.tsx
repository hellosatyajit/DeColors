'use client';
import Breadcrumb from "@/components/Breadcrumb";
import { DeleteItemButton } from "@/components/DeleteItemButton";
import { EditItemQuantityButton } from "@/components/EditItemQuantityButton";
import { Button } from "@/components/ui/button";
import { getUser } from "@/utils/auth";
import { getCartData } from "@/utils/cart";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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
    const [user, setUser] = useState<{ email: any; username: any; phone: any; } | undefined>(undefined);
    const totalCost = items.reduce((acc, item: any) => acc + (item.price.mrp - item.price.discount) * item.quantity, 0);

    const fetchCart = () => {
        const cartItems = getCartData();
        setItems(cartItems.items);
    }

    const fetchUser = async () => {
        const user = await getUser();
        setUser(user);
    }

    useEffect(() => {
        fetchUser();
        fetchCart();
    }, [])

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
                                                    ).image[0]}
                                                />
                                            </div>

                                            <div className="flex flex-1 flex-col text-base">
                                                <span className="leading-tight font-medium text-rose-600">
                                                    {item.name}
                                                </span>
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
                                ? <Button variant={'secondary'} type="submit" className="w-fit self-end md:w-full bg-rose-600 rounded-full text-white">Proceed to Checkout</Button>
                                : <Link href="/login" className="w-fit self-end md:w-full px-4 py-2 text-center bg-rose-600 rounded-full text-white">Login first to proceed to checkout</Link>
                        }
                    </div>
                }
            </div>
        </section>
    )
}