'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { brand } from "@/constants/brand";
import { SkyToGlassButton, GlassToSkyButton }from "@/components/common/CustomButtons";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="mx-auto mt-4 flex w-[92%] max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-lg">
      <div className="flex items-center gap-3">
        {/* <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10">
          <Sparkles className="h-5 w-5" color={brand.white} />
        </div> */}
        {/* <span className="text-lg font-bold tracking-wider" style={{ color: brand.white }}>Hotsniq</span> */}
              <img src="/logo.png" alt="Nahil Logo" className="h-15 w-auto" />

      </div>
      <div className="hidden items-center gap-6 md:flex">
        <Link className="text-sm text-white/80 hover:text-white transition" href={"/#hero"}>الرئيسية</Link>
        {/* <a className="text-sm text-white/80 hover:text-white transition" href="#values">قيمنا</a> */}
        <Link className="text-sm text-white/80 hover:text-white transition" href={"/#about-values"}>من نحن</Link>
        <Link className="text-sm text-white/80 hover:text-white transition" href={"/#what"}>ما نقوم به</Link>
        <Link className="text-sm text-white/80 hover:text-white transition" href={"/#partners"}>شركاؤنا</Link>
      </div>
      <div className="flex items-center gap-2">
        {/* <Button className="rounded-2xl border border-white/20 bg-white/10 text-white hover:bg-white/20">دخول</Button> */}
        <Link href={"/contact"}>
          <SkyToGlassButton> تواصل معنا</SkyToGlassButton>
        </Link>
      </div>
    </nav>
  );
}
