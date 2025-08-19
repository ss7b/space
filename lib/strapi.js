// lib/strapi.js
import qs from 'qs';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/+$/, '');
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export function buildQuery(obj) {
  return qs.stringify(obj, { encodeValuesOnly: true });
}

export async function strapiFetch(path, { query = '', revalidate = 60, headers = {}, nextTags = [] } = {}) {
  const url = `${STRAPI_URL}${path}${query ? `?${query}` : ''}`;
  const res = await fetch(url, {
    headers: {
      'Accept': 'application/json',
      ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
      ...headers,
    },
    // في Next.js 15: فعّل ISR بالـ revalidate
    next: { revalidate, tags: nextTags },
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Strapi error ${res.status}: ${txt}`);
  }
  return res.json();
}

// جعل رابط أي ميديا مطلق
export function mediaUrl(url) {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url.startsWith('/') ? '' : '/'}${url}`;
}
