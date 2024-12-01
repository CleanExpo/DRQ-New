const https = require('https');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  requiredEnvVars: [
    'NEXT_PUBLIC_API_URL',
    'NEXT_PUBLIC_SITE_URL',
    'MONGODB_URI',
    'NEXT_PUBLIC_GOOGLE_MAPS_API_KEY'
  ],
  criticalPaths: [
    '/',
    '/en-AU',
    '/en-AU/services/water-damage'
  ],
  expectedFiles: [
    'next.config.js',
    'package.json',
    'src/app/layout.tsx',
    'src/app/page.tsx'
  ]
};

// Verify environment variables
function checkEnvironmentVariables() {
  console.log('\n🔍 Checking environment variables...');
  const missingVars = config.requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:', missingVars.join(', '));
    return false;
  }
  
  console.log('✅ All required environment variables are set');
  return true;
}

// Check if required files exist
function checkRequiredFiles() {
  console.log('\n🔍 Checking required files...');
  const missingFiles = config.expectedFiles.filter(file => !fs.existsSync(path.join(process.cwd(), file)));
  
  if (missingFiles.length > 0) {
    console.error('❌ Missing required files:', missingFiles.join(', '));
    return false;
  }
  
  console.log('✅ All required files are present');
  return true;
}

// Verify build process
function verifyBuild() {
  console.log('\n🔨 Verifying build process...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Build completed successfully');
    return true;
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    return false;
  }
}

// Check TypeScript types
function checkTypes() {
  console.log('\n📝 Checking TypeScript types...');
  try {
    execSync('npx tsc --noEmit', { stdio: 'inherit' });
    console.log('✅ TypeScript checks passed');
    return true;
  } catch (error) {
    console.error('❌ TypeScript checks failed');
    return false;
  }
}

// Run ESLint
function runLinting() {
  console.log('\n🔍 Running ESLint...');
  try {
    execSync('npx eslint . --ext .ts,.tsx', { stdio: 'inherit' });
    console.log('✅ ESLint checks passed');
    return true;
  } catch (error) {
    console.error('❌ ESLint checks failed');
    return false;
  }
}

// Main verification function
async function verifyDeployment() {
  console.log('🚀 Starting deployment verification...');
  
  const checks = [
    { name: 'Environment Variables', fn: checkEnvironmentVariables },
    { name: 'Required Files', fn: checkRequiredFiles },
    { name: 'TypeScript', fn: checkTypes },
    { name: 'ESLint', fn: runLinting },
    { name: 'Build', fn: verifyBuild }
  ];

  let allPassed = true;
  
  for (const check of checks) {
    console.log(`\n📋 Running ${check.name} check...`);
    const passed = check.fn();
    if (!passed) {
      allPassed = false;
      console.error(`❌ ${check.name} check failed`);
    }
  }

  if (allPassed) {
    console.log('\n✅ All deployment checks passed successfully!');
    return true;
  } else {
    console.error('\n❌ Some deployment checks failed. Please fix the issues before deploying.');
    return false;
  }
}

// Run verification if called directly
if (require.main === module) {
  verifyDeployment().then(success => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = {
  verifyDeployment,
  checkEnvironmentVariables,
  checkRequiredFiles,
  verifyBuild,
  checkTypes,
  runLinting
};
