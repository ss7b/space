// app/page.jsx
import { notFound } from 'next/navigation';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import { seoToNextMetadata } from '@/lib/seo';
import { cookies } from 'next/headers';
import { getPageByPath } from './[...slug]/page';

export async function generateMetadata() {
  const locale = cookies().get('lang')?.value ?? 'ar';
  const page = await getPageByPath('home', locale);
  if (!page) return {};
  return seoToNextMetadata({ page, siteName: 'Hotsniq' });
}

export default async function HomePage() {
  const locale = cookies().get('lang')?.value ?? 'ar';
  const page = await getPageByPath('home', locale);
  if (!page) return notFound();

  return (
    <main dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <BlockRenderer blocks={page.blocks || []} />
    </main>
  );
}