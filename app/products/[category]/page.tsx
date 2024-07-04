'use client'
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import Breadcrumb from "@/components/Breadcrumb";
import { fetchProductsByBrand,fetchProductsByCategory } from "@/server/actions/ProductActions";
import { IProduct,IPacks } from "@/types/product";

const products = [
    {
        name: "Product Name",
        description: "Product Description",
        price: 99,
        discount: 149,
        image: "https://juewdrvuynzvupklbxme.supabase.co/storage/v1/object/public/home/1.png",
        url: "/product/1"
    },
    {
        name: "Product Name",
        description: "Product Description",
        price: 99,
        discount: 149,
        image: "https://juewdrvuynzvupklbxme.supabase.co/storage/v1/object/public/home/2.png",
        url: "/product/2"
    },
    {
        name: "Product Name",
        description: "Product Description",
        price: 99,
        discount: 149,
        image: "https://juewdrvuynzvupklbxme.supabase.co/storage/v1/object/public/home/3.png",
        url: "/product/3"
    },
    {
        name: "Product Name",
        description: "Product Description",
        price: 99,
        discount: 149,
        image: "https://juewdrvuynzvupklbxme.supabase.co/storage/v1/object/public/home/4.png",
        url: "/product/4"
    },
    {
        name: "Product Name",
        description: "Product Description",
        price: 99,
        discount: 149,
        image: "https://juewdrvuynzvupklbxme.supabase.co/storage/v1/object/public/home/5.png",
        url: "/product/5"
    },
];

function toCapitalize(text: string) {
    const capitalizedText = text.split('-').map((word) => word.slice(0, 1).toUpperCase() + '' + word.slice(1, word.length)).join(' ')

    return capitalizedText;
}

export default async function Category(router: any) {
    const category = toCapitalize(router.params.category);

    const breadcrumb = [
        {
            label: 'Home',
            link: '/'
        },
        {
            label: category,
            link: '/'
        },
    ]


    if (category === 'De Coloress' || category === 'Chelsy' || category === 'Herbonica') {
        const { data: products }: { data: (IProduct | IPacks)[] } = await fetchProductsByBrand(category)
    } else {
        const { data: products }: { data: (IProduct | IPacks)[] } = await fetchProductsByCategory(category);
    }

    return (
        <section className="w-full">
            {(category === 'De Coloress' || category === 'Chelsy' || category === 'Herbonica')
                ? <div className="relative">
                    <Image src={'https://juewdrvuynzvupklbxme.supabase.co/storage/v1/object/public/home/1.png'} alt={''} width={100} height={100} className="w-full h-full aspect-square xs:aspect-auto" />
                    <p className="absolute left-5 xl:left-10 bottom-5 xl:bottom-10 font-bold text-lg sm:text-3xl text-white">{category}</p>
                </div>
                : <div className="max-w-7xl m-auto p-5 space-y-2">
                    <Breadcrumb links={breadcrumb} />
                    <p className="font-bold text-lg sm:text-3xl">{category}</p>
                </div>
            }
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
                                <option value="" disabled selected >Sort By</option>
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