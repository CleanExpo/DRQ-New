/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['disasterrecoveryqld.au'],
    unoptimized: true
  },
  typescript: {
    // Temporarily disable type checking during build
    ignoreBuildErrors: true
  },
  eslint: {
    // Temporarily disable linting during build
    ignoreDuringBuilds: true
  },
  // Handle environment-specific settings
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  },
  // Configure redirects
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en-AU',
        permanent: true,
      },
    ];
  }
};

module.exports = nextConfig;
