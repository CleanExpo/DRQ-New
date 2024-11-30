const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Function to execute commands and log output
function execute(command) {
    try {
        console.log(`Executing: ${command}`);
        execSync(command, { stdio: 'inherit' });
    } catch (error) {
        console.error(`Error executing ${command}:`, error);
        process.exit(1);
    }
}

// Function to make file executable (cross-platform)
function makeExecutable(filePath) {
    if (os.platform() === 'win32') {
        // On Windows, we don't need to make files executable
        return;
    } else {
        execute(`chmod +x ${filePath}`);
    }
}

// Initialize repository
console.log('\n1. Initializing Git repository...');
execute('git init');

// Create .gitignore if it doesn't exist
if (!fs.existsSync('.gitignore')) {
    console.log('\n2. Creating .gitignore...');
    if (fs.existsSync('.gitignore.example')) {
        fs.copyFileSync('.gitignore.example', '.gitignore');
    }
}

// Initialize Husky
console.log('\n3. Setting up Husky...');
execute('npx husky install');

// Create pre-commit hook
console.log('\n4. Creating Git hooks...');
const preCommitScript = `#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Check for sensitive data
if git diff --cached --name-only | grep -E '\\.env\\..*$' > /dev/null; then
    echo "Error: Attempting to commit environment files"
    echo "Please remove .env files from staging area"
    exit 1
fi

# Run lint-staged
npx lint-staged`;

const hooksDir = '.husky';
if (!fs.existsSync(hooksDir)) {
    fs.mkdirSync(hooksDir);
}

const preCommitPath = path.join(hooksDir, 'pre-commit');
fs.writeFileSync(preCommitPath, preCommitScript);
makeExecutable(preCommitPath);

// Temporarily disable pre-commit hook for initial commit
const tempHooksDir = '.git/hooks.bak';
const gitHooksDir = '.git/hooks';
if (fs.existsSync(gitHooksDir)) {
    if (fs.existsSync(tempHooksDir)) {
        fs.rmSync(tempHooksDir, { recursive: true });
    }
    fs.renameSync(gitHooksDir, tempHooksDir);
}

// Create initial commit
console.log('\n5. Creating initial commit...');

// Stage all files except .env files
execute('git add .');
execute('git reset -- .env*');

// Create initial commit
execute('git commit -m "Initial commit: Project setup" --no-verify');

// Restore hooks
if (fs.existsSync(tempHooksDir)) {
    if (fs.existsSync(gitHooksDir)) {
        fs.rmSync(gitHooksDir, { recursive: true });
    }
    fs.renameSync(tempHooksDir, gitHooksDir);
}

console.log('\n✅ Repository initialized successfully!');
console.log('\nNext steps:');
console.log('1. Create a new repository on GitHub');
console.log('2. Add the remote origin:');
console.log('   git remote add origin <repository-url>');
console.log('3. Push the code:');
console.log('   git push -u origin main');
console.log('\nRemember: Never commit .env files containing sensitive data!');
