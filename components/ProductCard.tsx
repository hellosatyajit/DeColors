import Image from "next/image";
import Link from "next/link";

interface Product {
    key: number;
    name: string;
    description: string;
    price: number;
    discount: number;
    image: string;
    url: string;
}

export default function ProductCard({ name, description, price, discount, image, url, key }: Product) {
    return (
        <div className="bg-white rounded-lg p-3" key={key}>
            <div className="flex justify-center">
                <Link href={url}>
                    <Image
                        width={300}
                        height={200}
                        className="object-cover rounded-lg aspect-[4/3]"
                        src={image}
                        alt={name + " Image"}
                    />
                </Link>
            </div>
            <div className="mt-2">
                <Link href={url}>
                    <p className="text-lg font-semibold">{name}</p>
                </Link>
                <p className="text-sm text-rose-600">{description}</p>
            </div>
            <div className="flex justify-between items-center mt-4">
                <p className="text-xl font-semibold space-x-2"><span>{discount}₹</span><span className="text-base line-through opacity-70">{price}₹</span></p>
                <button className="px-4 py-2 bg-slate-900 hover:bg-black hover:underline text-white text-xs font-semibold rounded-full">
                    Add to Cart
                </button>
            </div>
        </div>
    );
}