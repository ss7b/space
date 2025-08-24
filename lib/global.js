// /lib/global.js
import { strapiFetch } from '@/lib/strapi';

function readPageSlug(pageRel) {
  if (pageRel?.slug) return pageRel.slug;
  const data = pageRel?.data;
  if (data?.attributes?.slug) return data.attributes.slug;
  return null;
}

export function mapHeaderLinks(header = [], { langPrefix = '' } = {}) {
  const items = Array.isArray(header) ? header : (header?.links || []);
  return (items || []).map((item) => {
    const label  = item?.label || '';
    const type   = item?.type || 'external';
    const newTab = !!item?.new_tab;
    let href = '#';

    if (type === 'page') {
      const slug = readPageSlug(item?.page);
      const path = slug ? (slug === 'home' ? '/' : `/${slug}`) : '/';
      href = `${langPrefix}${path}`.replace('//', '/');
    } else if (type === 'anchor') {
      const slug = readPageSlug(item?.page);
      const base = slug ? (slug === 'home' ? '/' : `/${slug}`) : '';
      const hash = item?.anchor_id ? `#${item.anchor_id}` : '';
      href = `${langPrefix}${base}${hash}`.replace('//', '/');
    } else {
      href = item?.url || '#';
    }
    return { label, href, newTab };
  });
}

function unwrapGlobal(res) {
  if (res?.data && !res?.data?.attributes) return res.data;
  if (res?.data?.attributes) return res.data.attributes;
  return res || null;
}

export async function getGlobal(locale = 'ar') {
  const res = await strapiFetch('/api/global', {
    locale,
    query: {
      populate: [
        'footer.logo',
        'footer.links',
        'footer.socials',
        'header.page',
        'favicon',
      ],
    },
    revalidate: 300,
    nextTags: ['global'],
  });

  const g = unwrapGlobal(res) || {};
  const headerLinks = mapHeaderLinks(g.header || [], {
    langPrefix: '', // عدّلها إذا لاحقًا اعتمدت مسارات /ar و /en
  });

  const f = g.footer || {};
  const footerData = {
    about_text: f.about_text || '',
    title: f.title || '',
    address:    f.address || '',
    phone:      f.phone || '',
    fax:        f.fax || '',
    email:      f.email || '',
    logo:       f.logo ?? null,
    links:      Array.isArray(f.links) ? f.links : [],
    socials:    Array.isArray(f.socials) ? f.socials : [],
    map_iframe: f.map_iframe || '',
  };

  const favicon = g.favicon || null;

  return { headerLinks, footerData, favicon, raw: g };
}

export async function getPageBySlug(slug, locale = 'ar') {
  const json = await strapiFetch('/api/pages', {
    locale,
    query: {
      filters: { slug: { $eq: slug } },
      fields: ['title', 'slug'],
      populate: { blocks: { populate: '*' }, seo: { populate: '*' } },
      pagination: { pageSize: 1 },
    },
    revalidate: 60,
  });
  return json?.data?.[0] ?? null;
}
