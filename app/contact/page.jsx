// app/contact/page.jsx
import { getGlobal } from '@/lib/global';
import ContactPageClient from '@/components/pages/ContactPageClient';

export const metadata = {
  title: 'تواصل معنا - مؤسسة سدن القمة اللتقنية',
};

export default async function ContactPage() {
  const { footerData } = await getGlobal();

  const contact = {
    phone:   footerData.phone || '',
    email:   footerData.email || '',
    address: footerData.address || '',
    map:     footerData.map_iframe || '',
  };

  return <ContactPageClient contact={contact} />;
}
