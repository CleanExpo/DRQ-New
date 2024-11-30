# Disaster Recovery Queensland Website

A Next.js-based website for Disaster Recovery Queensland, featuring dynamic service pages, location-based content, and SEO optimization.

## Features

- Dynamic page generation for services and locations
- SEO optimization with schema markup
- Performance monitoring and optimization
- Google Maps integration
- Image optimization with Unsplash
- PWA support
- Local SEO features

## Prerequisites

- Node.js 18.x or later
- npm 9.x or later
- Git

## Environment Variables

Create a `.env.development` and `.env.production` file with the following variables:

```env
NEXT_PUBLIC_GA_ID=your_google_analytics_id
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_google_maps_key
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_unsplash_key
NEXT_PUBLIC_SITE_URL=https://disasterrecoveryqld.au
NEXT_PUBLIC_API_URL=https://disasterrecoveryqld.au/api
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/drq-website.git
cd drq-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── en-AU/             # Australian English routes
│   │   ├── locations/     # Location pages
│   │   └── services/      # Service pages
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
├── config/               # Configuration files
├── lib/                  # Utility functions
└── types/               # TypeScript types
```

## SEO Features

- Dynamic sitemap generation
- robots.txt configuration
- Schema.org markup
- Meta tags optimization
- Core Web Vitals monitoring
- Location-based content

## Performance Optimization

- Image optimization
- Font optimization
- Code splitting
- Performance monitoring
- Lazy loading

## Deployment

1. Set up environment variables on your hosting platform
2. Push to the repository
3. Configure build settings:
```bash
npm run build
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests
4. Submit a pull request

## License

Proprietary - All rights reserved

## Support

For support, contact the development team at support@example.com
