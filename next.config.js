const withNextIntl = require('next-intl/plugin')();
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['pykxxycnouynvrmhbbvs.supabase.co'],
    unoptimized: true,
  },
};

module.exports = withNextIntl(nextConfig);
