const fs = require('fs');
const { execSync } = require('child_process');

// Required files and directories
const requiredPaths = {
  config: [
    'src/config/content.ts',
    '.env.development',
    'next.config.js',
    'package.json'
  ],
  content: [
    'src/app/en-AU/page.tsx',
    'src/app/en-AU/layout.tsx',
    'public/images'
  ],
  deployment: [
    '.github/workflows/deploy.yml',
    'scripts/deploy.js',
    'scripts/backup-content.js'
  ]
};

// Required npm packages
const requiredPackages = [
  'next',
  'react',
  'mongodb',
  'vercel'
];

console.log('🔍 Verifying project setup...\n');

// Check required files
console.log('Checking required files:');
Object.entries(requiredPaths).forEach(([category, paths]) => {
  console.log(`\n${category.toUpperCase()}:`);
  paths.forEach(path => {
    const exists = fs.existsSync(path);
    console.log(`${exists ? '✅' : '❌'} ${path}`);
    
    if (!exists) {
      console.error(`   Missing required file/directory: ${path}`);
    }
  });
});

// Check npm packages
console.log('\nChecking required packages:');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };
  
  requiredPackages.forEach(pkg => {
    const installed = allDeps[pkg];
    console.log(`${installed ? '✅' : '❌'} ${pkg}`);
    
    if (!installed) {
      console.error(`   Missing required package: ${pkg}`);
    }
  });
} catch (error) {
  console.error('❌ Error reading package.json:', error.message);
}

// Check git setup
console.log('\nChecking git setup:');
try {
  const remoteUrl = execSync('git remote get-url origin').toString().trim();
  console.log('✅ Git remote configured:', remoteUrl);
} catch (error) {
  console.error('❌ Git remote not configured');
}

// Check development server
console.log('\nChecking development server:');
try {
  execSync('npm run build');
  console.log('✅ Build successful');
} catch (error) {
  console.error('❌ Build failed:', error.message);
}

console.log('\n📋 Verification complete!');

// Check for any error messages
const output = execSync('git status').toString();
if (output.includes('nothing to commit')) {
  console.log('✅ Git working directory clean');
} else {
  console.log('⚠️  You have uncommitted changes');
}
