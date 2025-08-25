// components/layout/Footer.jsx
'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Printer } from 'lucide-react';
import { brand } from '@/constants/brand';
import HexGridBackground from '@/components/bg/HexGridBackground';
import { getIconByName } from '@/components/utils/iconMap';
import useLang from '@/components/utils/useLang';

// تصحيح الروابط لو بعضها بدون سلاش أو كانت mailto/tel/anchor
const fixHref = (u) => {
  if (!u) return '#';
  const s = String(u).trim();
  if (s.startsWith('http') || s.startsWith('mailto:') || s.startsWith('tel:') || s.startsWith('#')) return s;
  if (s.startsWith('/')) return s;
  return `/${s}`;
};

export default function Footer({ data = {} }) {
  const { lang, dir } = useLang();

  const {
    about_text = '',
    title = '',
    address = '',
    phone = '',
    fax = '',
    email = '',
    links = [],
    socials = [],
  } = data;

  const t = {
    about: lang === 'ar' ? 'عن الشركة' : 'About us',
    links: lang === 'ar' ? 'روابط' : 'Links',
    contact: lang === 'ar' ? 'معلومات التواصل' : 'Contact info',
    rights: lang === 'ar' ? 'جميع الحقوق محفوظة سدن القمم للتقنية.' : 'All rights reserved to Sadan Al-Qimam Technology Categgory.',
    logoAlt: lang === 'ar' ? 'شعار الشركة' : 'Company Logo',
  };

  const localLogoSrc = '/logo.png'; // نستخدم اللوجو المحلي (جودة أفضل)

  return (
    <footer
      id="contact"
      dir={dir}
      className="relative mt-10 border-t border-white/10 bg-white/0 backdrop-blur-lg"
    >
      <HexGridBackground
        className="pointer-events-none absolute inset-0 -z-10 h-full opacity-70"
        cell={100}
        stroke={brand.sky}
        strokeOpacity={0.1}
        dot={brand.navy}
        dotOpacity={0.9}
      />

      <div className="mx-auto w-[92%] max-w-7xl py-10 text-white">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* عن الشركة */}
          <div>
            {title && (
              <h3 className="text-lg font-bold text-white/90">{title}</h3>
            )}
            {about_text && (
              <p className="mt-2 max-w-prose leading-relaxed text-white/70">
                {about_text}
              </p>
            )}
            <div className="mt-4">
              <Link href="/">
                <img src={localLogoSrc} alt={t.logoAlt} className="h-20 w-auto" />
              </Link>
            </div>
          </div>

          {/* روابط */}
          <nav>
            <h3 className="text-lg font-bold text-white/90">{t.links}</h3>
            <ul className="mt-2 space-y-2 text-white/70">
              {links.map((l, i) => (
                <li key={l.id ?? `${l.label || 'link'}-${l.url || i}`}>
                  <Link href={fixHref(l.url)} className="transition hover:text-white">
                    {l.label || (lang === 'ar' ? 'رابط' : 'Link')}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* معلومات التواصل */}
          <div>
            <h3 className="text-lg font-bold text-white/90">{t.contact}</h3>
            <ul className="mt-3 space-y-3 text-white/70">
              {address && (
                <li className="flex items-start gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{address}</span>
                </li>
              )}
              {phone && (
                <li className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  <a href={`tel:${phone.replace(/\s+/g, '')}`}>{phone}</a>
                </li>
              )}
              {fax && (
                <li className="flex items-center gap-2">
                  <Printer className="h-5 w-5" />
                  <span>{fax}</span>
                </li>
              )}
              {email && (
                <li className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  <a href={`mailto:${email}`}>{email}</a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* سوشيال + الحقوق */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center">
          <div className="flex gap-3">
            {socials.map((s, i) => {
              // platform قد تكون "facebook" أو "Facebook" أو حتى أيقونة lucide
              const Icon = getIconByName(s.platform, 'Facebook'); // fallback
              return (
                <a
                  key={s.id ?? s.url ?? i}
                  href={fixHref(s.url)}
                  aria-label={s.platform || 'social'}
                  className="rounded-full border border-white/20 p-2 hover:bg-white/10"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon size={16} className="h-4 w-4" />
                </a>
              );
            })}
          </div>
          <p className="text-sm text-white/70">
            © {new Date().getFullYear()} {t.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
