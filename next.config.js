/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['disasterrecoveryqld.au', 'api.disasterrecoveryqld.au'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
  experimental: {
    turbotrace: false
  },
  webpack: (config, { dev, isServer }) => {
    // Handle monitoring modules in client-side builds
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        newrelic: false,
        fs: false,
        net: false,
        tls: false,
        'newrelic/index.js': false,
      };

      // Ignore monitoring-related files
      config.module.rules.push({
        test: /\.(md|txt|LICENSE)$/,
        use: 'null-loader'
      });
    }

    // Optimize CSS
    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups.styles = {
        name: 'styles',
        test: /\.(css|scss)$/,
        chunks: 'all',
        enforce: true,
      };
    }

    return config;
  },
  // Configure headers for security and caching
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ];
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
  },
};

module.exports = nextConfig;
