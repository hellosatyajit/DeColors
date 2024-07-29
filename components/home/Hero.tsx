"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchHeroImages } from "@/server/actions/ProductActions";
import SkeletonLoader from "./SkeletonLoader";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface HeroImage {
  url: string;
  image: string;
}

const MAX_RETRIES = 5;

export default function Hero() {
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true); // Added loading state

  const fetchImages = async (retries = 0) => {
    try {
      const response = await fetchHeroImages();
      setHeroImages(response);
      setLoading(false);
    } catch (error: any) {
      if (retries < MAX_RETRIES) {
        const retryAfter = error?.response?.headers['retry-after'] || Math.pow(2, retries);
        setTimeout(() => fetchImages(retries + 1), retryAfter * 1000);
      } else {
        console.error("Failed to fetch hero images:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <Swiper
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      loop
    >
      {heroImages.length > 0 ? (
        heroImages.map((item, index) => (
          <SwiperSlide key={index}>
            <Link href={item.url} passHref>
              <img
                src={item.image}
                alt={`Slide ${index}`}
                className="w-full cursor-pointer"
              />
            </Link>
          </SwiperSlide>
        ))
      ) : (
        <SkeletonLoader />
      )}
    </Swiper>
  );
}
