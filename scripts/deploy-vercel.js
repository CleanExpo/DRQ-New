const { execSync } = require('child_process');

// MongoDB URI with escaped special characters
const MONGODB_URI = "mongodb+srv://phillmcgurk:CypWX7TNN1sE5pFh@disasterrecoveryqld.7obwi.mongodb.net/DisasterRecoveryQld";
const GOOGLE_MAPS_API_KEY = "AIzaSyDBAl2DLElY3-k2zcRivOr6U7bWxU13L14";
const SITE_URL = "https://www.disasterrecoveryqld.au";
const API_URL = "https://www.disasterrecoveryqld.au/api";

// Set environment variables
try {
  console.log('Setting environment variables...');
  execSync(`vercel env rm MONGODB_URI production -y || true`);
  execSync(`vercel env rm NEXT_PUBLIC_GOOGLE_MAPS_API_KEY production -y || true`);
  execSync(`vercel env rm NEXT_PUBLIC_SITE_URL production -y || true`);
  execSync(`vercel env rm NEXT_PUBLIC_API_URL production -y || true`);
  
  execSync(`echo "${MONGODB_URI}" | vercel env add MONGODB_URI production`);
  execSync(`echo "${GOOGLE_MAPS_API_KEY}" | vercel env add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY production`);
  execSync(`echo "${SITE_URL}" | vercel env add NEXT_PUBLIC_SITE_URL production`);
  execSync(`echo "${API_URL}" | vercel env add NEXT_PUBLIC_API_URL production`);
  
  console.log('Deploying to production...');
  execSync('vercel deploy --prod', { stdio: 'inherit' });
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
