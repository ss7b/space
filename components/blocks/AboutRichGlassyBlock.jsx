"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { normalizeMedia } from "@/components/utils/media";
import RichTextRenderer from "@/components/common/RichTextRenderer";
import useLang from '@/components/utils/useLang';

export default function AboutRichGlassyBlock({ title, content, image }) {
  const img = normalizeMedia(image);
  const isBlocks = Array.isArray(content);
  const { isRTL, dir } = useLang();

  return (
    <section id="about-rich" className="relative mx-auto w-[92%] max-w-7xl py-16" dir={dir}>
      <div className="grid items-center gap-8 lg:grid-cols-2">
        {img?.url && (
          <motion.div initial={{ opacity: 0, x: isRTL ? -24 : 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }} className={isRTL ? "order-2 lg:order-1" : "order-2 lg:order-2"}>
            <div className="relative mx-auto aspect-[16/10] w-full max-w-2xl">
              <Image src={img.url} alt={img.alt || title || "about"} fill className="rounded-2xl object-cover shadow-2xl" sizes="(max-width:1024px) 100vw, 50vw" priority />
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/15" />
            </div>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, x: isRTL ? 24 : -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }} className={isRTL ? "order-1 lg:order-2" : "order-1 lg:order-1"}>
          {title && <h2 className="text-balance text-3xl font-extrabold leading-tight text-white md:text-4xl">{title}</h2>}

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            {isBlocks ? <RichTextRenderer blocks={content} /> : <p className="text-white/80">{content || ""}</p>}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
