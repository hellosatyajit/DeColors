"use client";
import Image from "next/image";
import Link from "next/link";

const products = [
    {
        name: "Product Name",
        image: "https://juewdrvuynzvupklbxme.supabase.co/storage/v1/object/public/home/1.png",
        url: "/product/1"
    },
    {
        name: "Product Name",
        image: "https://juewdrvuynzvupklbxme.supabase.co/storage/v1/object/public/home/2.png",
        url: "/product/2"
    },
    {
        name: "Product Name",
        image: "https://juewdrvuynzvupklbxme.supabase.co/storage/v1/object/public/home/3.png",
        url: "/product/3"
    },
    {
        name: "Product Name",
        image: "https://juewdrvuynzvupklbxme.supabase.co/storage/v1/object/public/home/4.png",
        url: "/product/4"
    },
];

export default function HotDeals() {

    return (
        <div className="w-full" id="hot-deals">
            <div className="max-w-7xl m-auto px-5 py-10 flex flex-col gap-5 sm:gap-10 justify-center items-center">
                <div className="space-y-1 sm:space-y-2">
                    <p className="font-bold text-3xl md:text-4xl w-full text-center">
                        Hot Deals
                    </p>
                </div>
                <div className="max-w-[1600px] w-full grid grid-cols-2 sm:grid-cols-4 gap-5">
                    {products.map((item, index) => (
                        <Link key={index} href={item.url} className="hover:shadow-xl rounded-xl">
                            <Image src={item.image} alt={item.name} height={100} width={100} className="aspect-[3/4] w-full rounded-xl" />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
