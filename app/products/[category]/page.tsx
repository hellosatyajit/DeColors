'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import Breadcrumb from '@/components/Breadcrumb';
import { fetchProductsByBrand, fetchProductsByCategory , fetchSortedProducts} from '@/server/actions/ProductActions';
import { IProduct, IPacks } from '@/types/product';
import { useParams, useRouter } from 'next/navigation';

function toCapitalize(text: string) {
  return text.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export default function Category() {
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState('');
  const { category: rawCategory } = useParams();
  const category = toCapitalize(rawCategory as string);

  const [products, setProducts] = useState<(IProduct | IPacks)[]>([]);
  const [loading, setLoading] = useState(true);

  const breadcrumb = [
    { label: 'Home', link: '/' },
    { label: category, link: '/' },
  ];

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        let data: (IProduct | IPacks)[];
        if (category === 'De Coloress' || category === 'Chelsy' || category === 'Herbonica') {
          const response = await fetchProductsByBrand(category);
          data = response.data;
        } else {
          const response = await fetchProductsByCategory(category);
          data = response.data;
        }
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }
    if (category) {
      fetchProducts();
    }
  }, [category]);
  const handleSelectChange = async (e: any) => {
    e.preventDefault();
    const newValue = e.target.value;
    setSelectedValue(newValue);
    console.log('Selected Value:', newValue); 
    try {
      const response = await fetchSortedProducts(newValue, category);
      const data = response.data;
      console.log('Fetched Sorted Products:', data); 
      setProducts(data);
    } catch (error) {
      console.error('Error fetching sorted products:', error);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="w-full">
      {(category === 'De Coloress' || category === 'Chelsy' || category === 'Herbonica') ? (
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
            <div><span>{products.length} Products</span></div>
            <div className="flex gap-1 sm:gap-5">
              <button className="px-4 py-1 rounded-full bg-rose-50 sm:bg-transparent hover:bg-rose-50 transition-all text-sm sm:text-base">
                Filter <span className="hidden sm:inline-block rotate-90">{'>'}</span>
              </button>
              <select name="sortby" id="sortby" value={selectedValue}onChange={handleSelectChange}className="px-4 py-1 rounded-full bg-rose-50 sm:bg-transparent hover:bg-rose-50 transition-all text-sm sm:text-base">
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
  );
}
