/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['disasterrecoveryqld.au'],
    unoptimized: true
  },
  typescript: {
    // Re-enable strict type checking
    ignoreBuildErrors: false
  },
  eslint: {
    // Re-enable strict linting
    ignoreDuringBuilds: false
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

// Export configuration without Sentry for now
module.exports = nextConfig;
