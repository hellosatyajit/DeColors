"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import ProductCard from "@/components/ProductCard";

export default function ProductsSlider({ title, viewAll, products = [] }: { title: string, viewAll: string, products: any[] }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [sliderConfig, setSliderConfig] = useState({ perView: 2, spacing: 20 });

    useEffect(() => {
        if (typeof window !== "undefined") {
            const perView = window.outerWidth > 726 ? (window.outerWidth > 1024 ? 4 : 3) : 2;
            setSliderConfig({ perView, spacing: 20 });
        }
    }, []);

    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
        created() {
            setLoaded(true);
        },
        slides: sliderConfig,
    });

    return (
        <div className="w-full">
            <div className="max-w-7xl m-auto px-5 py-10 flex flex-col gap-5 sm:gap-10 justify-center items-center">
                <div className="space-y-1 sm:space-y-2">
                    <p className="font-bold text-3xl md:text-4xl w-full text-center">
                        {title}
                    </p>
                </div>
                <div className="max-w-[1600px] w-full space-y-5 sm:space-y-10">
                    <div className="flex justify-end md:justify-between">
                        <Link href={viewAll} className="px-4 py-2 hover:underline bg-rose-50 hover:bg-rose-100 rounded-full text-xs xs:text-sm transition-all">View All</Link>
                        {loaded && instanceRef.current && (
                            <div className="space-x-2 hidden md:block">
                                <button
                                    className="px-6 py-2 bg-slate-900 hover:bg-black transition-all text-white rounded-full text-xs xs:text-sm"
                                    onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
                                >
                                    {'<'}
                                </button>
                                <button
                                    className="px-6 py-2 bg-slate-900 hover:bg-black transition-all text-white rounded-full text-xs xs:text-sm"
                                    onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
                                >
                                    {'>'}
                                </button>
                            </div>
                        )}
                    </div>
                    <div ref={sliderRef} className="keen-slider !mt-5 pb-5">
                        {products.map((product, index) => (
                            <div key={index} className="keen-slider__slide shadow-md rounded-lg border border-gray-100">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
