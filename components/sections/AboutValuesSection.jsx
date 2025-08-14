"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/common/SectionTitle";
import { HeartHandshake, Eye, Award, Rocket, Cpu, CheckCircle2 } from "lucide-react";
import { brand } from "@/constants/brand";
import ServiceCard from "../common/ServiceCard";

/* ====== Motion Variants ====== */
const easeOutExpo = [0.16, 1, 0.3, 1];

const textContainer = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: easeOutExpo, staggerChildren: 0.18 },
  },
};

const textItem = {
  hidden: { opacity: 0, y: 24 },
  show: { 
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOutExpo } // كانت 0.5
  },
};

const imageWrap = {
  hidden: { opacity: 0, x: -48, rotate: 0.25 },
  show: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { duration: 1, ease: easeOutExpo } // كانت 0.7
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8, // كانت 0.5
      ease: easeOutExpo,
      delay: 0.12 * (Number(i) || 0) // كانت 0.06
    },
  }),
};

export default function AboutValuesSection() {
  const values = [
    {
      icon: HeartHandshake,
      title: "قيمنا",
      desc:
        "من أهم عوامل نجاحنا وتطور شركتنا هي تلك القيم الأساسية التي انطلقنا من خلالها في رسم وإدارة أعمالنا ومشاريعنا المتنامية في السوق، والمتمثلة في وضع حاجات ومتطلبات عملائنا وزبائننا.",
    },
    {
      icon: Eye,
      title: "رؤيتنا",
      desc:
        "أن نكون المزوّد الموثوق المفضل لتقديم أفضل الحلول المناسبة وتصميمها بأسلوب يتناسب مع احتياجات ومتطلبات العملاء.",
    },
    {
      icon: Award,
      title: "الاعتمادات والجوائز",
      desc:
        "تم اختيار شركة النهل كشريك معتمد لدى سيسكو في المملكة لتصميم وتنفيذ مشاريع الشبكات عبر فريق متخصص.",
    },
  ];

  const mission = [
    "تقديم حلول تقنية آمنة ومرنة",
    "تصميم أنظمة تُحاكي احتياجات العميل",
    "سرعة التنفيذ مع جودة عالية",
    "دعم فني مستمر وتطوير دوري",
  ];

  return (
    <section id="about-values" className="relative z-0 mx-auto w-[92%] max-w-7xl py-20" dir="rtl">

      <SectionTitle title="من نحن وقيمنا" subtitle="أساس نجاحنا وتميّزنا" />

      {/* ========= TOP PLAIN AREA ========= */}
      <div className="grid items-center gap-10 md:grid-cols-2">
        {/* نصوص اليمين: تطلع من تحت لفوق بتتابع */}
        <motion.div
          variants={textContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.div className="mb-4 flex items-center gap-2 text-white/90" variants={textItem}>
            <Rocket className="h-5 w-5" color={brand.sky} />
            <h3 className="text-2xl font-extrabold tracking-tight text-white">عن الشركة</h3>
          </motion.div>

          <motion.p className="text-white/80" variants={textItem}>
            نص تعريفي عن الشركة وخدماتها ورسالتها وقيمها، يقدم لمحة شاملة عن هويتنا وما يميزنا في السوق.
            نُركّز على بناء حلول عملية وعالية الاعتمادية تُعزّز كفاءة أعمال شركائنا.
          </motion.p>

          <motion.div className="mt-6 grid gap-3" variants={textItem}>
            <div className="text-white/90 font-semibold">مهمّتنا</div>
            <ul className="space-y-2">
              {mission.map((m, i) => (
                <motion.li key={i} className="flex items-start gap-2 text-white/80" variants={textItem}>
                  <CheckCircle2 className="mt-0.5 h-5 w-5" color={brand.sky} />
                  <span>{m}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="mt-6" variants={textItem}>
            <Button className="rounded-xl px-6 py-2" style={{ backgroundColor: brand.sky, color: brand.navy }}>
               عرض المزيد
            </Button>
          </motion.div>
        </motion.div>

        {/* صورة الجانب: تدخل من الجنب (يسار الديسكتوب) */}
        <motion.div
          className="relative hidden md:block"
          variants={imageWrap}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          <div className="relative mx-auto md:max-w-xl lg:max-w-xl">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/about.png"
                alt="عن الشركة"
                fill
                className="object-contain drop-shadow-xl"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ========= VALUES (   القيم) ========= */}
      <div className="relative z-10 mt-3">
        <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
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
              <ServiceCard title={v.title} desc={v.desc} icon={v.icon} />
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
