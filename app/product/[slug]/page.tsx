import { Suspense } from 'react';
import { fetchProductBySlug } from "@/server/actions/ProductActions";
import ProductDetailsClient from './ProductDetailsClient';
import SkeletonLoading from '@/components/product-skeleton';

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await fetchProductBySlug(params.slug);

  return (
    <Suspense fallback={<SkeletonLoading />}>
      <ProductDetailsClient product={product} />
    </Suspense>
  );
}