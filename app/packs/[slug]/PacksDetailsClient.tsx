"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProductDetailsCarousel from "@/components/ProductDetailsCarousel";
import { getDiscountedPricePercentage } from "@/utils/helper";
import toast from "react-hot-toast";
import { addToCart } from "@/utils/cart";
import { IPacks } from "@/types/product";
import { getSession } from "next-auth/react";
import { FaStar } from "react-icons/fa";
import { addReviewToProductOrPack } from "@/server/actions/ProductActions";
import { format } from "date-fns";

const ProductDetailsClient = ({ product }: { product: IPacks }) => {
    const router = useRouter();
    const [reviewText, setReviewText] = useState("");
    const [reviewRating, setReviewRating] = useState(5);
    const [feedbacks, setFeedbacks] = useState(product.rating.reviews || []);

    const notify = () => {
        toast.success("Success. Check your cart!");
    };

    const doAddToCart = () => {
        addToCart(product);
        notify();
    };

    const handleReviewSubmit = async () => {
        const session = await getSession();
        const reviewerName = session?.user?.name || "Anonymous";

        const newReview = {
            name: reviewerName,
            rating: reviewRating,
            review: reviewText,
            date: new Date(),
        };

        
        setFeedbacks([...feedbacks, newReview]);

        
        setReviewText("");
        setReviewRating(5);

        await addReviewToProductOrPack(product.name, newReview,false);
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

                {/* Feedback Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <div>
                        <h2 className="text-xl font-bold mb-4">Leave a Review</h2>
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
                            className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            onClick={handleReviewSubmit}
                        >
                            Submit Review
                        </button>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
                        <div className="h-64 overflow-y-auto border p-4 rounded-md">
                            {feedbacks.length > 0 ? (
                                feedbacks.map((feedback, index) => (
                                    <div key={index} className="mb-5 border-b pb-3">
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
