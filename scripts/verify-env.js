const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Required environment variables
const REQUIRED_VARS = {
  NEXT_PUBLIC_API_URL: {
    format: 'url',
    example: 'http://localhost:3005/api'
  },
  NEXT_PUBLIC_SITE_URL: {
    format: 'url',
    example: 'http://localhost:3005'
  },
  MONGODB_URI: {
    format: 'mongodb-uri',
    example: 'mongodb://localhost:27017/drq'
  }
};

// Environment file types to check
const ENV_FILES = [
  '.env',
  '.env.development',
  '.env.production',
  '.env.staging'
];

// Validation functions
const validators = {
  url: (value) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  },
  'mongodb-uri': (value) => {
    return value.startsWith('mongodb://') || value.startsWith('mongodb+srv://');
  }
};

// Function to validate environment variables
function validateEnvVars(envVars) {
  const errors = [];
  const warnings = [];

  // Check required variables
  Object.entries(REQUIRED_VARS).forEach(([key, config]) => {
    const value = envVars[key];

    if (!value) {
      errors.push(`Missing required variable: ${key}`);
      errors.push(`Example: ${key}=${config.example}`);
    } else if (validators[config.format] && !validators[config.format](value)) {
      errors.push(`Invalid format for ${key}: ${value}`);
      errors.push(`Expected format: ${config.format}`);
      errors.push(`Example: ${key}=${config.example}`);
    }
  });

  // Check for sensitive information in public variables
  Object.entries(envVars).forEach(([key, value]) => {
    if (key.startsWith('NEXT_PUBLIC_') && 
        (value.includes('secret') || value.includes('password') || value.includes('key'))) {
      warnings.push(`Warning: Possible sensitive information in public variable: ${key}`);
    }
  });

  return { errors, warnings };
}

// Function to check environment file
function checkEnvFile(filePath) {
  console.log(`\n📝 Checking ${filePath}...`);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return;
  }

  const envContent = fs.readFileSync(filePath, 'utf8');
  const envVars = dotenv.parse(envContent);
  const { errors, warnings } = validateEnvVars(envVars);

  if (errors.length === 0 && warnings.length === 0) {
    console.log('✅ All environment variables are valid');
  } else {
    if (errors.length > 0) {
      console.log('\n❌ Errors:');
      errors.forEach(error => console.log(`   ${error}`));
    }
    if (warnings.length > 0) {
      console.log('\n⚠️  Warnings:');
      warnings.forEach(warning => console.log(`   ${warning}`));
    }
  }

  // Check for duplicate variables
  const lines = envContent.split('\n');
  const vars = new Set();
  lines.forEach(line => {
    const match = line.match(/^([^=]+)=/);
    if (match) {
      const varName = match[1].trim();
      if (vars.has(varName)) {
        console.log(`⚠️  Duplicate variable found: ${varName}`);
      }
      vars.add(varName);
    }
  });
}

// Function to compare environment files
function compareEnvFiles() {
  const envFiles = ENV_FILES.filter(file => fs.existsSync(file));
  
  if (envFiles.length > 1) {
    console.log('\n🔍 Comparing environment files...');
    
    const varsInFiles = {};
    envFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      varsInFiles[file] = Object.keys(dotenv.parse(content));
    });

    // Find variables that exist in some files but not others
    const allVars = new Set(Object.values(varsInFiles).flat());
    allVars.forEach(variable => {
      const filesWithVar = envFiles.filter(file => varsInFiles[file].includes(variable));
      const filesWithoutVar = envFiles.filter(file => !varsInFiles[file].includes(variable));
      
      if (filesWithoutVar.length > 0 && filesWithVar.length > 0) {
        console.log(`\n⚠️  Variable "${variable}" is inconsistent across files:`);
        console.log(`   Present in: ${filesWithVar.join(', ')}`);
        console.log(`   Missing in: ${filesWithoutVar.join(', ')}`);
      }
    });
  }
}

// Main function
function verifyEnvironments() {
  console.log('🔍 Starting environment verification...\n');

  // Check each environment file
  ENV_FILES.forEach(checkEnvFile);

  // Compare environment files
  compareEnvFiles();

  console.log('\n✨ Environment verification complete!');
}

// Run verification
verifyEnvironments();
