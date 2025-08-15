'use client';

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SkyToGlassButton } from "@/components/common/CustomButtons";
import { brand } from "@/constants/brand";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";

export default function NavBar() {
  return (
    <nav className="mx-auto mt-4 flex w-[92%] max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-lg">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3">
        <img src="/logo.png" alt="Nahil Logo" className="h-16 w-auto" />
      </Link>

      {/* Desktop links */}
      <div className="hidden items-center gap-6 md:flex">
        <Link className="text-sm text-white/80 hover:text-white transition" href="/#hero">الرئيسية</Link>
        <Link className="text-sm text-white/80 hover:text-white transition" href="/#about-values">من نحن</Link>
        <Link className="text-sm text-white/80 hover:text-white transition" href="/#what">ما نقوم به</Link>
        <Link className="text-sm text-white/80 hover:text-white transition" href="/#partners">شركاؤنا</Link>
      </div>

      {/* CTA + Mobile menu button */}
      <div className="flex items-center gap-2">
        {/* CTA desktop */}
        <div className="hidden md:block">
          <Link href="/contact">
            <SkyToGlassButton>تواصل معنا</SkyToGlassButton>
          </Link>
        </div>

        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="md:hidden rounded-xl border border-white/10 bg-white/5 hover:bg-white/10"
              aria-label="فتح قائمة التنقل"
            >
              <Menu className="h-5 w-5 text-white" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-72 bg-white/5 backdrop-blur-lg border-l border-white/10 text-white"
            dir="rtl"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <img src="/logo.png" alt="Nahil Logo" className="h-10 w-auto" />
              {/* <SheetClose asChild>
                <Button variant="ghost" className="rounded-xl hover:bg-white/10">
                  <X className="h-5 w-5 text-white" />
                </Button>
              </SheetClose> */}
            </div>

            <div className="mt-6 flex flex-col gap-4">
              <SheetClose asChild>
                <Link className="text-sm text-white/90 hover:text-white transition" href="/#hero">الرئيسية</Link>
              </SheetClose>
              <SheetClose asChild>
                <Link className="text-sm text-white/90 hover:text-white transition" href="/#about-values">من نحن</Link>
              </SheetClose>
              <SheetClose asChild>
                <Link className="text-sm text-white/90 hover:text-white transition" href="/#what">ما نقوم به</Link>
              </SheetClose>
              <SheetClose asChild>
                <Link className="text-sm text-white/90 hover:text-white transition" href="/#partners">شركاؤنا</Link>
              </SheetClose>

              <div className="pt-3">
                <SheetClose asChild>
                  <Link href="/contact">
                    <SkyToGlassButton className="w-full">تواصل معنا</SkyToGlassButton>
                  </Link>
                </SheetClose>
              </div>
            </div>
          </SheetContent>

        </Sheet>
      </div>
    </nav>
  );
}
