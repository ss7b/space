'use client';

import * as React from 'react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { buildQuery, mediaUrl } from '@/lib/strapi';
import RichTextRenderer from '@/components/common/RichTextRenderer';

// استرجاع خدمة بالـ slug
async function fetchService(slug) {
  const qs = buildQuery({
    filters: { slug: { $eq: slug } },
    fields: ['title','slug','excerpt'],
    populate: { cover: true, content: true },
    pagination: { pageSize: 1 },
  });
  const base = process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/+$/, '');
  const res = await fetch(`${base}/api/services?${qs}`, { cache: 'no-store' });
  const json = await res.json();
  return json?.data?.[0] || null;
}

export default function ServiceModal() {
  const search = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const slug = search.get('s');

  const [open, setOpen] = React.useState(Boolean(slug));
  const [item, setItem] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setOpen(Boolean(slug));
    if (!slug) { setItem(null); return; }
    let cancelled = false;
    setLoading(true);
    fetchService(slug).then((data) => {
      if (!cancelled) { setItem(data); setLoading(false); }
    });
    return () => { cancelled = true; };
  }, [slug]);

  const onClose = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('s');
    router.replace(`${pathname}${url.search ? `?${url.searchParams.toString()}` : ''}`, { scroll: false });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/60 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">
            {loading ? '...' : (item?.title || 'خدمة')}
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg border border-white/10 px-3 py-1 text-white/80 hover:bg-white/10"
          >
            إغلاق
          </button>
        </div>

        {loading ? (
          <div className="h-40 animate-pulse rounded-xl bg-white/10" />
        ) : item ? (
          <>
            {item.cover?.url && (
              <div className="relative my-3 aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/10">
                <Image
                  src={mediaUrl(item.cover.url)}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <RichTextRenderer blocks={item.content || []} />
          </>
        ) : (
          <p className="text-white/70">لم يتم العثور على الخدمة.</p>
        )}
      </div>
    </div>
  );
}
