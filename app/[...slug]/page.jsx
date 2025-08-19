// app/[...slug]/page.jsx
import { notFound } from 'next/navigation';
import { strapiFetch, buildQuery } from '@/lib/strapi';
import { seoToNextMetadata } from '@/lib/seo';
import BlockRenderer from '@/components/blocks/BlockRenderer';

export async function getPageByPath(path) {
  const DZ_FIELD        = 'blocks';
  const HERO_UID        = 'section.hero-section';
  const HERO_SLIDER_UID = 'section.hero-slider';
  const HERO_SIMPLE_UID = 'section.hero-simple';
  const WHAT_UID        = 'section.what-we-do';
  const ABOUT_UID       = 'section.about-values';
  const VALUES_UID      = 'section.values-glassy';
  const ABOUT_RICH_UID  = 'section.about-rich-glassy';
  const PARTNERS_UID    = 'section.partners-marquee';
  const SERVICES_UID = 'section.services-grid';

  const query = buildQuery({
    filters: { slug: { $eq: path || 'home' } },
    fields: ['title', 'slug'],
    populate: {
      seo: { populate: { metaImage: true } },
      [DZ_FIELD]: {
        on: {
          [HERO_UID]: {
            fields: [
              'title','subtitle',
              'primary_cta_text','primary_cta_link',
              'secondary_cta_text','secondary_cta_link',
              'badge_text',
            ],
          },
          [HERO_SLIDER_UID]: {
            populate: { slides: { populate: { image: true } } },
          },
          [HERO_SIMPLE_UID]: { populate: { background_image: true } },

          [WHAT_UID]: {
            fields: ['section_title','section_subtitle'],
            populate: { steps: { fields: ['icon_name','title','desc'] } },
          },

          [ABOUT_UID]: {
            fields: [
              'section_title','section_subtitle',
              'about_title','about_paragraph',
              'button_text','button_link',
            ],
            populate: { right_image: true, values: true },
          },

          // ✅ القيم الزجاجية: الصورة + عناصر فيها desc (Rich Text Blocks)
          [VALUES_UID]: {
            fields: ['section_title','section_subtitle'],
            populate: {
              image: true,
              items: { fields: ['icon_name','title','desc'] },
            },
          },

          // ✅ عن الشركة (غلاسّي): العنوان + المحتوى + الصورة
          // لو خزّنت المحتوى كـ Blocks استخدم 'content'
          // ولو حولته إلى HTML احفظه بحقل content_html
          [ABOUT_UID]: {
            fields: [
              'section_title','section_subtitle',
              'about_title','about_paragraph',
              'button_text','button_link',
            ],
            populate: {
              right_image: { fields: ['url','alternativeText'] },
              values: { fields: ['icon_name','title','desc'] }, // لو desc=Blocks يكفي كذا
              mission_items: { fields: ['text'] },
            },
          },

          [PARTNERS_UID]: {
            populate: { partners: { populate: { logo: true } } },
          },
          [SERVICES_UID]: {
            fields: ['section_title','section_subtitle','cta_text','cta_link','show_all','limit'],
            populate: {
              services: {
                fields: ['title','slug','excerpt', 'content'],
                populate: { cover: { fields: ['url','alternativeText'] } },
              },
            },
          },
        },
      },
    },
    pagination: { pageSize: 1 },
  });

  const data = await strapiFetch('/api/pages', { query, revalidate: 60, nextTags: ['pages'] });
  const item = data?.data?.[0];
  if (!item) return null;
  const { title, slug, seo, [DZ_FIELD]: blocks } = item;
  return { title, slug, seo, blocks };
}

// ✅ Next 15: انتظر params قبل الاستخدام
export async function generateMetadata({ params }) {
  const p = await params;
  const segs = p?.slug;
  const slug = Array.isArray(segs) ? segs.join('/') : 'home';
  const page = await getPageByPath(slug);
  if (!page) return {};
  return seoToNextMetadata({ page, siteName: 'Hotsniq' });
}

export default async function Page({ params }) {
  const p = await params;
  const segs = p?.slug;
  const slug = Array.isArray(segs) ? segs.join('/') : 'home';
  const page = await getPageByPath(slug);
  if (!page) return notFound();

  return (
    <main dir="rtl">
      <BlockRenderer blocks={page.blocks || []} />
    </main>
  );
}

export async function generateStaticParams() {
  const q = buildQuery({ fields: ['slug'], pagination: { pageSize: 200 } });
  const data = await strapiFetch('/api/pages', { query: q, revalidate: 60 });
  const slugs = (data?.data || []).map(p => p.slug).filter(Boolean);
  return slugs.filter(s => s !== 'home').map(s => ({ slug: s.split('/') }));
}
