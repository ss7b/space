'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { mediaUrl } from '@/lib/strapi';
import ServiceAlertCard from '@/components/common/ServiceAlertCard';




export default function ServiceGlassCard({ service }) {
  const href = `/services?s=${service.slug}`;
  const cover = service?.cover?.url ? mediaUrl(service.cover.url) : null;

  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-lg transition hover:border-white/20 hover:bg-white/10"
    >
      <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10">
        {cover ? (
          <Image
            src={cover}
            alt={service.title}
            fill
            className="object-cover transition group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-white/40">
            No image
          </div>
        )}
      </div>

      <h3 className="line-clamp-1 text-lg font-bold text-white">{service.title}</h3>
      {service.excerpt && (
        <p className="mt-1 line-clamp-2 text-sm text-white/70">{service.excerpt}</p>
      )}

      <div className="mt-3 inline-flex items-center gap-1 text-sm text-white/80">
        <span>التفاصيل</span>
        <ArrowLeft className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}
