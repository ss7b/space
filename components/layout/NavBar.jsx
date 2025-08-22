'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SkyToGlassButton } from '@/components/common/CustomButtons';
import { Menu } from 'lucide-react';
import { Sheet, SheetTrigger, SheetContent, SheetClose } from '@/components/ui/sheet';
import useLang from '@/components/utils/useLang';

export default function NavBar({ links = [] }) {
  const { lang, changeLang, dir } = useLang();

  const fallbackLinks = [
    { label: lang === 'ar' ? 'الرئيسية' : 'Home', href: '/#hero' },
    { label: lang === 'ar' ? 'من نحن' : 'About', href: '/#about-values' },
    { label: lang === 'ar' ? 'ما نقوم به' : 'What we do', href: '/#what' },
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

  // زرّي اللغة (ديسكتوب + موبايل)
  const LangButtons = ({ full = false }) => (
    <div className={`flex items-center gap-1 ${full ? 'w-full' : ''}`}>
      <Button
        variant="ghost"
        className={`px-3 py-1 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs ${
          lang === 'ar' ? 'ring-1 ring-white/40' : ''
        } ${full ? 'flex-1' : ''}`}
        onClick={() => changeLang('ar')}
        aria-label={lang === 'ar' ? 'أنت على العربية' : 'Switch to Arabic'}
      >
        AR
      </Button>
      <Button
        variant="ghost"
        className={`px-3 py-1 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs ${
          lang === 'en' ? 'ring-1 ring-white/40' : ''
        } ${full ? 'flex-1' : ''}`}
        onClick={() => changeLang('en')}
        aria-label={lang === 'en' ? 'You are on English' : 'التبديل للإنجليزية'}
      >
        EN
      </Button>
    </div>
  );

  return (
    <nav
      className="mx-auto mt-4 flex w-[92%] max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-lg"
      dir={dir}
    >
      <Link href="/" className="flex items-center gap-3">
        <img src="/logo.png" alt="Site Logo" className="h-16 w-auto" />
      </Link>

      {/* روابط الديسكتوب */}
      <div className="hidden items-center gap-6 md:flex">
        {navLinks.map((l, i) => renderLink(l, i))}
      </div>

      <div className="flex items-center gap-2">
        {/* زر تبديل اللغة - ديسكتوب */}
        <div className="hidden md:block">
          <LangButtons />
        </div>

        {/* زر تواصل معنا - ديسكتوب */}
        <div className="hidden md:block">
          <Link href="/contact">
            <SkyToGlassButton>{lang === 'ar' ? 'تواصل معنا' : 'Contact us'}</SkyToGlassButton>
          </Link>
        </div>

        {/* منيو الموبايل */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="md:hidden rounded-xl border border-white/10 bg-white/5 hover:bg-white/10"
              aria-label={lang === 'ar' ? 'فتح قائمة التنقل' : 'Open navigation menu'}
            >
              <Menu className="h-5 w-5 text-white" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-72 bg-white/5 backdrop-blur-lg border-l border-white/10 text-white"
            dir={dir}
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

              <div className="pt-1">
                <SheetClose asChild>
                  <Link href="/contact">
                    <SkyToGlassButton className="w-full">
                      {lang === 'ar' ? 'تواصل معنا' : 'Contact us'}
                    </SkyToGlassButton>
                  </Link>
                </SheetClose>
              </div>

              {/* زرّي اللغة - موبايل */}
              <div className="pt-2">
                <LangButtons full />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
