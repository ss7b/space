// /lib/strapi.js
import qs from 'qs';

const STRAPI_URL   = process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/+$/, '');
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export function buildQuery(obj) {
  return qs.stringify(obj, { encodeValuesOnly: true });
}

function toQueryString(q) {
  if (!q) return '';
  if (typeof q === 'string') return q;     // متوافق مع كودك الحالي
  return buildQuery(q);                    // أو نسمح بتمرير object
}

function appendLocale(qsStr, locale) {
  if (!locale) return qsStr;
  if (!qsStr) return `locale=${locale}`;
  if (qsStr.includes('locale=')) return qsStr; // لو ممرر مسبقاً
  return `${qsStr}&locale=${locale}`;
}

/**
 * استدعاء عام لـ Strapi
 * - query: string أو object
 * - locale: ar | en | all
 */
export async function strapiFetch(
  path,
  { query = '', locale, revalidate = 60, headers = {}, nextTags = [] } = {}
) {
  let q = toQueryString(query);
  q = appendLocale(q, locale);

  const url = `${STRAPI_URL}${path}${q ? `?${q}` : ''}`;

  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
      ...headers,
    },
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
