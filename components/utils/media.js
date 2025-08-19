// utils/media.js
export function mediaUrl(url) {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  const base = process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/+$/, '') || '';
  return `${base}${url.startsWith('/') ? '' : '/'}${url}`;
}

/**
 * يقبل كائن ميديا من Strapi ويعيد {url, alt}
 * يدعم اختيار أفضل فورمات متاحة (large > medium > small > original)
 */
export function normalizeMedia(m) {
  if (!m) return null;
  const candidate =
    m?.formats?.large?.url ||
    m?.formats?.medium?.url ||
    m?.formats?.small?.url ||
    m?.url;
  const url = mediaUrl(candidate);
  return url ? { url, alt: m.alternativeText || m.name || '' } : null;
}
