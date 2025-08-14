'use client';

import React from "react";
import Image from "next/image";
import SectionTitle from "@/components/common/SectionTitle";
import { brand } from "@/constants/brand";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

const logos = [
  { src: "/partners/cisco.png", alt: "CISCO" },
  { src: "/partners/aws.png", alt: "AWS" },
  // { src: "/partners/do.png", alt: "DigitalOcean" },
  { src: "/partners/microsoft.png", alt: "Microsoft" },
  { src: "/partners/google.png", alt: "Google" },
  { src: "/partners/oracle.png", alt: "Oracle" },
];

export default function Partners() {
  // لتأثير Marquee حقيقي: نجعل عرض السلايد تلقائي ونعطيه عرض ثابت عبر كلاس Tailwind
  // ونوقف المومنتوم حتى لا يسنّب بين السلايدات.
  return (
    <section
      id="partners"
      className="relative z-0 mx-auto w-[92%] max-w-7xl py-16"
      dir="rtl"
    >
      {/* خلفية */}
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
        loop={true}
        slidesPerView="auto"            // عرض تلقائي لكل سلايد
        freeMode={{ enabled: true, momentum: false }}
        allowTouchMove={false}          // يجعل الانزلاق ثابت كـ marquee (يمكنك تغييره لـ true لو تبي سحب يدوي)
        speed={6000}                    // كلما زاد الرقم كانت الحركة أبطأ وأكثر سلاسة
        autoplay={{
          delay: 0,                     // بدون فواصل — حركة مستمرة
          disableOnInteraction: false,
          pauseOnMouseEnter: true,      // يوقف عند الوقوف بالماوس
        }}
        spaceBetween={24}
        className="mt-8"
      >
        {logos.concat(logos).map((logo, i) => ( // نكرر لضمان السلاسة
          <SwiperSlide key={i} className="!w-40 sm:!w-44 md:!w-48 lg:!w-56">
            <div className="flex h-24 w-full items-center justify-center rounded-xl border border-white/10 bg-white/10 p-4">
              <Image
                src={logo.src}
                alt={logo.alt}
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
