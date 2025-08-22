// components/common/ServiceAlertCard.jsx
'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { buildQuery, mediaUrl } from '@/lib/strapi';
import RichTextRenderer from '@/components/common/RichTextRenderer';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { GlassToSkyButton, SkyToGlassButton } from './CustomButtons';
import useLang from '@/components/utils/useLang';

async function fetchServiceBySlug(slug, locale = 'ar') {
  const qs = new URLSearchParams();
  qs.set('filters[slug][$eq]', slug);
  qs.set('populate[cover][fields][0]', 'url');
  qs.set('populate[cover][fields][1]', 'alternativeText');
  qs.set('populate[0]', 'content');
  qs.set('locale', locale);
  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/+$/, '')}/api/services?${qs.toString()}`;
  const res = await fetch(url, { next: { revalidate: 60, tags: ['services'] } });
  const json = await res.json();
  const item = json?.data?.[0];
  return item?.attributes ? { ...item.attributes, id: item.id } : item ?? null;
}

export default function ServiceAlertCard({ service }) {
  const { lang, dir, isRTL } = useLang();
  if (!service) return null;

  const t = React.useMemo(() => {
    if (lang === 'en') {
      return {
        service: 'Service',
        noImage: 'No image',
        close: 'Close',
        contact: 'Contact us',
        excerptAsTitle: false,
      };
    }
    return {
      service: 'خدمة',
      noImage: 'لا توجد صورة',
      close: 'إغلاق',
      contact: 'تواصل معنا',
      excerptAsTitle: false,
    };
  }, [lang]);

  const base = service?.attributes ? { ...service.attributes, id: service.id } : service;
  const hasInlineContent = Array.isArray(base?.content) && base.content.length > 0;

  const [open, setOpen] = React.useState(false);
  const [full, setFull] = React.useState(hasInlineContent ? base : null);
  const current = full ?? base;

  const coverUrl = current?.cover?.url ? mediaUrl(current.cover.url) : null;

  React.useEffect(() => {
    let cancelled = false;
    if (open && !full && current?.slug) {
      fetchServiceBySlug(current.slug, lang).then((data) => {
        if (!cancelled) setFull(data || base);
      });
    }
    return () => { cancelled = true; };
  }, [open, full, current?.slug, lang]); // ✅ نأخذ اللغة في الحسبان

  const blocks = Array.isArray((full ?? base)?.content)
    ? (full ?? base).content
    : [];

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {/* نجعل الاتجاه منطقي داخل البطاقة */}
        <button
          dir={dir}
          className="group block w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-start backdrop-blur-lg transition hover:border-white/20 hover:bg-white/10"
        >
          <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10">
            {coverUrl ? (
              <Image
                src={coverUrl}
                alt={current.title || t.service}
                fill
                className="object-cover transition group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center text-white/40">
                {t.noImage}
              </div>
            )}
          </div>

          <h3 className="line-clamp-1 text-lg font-bold text-white">
            {current.title || t.service}
          </h3>
          {current.excerpt && (
            <p className="mt-1 line-clamp-2 text-sm text-white/70">{current.excerpt}</p>
          )}
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent
        dir={dir}
        className="max-h-[85vh] overflow-auto border-white/10 bg-white/5 text-white backdrop-blur-xl"
      >
        <AlertDialogHeader>
          <AlertDialogTitle className={`${isRTL ? 'text-right' : 'text-left'} text-white`}>
            {current.title || t.service}
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className={`mt-2 space-y-4 ${isRTL ? 'text-right' : 'text-left'}`}>
              {current?.cover?.url && (
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/10">
                  <Image
                    src={mediaUrl(current.cover.url)}
                    alt={current.cover?.alternativeText || current.title || t.service}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              {current.excerpt && (
                <p className="text-white font-semibold text-base">
                  {current.excerpt}
                </p>
              )}
              {!open || (open && !full && !hasInlineContent) ? (
                <div className="h-32 animate-pulse rounded-xl bg-white/10" />
              ) : (
                Array.isArray(blocks) && <RichTextRenderer blocks={blocks} />
              )}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className={`${isRTL ? 'flex-row-reverse' : ''}`}>
          <AlertDialogCancel className="border-white/10 bg-transparent text-white hover:bg-white/10">
            {t.close}
          </AlertDialogCancel>

          {/* زر تواصل/Contact */}
          <AlertDialogAction asChild>
            <Link href="/contact">
              <GlassToSkyButton>{t.contact}</GlassToSkyButton>
            </Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
