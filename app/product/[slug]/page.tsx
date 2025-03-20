import { Suspense } from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import { fetchProductBySlug } from "@/server/actions/ProductActions";
import ProductDetailsClient from './ProductDetailsClient';
import SkeletonLoading from '@/components/product-skeleton';
import { WEBSITE_URL } from '@/lib/utils';
import { IProduct } from '@/types/product';

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product: IProduct = await fetchProductBySlug(params.slug);

  return {
    title: `${product.name} - De Colores Lifestyle`,
    alternates: {
      canonical: `${WEBSITE_URL}/product/${params.slug}`,
    }
  }
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product: IProduct = await fetchProductBySlug(params.slug);

  return (
    <Suspense fallback={<SkeletonLoading />}>
      <ProductDetailsClient product={product} />
    </Suspense>
  );
}