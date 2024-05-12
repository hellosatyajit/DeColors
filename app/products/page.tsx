import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import Breadcrumb from "@/components/Breadcrumb";
import { getBestSellingProducts } from "@/utils/store";

export default async function Category() {
    const products = await getBestSellingProducts(false);

    return (
        <section className="w-full">
            <div className="max-w-7xl m-auto px-5 py-10 space-y-10">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <div><span>{products.length} Products</span></div>
                        <div className="flex gap-1 sm:gap-5">
                            <button className="px-4 py-1 rounded-full bg-rose-50 sm:bg-transparent hover:bg-rose-50 transition-all text-sm sm:text-base">
                                Filter <span className="hidden sm:inline-block rotate-90">{'>'}</span>
                            </button>
                            <select name="sotby" id="sortby" className="px-4 py-1 rounded-full bg-rose-50 sm:bg-transparent hover:bg-rose-50 transition-all text-sm sm:text-base">
                                {/* Sort <span className="hidden sm:inline-block">By: Best Selling</span> <span className="hidden sm:inline-block rotate-90">{'>'}</span> */}
                                <option value="" disabled selected>Sort By</option>
                                <option value="best-selling">Best Selling</option>
                                <option value="newest">Newest</option>
                                <option value="price-ascending">Price (Low - High)</option>
                                <option value="price-descending">Price (High - Low)</option>
                                <option value="alphabet-ascending">A - Z</option>
                                <option value="alphabet-descending">Z - A</option>
                            </select>
                        </div>
                    </div>
                    <div className="hidden sm:flex flex-wrap gap-2">
                        <span className="px-3 py-1 space-x-1 rounded-full bg-gray-50 hover:bg-rose-100 transition-all">
                            <span>Color: Blue</span> <button className="">{'X'}</button>
                        </span>
                        <span className="px-3 py-1 space-x-1 rounded-full bg-gray-50 hover:bg-rose-100 transition-all">
                            <span>Color: Blue</span> <button className="">{'X'}</button>
                        </span>
                        <span className="px-3 py-1 space-x-1 rounded-full bg-gray-50 hover:bg-rose-100 transition-all">
                            <span>Color: Blue</span> <button className="">{'X'}</button>
                        </span>
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