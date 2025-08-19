'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // 👈 استدعاء Link
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

// نفس fetchServiceBySlug زي قبل...

export default function ServiceAlertCard({ service }) {
  if (!service) return null;

  const baseService = service?.attributes ? { ...service.attributes, id: service.id } : service;
  const hasInlineContent = Array.isArray(baseService?.content) && baseService.content.length > 0;

  const [open, setOpen] = React.useState(false);
  const [full, setFull] = React.useState(hasInlineContent ? baseService : null);
  const current = full ?? baseService;

  const coverUrl = current?.cover?.url ? mediaUrl(current.cover.url) : null;

  React.useEffect(() => {
    let cancelled = false;
    if (open && !full && current?.slug) {
      fetchServiceBySlug(current.slug).then((data) => {
        if (!cancelled) setFull(data || baseService);
      });
    }
    return () => { cancelled = true; };
  }, [open, full, current?.slug]);

  const blocks = Array.isArray((full ?? baseService)?.content)
    ? (full ?? baseService).content
    : [];

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button className="group block w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-start backdrop-blur-lg transition hover:border-white/20 hover:bg-white/10">
          <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10">
            {coverUrl ? (
              <Image
                src={coverUrl}
                alt={current.title || 'Service'}
                fill
                className="object-cover transition group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center text-white/40">No image</div>
            )}
          </div>

          <h3 className="line-clamp-1 text-lg font-bold text-white">{current.title || 'خدمة'}</h3>
          {current.excerpt && (
            <p className="mt-1 line-clamp-2 text-sm text-white/70">{current.excerpt}</p>
          )}
          <div className="mt-3 inline-flex items-center gap-1 text-sm text-white/80">
            <span>التفاصيل</span>
          </div>
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-h-[85vh] overflow-auto border-white/10 bg-white/5 text-white backdrop-blur-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white text-right">{current.title || 'خدمة'}</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="mt-2 space-y-4 text-right">
              {current?.cover?.url && (
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/10">
                  <Image
                    src={mediaUrl(current.cover.url)}
                    alt={current.cover?.alternativeText || current.title || 'Service image'}
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

        <AlertDialogFooter>
          <AlertDialogCancel className="border-white/10 bg-transparent text-white hover:bg-white/10">
            إغلاق
          </AlertDialogCancel>
          {/* 👇 زر تواصل معنا يوديك لصفحة /contact بدون refresh */}
          <AlertDialogAction asChild>
            <Link
              href="/contact"
              className="items-center justify-center rounded-md bg-white/20 px-4 py-2 text-sm font-medium text-white hover:bg-white/30"
            >
              تواصل معنا
            </Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
