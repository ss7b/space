'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Rocket, Cpu, Shield, Eye } from 'lucide-react';
import SectionTitle from '@/components/common/SectionTitle';

export default function WhatWeDo() {
  const steps = useMemo(
    () => [
      { icon: Users,  title: 'العمل الجماعي', desc: 'بوحده يمكن القيام بالقليل، معًا يمكننا القيام بالكثير.' },
      { icon: Rocket, title: 'الحلول',       desc: 'لدينا الفنيين المؤهلين مهنيًا مع التكنولوجيا المتطورة.' },
      { icon: Cpu,    title: 'الدعم',        desc: 'لدينا الموهبة والخبرة والأدوات اللازمة لدعم أهداف عملائنا.' },
      { icon: Shield, title: 'النجاح',       desc: 'مفتاح النجاح هو أخذ المخاطر المحسوبة للمساعدة في نمو عملك.' },
      { icon: Eye,    title: 'رؤيتنا',       desc: 'أن نكون المزوّد الموثوق المفضل لتقديم أفضل الحلول المناسبة.' },
    ],
    []
  );

  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const [points, setPoints] = useState([]);

  // ثوابت موضع الأيقونة والبطاقة
  const ICON_SIZE = 56;   // قطر دائرة الأيقونة
  const CARD_GAP  = 30;   // بعد البطاقة أسفل الخط

  useEffect(() => {
    const svg = svgRef.current;
    const path = pathRef.current;
    if (!svg || !path) return;

    const vbW = 1440;
    const vbH = 320;

    const calcPoints = () => {
      const scaleX = svg.clientWidth / vbW;
      const scaleY = svg.clientHeight / vbH;
      const L = path.getTotalLength();
      const margin = 0.06; // يترك 6% من الطول في البداية والنهاية
      const out = [];

      for (let i = 0; i < steps.length; i++) {
        const t = margin + ((i + 0.5) / steps.length) * (1 - 2 * margin); // منتصف كل جزء
        const p = path.getPointAtLength(L * t);
        out.push({ x: p.x * scaleX, y: p.y * scaleY });
      }
      setPoints(out);
    };

    calcPoints();
    window.addEventListener('resize', calcPoints);
    return () => window.removeEventListener('resize', calcPoints);
  }, [steps.length]);

  const ease = [0.16, 1, 0.3, 1];

  return (
    <section id="what" className="relative mx-auto w-[92%] max-w-7xl py-16" dir="rtl">
      <SectionTitle style={{ marginBottom: '0' }} title="ما نقوم به" subtitle="خدماتنا" />

      {/* قللنا المسافة بين العنوان والتايملاين */}
      <div className="relative mx-auto h-[380px] w-full overflow-visible">
        <motion.svg
          ref={svgRef}
          className="absolute inset-0"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          {/* ====== التعريفات لعمل الدخان ====== */}
          <defs>
            {/* تلاشي على الأطراف */}
            <linearGradient id="fadeStroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="12%" stopColor="white" stopOpacity="0.35" />
              <stop offset="88%" stopColor="white" stopOpacity="0.35" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>

            {/* تشوّه + Blur خفيف ليبدو مثل الدخان */}
            <filter id="smokeFilter" x="-10%" y="-40%" width="120%" height="180%">
              <feTurbulence type="fractalNoise" baseFrequency="0.008" numOctaves="2" seed="7" />
              <feDisplacementMap in="SourceGraphic" scale="6" />
              <feGaussianBlur stdDeviation="1.4" />
            </filter>

            {/* Blur أوسع لطبقة خلفية */}
            <filter id="softBlur" x="-20%" y="-40%" width="140%" height="180%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>

          {/* مسار أساسي (مخفي) نستخدمه لحساب النقاط */}
          <motion.path
            ref={pathRef}
            d="M20,240 C240,120 480,280 720,200 C960,120 1200,240 1420,180"
            fill="none"
            stroke="transparent"
          />

          {/* طبقة دخان خلفية عريضة وناعمة */}
          <motion.path
            d="M20,240 C240,120 480,280 720,200 C960,120 1200,240 1420,180"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="16"
            strokeLinecap="round"
            filter="url(#softBlur)"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.8, ease }}
          />

          {/* طبقة دخان رئيسية مع تلاشي وتشوه بسيط */}
          <motion.path
            d="M20,240 C240,120 480,280 720,200 C960,120 1200,240 1420,180"
            fill="none"
            stroke="url(#fadeStroke)"
            strokeWidth="6"
            strokeLinecap="round"
            filter="url(#smokeFilter)"
            strokeDasharray="3 18"
            initial={{ pathLength: 0, strokeDashoffset: 60 }}
            whileInView={{ pathLength: 1, strokeDashoffset: 0 }}
            transition={{ duration: 2.2, ease }}
          />

          {/* نقاط دخان خفيفة متناثرة فوق المسار */}
          {[...Array(18)].map((_, i) => (
            <motion.circle
              key={i}
              r="2.6"
              fill="white"
              opacity="0.28"
              filter="url(#softBlur)"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ opacity: [0.1, 0.35, 0.1] }}
              transition={{ duration: 2.2, ease, delay: i * 0.05, repeat: Infinity, repeatType: 'mirror' }}
            >
              <animateMotion
                dur="7s"
                repeatCount="indefinite"
                rotate="auto"
                keyPoints="0;1"
                keyTimes="0;1"
                path="M20,240 C240,120 480,280 720,200 C960,120 1200,240 1420,180"
                begin={`${i * 0.15}s`}
              />
            </motion.circle>
          ))}

          {/* الصاروخ في نهاية المسار */}
          <motion.g
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <g transform="translate(1380,160)">
              <motion.div
                initial={{ y: 0, scale: 1 }}
                animate={{ y: [-5, 5, -5], scale: [1, 1.08, 1] }}
                transition={{
                  duration: 0.8,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'mirror'
                }}
                style={{ width: 0, height: 0 }}
              />
              <Rocket width={45} height={45} color="rgba(255,255,255,0.95)" />
            </g>
          </motion.g>
        </motion.svg>

        {points.map((p, i) => {
          const S = steps[i];
          const Icon = S.icon;

          return (
            <div key={i}>
              {/* الأيقونة في وسط الدخان */}
              <motion.div
                className="pointer-events-none absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 backdrop-blur-xl"
                style={{
                  left: p.x,
                  top: p.y,
                  width: ICON_SIZE,
                  height: ICON_SIZE,
                }}
                initial={{ opacity: 0, y: 18, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.12 * i, ease }}
                whileHover={{ y: -6 }}
              >
                <Icon className="h-6 w-6 text-white" />
              </motion.div>

              {/* التفاصيل أسفل المسار */}
              <motion.div
                className="absolute w-[220px] -translate-x-1/2"
                style={{ left: p.x, top: p.y + CARD_GAP }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.8, delay: 0.12 * i + 0.05, ease }}
              >
                <div className="px-4 py-4 text-center">
                  <h3 className="text-base font-bold text-white">{S.title}</h3>
                  <p className="mt-1 text-[13px] leading-6 text-white/70">{S.desc}</p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
