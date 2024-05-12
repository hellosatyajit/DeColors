'use client';
import Image from "next/image";
import { useState } from "react";

export default function ProductDetailsCarousel({ images }: { images: any }) {
  const [currentImg, setCurrentImg] = useState(0)
  return (
    <div className="text-white text-[20px] w-full mx-auto static md:sticky top-[50px] flex flex-col lg:flex-row gap-5 h-fit">
      <div className="order-1 lg:order-2 flex-1">
        {images.map((item: any, index: number) => (
          <div hidden={index !== currentImg} key={index}>
            <Image
              src={item}
              alt={""}
              width={100}
              height={100}
              className="w-full aspect-square rounded-lg"
            />
          </div>
        ))}
      </div>

      <div className="order-2 lg:order-1 flex flex-row lg:flex-col gap-2">
        {images.map((item: any, index: number) => (
          <div className={`w-fit cursor-pointer hover:brightness-90 transition-all ${index === currentImg ? 'brightness-75' : ''}`} key={index} onClick={() => setCurrentImg(index)}>
            <Image
              src={item}
              alt={""}
              width={60}
              height={60}
              className="aspect-square rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
