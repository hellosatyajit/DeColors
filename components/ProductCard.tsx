import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product, style = '', space = true }: { product: any, style?: string, space?: boolean }) {
    const url = product?.isIndividual ? `/product/${product.slug}` : `/packs/${product.slug}`;
    let rating: number = 0;
    if (!product.rating?.reviews?.length) {
        rating = 0
    } else {
        rating = product.rating?.reviews?.reduce((acc: any, review: any) => acc + review.rating, 0)
        rating = parseFloat((rating / product.rating.reviews.length).toFixed(1));
    }
    return (
        <div className={`bg-white rounded-lg h-full ${style} flex flex-col`}>
            <div className={`flex justify-center ${space ? 'sm:p-3 sm:pb-0' : ''}`}>
                <Link href={url} className="w-full relative">
                    <Image
                        width={300}
                        height={200}
                        className={`object-cover w-full aspect-square ${space ? 'rounded-lg' : 'rounded-t-lg'}`}
                        src={product?.images ? product.images[0] : product.variants[0].image[0]}
                        alt={product.name + " Image"}
                    />
                    {rating && <span className="absolute left-2 top-2 text-[10px] sm:text-xs bg-white rounded-full p-1 sm:px-2">⭐ {rating}</span>}
                </Link>
            </div>
            <div className="p-3 pt-0 mt-2 flex flex-col gap-2 md:gap-4 justify-between flex-1">
                <div>
                    <Link href={url}>
                        <p className="text-sm xs:text-lg font-semibold leading-tight hover:underline">{product.name + " - " + product.brand}</p>
                    </Link>
                    <p className="text-xs xs:text-sm text-rose-600">{product.subheading}</p>
                </div>
                <div className="flex justify-between flex-wrap gap-1 items-center">
                    <p className="text-base xs:text-xl font-semibold space-x-2"><span>{product.price.mrp - product.price.discount}₹</span><span className="text-sm xs:text-base line-through opacity-70">{product.price.mrp}₹</span></p>
                    <Link href={url} className="px-4 py-2 bg-slate-900 hover:bg-black hover:underline text-white text-xs font-semibold rounded-full w-full sm:w-auto text-center">
                        Buy Now
                    </Link>
                </div>
            </div>
        </div>
    );
}
