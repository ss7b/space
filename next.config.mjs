/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // لو شغّال على Vercel، حط الدومين في بيئة المشروع
      { protocol: 'https', hostname: process.env.NEXT_PUBLIC_STRAPI_DOMAIN },
      { protocol: 'http',  hostname: 'localhost', port: '1337' },
    ],
  },
};
export default nextConfig;
