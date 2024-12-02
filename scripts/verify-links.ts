import * as fs from 'fs';
import * as path from 'path';

// Import types
type Location = {
  id: string;
  name: string;
  slug: string;
  description: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  services: string[];
  serviceArea: string[];
};

type ServiceContent = {
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  features: string[];
  process: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  image: string;
};

// Import configurations
const { LOCATIONS } = require('../src/config/locations') as { LOCATIONS: Record<string, Location> };
const { SERVICE_CONTENT } = require('../src/config/content') as { SERVICE_CONTENT: Record<string, ServiceContent> };

interface PageCheck {
  path: string;
  exists: boolean;
  hasLayout: boolean;
  hasError: boolean;
  hasLoading: boolean;
  hasNotFound: boolean;
  linkedFrom: string[];
}

function checkPage(pagePath: string, baseDir: string): PageCheck {
  const check: PageCheck = {
    path: pagePath,
    exists: false,
    hasLayout: false,
    hasError: false,
    hasLoading: false,
    hasNotFound: false,
    linkedFrom: []
  };

  // Check page existence
  const fullPath = path.join(baseDir, 'src/app', pagePath, 'page.tsx');
  check.exists = fs.existsSync(fullPath);

  // Check supporting files
  const dir = path.join(baseDir, 'src/app', pagePath);
  if (fs.existsSync(dir)) {
    check.hasLayout = fs.existsSync(path.join(dir, 'layout.tsx'));
    check.hasError = fs.existsSync(path.join(dir, 'error.tsx'));
    check.hasLoading = fs.existsSync(path.join(dir, 'loading.tsx'));
    check.hasNotFound = fs.existsSync(path.join(dir, 'not-found.tsx'));
  }

  return check;
}

function findLinks(content: string, currentPath: string): string[] {
  const links: string[] = [];
  const hrefRegex = /href=["'](\/[^"']+)["']/g;
  let match;

  while ((match = hrefRegex.exec(content)) !== null) {
    links.push(match[1]);
  }

  return links;
}

function scanForLinks(pagePath: string, baseDir: string): string[] {
  const fullPath = path.join(baseDir, 'src/app', pagePath, 'page.tsx');
  if (!fs.existsSync(fullPath)) return [];

  const content = fs.readFileSync(fullPath, 'utf8');
  return findLinks(content, pagePath);
}

async function verifyLinks() {
  console.log('🔍 Starting link verification...\n');
  const baseDir = process.cwd();
  const pages = new Map<string, PageCheck>();

  // Add static pages
  const staticPages = ['', 'about', 'contact', 'privacy', 'terms'];
  for (const page of staticPages) {
    const pagePath = page ? `/en-AU/${page}` : '/';
    pages.set(pagePath, checkPage(pagePath, baseDir));
  }

  // Add service pages
  Object.keys(SERVICE_CONTENT).forEach(service => {
    const servicePath = `/en-AU/services/${service.toLowerCase().replace(/_/g, '-')}`;
    pages.set(servicePath, checkPage(servicePath, baseDir));

    // Add service+location pages
    Object.keys(LOCATIONS).forEach(location => {
      const pagePath = `${servicePath}/${location}`;
      pages.set(pagePath, checkPage(pagePath, baseDir));
    });
  });

  // Add location pages
  Object.keys(LOCATIONS).forEach(location => {
    const pagePath = `/en-AU/locations/${location}`;
    pages.set(pagePath, checkPage(pagePath, baseDir));
  });

  // Scan for links
  pages.forEach((check, pagePath) => {
    if (check.exists) {
      const links = scanForLinks(pagePath, baseDir);
      links.forEach(link => {
        const targetPage = pages.get(link);
        if (targetPage) {
          targetPage.linkedFrom.push(pagePath);
        }
      });
    }
  });

  // Report results
  console.log('📊 Link Verification Results:\n');
  
  let missingPages = 0;
  let missingLayouts = 0;
  let missingError = 0;
  let missingLoading = 0;
  let missingNotFound = 0;
  let orphanedPages = 0;

  pages.forEach((check, pagePath) => {
    if (!check.exists) {
      console.error(`❌ Missing page: ${pagePath}`);
      missingPages++;
    }
    if (!check.hasLayout) {
      console.warn(`⚠️ Missing layout: ${pagePath}`);
      missingLayouts++;
    }
    if (!check.hasError) {
      console.warn(`⚠️ Missing error page: ${pagePath}`);
      missingError++;
    }
    if (!check.hasLoading) {
      console.warn(`⚠️ Missing loading page: ${pagePath}`);
      missingLoading++;
    }
    if (!check.hasNotFound) {
      console.warn(`⚠️ Missing not-found page: ${pagePath}`);
      missingNotFound++;
    }
    if (check.exists && check.linkedFrom.length === 0 && pagePath !== '/') {
      console.warn(`⚠️ Orphaned page (no incoming links): ${pagePath}`);
      orphanedPages++;
    }
  });

  console.log('\n📈 Summary:');
  console.log(`Total pages: ${pages.size}`);
  console.log(`Missing pages: ${missingPages}`);
  console.log(`Missing layouts: ${missingLayouts}`);
  console.log(`Missing error pages: ${missingError}`);
  console.log(`Missing loading pages: ${missingLoading}`);
  console.log(`Missing not-found pages: ${missingNotFound}`);
  console.log(`Orphaned pages: ${orphanedPages}`);

  if (missingPages > 0) {
    throw new Error('Missing pages detected');
  }

  console.log('\n✨ Link verification complete!');
}

verifyLinks().catch(console.error);
