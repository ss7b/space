// app/api/lang/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { lang } = await req.json();
  if (!['ar', 'en'].includes(lang)) {
    return NextResponse.json({ ok: false, error: 'invalid lang' }, { status: 400 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set('lang', lang, { path: '/', maxAge: 60 * 60 * 24 * 365 });
  return res;
}
