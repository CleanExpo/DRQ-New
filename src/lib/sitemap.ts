import { SERVICE_CONTENT } from '@/config/content';

interface Location {
  name: string;
  slug: string;
  state: string;
  postcode: string;
}

// Define service areas
const LOCATIONS: Location[] = [
  { name: 'Brisbane', slug: 'brisbane', state: 'QLD', postcode: '4000' },
  { name: 'Gold Coast', slug: 'gold-coast', state: 'QLD', postcode: '4217' },
  { name: 'Sunshine Coast', slug: 'sunshine-coast', state: 'QLD', postcode: '4557' },
  { name: 'Ipswich', slug: 'ipswich', state: 'QLD', postcode: '4305' },
  { name: 'Logan', slug: 'logan', state: 'QLD', postcode: '4114' },
  // Add more locations as needed
];

const SITE_URL = 'https://disasterrecoveryqld.au';

export function generateSitemapXml(): string {
  const urls: string[] = [];
  const currentDate = new Date().toISOString();

  // Add home page
  urls.push(`
    <url>
      <loc>${SITE_URL}/en-AU</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>
  `);

  // Add service pages
  Object.keys(SERVICE_CONTENT).forEach(serviceKey => {
    const serviceSlug = serviceKey.toLowerCase().replace(/_/g, '-');
    
    // Main service page
    urls.push(`
      <url>
        <loc>${SITE_URL}/en-AU/services/${serviceSlug}</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
      </url>
    `);

    // Location-specific service pages
    LOCATIONS.forEach(location => {
      urls.push(`
        <url>
          <loc>${SITE_URL}/en-AU/services/${serviceSlug}/${location.slug}</loc>
          <lastmod>${currentDate}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `);
    });
  });

  // Add location pages
  LOCATIONS.forEach(location => {
    urls.push(`
      <url>
        <loc>${SITE_URL}/en-AU/locations/${location.slug}</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
      </url>
    `);
  });

  // Add other important pages
  const otherPages = [
    { path: 'contact', priority: 0.8 },
    { path: 'about', priority: 0.6 },
    { path: 'blog', priority: 0.6 },
  ];

  otherPages.forEach(({ path, priority }) => {
    urls.push(`
      <url>
        <loc>${SITE_URL}/en-AU/${path}</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${priority}</priority>
      </url>
    `);
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.join('\n')}
</urlset>`;
}

// Generate a list of all URLs for the site
export function getAllUrls(): string[] {
  const urls: string[] = [];
  
  // Add home page
  urls.push('/en-AU');
  
  // Add service pages
  Object.keys(SERVICE_CONTENT).forEach(serviceKey => {
    const serviceSlug = serviceKey.toLowerCase().replace(/_/g, '-');
    urls.push(`/en-AU/services/${serviceSlug}`);
    
    // Add location-specific service pages
    LOCATIONS.forEach(location => {
      urls.push(`/en-AU/services/${serviceSlug}/${location.slug}`);
    });
  });
  
  // Add location pages
  LOCATIONS.forEach(location => {
    urls.push(`/en-AU/locations/${location.slug}`);
  });
  
  // Add other pages
  urls.push('/en-AU/contact');
  urls.push('/en-AU/about');
  urls.push('/en-AU/blog');
  
  return urls;
}
