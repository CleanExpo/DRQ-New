const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Environment files to manage
const ENV_FILES = [
  '.env.development',
  '.env.production',
  '.env.staging',
  '.env.local'
];

// Backup directory
const BACKUP_DIR = 'env-backups';

// Encryption key from environment or generate one
const ENCRYPTION_KEY = process.env.ENV_ENCRYPTION_KEY || 
  crypto.randomBytes(32).toString('hex');

function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', 
    Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
}

function decrypt(text) {
  const [ivHex, encryptedText] = text.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', 
    Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

function createBackup() {
  const date = new Date().toISOString().split('T')[0];
  const backupDir = path.join(BACKUP_DIR, date);

  try {
    // Create backup directory
    fs.mkdirSync(backupDir, { recursive: true });

    // Track which files were backed up
    const backedUp = [];

    // Backup each env file
    ENV_FILES.forEach(file => {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        const encrypted = encrypt(content);
        const backupFile = path.join(backupDir, `${file}.enc`);
        fs.writeFileSync(backupFile, encrypted);
        backedUp.push(file);
      }
    });

    if (backedUp.length === 0) {
      console.log('⚠️  No environment files found to backup');
      return;
    }

    console.log('✅ Environment files backed up successfully:');
    backedUp.forEach(file => console.log(`   - ${file}`));
    console.log(`\n📁 Backup location: ${backupDir}`);
    console.log('\n🔐 Files are encrypted for security');
    
    // Save encryption key if it was generated
    if (!process.env.ENV_ENCRYPTION_KEY) {
      const keyFile = path.join(backupDir, 'encryption-key.txt');
      fs.writeFileSync(keyFile, ENCRYPTION_KEY);
      console.log(`\n⚠️  IMPORTANT: Encryption key saved to: ${keyFile}`);
      console.log('   Keep this key safe - you need it to restore the backup!');
    }

  } catch (error) {
    console.error('❌ Backup failed:', error.message);
    process.exit(1);
  }
}

function restoreBackup(date) {
  const backupDir = path.join(BACKUP_DIR, date);

  if (!fs.existsSync(backupDir)) {
    console.error(`❌ No backup found for date: ${date}`);
    process.exit(1);
  }

  try {
    // Check for encryption key
    let encryptionKey = ENCRYPTION_KEY;
    const keyFile = path.join(backupDir, 'encryption-key.txt');
    if (fs.existsSync(keyFile)) {
      encryptionKey = fs.readFileSync(keyFile, 'utf8').trim();
    }

    // Restore each env file
    const restored = [];
    ENV_FILES.forEach(file => {
      const backupFile = path.join(backupDir, `${file}.enc`);
      if (fs.existsSync(backupFile)) {
        const encrypted = fs.readFileSync(backupFile, 'utf8');
        const decrypted = decrypt(encrypted);
        fs.writeFileSync(file, decrypted);
        restored.push(file);
      }
    });

    if (restored.length === 0) {
      console.log('⚠️  No environment files found in backup');
      return;
    }

    console.log('✅ Environment files restored successfully:');
    restored.forEach(file => console.log(`   - ${file}`));

  } catch (error) {
    console.error('❌ Restore failed:', error.message);
    process.exit(1);
  }
}

function listBackups() {
  if (!fs.existsSync(BACKUP_DIR)) {
    console.log('No backups found');
    return;
  }

  const backups = fs.readdirSync(BACKUP_DIR)
    .filter(file => fs.statSync(path.join(BACKUP_DIR, file)).isDirectory())
    .sort((a, b) => b.localeCompare(a));

  if (backups.length === 0) {
    console.log('No backups found');
    return;
  }

  console.log('Available backups:');
  backups.forEach(backup => {
    const backupDir = path.join(BACKUP_DIR, backup);
    const files = fs.readdirSync(backupDir)
      .filter(file => file.endsWith('.enc'))
      .map(file => file.replace('.enc', ''));
    console.log(`\n${backup}:`);
    files.forEach(file => console.log(`   - ${file}`));
  });
}

// Handle command line arguments
const command = process.argv[2];
const date = process.argv[3];

if (command === 'restore' && !date) {
  console.error('❌ Please provide a date to restore from');
  console.log('Usage: node backup-env.js restore YYYY-MM-DD');
  process.exit(1);
}

switch (command) {
  case 'create':
    createBackup();
    break;
  case 'restore':
    restoreBackup(date);
    break;
  case 'list':
    listBackups();
    break;
  default:
    console.log('Usage:');
    console.log('  Create backup: node backup-env.js create');
    console.log('  Restore backup: node backup-env.js restore YYYY-MM-DD');
    console.log('  List backups: node backup-env.js list');
    process.exit(1);
}
