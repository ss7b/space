// app/contact/page.jsx
import { cookies } from 'next/headers';
import { getGlobal } from '@/lib/global';
import ContactPageClient from '@/components/pages/ContactPageClient';

export async function generateMetadata() {
  const locale = cookies().get('lang')?.value ?? 'ar';
  return {
    title: locale === 'ar' ? 'تواصل معنا — Hotsniq' : 'Contact us — Hotsniq',
  };
}

export default async function ContactPage() {
  const locale = cookies().get('lang')?.value ?? 'ar';

  let footerData = {
    phone: '',
    email: '',
    address: '',
    map_iframe: '',
  };

  try {
    const g = await getGlobal(locale);
    footerData = g?.footerData || footerData;
  } catch {
    // نخلي القيم الافتراضية إذا صار خطأ
  }

  const contact = {
    phone:   footerData.phone || '',
    email:   footerData.email || '',
    address: footerData.address || '',
    map:     footerData.map_iframe || '',
  };

  return (
    <main dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <ContactPageClient contact={contact} />
    </main>
  );
}
