'use client';

import React from "react";
import {
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Printer,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { brand } from "@/constants/brand";
import HexGridBackground from "@/components/bg/HexGridBackground";

export default function Footer() {
  return (
    <footer
      id="contact"
      dir="rtl"
      className="relative mt-10 border-t border-white/10 bg-white/0 backdrop-blur-lg"
    >
       {/* الخلفية السداسية مع الوميض */}
      <HexGridBackground
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        cell={100}                 // كبر/صغّر الخلية
        stroke={brand.sky}        // لون الخطوط
        strokeOpacity={0.10}      // شفافية الخطوط
        dot={brand.navy}          // لون النقاط
        dotOpacity={0.9}          // شفافية النقاط
      />
      <div className="mx-auto w-[92%] max-w-7xl py-10 text-white">
        {/* === الصفوف الثلاثة الرئيسية (Grid) === */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* 1) عن الشركة */}
          <div>
            <h3 className="text-lg font-bold text-white/90">عن الشركة</h3>
            <p className="mt-2 max-w-prose leading-relaxed text-white/70">
            نص تعريفي عن الشركة وخدماتها ورسالتها وقيمها، يقدم لمحة شاملة عن هويتنا وما يميزنا في السوق. نُركّز على بناء حلول عملية وعالية الاعتمادية تُعزّز كفاءة أعمال شركائنا.
            </p>

            <div className="mt-4 flex items-center gap-3">
              {/* <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/10">
                <Sparkles className="h-6 w-6" color={brand.white} />
              </div> */}
              {/*  لوجو الشركة */}
              <img src="/logo.png" alt="Nahil Logo" className="h-15 w-auto" />
            </div>
          </div>

          {/* 2) روابط التنقل */}
          <nav aria-label="روابط الموقع">
            <h3 className="text-lg font-bold text-white/90">روابط</h3>
            <ul className="mt-2 space-y-2 text-white/70">
              <li>
                <a href="#about" className="transition hover:text-white">
                  من نحن
                </a>
              </li>
              <li>
                <a href="#services" className="transition hover:text-white">
                  خدماتنا
                </a>
              </li>
              <li>
                <a href="#projects" className="transition hover:text-white">
                  مشاريعنا
                </a>
              </li>
              <li>
                <a href="#contact" className="transition hover:text-white">
                  اتصل بنا
                </a>
              </li>
            </ul>
          </nav>

          {/* 3) معلومات التواصل */}
          <div>
            <h3 className="text-lg font-bold text-white/90">معلومات التواصل</h3>
            <ul className="mt-3 space-y-3 text-white/70">
              <li className="flex items-start gap-2">
                <MapPin className="mt-1 h-5 w-5 flex-none" />
                <span>
                  العنوان: شارع الضباب، السليمانية. صندوق بريد - 59205، الرياض - 11525
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 flex-none" />
                <a href="tel:+966114645373" className="transition hover:text-white">
                  هاتف: +000000000000
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Printer className="h-5 w-5 flex-none" />
                <span>فاكس: +0000000000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 flex-none" />
                <a
                  href="mailto:info@nahil.com.sa"
                  className="transition hover:text-white"
                >
                  البريد الإلكتروني: info@sdn.com.sa
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* === الصف السفلي: السوشيال + الحقوق في نفس الصف === */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center">
          {/* أيقونات التواصل الاجتماعي */}
          <div className="flex gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="rounded-full border border-white/20 p-2 transition hover:bg-white/10"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="rounded-full border border-white/20 p-2 transition hover:bg-white/10"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="rounded-full border border-white/20 p-2 transition hover:bg-white/10"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="rounded-full border border-white/20 p-2 transition hover:bg-white/10"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>

          {/* الحقوق */}
          <p className="text-sm text-white/70">
            © {new Date().getFullYear()}  جميع الحقوق محفوظة سدن التقنية.
          </p>
        </div>
      </div>
    </footer>
  );
}
