'use client';
import { useEffect, useState } from 'react';
import { getCartLength, subscribeToCartChanges } from '@/utils/cart';

export default function CartBadge() {
    const [cartCount, setCartCount] = useState(getCartLength());

    useEffect(() => {
        const updateCartCount = () => {
            setCartCount(getCartLength());
        };

        const handleStorageChange = () => {
            updateCartCount();
        };

        const unsubscribe = subscribeToCartChanges(updateCartCount);

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            unsubscribe();
        };
    }, []);

    if (!cartCount) {
        return null;
    }

    return (
        <span className="absolute -top-[6px] -right-[6px] md:-top-2 md:-ri2 inline-flex items-center justify-center p-1 md:px-2 md:py-1 text-[8px] md:text-xs font-bold leading-none text-rose-600 transform bg-white rounded-full">
            {cartCount}
        </span>
    );
}
