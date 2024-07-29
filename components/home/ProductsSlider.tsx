"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide, SwiperProps } from 'swiper/react';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ProductCard from "@/components/ProductCard";

export default function ProductsSlider({ title, viewAll, products = [] }: { title: string, viewAll: string, products: any[] }) {
    const [swiperConfig, setSwiperConfig] = useState<SwiperProps>({
        slidesPerView: 2,
        spaceBetween: 20,
        breakpoints: {
            726: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
        },
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
                        <div>
                            {viewAll && (
                                <Link href={viewAll} className="px-4 py-2 hover:underline bg-rose-50 hover:bg-rose-100 rounded-full text-xs xs:text-sm transition-all block">View All</Link>
                            )}
                        </div>
                        <div className="space-x-2 hidden md:flex">
                            <button
                                className="px-6 py-2 bg-slate-900 hover:bg-black transition-all text-white rounded-full text-xs xs:text-sm"
                                // @ts-ignore
                                onClick={() => swiperConfig.swiper?.slidePrev()}
                                >
                                {'<'}
                            </button>
                            <button
                                className="px-6 py-2 bg-slate-900 hover:bg-black transition-all text-white rounded-full text-xs xs:text-sm"
                                // @ts-ignore
                                onClick={() => swiperConfig.swiper?.slideNext()}
                            >
                                {'>'}
                            </button>
                        </div>
                    </div>
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar]}
                        slidesPerView={swiperConfig.slidesPerView}
                        spaceBetween={swiperConfig.spaceBetween}
                        breakpoints={swiperConfig.breakpoints}
                        onSwiper={(swiper) => setSwiperConfig((prevConfig) => ({ ...prevConfig, swiper }))}
                        className="!px-2 !pb-2"
                    >
                        {products.map((product, index) => (
                            <SwiperSlide key={index} className="!h-auto shadow-md rounded-lg border border-gray-100">
                                <ProductCard product={product} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}
