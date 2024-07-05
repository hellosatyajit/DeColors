import { Suspense } from 'react';
import { fetchProductsByBrand, fetchProductsByCategory, fetchSortedProducts } from '@/server/actions/ProductActions';
import CategoryClient from './CategoryClient';

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const rawCategory = params.category;
  const category = rawCategory.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  let products = [];

  if (category === 'De Coloress' || category === 'Chelsy' || category === 'Herbonica') {
    const response = await fetchProductsByBrand(category);
    products = response.data;
  } else {
    const response = await fetchProductsByCategory(category);
    products = response.data;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryClient products={products} category={category} />
    </Suspense>
  );
}
