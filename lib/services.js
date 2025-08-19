// lib/services.js
import { buildQuery, strapiFetch } from '@/lib/strapi';

export async function getServices({ pageSize = 100 } = {}) {
  const query = buildQuery({
    fields: ['title', 'slug', 'excerpt'],
    populate: { cover: true, seo: { populate: { metaImage: true } } },
    pagination: { pageSize },
    sort: ['createdAt:desc'],
  });
  const res = await strapiFetch('/api/services', { query, revalidate: 120, nextTags: ['services'] });
  return res?.data || [];
}

export async function getServiceBySlug(slug) {
  const query = buildQuery({
    filters: { slug: { $eq: slug } },
    fields: ['title', 'slug', 'excerpt'],
    populate: {
      cover: true,
      content: true,         // Blocks
      seo: { populate: { metaImage: true } },
    },
    pagination: { pageSize: 1 },
  });
  const res = await strapiFetch('/api/services', { query, revalidate: 120, nextTags: ['services'] });
  return res?.data?.[0] || null;
}
