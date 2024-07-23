import { Suspense } from 'react';
import { fetchPackBySlug } from "@/server/actions/ProductActions";
import PacksDetailsClient from './PacksDetailsClient';
import SkeletonLoading from '@/components/product-skeleton';

export default async function PacksPage({ params }: { params: { slug: string } }) {
  const packs = await fetchPackBySlug(params.slug);

  return (
    <Suspense fallback={<SkeletonLoading />}>
      <PacksDetailsClient product={packs} />
    </Suspense>
  );
}