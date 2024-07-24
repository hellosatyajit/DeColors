'use client';

import { useState } from 'react';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import Breadcrumb from '@/components/Breadcrumb';
import { fetchSortedProducts } from '@/server/actions/ProductActions';
import { IProduct, IPacks } from '@/types/product';

const CategoryClient = ({ products, category }: { products: (IProduct | IPacks)[], category: string }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [currentProducts, setCurrentProducts] = useState(products);
  const [loading, setLoading] = useState(false);

  const breadcrumb = [
    { label: 'Home', link: '/' },
    { label: category, link: '/' },
  ];

  const handleSelectChange = async (e: any) => {
    e.preventDefault();
    const newValue = e.target.value;
    setSelectedValue(newValue);
    setLoading(true);

    try {
      let field: "category" | "brand" | "None" | undefined;
      if (category === 'De Colores' || category === 'Chelsy' || category === 'Herbonica') {
        field = "brand"
      }
      else{
        field = "category"
      }
      const response = await fetchSortedProducts(newValue, category,field);
      const sortedProducts = response.data;
      setCurrentProducts(sortedProducts);
    } catch (error) {
      console.error('Error fetching sorted products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full">
      {(category === 'De Colores' || category === 'Chelsy' || category === 'Herbonica') ? (
        <div className="relative">
          <Image
            src="https://juewdrvuynzvupklbxme.supabase.co/storage/v1/object/public/home/1.png"
            alt=""
            width={100}
            height={100}
            className="w-full h-full aspect-square xs:aspect-auto"
          />
          <p className="absolute left-5 xl:left-10 bottom-5 xl:bottom-10 font-bold text-lg sm:text-3xl text-white">{category}</p>
        </div>
      ) : (
        <div className="max-w-7xl m-auto p-5 space-y-2">
          <Breadcrumb links={breadcrumb} />
          <p className="font-bold text-lg sm:text-3xl">{category}</p>
        </div>
      )}
      <div className="max-w-7xl m-auto px-5 py-10 space-y-10">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div><span>{currentProducts.length} Products</span></div>
            <div className="flex gap-1 sm:gap-5">
              {/* <div className="px-4 py-1 rounded-full bg-rose-50 sm:bg-transparent transition-all text-sm sm:text-base">
                Filter 
              </div> */}
              <select name="sortby" id="sortby" value={selectedValue} onChange={handleSelectChange} className="px-4 py-1 rounded-full bg-rose-50 sm:bg-transparent hover:bg-rose-50 transition-all text-sm sm:text-base cursor-pointer">
                <option value="" disabled >Sort By</option>
                <option value="best-selling">Best Selling</option>
                <option value="newest">Newest</option>
                <option value="price-ascending">Price (Low - High)</option>
                <option value="price-descending">Price (High - Low)</option>
                <option value="alphabet-ascending">A - Z</option>
                <option value="alphabet-descending">Z - A</option>
              </select>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {currentProducts.map((product, index) => (
            <ProductCard key={index} product={product} style="hover:shadow-md hover:shadow-gray-200 transition-all rounded-lg border border-gray-200" space={false} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryClient;
