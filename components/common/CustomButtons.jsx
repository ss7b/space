'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import { brand } from "@/constants/brand";

/* زر ملون ⟶ Glass */
export function SkyToGlassButton({ children, className = "", ...props }) {
  return (
    <Button
      {...props}
      style={{ "--sky": brand.sky, "--navy": brand.navy }}
      className={[
        "group relative overflow-hidden rounded-xl px-6 py-2 font-semibold text-sm cursor-pointer",
        "border border-white/10 transition-colors duration-300",
        // الحالة الافتراضية: ملون
        "bg-[var(--sky)] text-[color:var(--navy)]",
        // التحويل عند الهوفر: زجاجي
        "hover:bg-white/5 hover:text-white",
        className,
      ].join(" ")}
    >
      <span className="relative z-10">{children}</span>

      {/* طبقة زجاجية + ضبابية تظهر عند الـ hover */}
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-md"
        style={{
          background:
            "linear-gradient(120deg, rgba(40,171,226,0.25), transparent 30%, transparent 70%, rgba(255,255,255,0.18))",
        }}
      />
    </Button>
  );
}

/* زر Glass ⟶ ملون */
export function GlassToSkyButton({ children, className = "", ...props }) {
  return (
    <Button
      {...props}
      style={{ "--sky": brand.sky, "--navy": brand.navy }}
      className={[
        "group relative overflow-hidden rounded-xl px-6 py-2 font-semibold text-sm cursor-pointer",
        "border border-white/10 transition-colors duration-300",
        // الحالة الافتراضية: زجاجي
        "bg-white/10 text-white backdrop-blur",
        // التحويل عند الهوفر: ملون
        "hover:bg-[var(--sky)] hover:text-[color:var(--navy)]",
        className,
      ].join(" ")}
    >
      <span className="relative z-10">{children}</span>

      {/* لمعة خفيفة فوق الزجاج (تبقى خفيفة وتختفي عند التحوّل للّون) */}
      <span
        className="pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-300 group-hover:opacity-0"
        style={{
          background:
            "linear-gradient(120deg, rgba(255,255,255,0.12), transparent 40%, transparent 60%, rgba(255,255,255,0.1))",
        }}
      />
    </Button>
  );
}
