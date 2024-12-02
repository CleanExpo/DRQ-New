const fs = require('fs');
const path = require('path');
const { LOCATIONS } = require('../src/config/locations');
const { SERVICE_CONTENT } = require('../src/config/content');
const { seoConfig } = require('../src/config/seo');

function verifyManifest() {
  console.log('\nVerifying manifest.json...');
  const manifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'manifest.json'), 'utf8'));
  
  const requiredFields = ['name', 'short_name', 'description', 'start_url', 'display', 'background_color', 'theme_color', 'icons'];
  const missingFields = requiredFields.filter(field => !manifest[field]);
  
  if (missingFields.length > 0) {
    console.error(`❌ Missing required fields in manifest.json: ${missingFields.join(', ')}`);
  } else {
    console.log('✅ Manifest.json contains all required fields');
  }
}

function verifyRobotsTxt() {
  console.log('\nVerifying robots.txt...');
  const robotsTxt = fs.readFileSync(path.join(process.cwd(), 'public', 'robots.txt'), 'utf8');
  
  const requiredDirectives = ['User-agent: *', 'Allow: /', 'Sitemap:', 'Disallow:'];
  const missingDirectives = requiredDirectives.filter(directive => !robotsTxt.includes(directive));
  
  if (missingDirectives.length > 0) {
    console.error(`❌ Missing required directives in robots.txt: ${missingDirectives.join(', ')}`);
  } else {
    console.log('✅ Robots.txt contains all required directives');
  }
}

function calculatePages() {
  console.log('\nCalculating total pages...');
  
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
}

function verifySEOConfig() {
  console.log('\nVerifying SEO configuration...');
  
  const requiredSEOFields = ['defaultTitle', 'titleTemplate', 'defaultDescription', 'siteUrl'];
  const missingSEOFields = requiredSEOFields.filter(field => !seoConfig[field]);
  
  if (missingSEOFields.length > 0) {
    console.error(`❌ Missing required fields in SEO config: ${missingSEOFields.join(', ')}`);
  } else {
    console.log('✅ SEO config contains all required fields');
  }
}

function verifyStructuredData() {
  console.log('\nVerifying structured data...');
  
  // Check service schema
  const sampleService = Object.keys(SERVICE_CONTENT)[0];
  const sampleLocation = Object.keys(LOCATIONS)[0];
  
  try {
    const schema = require('../src/config/seo').generateServiceSchema(sampleService, sampleLocation);
    const requiredSchemaFields = ['@context', '@type', 'name', 'provider', 'serviceType'];
    const missingSchemaFields = requiredSchemaFields.filter(field => !schema[field]);
    
    if (missingSchemaFields.length > 0) {
      console.error(`❌ Missing required fields in schema: ${missingSchemaFields.join(', ')}`);
    } else {
      console.log('✅ Schema contains all required fields');
    }
  } catch (error) {
    console.error('❌ Error generating schema:', error.message);
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
  console.error('\n❌ Error during verification:', error.message);
  process.exit(1);
}
