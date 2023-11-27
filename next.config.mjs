/** @type {import('next').NextConfig} */
import NextIntlPlugin from 'next-intl/plugin';

const withNextIntl = NextIntlPlugin('./i18n.tsx');
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['pykxxycnouynvrmhbbvs.supabase.co'],
    unoptimized: false,
  },
};

export default withNextIntl(nextConfig);
