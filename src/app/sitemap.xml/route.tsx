import { NextResponse } from 'next/server';
import { LOCATIONS } from '@/config/locations';
import { SERVICE_CONTENT } from '@/config/content';

export async function GET() {
  const baseUrl = 'https://disasterrecoveryqld.au';
  const currentDate = new Date().toISOString();

  const staticPages = [
    '',
    '/about',
    '/contact',
    '/locations',
    '/privacy',
    '/terms',
  ].map(page => ({
    url: `${baseUrl}${page}`,
    lastModified: currentDate,
    changeFreq: 'monthly',
    priority: page === '' ? 1.0 : 0.8,
  }));

  const locationPages = Object.keys(LOCATIONS).map(location => ({
    url: `${baseUrl}/locations/${location}`,
    lastModified: currentDate,
    changeFreq: 'weekly',
    priority: 0.9,
  }));

  const servicePages = Object.keys(SERVICE_CONTENT).map(service => ({
    url: `${baseUrl}/services/${service}`,
    lastModified: currentDate,
    changeFreq: 'weekly',
    priority: 0.9,
  }));

  const allPages = [...staticPages, ...locationPages, ...servicePages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages.map(page => `
    <url>
      <loc>${page.url}</loc>
      <lastmod>${page.lastModified}</lastmod>
      <changefreq>${page.changeFreq}</changefreq>
      <priority>${page.priority}</priority>
    </url>
  `).join('')}
</urlset>`.trim();

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
