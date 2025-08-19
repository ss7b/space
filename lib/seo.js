import { mediaUrl } from '@/lib/strapi';

export function seoToNextMetadata({ page, siteName = 'Hotsniq' }) {
  if (!page) return {};
  const seo = page.seo || {};
  const title = seo.metaTitle || page.title || siteName;
  const description = seo.metaDescription || '';
  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') || '';
  const isHome = page.slug === 'home';
  const path = isHome ? '/' : `/${page.slug}`;
  const canonical = seo.canonicalURL || (base ? `${base}${path}` : undefined);

  const ogImages = [];
  if (seo.metaImage?.url) {
    ogImages.push({
      url: mediaUrl(seo.metaImage.url),
      width: seo.metaImage.width || 1200,
      height: seo.metaImage.height || 630,
      alt: seo.metaImage.alternativeText || title,
    });
  }

  return {
    title,
    description,
    alternates: canonical ? { canonical } : undefined,
    robots: {
      index: seo.noindex ? false : true,
      follow: seo.nofollow ? false : true,
      // دعم محركات مختلفة (اختياري)
      googleBot: {
        index: seo.noindex ? 'noindex' : 'index',
        follow: seo.nofollow ? 'nofollow' : 'follow',
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName,
      type: 'website',
      locale: 'ar_SA',
      images: ogImages.length ? ogImages : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImages.length ? ogImages.map(i => i.url) : undefined,
    },
  };
}