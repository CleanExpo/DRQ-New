const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Running comprehensive deployment verification...\n');

const checks = {
  environments: {
    files: [
      '.env.development',
      '.env.production',
      '.env.staging',
      '.env.example'
    ],
    commands: [
      'npm run verify:env'
    ]
  },
  deployment: {
    files: [
      '.github/workflows/deploy.yml',
      '.github/workflows/security.yml',
      'scripts/deploy.js',
      'scripts/pre-deploy.js'
    ],
    commands: [
      'npm run verify'
    ]
  },
  backup: {
    files: [
      'scripts/backup-content.js',
      'scripts/backup-env.js'
    ],
    commands: [
      'npm run env:backup',
      'npm run backup'
    ]
  },
  build: {
    files: [
      'next.config.js',
      'tsconfig.json',
      'package.json'
    ],
    commands: [
      'npm run type-check',
      'npm run build'
    ]
  },
  security: {
    files: [
      'SECURITY.md',
      '.github/workflows/security.yml'
    ],
    commands: [
      'npm audit'
    ]
  },
  documentation: {
    files: [
      'README.md',
      'ENVIRONMENTS.md',
      'BUILD-GUIDE.md',
      'SECURITY.md',
      'QUICK-START.md',
      'ENV-MANAGEMENT.md'
    ]
  }
};

async function runChecks() {
  const results = {
    success: [],
    warnings: [],
    errors: []
  };

  // Check Git status
  console.log('📋 Checking Git status...');
  try {
    const status = execSync('git status --porcelain').toString();
    if (status) {
      results.warnings.push('Uncommitted changes found');
    } else {
      results.success.push('Git working directory clean');
    }
  } catch (error) {
    results.errors.push(`Git check failed: ${error.message}`);
  }

  // Check each category
  for (const [category, config] of Object.entries(checks)) {
    console.log(`\n🔍 Checking ${category}...`);

    // Check required files
    if (config.files) {
      for (const file of config.files) {
        if (fs.existsSync(file)) {
          results.success.push(`Found ${file}`);
        } else {
          results.errors.push(`Missing required file: ${file}`);
        }
      }
    }

    // Run commands
    if (config.commands) {
      for (const command of config.commands) {
        try {
          console.log(`\nRunning: ${command}`);
          execSync(command, { stdio: 'inherit' });
          results.success.push(`Command succeeded: ${command}`);
        } catch (error) {
          results.errors.push(`Command failed: ${command}`);
        }
      }
    }
  }

  // Check environment consistency
  console.log('\n🔍 Checking environment consistency...');
  try {
    const envFiles = ['.env.development', '.env.production', '.env.staging'];
    const envVars = new Set();
    
    envFiles.forEach(file => {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        content.split('\n').forEach(line => {
          const match = line.match(/^([^=]+)=/);
          if (match) {
            envVars.add(match[1].trim());
          }
        });
      }
    });

    envFiles.forEach(file => {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        const fileVars = new Set();
        content.split('\n').forEach(line => {
          const match = line.match(/^([^=]+)=/);
          if (match) {
            fileVars.add(match[1].trim());
          }
        });

        const missing = [...envVars].filter(v => !fileVars.has(v));
        if (missing.length > 0) {
          results.warnings.push(`${file} is missing variables: ${missing.join(', ')}`);
        }
      }
    });
  } catch (error) {
    results.errors.push(`Environment consistency check failed: ${error.message}`);
  }

  // Print results
  console.log('\n✨ Verification Results:\n');

  if (results.success.length > 0) {
    console.log('✅ Successes:');
    results.success.forEach(msg => console.log(`   ${msg}`));
  }

  if (results.warnings.length > 0) {
    console.log('\n⚠️  Warnings:');
    results.warnings.forEach(msg => console.log(`   ${msg}`));
  }

  if (results.errors.length > 0) {
    console.log('\n❌ Errors:');
    results.errors.forEach(msg => console.log(`   ${msg}`));
    process.exit(1);
  }

  console.log('\n🎉 Deployment system verification complete!');
  
  if (results.warnings.length === 0 && results.errors.length === 0) {
    console.log('\n✅ All systems are ready for deployment!');
    console.log('\nNext steps:');
    console.log('1. Review any warnings above');
    console.log('2. Run deployment:');
    console.log('   npm run safe-deploy');
  } else {
    console.log('\n⚠️  Please address the issues above before deploying.');
  }
}

// Run all checks
runChecks().catch(error => {
  console.error('❌ Verification failed:', error);
  process.exit(1);
});
