'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

const offers = [
  {
    text: "New Offer Grab now Buy 2 Kajal Get 1 Free 🎁",
    link: "/product/chelsy-kajal?variant=Kajal",
  },
  {
    text: "Order Above ₹500 Get beautiful Surprise 😁",
    link: null,
  },
  {
    text: "Shopping worth min ₹149 get free shipping 🛒",
    link: null,
  },
];

export default function TopBanner() {
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOfferIndex((prevIndex) => (prevIndex + 1) % offers.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentOffer = offers[currentOfferIndex];

  return (
    <div className="bg-white text-rose-500 p-4 text-center transition-opacity duration-500 opacity-100 fade-out">
      <div className="flex justify-center items-center">
        <div className="flex flex-col">
          <Link href={currentOffer.link || "#"} className="hover:underline mb-1">
            {currentOffer.text}
          </Link>
        </div>
      </div>
    </div>
  );
}
