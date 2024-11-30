const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Directories to backup
const contentDirs = [
  'src/config',
  'src/app/en-AU/services',
  'public/images'
];

// Create backup
function createBackup() {
  const date = new Date().toISOString().split('T')[0];
  const backupDir = path.join('backups', `content-${date}`);

  try {
    // Create backup directory
    fs.mkdirSync(backupDir, { recursive: true });

    // Copy content directories
    contentDirs.forEach(dir => {
      if (fs.existsSync(dir)) {
        const destDir = path.join(backupDir, dir);
        fs.mkdirSync(path.dirname(destDir), { recursive: true });
        execSync(`cp -r "${dir}" "${destDir}"`);
      }
    });

    console.log(`✅ Content backup created in: ${backupDir}`);
    console.log('\nFiles backed up:');
    execSync(`ls -R "${backupDir}"`).toString().split('\n').forEach(line => {
      console.log(`  ${line}`);
    });

  } catch (error) {
    console.error('❌ Backup failed:', error.message);
    process.exit(1);
  }
}

// Restore backup
function restoreBackup(date) {
  const backupDir = path.join('backups', `content-${date}`);

  if (!fs.existsSync(backupDir)) {
    console.error(`❌ No backup found for date: ${date}`);
    process.exit(1);
  }

  try {
    // Restore content directories
    contentDirs.forEach(dir => {
      const srcDir = path.join(backupDir, dir);
      if (fs.existsSync(srcDir)) {
        fs.mkdirSync(path.dirname(dir), { recursive: true });
        execSync(`cp -r "${srcDir}" "${path.dirname(dir)}"`);
      }
    });

    console.log(`✅ Content restored from: ${backupDir}`);

  } catch (error) {
    console.error('❌ Restore failed:', error.message);
    process.exit(1);
  }
}

// Handle command line arguments
const command = process.argv[2];
const date = process.argv[3];

if (command === 'restore' && !date) {
  console.error('❌ Please provide a date to restore from');
  console.log('Usage: node backup-content.js restore YYYY-MM-DD');
  process.exit(1);
}

switch (command) {
  case 'create':
    createBackup();
    break;
  case 'restore':
    restoreBackup(date);
    break;
  default:
    console.log('Usage:');
    console.log('  Create backup: node backup-content.js create');
    console.log('  Restore backup: node backup-content.js restore YYYY-MM-DD');
    process.exit(1);
}
