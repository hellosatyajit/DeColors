"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductDetailsCarousel from "@/components/ProductDetailsCarousel";
import { getDiscountedPricePercentage } from "@/utils/helper";
import toast from "react-hot-toast";
import { addToCart } from "@/utils/cart";
import { IProduct } from "@/types/product";
import { isURL } from "@/lib/utils";

const ProductDetailsClient = ({ product }: { product: IProduct }) => {
    const router = useRouter();
    const [selectedSize, setSelectedColor] = useState("");
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        const query = location.search.split('=')[1];
        console.log(query);
        
        setSelectedColor(query);
    }, [])

    const notify = () => {
        toast.success("Success. Check your cart!");
    };

    const doAddToCart = () => {
        if (selectedSize === "") {
            setShowError(true);
            return;
        } else {
            addToCart(product, selectedSize);
            notify();
        }
    };

    const addQueryParam = (query: string) => {
        router.push(`${location.pathname}/?variant=${query}`, undefined);
    };

    const images = product?.variants.slice(0, 5).map((item: any) => item.image);

    return (
        <section className="w-full">
            <div className="max-w-7xl m-auto px-5 py-10 space-y-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-20">
                    <ProductDetailsCarousel images={images} />
                    <div className="flex-[1] py-3">
                        <div className="text-[34px] font-semibold mb-2 leading-tight">
                            {product?.name}
                        </div>

                        <div className="text-lg font-semibold mb-5">{product?.subheading}</div>

                        <div className="flex items-center">
                            <p className="mr-2 text-lg font-semibold">
                                {product?.price.mrp ?? 0 - (product?.price.discount ?? 0)} ₹
                            </p>
                            {product?.price.discount > 0 && (
                                <>
                                    <p className="text-base font-medium line-through">
                                        {product?.price.mrp} ₹
                                    </p>
                                    <p className="ml-auto text-base font-medium text-green-500">
                                        {getDiscountedPricePercentage(
                                            product?.price.mrp ?? 0,
                                            (product?.price.mrp ?? 0) - (product?.price.discount ?? 0)
                                        )}
                                        % off
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

                        <div className="mb-10">
                            <div className="flex justify-between mb-2 text-md font-semibold">
                                Select Color
                            </div>

                            <div id="sizesGrid" className="flex flex-wrap gap-2">
                                {product?.variants.map((item: any, index: number) => (
                                    <button
                                        key={index}
                                        className={`border rounded-full text-center py-3 font-medium w-10 h-10 cursor-pointer ${selectedSize === item.sku ? "border-black" : ""
                                            }`}
                                        style={{
                                            backgroundColor: isURL(item.attribute.color)
                                                ? ""
                                                : item.attribute.color,
                                            backgroundImage: isURL(item.attribute.color)
                                                ? `url(${item.attribute.color})`
                                                : "",
                                            backgroundSize: "cover",
                                        }}
                                        onClick={() => {
                                            setSelectedColor(item.sku);
                                            addQueryParam(item.sku);
                                            setShowError(false);
                                        }}
                                    ></button>
                                ))}
                            </div>

                            {showError && (
                                <div className="text-red-600 mt-1">
                                    Color selection is required
                                </div>
                            )}
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
                                {product?.description.map((item: any, index: number) => (
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