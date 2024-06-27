"use client";

import ProductDetailsCarousel from "@/components/ProductDetailsCarousel";
import { getDiscountedPricePercentage } from "@/utils/helper";
import toast from "react-hot-toast";
import { addToCart } from "@/utils/cart";
import { IPacks } from "@/types/product";

const ProductDetailsClient = ({ product }: { product: IPacks }) => {
    const notify = () => {
        toast.success("Success. Check your cart!");
    };

    const doAddToCart = () => {
        addToCart(product);
        notify();
    };

    return (
        <section className="w-full">
            <div className="max-w-7xl m-auto px-5 py-10 space-y-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-20">
                    <ProductDetailsCarousel images={product?.images} />
                    <div className="flex-[1] py-3">
                        <div className="text-[34px] font-semibold mb-2 leading-tight">
                            {product?.name}
                        </div>

                        <div className="text-lg font-semibold mb-5">{product?.subheading}</div>

                        <div className="flex items-center">
                            <p className="mr-2 text-lg font-semibold">{product?.price.mrp - product?.price.discount} ₹</p>
                            {product?.price.discount > 0 && (
                                <>
                                    <p className="text-base font-medium line-through">
                                        {product?.price.mrp} ₹
                                    </p>
                                    <p className="ml-auto text-base font-medium text-green-500">
                                        {getDiscountedPricePercentage(product?.price.mrp, product?.price.mrp - product?.price.discount)}% off
                                    </p>
                                </>
                            )}
                        </div>

                        <div className="text-md font-medium text-black/[0.5]">
                            incl. of taxes
                        </div>
                        <div className="text-md font-medium text-black/[0.5] mb-20">
                            {`(Also includes all applicable duties)`}
                        </div>

                        <button
                            className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-10 hover:opacity-75"
                            onClick={doAddToCart}
                        >
                            Add to Cart
                        </button>

                        <div>
                            <div className="text-lg font-bold mb-1">Product Details</div>
                            <div className="markdown text-md mb-5">
                                {product?.description.map((item: string, index: number) => (
                                    <p key={index}>{item}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetailsClient;