"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { brand } from "@/constants/brand";
import TechBgSVG from "@/components/bg/TechBgSVG";
import useLang from '@/components/utils/useLang';

export default function HeroBlock({ title, subtitle = "", primary_cta_text, primary_cta_link, secondary_cta_text, secondary_cta_link, badge_text }) {
  const { dir } = useLang();

  return (
    <section id="hero" className="relative min-h-[100vh] flex items-center justify-center">
      <TechBgSVG />
      <div className="relative z-10 w-full">
        <div className="mx-auto mt-14 flex w-[92%] max-w-7xl flex-col items-center text-center" dir={dir}>
          <motion.h1 className="max-w-4xl text-balance text-3xl font-extrabold leading-[1.15] text-white md:text-5xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p className="mt-4 max-w-2xl text-pretty text-white/80 md:text-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }} dangerouslySetInnerHTML={{ __html: subtitle }} />
          )}

          <motion.div className="mt-8 flex flex-wrap items-center justify-center gap-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            {primary_cta_text && (
              <a href={primary_cta_link || "#"}>
                <Button size="lg" className="rounded-2xl px-7 text-base shadow-lg ring-1 ring-white/20" style={{ backgroundColor: brand.sky, color: brand.navy }}>
                  {primary_cta_text}
                </Button>
              </a>
            )}
            {secondary_cta_text && (
              <a href={secondary_cta_link || "#"}>
                <Button size="lg" variant="outline" className="rounded-2xl border-white/30 bg-white/10 px-7 text-base text-white hover:bg-white/20">
                  {secondary_cta_text}
                </Button>
              </a>
            )}
          </motion.div>

          {badge_text && (
            <motion.div className="mt-8 flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white/90 backdrop-blur" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              <Shield className="h-5 w-5" />
              <span className="text-sm">{badge_text}</span>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
