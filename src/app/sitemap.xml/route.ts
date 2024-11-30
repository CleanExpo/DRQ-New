import { generateSitemapXml } from '@/lib/sitemap';

export async function GET() {
  return new Response(generateSitemapXml(), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    },
  });
}
