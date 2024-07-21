"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProductDetailsCarousel from "@/components/ProductDetailsCarousel";
import { getDiscountedPricePercentage } from "@/utils/helper";
import toast from "react-hot-toast";
import { addToCart } from "@/utils/cart";
import { IProduct } from "@/types/product";
import { useSession } from "next-auth/react";
import { FaStar } from "react-icons/fa";
import { addReviewToProductOrPack } from "@/server/actions/ProductActions";
import { format } from 'date-fns';

const ProductDetailsClient = ({ product }: { product: IProduct }) => {
    const router = useRouter();

    const { data: session, status: isAuthenticated } = useSession();
    const [selectedSize, setSelectedColor] = useState("");
    const [showError, setShowError] = useState(false);
    const [reviewText, setReviewText] = useState("");
    const [reviewRating, setReviewRating] = useState(5);
    const [feedbacks, setFeedbacks] = useState(product.rating.reviews || []);
    const [images, setImages] = useState(product?.variants.flatMap((item: any) => item.image).slice(0, 5));

    const notify = () => {
        toast.success("Success. Check your cart!");
    };
    let productname = ''
    if (selectedSize === ""){
         productname = product?.name + " - "  + product.brand 
    }
    else {
         productname = product?.name + " - "  + selectedSize
    }
    const doAddToCart = () => {
        if (selectedSize === "") {
            setShowError(true);
            toast.error("Please select a color.");
            return;
        } else {
            addToCart(product, selectedSize);
            notify();
        }
    };

    const addQueryParam = (query: string) => {
        router.push(`${location.pathname}/?variant=${query}`, undefined);
    };

    const isURL = (str: string): boolean => {
        try {
            new URL(str);
            return true;
        } catch {
            return false;
        }
    };

    const handleReviewSubmit = async () => {
        const reviewerName = session?.user?.name || "Anonymous";

        if (reviewText.trim() === "") {
            toast.error("Review text is required.");
            return;
        }

        const newReview = {
            name: reviewerName,
            rating: reviewRating,
            review: reviewText,
            date: new Date(),
        };

        setFeedbacks([...feedbacks, newReview]);
        setReviewText("");
        setReviewRating(5);

        await addReviewToProductOrPack(product.name, newReview);
    };

    const formatDate = (date: Date | string, formatStr: string = 'MM/dd/yyyy') => {
        return format(new Date(date), formatStr);
    };

    const handleColorSelection = (variant: any) => {
        setSelectedColor(variant.sku);
        addQueryParam(variant.sku);
        setShowError(false);
        setImages(variant.image); 
    };

    return (
        <section className="w-full">
            <div className="max-w-7xl m-auto px-5 py-10 space-y-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-20">
                    <ProductDetailsCarousel images={images} />
                    <div className="flex-[1] py-3">
                        <div className="text-[34px] font-semibold mb-2 leading-tight">
                            {productname}
                        </div>

                        <div className="text-lg font-semibold mb-5">{product?.subheading}</div>

                        <div className="flex items-center">
                            <p className="mr-2 text-lg font-semibold">
                                {product?.price.mrp - product?.price.discount} ₹
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
                                        onClick={() => handleColorSelection(item)}
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

                {/* Feedback Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <div>
                        <h2 className="text-xl font-bold mb-4">Leave a Review</h2>
                        {isAuthenticated === 'authenticated' && (
                            <>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Rating:</label>
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((rating) => (
                                            <FaStar
                                                key={rating}
                                                size={24}
                                                className={`cursor-pointer ${reviewRating >= rating ? "text-yellow-500" : "text-gray-300"
                                                    }`}
                                                onClick={() => setReviewRating(rating)}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Review:</label>
                                    <textarea
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                        rows={4}
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                    ></textarea>
                                </div>
                                <button
                                    className="py-2 px-4 rounded-full bg-black text-white text-lg font-medium transition-transform hover:opacity-75"
                                    onClick={handleReviewSubmit}
                                >
                                    Submit Review
                                </button>
                            </>
                        )}

                        {isAuthenticated === 'unauthenticated' &&
                            <div className="text-gray-700">
                                You must be signed in to leave a review.
                                <button
                                    className="py-2 px-4 rounded-full bg-black text-white text-lg font-medium transition-transform hover:opacity-75"
                                    onClick={() => router.push("/login")}
                                >
                                    Sign In
                                </button>
                            </div>
                        }
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
                        <div className="max-h-[512px] overflow-y-auto border rounded-md">
                            {feedbacks.length > 0 ? (
                                feedbacks.map((feedback, index) => (
                                    <div key={index} className={`p-4 ${feedbacks.length - 1 !== index ? 'border-b' : ''}`}>
                                        <div className="flex items-center mb-1">
                                            <div className="font-semibold">{feedback.name}</div>
                                            <div className="ml-3 text-sm text-yellow-500">
                                                {"★".repeat(feedback.rating) + "☆".repeat(5 - feedback.rating)}
                                            </div>
                                        </div>
                                        <div className="text-gray-600">{feedback.review}</div>
                                        <div className="text-sm text-gray-400">
                                            {format(new Date(feedback.date), 'MM/dd/yyyy')}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-gray-500">No reviews yet.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetailsClient;
