import { NextResponse } from 'next/server';

export async function GET() {
  const robotsTxt = `
User-agent: *
Allow: /
Disallow: /api/
Sitemap: https://disasterrecoveryqld.au/sitemap.xml
`.trim();

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
