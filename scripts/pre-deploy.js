const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Running pre-deployment checks...\n');

try {
  // 1. Check for uncommitted changes
  console.log('📋 Checking git status...');
  const status = execSync('git status --porcelain').toString();
  if (status) {
    console.error('❌ You have uncommitted changes. Please commit or stash them first.');
    process.exit(1);
  }
  console.log('✅ Git working directory clean');

  // 2. Try to pull latest changes (but don't fail if remote is not accessible)
  console.log('\n📥 Attempting to pull latest changes...');
  try {
    execSync('git pull origin main');
    console.log('✅ Latest changes pulled');
  } catch (pullError) {
    console.warn('⚠️  Could not pull latest changes. Continuing with local version...');
    console.warn('   If you need to sync with remote, please resolve any Git issues first.');
  }

  // 3. Run verification
  console.log('\n🔍 Running setup verification...');
  try {
    execSync('npm run verify', { stdio: 'inherit' });
  } catch (verifyError) {
    console.error('❌ Verification failed. Please fix the issues before deploying.');
    process.exit(1);
  }

  // 4. Create backup
  console.log('\n💾 Creating backup...');
  try {
    execSync('npm run backup', { stdio: 'inherit' });
  } catch (backupError) {
    console.error('❌ Backup failed:', backupError.message);
    const proceed = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    proceed.question('Do you want to continue without backup? (y/N) ', answer => {
      if (answer.toLowerCase() !== 'y') {
        console.log('Deployment cancelled.');
        process.exit(1);
      }
      proceed.close();
    });
  }

  // 5. Run build
  console.log('\n🏗️ Building project...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
  } catch (buildError) {
    console.error('❌ Build failed:', buildError.message);
    process.exit(1);
  }

  // 6. Run tests if they exist
  if (fs.existsSync('src/tests')) {
    console.log('\n🧪 Running tests...');
    try {
      execSync('npm test', { stdio: 'inherit' });
    } catch (testError) {
      console.error('❌ Tests failed:', testError.message);
      process.exit(1);
    }
  }

  // 7. Check environment variables
  console.log('\n🔐 Checking environment variables...');
  const requiredEnvVars = [
    'NEXT_PUBLIC_API_URL',
    'NEXT_PUBLIC_SITE_URL',
    'MONGODB_URI'
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:', missingVars.join(', '));
    console.log('Please check your .env.development or .env.production file.');
    process.exit(1);
  }
  console.log('✅ Environment variables verified');

  console.log('\n✨ Pre-deployment checks completed successfully!');
  console.log('\nNext steps:');
  console.log('1. Review the checks above');
  console.log('2. If everything looks good, proceed with:');
  console.log('   npm run deploy');
  console.log('\nOr use the safe deployment command:');
  console.log('   npm run safe-deploy');

} catch (error) {
  console.error('\n❌ Pre-deployment checks failed:', error.message);
  process.exit(1);
}
