const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Running pre-deployment checks...\n');

try {
  // 1. Security Checks
  console.log('🔒 Running security checks...');
  try {
    execSync('npm audit', { stdio: 'inherit' });
    console.log('✅ Security audit passed');
  } catch (securityError) {
    console.error('❌ Security vulnerabilities found!');
    const proceed = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    proceed.question('Security vulnerabilities found. Continue anyway? (y/N) ', answer => {
      if (answer.toLowerCase() !== 'y') {
        console.log('Deployment cancelled.');
        process.exit(1);
      }
      proceed.close();
    });
  }

  // 2. Type Checking
  console.log('\n📝 Running type checks...');
  try {
    execSync('npm run type-check', { stdio: 'inherit' });
    console.log('✅ Type checking passed');
  } catch (typeError) {
    console.error('❌ Type checking failed:', typeError.message);
    process.exit(1);
  }

  // 3. Check for uncommitted changes
  console.log('\n📋 Checking git status...');
  const status = execSync('git status --porcelain').toString();
  if (status) {
    console.error('❌ You have uncommitted changes. Please commit or stash them first.');
    process.exit(1);
  }
  console.log('✅ Git working directory clean');

  // 4. Try to pull latest changes
  console.log('\n📥 Attempting to pull latest changes...');
  try {
    execSync('git pull origin main');
    console.log('✅ Latest changes pulled');
  } catch (pullError) {
    console.warn('⚠️  Could not pull latest changes. Continuing with local version...');
    console.warn('   If you need to sync with remote, please resolve any Git issues first.');
  }

  // 5. Environment Check
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

  // 6. Create backup
  console.log('\n💾 Creating backup...');
  try {
    execSync('npm run backup:all', { stdio: 'inherit' });
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

  // 7. Run build
  console.log('\n🏗️ Building project...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
  } catch (buildError) {
    console.error('❌ Build failed:', buildError.message);
    process.exit(1);
  }

  // 8. Run tests if they exist
  if (fs.existsSync('src/tests')) {
    console.log('\n🧪 Running tests...');
    try {
      execSync('npm test', { stdio: 'inherit' });
    } catch (testError) {
      console.error('❌ Tests failed:', testError.message);
      process.exit(1);
    }
  }

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
