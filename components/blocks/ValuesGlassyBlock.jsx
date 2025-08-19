// components/blocks/ValuesGlassyBlock.jsx
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Shield, Target, Zap, CheckCircle2, Award, Sparkles } from "lucide-react";
import { brand } from "@/constants/brand";
import { normalizeMedia } from "@/components/utils/media";

// أيكونز اختيارية بالأسماء
const icons = { shield: Shield, target: Target, zap: Zap, check: CheckCircle2, award: Award, sparkles: Sparkles };
const IconByName = ({ name="check" }) => {
  const Ico = icons[name] || CheckCircle2;
  return <Ico className="h-5 w-5" />;
};

// ريندر بسيط لـ Strapi Blocks (فقرة/قائمة). لو عندك <RichTextRenderer/> استخدمه بدل هذي.
function RenderBlocks({ blocks }) {
  if (!Array.isArray(blocks)) return null;
  return (
    <div className="space-y-3 text-white/75">
      {blocks.map((node, idx) => {
        if (node.type === "paragraph")
          return <p key={idx}>{node.children?.map((c,i)=><span key={i} className={c.bold?'font-semibold':''}>{c.text}</span>)}</p>;
        if (node.type === "list" && node.format === "unordered")
          return (
            <ul key={idx} className="list-disc pr-6 space-y-1 marker:text-white/50">
              {node.children?.map((li,i)=><li key={i}>{li.children?.map((c,j)=><span key={j}>{c.text}</span>)}</li>)}
            </ul>
          );
        if (node.type === "list" && node.format === "ordered")
          return (
            <ol key={idx} className="list-decimal pr-6 space-y-1 marker:text-white/50">
              {node.children?.map((li,i)=><li key={i}>{li.children?.map((c,j)=><span key={j}>{c.text}</span>)}</li>)}
            </ol>
          );
        return null;
      })}
    </div>
  );
}

export default function ValuesGlassyBlock({ section_title, section_subtitle, image, items = [] }) {
  const img = normalizeMedia(image);
  if (!section_title && !items?.length) return null;

  return (
    <section id="about-values" className="relative mx-auto w-[92%] max-w-7xl py-16" dir="ltr">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute right-10 top-16 h-72 w-72 rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${brand.sky}33, transparent 60%)` }}
        />
      </div>

      <div className="grid items-center gap-8 lg:grid-cols-2">
        {/* الصورة يسار */}
        {img?.url && (
          <motion.div initial={{opacity:0,x:-24}} whileInView={{opacity:1,x:0}} viewport={{once:true,amount:.3}} transition={{duration:.7}} className="order-2 lg:order-1">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-xl">
              <Image src={img.url} alt={img.alt || section_title || "about"} fill className="rounded-2xl object-cover shadow-2xl" sizes="(max-width:1024px) 100vw, 50vw" />
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/15" />
            </div>
          </motion.div>
        )}

        {/* القيم يمين */}
        <motion.div initial={{opacity:0,x:24}} whileInView={{opacity:1,x:0}} viewport={{once:true,amount:.3}} transition={{duration:.7}} className="text-right order-1 lg:order-2">
          {section_subtitle && <p className="mb-2 text-xs font-semibold uppercase tracking-[.25em] text-white/60">{section_subtitle}</p>}
          {section_title && <h2 className="text-balance text-3xl font-extrabold leading-tight text-white md:text-4xl">{section_title}</h2>}

          <div className="mt-6 space-y-4">
            {items.map((it, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                <div className="mb-2 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/8 px-2 py-1 text-white/90">
                  <span className="grid h-7 w-7 place-items-center rounded-lg" style={{ background: brand.sky, color: brand.navy }}>
                    <IconByName name={it.icon_name} />
                  </span>
                  <span className="text-sm font-bold">{it.title}</span>
                </div>

                {/* desc يدعم Blocks */}
                {Array.isArray(it.desc) ? (
                  <RenderBlocks blocks={it.desc} />
                ) : it.desc ? (
                  <p className="text-sm leading-7 text-white/75">{it.desc}</p>
                ) : null}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
