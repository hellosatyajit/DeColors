'use client';
import { IProduct } from "@/types/product";
import { addToCart } from "@/utils/cart";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ProductCard({ product, key, style = '', space = true }: { product: IProduct, key: number, style?: string, space?: boolean }) {
    const notify = () => {
        toast.success("Success. Check your cart!");
      };

    const doAddToCart = () => {
        addToCart(product)
        notify();
      }

    return (
        <div className={`bg-white rounded-lg ${style}`} key={key}>
            <div className={`flex justify-center ${space ? 'sm:p-3 sm:pb-0' : ''}`}>
                <Link href={`/product/${product.slug || 'test'}`} className="w-full relative">
                    <Image
                        width={300}
                        height={200}
                        className={`object-cover w-full aspect-square sm:aspect-[4/3] ${space ? 'sm:rounded-lg' : 'rounded-t-lg'}`}
                        src={product?.images ? product.images[0] : ''}
                        alt={product.name + " Image"}
                    />
                    <span className="absolute left-2 top-2 text-[10px] sm:text-xs bg-white rounded-full p-1 sm:px-2">⭐ {product.rating}</span>
                </Link>
            </div>
            <div className="p-3 pt-0 space-y-4 mt-2">
                <div>
                    <Link href={`/product/${product.slug || 'test'}`}>
                        <p className="text-sm xs:text-lg font-semibold leading-tight hover:underline">{product.name}</p>
                    </Link>
                    <p className="text-xs xs:text-sm text-rose-600">{product.short_detail}</p>
                </div>
                <div className="flex justify-between flex-wrap gap-1 items-center">
                    <p className="text-base xs:text-xl font-semibold space-x-2"><span>{product.discount}₹</span><span className="text-sm xs:text-base line-through opacity-70">{product.price}₹</span></p>
                    <button className="px-4 py-2 bg-slate-900 hover:bg-black hover:underline text-white text-xs font-semibold rounded-full w-full sm:w-auto" onClick={doAddToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}