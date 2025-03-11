import { Suspense } from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import { fetchPackBySlug } from "@/server/actions/ProductActions";
import PacksDetailsClient from './PacksDetailsClient';
import SkeletonLoading from '@/components/product-skeleton';
import { IPacks } from '@/types/product';
import { WEBSITE_URL } from '@/lib/utils';

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product: IPacks = await fetchPackBySlug(params.slug);

  return {
    title: `${product.name} - Beauty Secret`,
    alternates: {
      canonical: `${WEBSITE_URL}/product/${params.slug}`,
    }
  }
}

export default async function PacksPage({ params }: { params: { slug: string } }) {
  const packs = await fetchPackBySlug(params.slug);

  return (
    <Suspense fallback={<SkeletonLoading />}>
      <PacksDetailsClient product={packs} />
    </Suspense>
  );
}