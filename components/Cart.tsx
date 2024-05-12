'use client'

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { getCartData } from "@/utils/cart";
import { useEffect, useState } from "react"
import { EditItemQuantityButton } from "./EditItemQuantityButton";
import Image from "next/image";
import { DeleteItemButton } from "./DeleteItemButton";

export default function Cart() {
    const [items, setItems] = useState([]);
    const totalCost = items.reduce((acc, item: any) => acc + item.price * item.quantity, 0);

    const fetchCart = () => {
        const cartItems = getCartData();

        setItems(cartItems.items);
    }

    useEffect(() => {
        fetchCart();
    }, [])

    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className="w-5 h-5 sm:w-10 sm:h-10 flex justify-center items-center text-white sm:text-black bg-transparent sm:bg-white rounded-xl cursor-pointer">
                    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M15.875 0.125H2.125C1.43464 0.125 0.875 0.684644 0.875 1.375V12.625C0.875 13.3154 1.43464 13.875 2.125 13.875H15.875C16.5654 13.875 17.125 13.3154 17.125 12.625V1.375C17.125 0.684644 16.5654 0.125 15.875 0.125V0.125ZM15.875 12.625H2.125V1.375H15.875V12.625V12.625ZM12.75 3.875C12.75 5.94607 11.0711 7.625 9 7.625C6.92893 7.625 5.25 5.94607 5.25 3.875C5.25 3.52982 5.52982 3.25 5.875 3.25C6.22018 3.25 6.5 3.52982 6.5 3.875C6.5 5.25571 7.61929 6.375 9 6.375C10.3807 6.375 11.5 5.25571 11.5 3.875C11.5 3.52982 11.7798 3.25 12.125 3.25C12.4702 3.25 12.75 3.52982 12.75 3.875V3.875Z" fill="currentColor" />
                    </svg>
                </div>
            </SheetTrigger>
            <SheetContent className="z-[110]">
                <SheetHeader>
                    <SheetTitle>My Cart</SheetTitle>
                </SheetHeader>


                {items.length === 0
                    ? <div className="mt-10 flex flex-col items-center gap-5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-shopping-cart w-20 h-20"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
                        <p className="font-bold text-2xl">Your cart is empty!</p>
                    </div>
                    : <ul className="flex-grow overflow-auto overflow-y-scroll py-4 max-w-96 h-5/6">
                        {items.map((item: any, i) => {
                            //   const merchandiseSearchParams = {} as MerchandiseSearchParams;

                            //   item.merchandise.selectedOptions.forEach(({ name, value }) => {
                            //     if (value !== DEFAULT_OPTION) {
                            //       merchandiseSearchParams[name.toLowerCase()] = value;
                            //     }
                            //   });

                            //   const merchandiseUrl = createUrl(
                            //     `/product/${item.merchandise.product.handle}`,
                            //     new URLSearchParams(merchandiseSearchParams)
                            //   );

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
                                            <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                                                <Image
                                                    className="h-full w-full object-cover"
                                                    width={64}
                                                    height={64}
                                                    alt={
                                                        item.name
                                                    }
                                                    src={item?.images ? item.images[0] : ''}
                                                />
                                            </div>

                                            <div className="flex flex-1 flex-col text-base">
                                                <span className="leading-tight text-black">
                                                    {item.name}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex h-16 flex-col justify-between">
                                            <p className="flex justify-end space-y-2 text-right text-sm">
                                                {item.price} ₹
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
                    && <SheetFooter className="w-full !flex-col gap-2 mt-5">
                        <p>Total: <strong>{totalCost} ₹</strong></p>
                        <Button variant={'secondary'} type="submit" className="w-full bg-rose-600 rounded-full text-white">Proceed to Checkout</Button>
                    </SheetFooter>
                }
            </SheetContent>
        </Sheet>
    )
}
