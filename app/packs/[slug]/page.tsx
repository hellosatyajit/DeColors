import { Suspense } from 'react';
import { fetchPackBySlug } from "@/server/actions/ProductActions";
import PacksDetailsClient from './PacksDetailsClient';

export default async function PacksPage({ params }: { params: { slug: string } }) {
  const packs = await fetchPackBySlug(params.slug);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PacksDetailsClient product={packs} />
    </Suspense>
  );
}