'use client';
import { getCartLength } from "@/utils/cart";

export default function CartBadge() {
    const cartCount = getCartLength();

    if (!cartCount) {
        return null;
    }

    return (
        <span className="absolute -top-[6px] -right-[6px] md:-top-2 md:-ri2 inline-flex items-center justify-center p-1 md:px-2 md:py-1 text-[8px] md:text-xs font-bold leading-none text-rose-600 transform bg-white rounded-full">
            {cartCount}
        </span>
    );
}
