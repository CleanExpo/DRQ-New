/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'source.unsplash.com',
      'placehold.co',
      'images.unsplash.com'
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en-AU',
        permanent: true,
      }
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          }
        ],
      },
    ];
  },
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    NEXT_PUBLIC_API_URL: '/api',
    NEXT_PUBLIC_SITE_URL: '',
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    NEXT_PUBLIC_COMPANY_PHONE: process.env.NEXT_PUBLIC_COMPANY_PHONE,
    NEXT_PUBLIC_COMPANY_EMAIL: process.env.NEXT_PUBLIC_COMPANY_EMAIL,
    NEXT_PUBLIC_COMPANY_HOURS_WEEKDAY: process.env.NEXT_PUBLIC_COMPANY_HOURS_WEEKDAY,
    NEXT_PUBLIC_COMPANY_HOURS_WEEKEND: process.env.NEXT_PUBLIC_COMPANY_HOURS_WEEKEND,
    NEXT_PUBLIC_COMPANY_HOURS_EMERGENCY: process.env.NEXT_PUBLIC_COMPANY_HOURS_EMERGENCY,
    ENABLE_ANALYTICS: process.env.ENABLE_ANALYTICS,
    ENABLE_MONITORING: process.env.ENABLE_MONITORING,
    ENABLE_DEBUG: process.env.ENABLE_DEBUG,
    ENABLE_TEST_ACCOUNTS: process.env.ENABLE_TEST_ACCOUNTS,
    CACHE_TTL: process.env.CACHE_TTL,
    REVALIDATE_INTERVAL: process.env.REVALIDATE_INTERVAL
  }
}

module.exports = nextConfig;
