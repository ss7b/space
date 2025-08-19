// components/blocks/PartnersBlock.jsx
'use client';
import React from "react";
import Image from "next/image";
import SectionTitle from "@/components/common/SectionTitle";
import { brand } from "@/constants/brand";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

export default function PartnersBlock({ logos = [] }) {
  // logos متوقعة: [{ url, alt }]
  const items = (Array.isArray(logos) ? logos : []).filter(l => l?.url);

  return (
    <section id="partners" className="relative z-0 mx-auto w-[92%] max-w-7xl py-16" dir="rtl">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${brand.sky}44, transparent 60%)` }}
        />
      </div>

      <SectionTitle title="شركاؤنا" />

      <Swiper
        modules={[Autoplay, FreeMode]}
        dir="rtl"
        loop={items.length > 1}              // ✅ لو في عنصرين وأكثر فعّل loop
        slidesPerView="auto"
        freeMode={{ enabled: true, momentum: false }}
        allowTouchMove={false}
        speed={6000}
        autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
        spaceBetween={24}
        className="mt-8"
      >
        {items.map((logo, i) => (
          <SwiperSlide key={`${logo.url}-${i}`} className="!w-40 sm:!w-44 md:!w-48 lg:!w-56">
            <div className="flex h-24 w-full items-center justify-center rounded-xl border border-white/10 bg-white/10 p-4">
              <Image
                src={logo.url}
                alt={logo.alt || 'logo'}
                width={160}
                height={64}
                className="h-12 w-auto object-contain"
                priority={i < 6}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
