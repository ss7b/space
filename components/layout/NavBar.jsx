'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SkyToGlassButton } from '@/components/common/CustomButtons';
import { Menu } from 'lucide-react';
import { Sheet, SheetTrigger, SheetContent, SheetClose } from '@/components/ui/sheet';

export default function NavBar({ links = [] }) {
  const fallbackLinks = [
    { label: 'الرئيسية', href: '/#hero' },
    { label: 'من نحن', href: '/#about-values' },
    { label: 'ما نقوم به', href: '/#what' },
    { label: 'شركاؤنا', href: '/#partners' },
  ];

  const navLinks = links.length ? links : fallbackLinks;

  const renderLink = (l, idx, extra = '') => {
    const target = l.newTab ? '_blank' : undefined;
    const rel = l.newTab ? 'noopener noreferrer' : undefined;
    return (
      <Link
        key={`${l.href}-${idx}`}
        href={l.href}
        target={target}
        rel={rel}
        className={`text-sm text-white/80 hover:text-white transition ${extra}`}
      >
        {l.label}
      </Link>
    );
  };

  return (
    <nav className="mx-auto mt-4 flex w-[92%] max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-lg">
      <Link href="/" className="flex items-center gap-3">
        <img src="/logo.png" alt="Site Logo" className="h-16 w-auto" />
      </Link>

      <div className="hidden items-center gap-6 md:flex">
        {navLinks.map((l, i) => renderLink(l, i))}
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden md:block">
          <Link href="/contact">
            <SkyToGlassButton>تواصل معنا</SkyToGlassButton>
          </Link>
        </div>

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
              <img src="/logo.png" alt="Site Logo" className="h-10 w-auto" />
            </div>

            <div className="mt-6 flex flex-col gap-4">
              {navLinks.map((l, i) => (
                <SheetClose asChild key={`${l.href}-m-${i}`}>
                  {renderLink(l, i, 'text-white/90')}
                </SheetClose>
              ))}

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
