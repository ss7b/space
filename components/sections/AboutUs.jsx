'use client';

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Cpu, Rocket } from "lucide-react";
import SectionTitle from "@/components/common/SectionTitle";
import { brand } from "@/constants/brand";

export default function AboutUs() {
  return (
    <section id="about" className="relative z-0 mx-auto w-[92%] max-w-7xl py-16" dir="rtl">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.svg
          viewBox="0 0 1440 220" preserveAspectRatio="none"
          className="absolute inset-x-0 top-0 h-40 w-full opacity-60"
          initial={{ y: -8 }} animate={{ y: 0 }} transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
        >
          <path d="M0,80 C240,140 480,40 720,90 C960,140 1200,60 1440,110" stroke={brand.sky + "66"} strokeWidth="6" fill="none" />
        </motion.svg>
        <motion.svg
          viewBox="0 0 1440 220" preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 h-40 w-full opacity-30"
          initial={{ y: 8 }} animate={{ y: 0 }} transition={{ duration: 5, repeat: Infinity, repeatType: "mirror" }}
        >
          <path d="M0,140 C260,60 520,160 780,110 C1040,60 1300,140 1560,100" stroke="rgba(255,255,255,0.2)" strokeWidth="10" fill="none" />
        </motion.svg>
        <motion.div className="absolute left-16 top-10" animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity }}>
          <Cpu className="h-6 w-6" color="#fff" />
        </motion.div>
        <motion.div className="absolute right-20 bottom-10" animate={{ y: [0, 10, 0] }} transition={{ duration: 7, repeat: Infinity }}>
          <Rocket className="h-6 w-6" color={brand.sky} />
        </motion.div>
      </div>

      <SectionTitle title="من نحن" />
      <p className="mb-6 text-white/80 max-w-3xl mx-auto text-center">
        نص تعريفي عن الشركة وخدماتها ورسالتها وقيمها، يقدم لمحة شاملة عن هويتنا وما يميزنا في السوق.
      </p>
      <div className="flex justify-center">
        <Button className="rounded-xl px-6 py-2" style={{ backgroundColor: brand.sky, color: brand.navy }}>
          عرض المزيد
        </Button>
      </div>
    </section>
  );
}
