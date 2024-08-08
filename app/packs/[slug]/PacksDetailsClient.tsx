"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProductDetailsCarousel from "@/components/ProductDetailsCarousel";
import { getDiscountedPricePercentage, ShareLinks } from "@/utils/helper";
import toast from "react-hot-toast";
import { addToCart } from "@/utils/cart";
import { IPacks, IProduct } from "@/types/product";
import { useSession } from "next-auth/react";
import { FaStar } from "react-icons/fa";
import { addReviewToProductOrPack, fetchSuggestedProducts, CheckReview } from "@/server/actions/ProductActions";
import { format } from "date-fns";
import ProductsSlider from "@/components/home/ProductsSlider";

const ProductDetailsClient = ({ product }: { product: IPacks }) => {
    const router = useRouter();
    const { data: session, status: isAuthenticated } = useSession();
    const [reviewText, setReviewText] = useState("");
    const [reviewRating, setReviewRating] = useState(5);
    const [feedbacks, setFeedbacks] = useState(product.rating.reviews || []);
    const [suggestedProducts, setSuggestedProducts] = useState<(IPacks | IProduct)[]>([]);
    const [reviewPermission, setReviewPermission] = useState<"Yes" | "No" | "NotBuyed">("No");
    const currentUrl = location.href;

    useEffect(() => {
        const fetchProducts = async () => {
            if (product?.brand && product?.category) {
                const { data: Suggestedproducts } = await fetchSuggestedProducts(product.brand, product.category);
                setSuggestedProducts(Suggestedproducts);
            }
        };

        fetchProducts();
    }, [product?.brand, product?.category]);

    useEffect(() => {
        const checkReviewPermission = async () => {
            if (session?.user?.email) {
                const permission = await CheckReview(session.user.email, product._id.toString(), "true");
                setReviewPermission(permission.result);
            }
        };

        if (isAuthenticated === "authenticated") {
            checkReviewPermission();
        }
    }, [session, product._id, isAuthenticated]);

    const notify = () => {
        toast.success("Success. Check your cart!");
    };

    const doAddToCart = () => {
        addToCart(product, product.slug);
        notify();
    };

    const handleReviewSubmit = async () => {
        const reviewerName = session?.user?.name || "Anonymous";

        const newReview = {
            name: reviewerName,
            rating: reviewRating,
            review: reviewText,
            date: new Date().toISOString(),
        };

        setFeedbacks([...feedbacks, newReview]);

        setReviewText("");
        setReviewRating(5);
        setReviewPermission('Yes')

        await addReviewToProductOrPack(product._id, newReview, false);
    };

    const isOutOfStock = product.inventory === 0;

    return (
        <section className="w-full">
            <div className="max-w-7xl m-auto px-5 py-10 space-y-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-20">
                    <ProductDetailsCarousel images={product?.images} />
                    <div className="flex-[1] py-3">
                        <h1 className="text-[34px] font-semibold mb-2 leading-tight">
                            {product?.name}
                        </h1>

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

                        {isOutOfStock ? (
                            <div className="fixed left-0 right-0 sm:static bottom-0 flex justify-center items-center w-full py-4 sm:rounded-full bg-black text-white font-medium text-lg sm:mb-10 z-20">
                                Out of Stock
                            </div>
                        ) : (
                            <button
                                className="fixed left-0 right-0 sm:static bottom-0 w-full py-4 sm:rounded-full bg-black text-white text-lg font-medium transition-transform sm:active:scale-95 sm:mb-10 hover:bg-gray-900 z-20"
                                onClick={doAddToCart}
                            >
                                Add to Cart
                            </button>
                        )}

                        <div>
                            <div className="text-lg font-bold mb-1">Product Details</div>
                            <div className="markdown text-md mb-5">
                                {product?.description.map((item: string, index: number) => (
                                    <p key={index}>{item}</p>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="text-lg font-bold mb-1">Share with others</div>
                            <div className="mb-10 flex space-x-2 text-white">
                                <button
                                    className="h-10 w-10 flex justify-center items-center rounded-full bg-blue-600 transition-transform hover:opacity-75"
                                    onClick={() => ShareLinks.shareOnFacebook(currentUrl, product.name)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                                </button>
                                <button
                                    className="h-10 w-10 flex justify-center items-center rounded-full bg-green-500 transition-transform hover:opacity-75"
                                    onClick={() => ShareLinks.shareOnWhatsApp(currentUrl, product.name)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                                        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                                    </svg>
                                </button>
                                <button
                                    className="h-10 w-10 flex justify-center items-center rounded-full bg-gray-800 transition-transform hover:opacity-75"
                                    onClick={() => ShareLinks.copyToClipboard(currentUrl)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-share-2"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" x2="15.42" y1="13.51" y2="17.49" /><line x1="15.41" x2="8.59" y1="6.51" y2="10.49" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feedback Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <div>
                        <h2 className="text-xl font-bold mb-4">Leave a Review</h2>
                        {isAuthenticated === "authenticated" && (
                            <>
                                {reviewPermission === "Yes" && (
                                    <div className="text-green-600 mb-4">
                                        Thank you for your review!
                                    </div>
                                )}

                                {reviewPermission === "No" && (
                                    <>
                                        <div className="mb-4">
                                            <label className="block text-gray-700">Rating:</label>
                                            <div className="flex">
                                                {[1, 2, 3, 4, 5].map((rating) => (
                                                    <FaStar
                                                        key={rating}
                                                        size={24}
                                                        className={`cursor-pointer ${reviewRating >= rating ? "text-yellow-500" : "text-gray-300"}`}
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
                                            className="ml-2 py-2 px-4 rounded-full bg-black text-white text-lg font-medium transition-transform hover:opacity-75"
                                            onClick={handleReviewSubmit}
                                        >
                                            Submit Review
                                        </button>
                                    </>
                                )}

                                {reviewPermission === "NotBuyed" && (
                                    <div className="text-red-600 mb-4">
                                        You can only review after purchasing the product.
                                    </div>
                                )}
                            </>
                        )}

                        {isAuthenticated === "unauthenticated" && (
                            <div className="text-gray-700 space-y-2">
                                <p>You must be signed in to leave a review.</p>
                                <button
                                    className="py-2 px-4 rounded-full bg-black text-white text-lg font-medium transition-transform hover:opacity-75"
                                    onClick={() => router.push("/login")}
                                >
                                    Sign In
                                </button>
                            </div>
                        )}
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
                                <div className="text-gray-500 p-4">No reviews yet.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ProductsSlider title="Suggested Product" viewAll="" products={suggestedProducts} />
        </section>
    );
};

export default ProductDetailsClient;
