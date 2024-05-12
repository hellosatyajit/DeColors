'use client';

import { MinusIcon, PlusIcon, DotSquareIcon } from 'lucide-react';
import clsx from 'clsx';
import { useFormState, useFormStatus } from 'react-dom';
import { updateCartItemQuantity } from '@/utils/cart';

function SubmitButton({ type }: { type: 'plus' | 'minus' }) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            onClick={(e: React.FormEvent<HTMLButtonElement>) => {
                if (pending) e.preventDefault();
            }}
            aria-label={type === 'plus' ? 'Increase item quantity' : 'Reduce item quantity'}
            aria-disabled={pending}
            className={clsx(
                'ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80',
                {
                    'cursor-not-allowed': pending,
                    'ml-auto': type === 'minus'
                }
            )}
        >
            {pending ? (
                <DotSquareIcon className="bg-black dark:bg-white" />
            ) : type === 'plus' ? (
                <PlusIcon className="h-4 w-4 dark:text-neutral-500" />
            ) : (
                <MinusIcon className="h-4 w-4 dark:text-neutral-500" />
            )}
        </button>
    );
}

export function EditItemQuantityButton({ item, type, fetchCart }: { item: any; type: 'plus' | 'minus', fetchCart: any }) {
    const actionWithVariant = () => {
        updateCartItemQuantity(item.id, type === 'plus' ? item.quantity + 1 : item.quantity - 1);
        fetchCart();
    }

    return (
        <form action={actionWithVariant}>
            <SubmitButton type={type} />
        </form>
    );
}