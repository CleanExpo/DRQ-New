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

  // 2. Pull latest changes
  console.log('\n📥 Pulling latest changes...');
  execSync('git pull origin main');
  console.log('✅ Latest changes pulled');

  // 3. Run verification
  console.log('\n🔍 Running setup verification...');
  execSync('npm run verify', { stdio: 'inherit' });

  // 4. Create backup
  console.log('\n💾 Creating backup...');
  execSync('npm run backup', { stdio: 'inherit' });

  // 5. Run build
  console.log('\n🏗️ Building project...');
  execSync('npm run build', { stdio: 'inherit' });

  // 6. Run tests if they exist
  if (fs.existsSync('src/tests')) {
    console.log('\n🧪 Running tests...');
    execSync('npm test', { stdio: 'inherit' });
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
    process.exit(1);
  }
  console.log('✅ Environment variables verified');

  console.log('\n✨ Pre-deployment checks completed successfully!');
  console.log('You can now proceed with deployment using:');
  console.log('npm run deploy');

} catch (error) {
  console.error('\n❌ Pre-deployment checks failed:', error.message);
  process.exit(1);
}
