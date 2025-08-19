'use client';

import React from 'react';
import Link from 'next/link';
import {
  MapPin, Phone, Mail, Printer,
  Facebook, Twitter, Instagram, Linkedin,
} from 'lucide-react';
import { brand } from '@/constants/brand';
import HexGridBackground from '@/components/bg/HexGridBackground';

const iconMap = { facebook: Facebook, twitter: Twitter, instagram: Instagram, linkedin: Linkedin };

// تصحيح الروابط لو بعضها بدون سلاش
const fixHref = (u) => {
  if (!u) return '#';
  if (u.startsWith('http')) return u;
  if (u.startsWith('/')) return u;
  return `/${u}`;
};

export default function Footer({ data = {} }) {
  const {
    about_text = '',
    address = '',
    phone = '',
    fax = '',
    email = '',
    links = [],
    socials = [],
  } = data;

  const localLogoSrc = '/logo.png'; // نستخدم اللوجو المحلي (جودة أفضل)

  return (
    <footer id="contact" dir="rtl" className="relative mt-10 border-t border-white/10 bg-white/0 backdrop-blur-lg">
      <HexGridBackground
        className="pointer-events-none absolute inset-0 -z-10 opacity-70 h-full"
        cell={100}
        stroke={brand.sky}
        strokeOpacity={0.10}
        dot={brand.navy}
        dotOpacity={0.9}
      />

      <div className="mx-auto w-[92%] max-w-7xl py-10 text-white">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* عن الشركة */}
          <div>
            <h3 className="text-lg font-bold text-white/90">عن الشركة</h3>
            {about_text && (
              <p className="mt-2 max-w-prose leading-relaxed text-white/70">{about_text}</p>
            )}
            <div className="mt-4">
              <Link href="/">
                <img src={localLogoSrc} alt="Company Logo" className="h-20 w-auto" />
              </Link>
            </div>
          </div>

          {/* روابط */}
          <nav>
            <h3 className="text-lg font-bold text-white/90">روابط</h3>
            <ul className="mt-2 space-y-2 text-white/70">
              {links.map((l) => (
                <li key={l.id ?? `${l.label}-${l.url}`}>
                  <Link href={fixHref(l.url)} className="transition hover:text-white">
                    {l.label || 'رابط'}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* معلومات التواصل */}
          <div>
            <h3 className="text-lg font-bold text-white/90">معلومات التواصل</h3>
            <ul className="mt-3 space-y-3 text-white/70">
              {address && <li className="flex items-start gap-2"><MapPin className="h-5 w-5" />{address}</li>}
              {phone &&   <li className="flex items-center gap-2"><Phone className="h-5 w-5" /><a href={`tel:${phone}`}>{phone}</a></li>}
              {fax &&     <li className="flex items-center gap-2"><Printer className="h-5 w-5" />{fax}</li>}
              {email &&   <li className="flex items-center gap-2"><Mail className="h-5 w-5" /><a href={`mailto:${email}`}>{email}</a></li>}
            </ul>
          </div>
        </div>

        {/* سوشيال + الحقوق */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center">
          <div className="flex gap-3">
            {socials.map((s) => {
              const Icon = iconMap[s.platform] || Facebook;
              return (
                <a
                  key={s.id ?? s.url}
                  href={fixHref(s.url)}
                  aria-label={s.platform || 'social'}
                  className="rounded-full border border-white/20 p-2 hover:bg-white/10"
                  target="_blank" rel="noopener noreferrer"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
          <p className="text-sm text-white/70">© {new Date().getFullYear()} جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
