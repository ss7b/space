'use client';

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { HeartHandshake, Eye, Award } from "lucide-react";
import { motion } from "framer-motion";
import SectionTitle from "@/components/common/SectionTitle";
import { brand } from "@/constants/brand";

export default function Values() {
  const items = [
    { icon: HeartHandshake, title: "قيمنا", desc: "من أهم عوامل نجاحنا وتطور شركتنا هي تلك القيم الأساسية التي انطلقنا من خلالها في رسم وإدارة أعمالنا ومشاريعنا المتنامية في السوق، والمتمثلة في وضع حاجات ومتطلبات عملائنا وزبائننا." },
    { icon: Eye, title: "رؤيتنا", desc: "أن نكون المزوّد الموثوق المفضل لتقديم أفضل الحلول المناسبة وتصميمها بأسلوب يتناسب مع احتياجات ومتطلبات العملاء." },
    { icon: Award, title: "الجوائز", desc: "تم اختيار شركة النهل كشريك معتمد لدى سيسكو في المملكة لتصميم وتنفيذ كافة مشاريع الشبكات وتطبيقاتها عبر فريقها المتخصص." },
  ];

  return (
    <section id="values" className="relative z-0 mx-auto w-[92%] max-w-7xl py-16">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <svg className="absolute left-0 top-0 opacity-30" width="900" height="500" viewBox="0 0 900 500" fill="none">
          <defs>
            <pattern id="dotsV" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="1.2" cy="1.2" r="1.2" fill="rgba(255,255,255,0.5)" />
            </pattern>
          </defs>
        </svg>
        <motion.div
          className="absolute right-20 -top-10 h-64 w-64 rounded-full blur-2xl"
          style={{ background: `radial-gradient(circle, ${brand.sky}55, transparent 60%)` }}
          animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute left-10 bottom-0 h-72 w-72 rounded-full blur-2xl"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.15), transparent 60%)" }}
          animate={{ y: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity }}
        />
      </div>

      <SectionTitle title="قيمنا" subtitle="أساس نجاحنا" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" dir="rtl">
        {items.map((v, i) => (
          <Card
            key={i}
            className="group relative overflow-hidden rounded-2xl border-white/10 bg-white/[0.04] backdrop-blur transition hover:shadow-xl"
          >
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/10">
                <v.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white">{v.title}</h3>
              <p className="mt-2 text-sm text-white/70">{v.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
