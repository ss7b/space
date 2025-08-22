'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';

const COOKIE_NAME = 'lang';

function readCookie(name) {
  if (typeof document === 'undefined') return null;
  const m = document.cookie.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]+)'));
  return m?.[1] ? decodeURIComponent(m[1]) : null;
}

export default function useLang(defaultLang = 'ar') {
  const [lang, setLang] = useState(defaultLang);

  useEffect(() => {
    const c = readCookie(COOKIE_NAME);
    if (c) setLang(c);
  }, [defaultLang]);

  const isRTL = lang === 'ar';
  const dir = isRTL ? 'rtl' : 'ltr';

  const changeLang = useCallback(
    async (next) => {
      if (!['ar', 'en'].includes(next)) return;
      await fetch('/api/lang', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lang: next }),
      });
      // حدّث الكوكي محليًا للتوافق لحين إعادة التحميل
      document.cookie = `${COOKIE_NAME}=${encodeURIComponent(next)};path=/;max-age=${60 * 60 * 24 * 365}`;
      setLang(next);
      location.reload();
    },
    []
  );

  const toggleLang = useCallback(() => changeLang(lang === 'ar' ? 'en' : 'ar'), [lang, changeLang]);

  return { lang, isRTL, dir, changeLang, toggleLang, setLang };
}