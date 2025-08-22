"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { brand } from "@/constants/brand";
import { normalizeMedia } from "@/components/utils/media";
import { getIconByName } from "@/components/utils/iconMap";
import RichTextRenderer from "@/components/common/RichTextRenderer";
import useLang from '@/components/utils/useLang';

export default function ValuesGlassyBlock({ section_title, section_subtitle, image, items = [] }) {
  const img = normalizeMedia(image);
  const { isRTL, dir } = useLang();
  if (!section_title && !items?.length) return null;

  return (
    <section id="about-values" className="relative mx-auto w-[92%] max-w-7xl py-16" dir={dir}>
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-10 top-16 h-72 w-72 rounded-full blur-3xl" style={{ background: `radial-gradient(circle, ${brand.sky}33, transparent 60%)` }} />
      </div>

      <div className="grid items-center gap-8 lg:grid-cols-2">
        {img?.url && (
          <motion.div initial={{ opacity: 0, x: isRTL ? -24 : 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }} className={isRTL ? "order-2 lg:order-1" : "order-2 lg:order-2"}>
            <div className="relative mx-auto aspect-[4/3] w-full max-w-xl">
              <Image src={img.url} alt={img.alt || section_title || "about"} fill className="rounded-2xl object-cover shadow-2xl" sizes="(max-width:1024px) 100vw, 50vw" />
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/15" />
            </div>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, x: isRTL ? 24 : -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }} className={isRTL ? "text-right order-1 lg:order-2" : "text-left order-1 lg:order-1"}>
          {section_subtitle && (<p className="mb-2 text-xs font-semibold uppercase tracking-[.25em] text-white/60">{section_subtitle}</p>)}
          {section_title && (<h2 className="text-balance text-3xl font-extrabold leading-tight text-white md:text-4xl">{section_title}</h2>)}

          <div className="mt-6 space-y-4">
            {items.map((it, i) => {
              const Icon = getIconByName(it.icon_name);
              return (
                <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/8 px-2 py-1 text-white/90">
                    <span className="grid h-7 w-7 place-items-center rounded-lg" style={{ background: brand.sky, color: brand.navy }}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-bold">{it.title}</span>
                  </div>
                  {Array.isArray(it.desc) ? <RichTextRenderer blocks={it.desc} /> : it.desc ? <p className="text-sm leading-7 text-white/75">{it.desc}</p> : null}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
