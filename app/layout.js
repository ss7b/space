// app/layout.js
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import { brand } from '@/constants/brand';
import { getGlobal } from '@/lib/global';
import GlobalBG from '@/components/layout/GlobalBG';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata = {
  title: 'مؤسسة سدن القمم للتقنية',
  description: 'مؤسسة سدن القمم للتقنية',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  icons: {
    icon: [
      { url: '/favicon.png' },               // افتراضي
      { url: '/favicon.png', sizes: '32x32' } // للمتصفحات التي تتحقق من المقاس
    ],
    shortcut: ['/favicon.png'],
    apple: [{ url: '/favicon.png', sizes: '180x180' }],
  },
};

export default async function RootLayout({ children }) {
  let headerLinks = [];
  let footerData = {};

  try {
    const g = await getGlobal();
    headerLinks = g.headerLinks || [];
    footerData  = g.footerData || {};
  } catch {
    headerLinks = [];
    footerData  = {};
  }

  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen w-full text-white`}
        style={{ backgroundColor: brand.navy }}
      >
        <GlobalBG />
        <div className="fixed inset-x-0 top-0 z-50">
          <NavBar links={headerLinks} />
        </div>

        <div>{children}</div>

        <Footer data={footerData} />
      </body>
    </html>
  );
}
