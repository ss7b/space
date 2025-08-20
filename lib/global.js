// lib/global.js
import { buildQuery, strapiFetch } from '@/lib/strapi';

function readPageSlug(pageRel) {
  if (pageRel?.slug) return pageRel.slug;
  const data = pageRel?.data;
  if (data?.attributes?.slug) return data.attributes.slug;
  return null;
}

export function mapHeaderLinks(header = []) {
  const items = Array.isArray(header) ? header : (header?.links || []);
  return (items || []).map((item) => {
    const label  = item?.label || '';
    const type   = item?.type || 'external';
    const newTab = !!item?.new_tab;
    let href = '#';

    if (type === 'page') {
      const slug = readPageSlug(item?.page);
      href = slug ? (slug === 'home' ? '/' : `/${slug}`) : '/';
    } else if (type === 'anchor') {
      const slug = readPageSlug(item?.page);
      const base = slug ? (slug === 'home' ? '/' : `/${slug}`) : '';
      const hash = item?.anchor_id ? `#${item.anchor_id}` : '';
      href = `${base}${hash}` || '#';
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

export async function getGlobal() {
  const query = buildQuery({
    populate: [
      'footer.logo',
      'footer.links',
      'footer.socials',
      'header.page',
      'favicon',
      'defaultSeo.metaImage',
    ],
  });

  const res = await strapiFetch('/api/global', {
    query,
    revalidate: 300,
    nextTags: ['global'],
  });

  const g = unwrapGlobal(res) || {};
  const headerLinks = mapHeaderLinks(g.header || []);

  const f = g.footer || {};
  const footerData = {
    about_text: f.about_text || '',
    address:    f.address || '',
    phone:      f.phone || '',
    fax:        f.fax || '',
    email:      f.email || '',
    logo:       f.logo ?? null,
    links:      Array.isArray(f.links) ? f.links : [],
    socials:    Array.isArray(f.socials) ? f.socials : [],
    map_iframe: f.map_iframe || '',
  };

  const seo = g.defaultSeo || null;
  const favicon = g.favicon || null;

  return { headerLinks, footerData, seo, favicon, raw: g };
}
