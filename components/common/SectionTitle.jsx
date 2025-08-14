'use client';

import React from "react";
import { brand } from "@/constants/brand";

export default function SectionTitle({ title, subtitle }) {
  return (
    <div className="mb-8 text-center" dir="rtl">
      {subtitle && (
        <p className="text-sm" style={{ color: brand.sky }}>{subtitle}</p>
      )}
      <h2 className="mt-1 text-2xl font-extrabold text-white md:text-3xl">{title}</h2>
    </div>
  );
}
