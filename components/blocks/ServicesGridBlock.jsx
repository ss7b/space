'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import ServiceAlertCard from '@/components/common/ServiceAlertCard';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/+$/, '');

export default function ServicesGridBlock({
  section_title = 'خدماتنا',
  section_subtitle = 'حلول عملية مصممة لنجاح أعمالك',
  cta_text = 'كل الخدمات',
  cta_link = '/services',
  services = [],      // من العلاقة لو جاية من Strapi
  show_all = false,   // لو true نجيب كل الخدمات من الـ API
  limit = 24,
}) {
  const [all, setAll] = React.useState(Array.isArray(services) ? services : []);
  const hasRelation = Array.isArray(services) && services.length > 0;

  React.useEffect(() => {
    let cancelled = false;

    async function fetchAll() {
      if (!show_all || !STRAPI_URL) return;
      try {
        const qs = new URLSearchParams();
        qs.set('fields[0]', 'title');
        qs.set('fields[1]', 'slug');
        qs.set('fields[2]', 'excerpt');
        qs.set('populate[cover][fields][0]', 'url');
        qs.set('populate[cover][fields][1]', 'alternativeText');
        qs.set('pagination[pageSize]', String(limit || 24));
        qs.set('sort[0]', 'createdAt:desc');

        const res = await fetch(`${STRAPI_URL}/api/services?${qs.toString()}`, {
          next: { revalidate: 60, tags: ['services'] },
        });
        const json = await res.json();
        if (!cancelled) {
          setAll(Array.isArray(json?.data) ? json.data : []);
        }
      } catch (err) {
        console.error('Error fetching services:', err);
      }
    }

    if (hasRelation) {
      setAll(services);
    } else {
      fetchAll();
    }

    return () => {
      cancelled = true;
    };
  }, [show_all, limit, hasRelation, services]);

  // نمنع عناصر بدون slug/title
  const safeList = (all || [])
    .filter((s) => {
      const A = s?.attributes ?? s;
      return A?.slug && A?.title;
    })
    .map((s) => s?.attributes ?? s);

  return (
    <section
      id="services"
      className="relative z-0 mx-auto w-[92%] max-w-7xl py-16"
      dir="rtl"
    >
      {/* خلفية متحركة بسيطة */}
      <motion.svg
        className="pointer-events-none absolute inset-0 -z-10"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        <path
          d="M0,200 C300,100 600,300 900,200 C1200,100 1500,300 1800,180"
          stroke="rgba(40,171,226,0.25)"
          strokeWidth="6"
          fill="none"
        />
        <path
          d="M0,260 C280,140 620,320 940,230 C1200,160 1500,260 1800,220"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="10"
          fill="none"
        />
      </motion.svg>

      {/* عنوان + زر */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-white md:text-3xl">
            {section_title}
          </h2>
          <p className="mt-1 text-white/70">{section_subtitle}</p>
        </div>

        {cta_link && (
          <Link href={cta_link}>
            <Button
              variant="outline"
              className="rounded-xl border-white/20 bg-white/10 text-white hover:bg-white/20"
            >
              {cta_text}
            </Button>
          </Link>
        )}
      </div>

      {/* شبكة البطاقات */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {safeList.map((svc, i) => (
          <ServiceAlertCard key={svc.id ?? svc.slug ?? i} service={svc} />
        ))}
      </div>
    </section>
  );
}
