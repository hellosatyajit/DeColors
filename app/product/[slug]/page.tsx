import { Suspense } from 'react';
import { fetchProductBySlug } from "@/server/actions/ProductActions";
import ProductDetailsClient from './ProductDetailsClient';

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await fetchProductBySlug(params.slug);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductDetailsClient product={product} />
    </Suspense>
  );
}