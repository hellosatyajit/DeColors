import { Metadata } from "next";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import Breadcrumb from "@/components/Breadcrumb";
import { fetchSortedProducts } from "@/server/actions/ProductActions";
import { IProduct, IPacks } from "@/types/product";
import { WEBSITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
    title: "Products - De Colores Lifestyle",
    alternates: {
        canonical: `${WEBSITE_URL}/products`,
    }
};

export default async function Category() {
    const { data: products }: { data: (IProduct | IPacks)[] } = await fetchSortedProducts("best-selling", "None");

    return (
        <section className="w-full">
            <div className="max-w-7xl m-auto px-5 py-10 space-y-10">
                <h1 hidden>Best Selling Products</h1>
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <div><span>{products.length} Products</span></div>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {products.map((product, index) => (
                        <ProductCard key={index} product={product} style="hover:shadow-md hover:shadow-gray-200 transition-all rounded-lg border border-gray-200" space={false} />
                    ))}
                </div>
            </div>
        </section>
    )
}