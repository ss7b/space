'use client';

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/common/ServiceCard";
import { Layers, Rocket, Cpu } from "lucide-react";

export default function Services() {
  return (
    <section id="services" className="relative z-0 mx-auto w-[92%] max-w-7xl py-16" dir="rtl">
      {/* Section tech background */}
      <motion.svg
        className="pointer-events-none absolute inset-0 -z-10"
        viewBox="0 0 1440 400" preserveAspectRatio="none"
        initial={{ opacity: 0.5 }} animate={{ opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 8, repeat: Infinity }}
      >
        <path d="M0,200 C300,100 600,300 900,200 C1200,100 1500,300 1800,180" stroke="rgba(40,171,226,0.25)" strokeWidth="6" fill="none" />
        <path d="M0,260 C280,140 620,320 940,230 C1200,160 1500,260 1800,220" stroke="rgba(255,255,255,0.12)" strokeWidth="10" fill="none" />
      </motion.svg>

      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-white md:text-3xl">خدماتنا</h2>
          <p className="mt-1 text-white/70">حلول عملية مصممة لنجاح أعمالك</p>
        </div>
        <Button variant="outline" className="rounded-xl border-white/20 bg-white/10 text-white hover:bg-white/20">كل الخدمات</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ServiceCard title="خدمات عامة متكاملة" desc="جميع الخدمات العامة والمعاملات الحكومية بإدارة ذكية وسريعة." icon={Layers} />
        <ServiceCard title="حلول هوتسنيق" desc="إدارة ومتابعة الطلبات، إشعارات فورية، ولوحات تحكم حديثة." icon={Rocket} />
        <ServiceCard title="بنى تحتية وتقنيات سحابية" desc="استضافة آمنة، تكامل مع S3/Spaces، ومراقبة مستمرة." icon={Cpu} />
      </div>
    </section>
  );
}
