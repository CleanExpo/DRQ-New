const { execSync } = require('child_process');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

async function deploy() {
  try {
    console.log('🚀 Starting deployment process...\n');

    // Run pre-deployment checks
    console.log('Running pre-deployment checks...');
    execSync('npm run verify:all', { stdio: 'inherit' });
    console.log('✅ Pre-deployment checks passed\n');

    // Create backup
    console.log('Creating backup...');
    execSync('npm run backup:all', { stdio: 'inherit' });
    console.log('✅ Backup created\n');

    // Build the application
    console.log('Building application...');
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Build completed\n');

    // Deploy to Vercel
    console.log('Deploying to Vercel...');
    const deployCommand = process.env.NODE_ENV === 'production'
      ? 'vercel --prod'
      : 'vercel';
    execSync(deployCommand, { stdio: 'inherit' });

    // Run post-deployment verification
    console.log('\nRunning post-deployment verification...');
    execSync('npm run monitor:health', { stdio: 'inherit' });
    console.log('✅ Post-deployment verification passed\n');

    console.log('🎉 Deployment completed successfully!');
    console.log(`
Site URLs:
- Production: https://disasterrecoveryqld.au
- Preview: https://${process.env.VERCEL_URL}
    `);

  } catch (error) {
    console.error('\n❌ Deployment failed:', error.message);
    process.exit(1);
  }
}

// Run deployment
deploy();
