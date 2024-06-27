'use client';

import { X, DotSquareIcon } from 'lucide-react';
import clsx from 'clsx';
import { useFormState, useFormStatus } from 'react-dom';
import { removeFromCart } from '@/utils/cart';

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            onClick={(e: React.FormEvent<HTMLButtonElement>) => {
                if (pending) e.preventDefault();
            }}
            aria-label="Remove cart item"
            aria-disabled={pending}
            className={clsx(
                'ease flex h-[17px] w-[17px] items-center justify-center rounded-full bg-gray-200 transition-all duration-200',
                {
                    'cursor-not-allowed px-0': pending
                }
            )}
        >
            {pending ? (
                <DotSquareIcon className="bg-white" />
            ) : (
                <X className="hover:text-accent-3 mx-[1px] h-4 w-4 text-black" />
            )}
        </button>
    );
}

export function DeleteItemButton({ item, fetchCart }: { item: any, fetchCart: any }) {
    const actionWithVariant = () => { removeFromCart(item._id); fetchCart(); };

    return (
        <form action={actionWithVariant}>
            <SubmitButton />
        </form>
    );
}