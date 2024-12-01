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
  }
};

module.exports = nextConfig;
