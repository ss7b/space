"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import useLang from '@/components/utils/useLang';

export default function HeroSimpleBlock({ title, background_image, minHeight = "70vh", overlay = true }) {
  const bg = background_image?.url;
  const { dir } = useLang();

  return (
    <section id="hero-simple" className="relative flex items-center justify-center text-center" style={{ minHeight }}>
      {bg && (
        <div className="absolute inset-0 -z-10">
          <Image src={bg} alt={background_image?.alt || title || "hero"} fill className="object-cover" priority sizes="100vw" />
        </div>
      )}
      {overlay && <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/45 to-black/55" />}

      <div className="mx-auto w-[92%] max-w-7xl" dir={dir}>
        <motion.h1 className="mx-auto max-w-4xl text-balance text-3xl font-extrabold leading-tight text-white md:text-5xl" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {title}
        </motion.h1>
      </div>
    </section>
  );
}
