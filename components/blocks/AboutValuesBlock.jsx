"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/common/SectionTitle";
import { brand } from "@/constants/brand";
import { getIconByName } from "@/components/utils/iconMap";
import RichTextRenderer from "../common/RichTextRenderer";
import ServiceCard from "@/components/common/ServiceCard";


const easeOutExpo = [0.16, 1, 0.3, 1];
const textContainer = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: easeOutExpo, staggerChildren: 0.18 } } };
const textItem = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOutExpo } } };
const imageWrap = { hidden: { opacity: 0, x: -48, rotate: 0.25 }, show: { opacity: 1, x: 0, rotate: 0, transition: { duration: 1, ease: easeOutExpo } } };
const cardItem = { hidden: { opacity: 0, y: 22, scale: 0.98 }, show: (i = 0) => ({ opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: easeOutExpo, delay: 0.12 * (Number(i) || 0) } }) };

export default function AboutValuesBlock({
  section_title,
  section_subtitle,
  about_title,
  about_paragraph,
  mission_items = [], // [{ text }]
  button_text,
  button_link,
  right_image,
  values = [], // [{ icon_name, title, desc }]
}) {
  return (
    <section id="about-values" className="relative z-0 mx-auto w-[92%] max-w-7xl py-20" dir="rtl">
      <SectionTitle title={section_title} subtitle={section_subtitle} />

      <div className="grid items-center gap-10 md:grid-cols-2">
        <motion.div variants={textContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }}>
          <motion.div className="mb-4 flex items-center gap-2 text-white/90" variants={textItem}>
            {/* عنوان فرعي أيقوني */}
            {/* لو ودك أيقونة ديناميكية هنا، أضف حقل icon_name للقسم نفسه */}
            <h3 className="text-2xl font-extrabold tracking-tight text-white">{about_title}</h3>
          </motion.div>

          
          {Array.isArray(about_paragraph) && about_paragraph.length > 0 && (
            <motion.div className="text-white/80" variants={textItem}>
              <RichTextRenderer blocks={about_paragraph} />
            </motion.div>
          )}

          {!!mission_items?.length && (
            <motion.div className="mt-6 grid gap-3" variants={textItem}>
              <div className="text-white/90 font-semibold">مهمّتنا</div>
              <ul className="space-y-2">
                {mission_items.map((m, i) => (
                  <motion.li key={i} className="flex items-start gap-2 text-white/80" variants={textItem}>
                    {/* استخدام أيقونة ثابتة مثل CheckCircle2 أو أضف icon_name لكل عنصر */}
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/20 text-xs">✓</span>
                    <span>{m.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {button_text && (
            <motion.div className="mt-6" variants={textItem}>
              <a href={button_link || "#"}>
                <Button className="rounded-xl px-6 py-2" style={{ backgroundColor: brand.sky, color: brand.navy }}>
                  {button_text}
                </Button>
              </a>
            </motion.div>
          )}
        </motion.div>

        {right_image?.url && (
          <motion.div className="relative hidden md:block" variants={imageWrap} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }}>
            <div className="relative mx-auto md:max-w-xl lg:max-w-xl">
              <div className="relative aspect-[4/3] w-full">
                <Image src={right_image.url} alt={right_image.alternativeText || ""} fill className="object-contain drop-shadow-xl" priority />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {!!values?.length && (
        <div className="relative z-10 mt-3">
          <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => {
              const Icon = getIconByName(v.icon_name);
              return (
                <motion.div
                  key={i}
                  custom={i}
                  variants={cardItem}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="h-full"
                >
                  <ServiceCard
                    title={v.title}
                    desc={v.desc}
                    icon={Icon}
                    iconStyle={{ color: brand.sky }}
                  />
                </motion.div>
              );
            })}

          </div>
        </div>
      )}
    </section>
  );
}