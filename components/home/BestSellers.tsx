"use client";
import Link from "next/link";
import { useState } from "react";
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import ProductCard from "@/components/ProductCard";

const products = [
    {
        name: "Product Name",
        description: "Product Description",
        price: 99,
        discount: 149,
        image: "https://juewdrvuynzvupklbxme.supabase.co/storage/v1/object/public/home/1.png",
        url: "/product/1"
    },
    {
        name: "Product Name",
        description: "Product Description",
        price: 99,
        discount: 149,
        image: "https://juewdrvuynzvupklbxme.supabase.co/storage/v1/object/public/home/2.png",
        url: "/product/2"
    },
    {
        name: "Product Name",
        description: "Product Description",
        price: 99,
        discount: 149,
        image: "https://juewdrvuynzvupklbxme.supabase.co/storage/v1/object/public/home/3.png",
        url: "/product/3"
    },
    {
        name: "Product Name",
        description: "Product Description",
        price: 99,
        discount: 149,
        image: "https://juewdrvuynzvupklbxme.supabase.co/storage/v1/object/public/home/4.png",
        url: "/product/4"
    },
    {
        name: "Product Name",
        description: "Product Description",
        price: 99,
        discount: 149,
        image: "https://juewdrvuynzvupklbxme.supabase.co/storage/v1/object/public/home/5.png",
        url: "/product/5"
    },
];

export default function BestSellers() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created() {
            setLoaded(true)
        },
        slides: {
            perView: window.outerWidth > 426 ? window.outerWidth > 769 ? 4 : 2 : 1,
            spacing: 20,
        }
    });
    

    return (
        <div className="w-ful">
            <div className="max-w-7xl m-auto px-5 py-10 flex flex-col gap-5 sm:gap-10  justify-center items-center">
                <div className="space-y-1 sm:space-y-2">
                    <p className="font-bold text-3xl md:text-4xl w-full text-center">
                        Best Sellers
                    </p>
                </div>
                <div className="max-w-[1600px] w-full space-y-5 sm:space-y-10">
                    <div className="flex justify-between">
                        <Link href={'/products'} className="px-4 py-2 hover:underline bg-rose-50 hover:bg-rose-100 rounded-full text-sm transition-all">View All</Link>
                        {loaded && instanceRef.current && <div className="space-x-2">
                            <button
                                className="px-6 py-2 bg-slate-900 hover:bg-black transition-all text-white rounded-full text-sm"
                                onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
                            >
                                {'<'}
                            </button>
                            <button
                                className="px-6 py-2 bg-slate-900 hover:bg-black transition-all text-white rounded-full text-sm"
                                onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
                            >
                                {'>'}
                            </button>
                        </div>}
                    </div>
                    {/* {categories.map((item, index) => (
                        <div className="group flex flex-col gap-2 sm:gap-4" key={index}>
                            <div className="relative flex items-center justify-center overflow-hidden shadow-xl w-20 sm:w-32 h-20 sm:h-32 rounded-full border-2">
                                <Link 
                                href={item.url} 
                                className="absolute w-full h-full transition-all duration-500 ease-in-out transform bg-center bg-cover group-hover:scale-150 rounded-full"
                                style={{backgroundImage: `url(${item.img})`}}
                                >
                                </Link>
                            </div>
                            <Link href={item.url}>
                                <p className="font-semibold text-lg text-center">{item.label}</p>
                            </Link>
                        </div>
                    ))} */}
                    <div ref={sliderRef} className="keen-slider !mt-5 pb-5">
                        {products.map((product, index) => (
                            <div className="keen-slider__slide shadow-md rounded-lg border border-gray-100">
                                <ProductCard key={index} {...product} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}