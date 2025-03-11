import { Suspense } from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import { fetchProductsByBrand, fetchProductsByCategory, fetchSortedProducts } from '@/server/actions/ProductActions';
import CategoryClient from './CategoryClient';
import { WEBSITE_URL } from '@/lib/utils';

export async function generateMetadata(
  { params }: { params: { category: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const category = params.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return {
    title: `${category} - Beauty Secret`,
    alternates: {
      canonical: `${WEBSITE_URL}/products/${params.category}`,
    }
  }
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const rawCategory = params.category;
  const category = rawCategory.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  let products = [];

  if (category === 'De Colores' || category === 'Chelsy' || category === 'Herbonica') {
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
