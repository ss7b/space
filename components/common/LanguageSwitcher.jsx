// components/LanguageSwitcher.jsx
'use client';

export default function LanguageSwitcher() {
  async function setLang(lang) {
    await fetch('/api/lang', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lang }),
    });
    location.reload();
  }

  return (
    <div className="flex gap-2">
      <button onClick={() => setLang('ar')} className="px-3 py-1 rounded bg-white/10">العربية</button>
      <button onClick={() => setLang('en')} className="px-3 py-1 rounded bg-white/10">English</button>
    </div>
  );
}
