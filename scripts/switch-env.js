const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Available environment types
const ENV_TYPES = ['production', 'development', 'staging'];

// Function to backup current .env file
function backupCurrentEnv() {
  if (fs.existsSync('.env')) {
    console.log('📦 Backing up current .env file...');
    try {
      execSync('npm run backup:env');
      console.log('✅ Current environment backed up');
    } catch (error) {
      console.warn('⚠️  Could not backup current environment:', error.message);
    }
  }
}

// Function to copy environment file
function copyEnvFile(sourceEnv) {
  const sourcePath = `.env.${sourceEnv}`;
  const targetPath = '.env';

  if (!fs.existsSync(sourcePath)) {
    console.error(`❌ Source environment file ${sourcePath} not found`);
    console.log(`\nAvailable environment files:`);
    fs.readdirSync('.')
      .filter(file => file.startsWith('.env.'))
      .forEach(file => console.log(`- ${file}`));
    process.exit(1);
  }

  try {
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`✅ Environment switched to ${sourceEnv}`);
    
    // Display the new environment variables (excluding sensitive data)
    console.log('\nNew environment configuration:');
    const envContent = fs.readFileSync(targetPath, 'utf8');
    envContent.split('\n').forEach(line => {
      if (line.trim() && !line.startsWith('#')) {
        const [key] = line.split('=');
        if (key.toLowerCase().includes('secret') || 
            key.toLowerCase().includes('password') || 
            key.toLowerCase().includes('token')) {
          console.log(`${key}=********`);
        } else {
          console.log(line);
        }
      }
    });

  } catch (error) {
    console.error('❌ Failed to switch environment:', error.message);
    process.exit(1);
  }
}

// Function to verify environment file
function verifyEnvFile() {
  console.log('\n🔍 Verifying environment configuration...');
  try {
    execSync('npm run verify', { stdio: 'inherit' });
    console.log('✅ Environment verification passed');
  } catch (error) {
    console.error('❌ Environment verification failed');
    process.exit(1);
  }
}

// Main function
function switchEnvironment() {
  const targetEnv = process.argv[2];

  if (!targetEnv || !ENV_TYPES.includes(targetEnv)) {
    console.error('❌ Please specify a valid environment type');
    console.log('\nUsage: node switch-env.js <environment>');
    console.log('\nAvailable environments:');
    ENV_TYPES.forEach(env => console.log(`- ${env}`));
    process.exit(1);
  }

  console.log(`🔄 Switching to ${targetEnv} environment...\n`);

  // 1. Backup current environment
  backupCurrentEnv();

  // 2. Copy new environment file
  copyEnvFile(targetEnv);

  // 3. Verify new environment
  verifyEnvFile();

  console.log('\n✨ Environment switch completed!');
  console.log('\nNext steps:');
  console.log('1. Review the environment configuration above');
  console.log('2. Run npm run dev to test locally');
  console.log('3. Or run npm run deploy to deploy with new environment');
}

// Run the script
switchEnvironment();
