"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, A11y } from "swiper/modules";
import RichTextRenderer from "@/components/common/RichTextRenderer";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import TechBgSVG from "../bg/TechBgSVG";
import { SkyToGlassButton } from "../common/CustomButtons";
import useLang from '@/components/utils/useLang';

const ease = [0.16, 1, 0.3, 1];

export default function HeroSliderBlock({ slides = [], autoplay = true, delay = 4500 }) {
  const { isRTL, dir } = useLang();
  if (!slides?.length) return null;

  return (
    <section id="hero-slider" className="relative flex min-h-[60vh] md:min-h-[70vh] lg:min-h-[100vh] items-center overflow-hidden">
      <div className="w-full">
        <TechBgSVG />
        <Swiper modules={[Autoplay, Navigation, Pagination, A11y]} dir={dir} loop speed={800} autoplay={autoplay ? { delay, disableOnInteraction: false } : false} navigation pagination={{ clickable: true }} className="!px-3">
          {slides.map((s, i) => {
            const src = s?.image?.url || null;

            return (
              <SwiperSlide key={i}>
                <div className="mx-auto grid w-[92%] max-w-7xl items-center gap-4 lg:gap-8 py-14 lg:py-20 lg:grid-cols-2">
                  {src && (
                    <motion.div initial={{ opacity: 0, x: isRTL ? -24 : 24, rotate: 0.15 }} animate={{ opacity: 1, x: 0, rotate: 0 }} transition={{ duration: 0.8, ease }} className={isRTL ? "hidden lg:block order-2 lg:order-1" : "hidden lg:block order-2 lg:order-2"}>
                      <div className="relative mx-auto aspect-[4/3] w-full max-w-xl">
                        <Image src={src} alt={s?.image?.alt || s?.title || "slide"} fill className="rounded-xl object-cover" sizes="(max-width: 1024px) 0px, 50vw" priority={i === 0} />
                      </div>
                    </motion.div>
                  )}

                  <motion.div initial={{ opacity: 0, x: isRTL ? 24 : -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease }} className={`order-1 text-center ${isRTL ? 'lg:text-right' : 'lg:text-left'}`} dir={dir}>
                    <h1 className="text-balance text-3xl font-extrabold leading-[1.15] text-white md:text-5xl">{s.title}</h1>

                    {s.description && (
                      Array.isArray(s.description)
                        ? <RichTextRenderer className="prose prose-invert mt-4 max-w-none md:prose-lg" blocks={s.description} />
                        : <div className="prose prose-invert mt-4 max-w-none text-white/80 md:prose-lg" dangerouslySetInnerHTML={{ __html: s.description }} />
                    )}

                    {s.cta_text && (
                      <div className="mt-7">
                        <a href={s.cta_link || "#"}><SkyToGlassButton>{s.cta_text}</SkyToGlassButton></a>
                      </div>
                    )}
                  </motion.div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
