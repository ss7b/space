import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/layout/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'مؤسسة سدن القمم التقنية',
  description: 'مؤسسة سدن القمم التقنية',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${geistSans.variable} ${geistMono.variable}`} >
        <div className="fixed inset-x-0 top-0 z-50">
          <NavBar />
        </div>
        {children}
      </body>
    </html>
  );
}
