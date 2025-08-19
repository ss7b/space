// app/page.jsx
import { notFound } from 'next/navigation';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import { seoToNextMetadata } from '@/lib/seo';

import { getPageByPath } from './[...slug]/page'; 

export async function generateMetadata() {
  const page = await getPageByPath('home');
  if (!page) return {};
  return seoToNextMetadata({ page, siteName: 'Hotsniq' });
}

export default async function HomePage() {
  const page = await getPageByPath('home');
  if (!page) return notFound();

  return (
    <main dir="rtl">
      <BlockRenderer blocks={page.blocks || []} />
    </main>
  );
}
