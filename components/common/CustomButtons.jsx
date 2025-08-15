'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import { brand } from "@/constants/brand";

/* زر ملون يتحول لـ Glass */
export function SkyToGlassButton({ children, className = "", ...props }) {
  return (
    <Button
      {...props}
      className={`cursor-pointer group relative overflow-hidden rounded-xl px-6 py-2 font-semibold text-sm border border-white/10 transition ${className}`}
      style={{ backgroundColor: brand.sky, color: brand.navy }}
    >
      <span className="relative z-10">{children}</span>
      {/* طبقة glass عند hover */}
      <span
        className="absolute inset-0 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:backdrop-blur-md"
        style={{
          background: `linear-gradient(120deg, rgba(40,171,226,0.25), transparent 30%, transparent 70%, rgba(255,255,255,0.2))`,
        }}
      />
      {/* شفافية الخلفية عند hover */}
      <style jsx>{`
        .group:hover {
          background-color: rgba(255, 255, 255, 0.05) !important;
          color: white !important;
        }
      `}</style>
    </Button>
  );
}

/* زر Glass يتحول لـ ملون */
export function GlassToSkyButton({ children, className = "", ...props }) {
  return (
    <Button
      {...props}
      className={`cursor-pointer group relative overflow-hidden rounded-xl px-6 py-2 font-semibold text-sm border border-white/10 bg-white/10 text-white transition ${className}`}
      style={{
        backgroundColor: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(8px)",
      }}
    >
      <span className="relative z-10 transition group-hover:text-[var(--navy)]">
        {children}
      </span>
      <span
        className="absolute inset-0 opacity-0 transition-all duration-300 group-hover:opacity-100"
        style={{
          backgroundColor: brand.sky,
        }}
      />
    </Button>
  );
}
