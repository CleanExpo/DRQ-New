const fs = require('fs');
const path = require('path');

// Import types
interface Manifest {
  name: string;
  short_name: string;
  description: string;
  start_url: string;
  display: string;
  background_color: string;
  theme_color: string;
  icons: Array<{
    src: string;
    sizes: string;
    type: string;
    purpose?: string;
  }>;
  [key: string]: any;
}

interface Schema {
  '@context': string;
  '@type': string;
  name: string;
  provider: {
    '@type': string;
    name: string;
    telephone: string;
    url: string;
    areaServed: string;
    priceRange: string;
  };
  serviceType: string;
  areaServed: {
    '@type': string;
    name: string;
    '@context': string;
  };
  availableChannel: {
    '@type': string;
    serviceUrl: string;
    servicePhone: string;
    availableLanguage: {
      '@type': string;
      name: string;
    };
  };
  hasOfferCatalog: {
    '@type': string;
    name: string;
    itemListElement: Array<{
      '@type': string;
      itemOffered: {
        '@type': string;
        name: string;
      };
    }>;
  };
  [key: string]: any;
}

function verifyManifest() {
  console.log('\nVerifying manifest.json...');
  try {
    const manifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'manifest.json'), 'utf8')) as Manifest;
    
    const requiredFields = ['name', 'short_name', 'description', 'start_url', 'display', 'background_color', 'theme_color', 'icons'] as const;
    const missingFields = requiredFields.filter(field => !manifest[field]);
    
    if (missingFields.length > 0) {
      console.error(`❌ Missing required fields in manifest.json: ${missingFields.join(', ')}`);
    } else {
      console.log('✅ Manifest.json contains all required fields');
    }
  } catch (error) {
    console.error('❌ Error reading manifest.json:', error);
  }
}

function verifyRobotsTxt() {
  console.log('\nVerifying robots.txt...');
  try {
    const robotsTxt = fs.readFileSync(path.join(process.cwd(), 'public', 'robots.txt'), 'utf8');
    
    const requiredDirectives = ['User-agent: *', 'Allow: /', 'Sitemap:', 'Disallow:'] as const;
    const missingDirectives = requiredDirectives.filter(directive => !robotsTxt.includes(directive));
    
    if (missingDirectives.length > 0) {
      console.error(`❌ Missing required directives in robots.txt: ${missingDirectives.join(', ')}`);
    } else {
      console.log('✅ Robots.txt contains all required directives');
    }
  } catch (error) {
    console.error('❌ Error reading robots.txt:', error);
  }
}

function calculatePages() {
  console.log('\nCalculating total pages...');
  try {
    // Import configurations
    const { LOCATIONS } = require('../src/config/locations');
    const { SERVICE_CONTENT } = require('../src/config/content');
    
    const locations = Object.keys(LOCATIONS).length;
    const services = Object.keys(SERVICE_CONTENT).length;
    const totalPages = locations * services;
    
    console.log(`📊 Statistics:
    - Locations: ${locations}
    - Services: ${services}
    - Service+Location Pages: ${totalPages}
    - Static Pages: 5 (home, about, contact, privacy, terms)
    - Total Pages: ${totalPages + 5}
    `);
    
    if (totalPages + 5 > 4500) {
      console.error('❌ Total pages exceed the 4,500 limit');
    } else {
      console.log('✅ Total pages within limit');
    }
  } catch (error) {
    console.error('❌ Error calculating pages:', error);
  }
}

function verifySEOConfig() {
  console.log('\nVerifying SEO configuration...');
  try {
    const { seoConfig } = require('../src/config/seo');
    
    const requiredSEOFields = ['defaultTitle', 'titleTemplate', 'defaultDescription', 'siteUrl'] as const;
    type RequiredSEOField = typeof requiredSEOFields[number];
    
    const missingSEOFields = requiredSEOFields.filter((field: RequiredSEOField) => !(field in seoConfig));
    
    if (missingSEOFields.length > 0) {
      console.error(`❌ Missing required fields in SEO config: ${missingSEOFields.join(', ')}`);
    } else {
      console.log('✅ SEO config contains all required fields');
    }
  } catch (error) {
    console.error('❌ Error verifying SEO config:', error);
  }
}

function verifyStructuredData() {
  console.log('\nVerifying structured data...');
  try {
    const { SERVICE_CONTENT } = require('../src/config/content');
    const { LOCATIONS } = require('../src/config/locations');
    const { generateServiceSchema } = require('../src/config/seo');
    
    const sampleService = Object.keys(SERVICE_CONTENT)[0];
    const sampleLocation = Object.keys(LOCATIONS)[0];
    
    const schema = generateServiceSchema(sampleService, sampleLocation) as Schema;
    const requiredSchemaFields = ['@context', '@type', 'name', 'provider', 'serviceType'] as const;
    type RequiredSchemaField = typeof requiredSchemaFields[number];
    
    const missingSchemaFields = requiredSchemaFields.filter((field: RequiredSchemaField) => !(field in schema));
    
    if (missingSchemaFields.length > 0) {
      console.error(`❌ Missing required fields in schema: ${missingSchemaFields.join(', ')}`);
    } else {
      console.log('✅ Schema contains all required fields');
    }
  } catch (error) {
    console.error('❌ Error verifying structured data:', error);
  }
}

// Run all verifications
console.log('🔍 Starting SEO verification...\n');

try {
  verifyManifest();
  verifyRobotsTxt();
  calculatePages();
  verifySEOConfig();
  verifyStructuredData();
  
  console.log('\n✨ SEO verification complete!');
} catch (error) {
  console.error('\n❌ Error during verification:', error);
  process.exit(1);
}
