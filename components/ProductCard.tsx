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
    style: string;
    space: boolean;
}

export default function ProductCard({ name, description, price, discount, image, url, key, style = '', space = true }: Product) {
    return (
        <div className={`bg-white rounded-lg ${style}`} key={key}>
            <div className={`flex justify-center ${space ? 'sm:p-3 sm:pb-0' : ''}`}>
                <Link href={url} className="w-full">
                    <Image
                        width={300}
                        height={200}
                        className={`object-cover w-full aspect-square sm:aspect-[4/3] ${space ? 'sm:rounded-lg' : 'rounded-t-lg'}`}
                        src={image}
                        alt={name + " Image"}
                    />
                </Link>
            </div>
            <div className="p-3 pt-0 space-y-4 mt-2">
                <div>
                    <Link href={url}>
                        <p className="text-sm xs:text-lg font-semibold leading-tight">{name}</p>
                    </Link>
                    <p className="text-xs xs:text-sm text-rose-600">{description}</p>
                </div>
                <div className="flex justify-between flex-wrap gap-1 items-center">
                    <p className="text-base xs:text-xl  font-semibold space-x-2"><span>{discount}₹</span><span className="text-sm xs:text-base line-through opacity-70">{price}₹</span></p>
                    <button className="px-4 py-2 bg-slate-900 hover:bg-black hover:underline text-white text-xs font-semibold rounded-full w-full   ">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}