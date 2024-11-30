const fs = require('fs');
const path = require('path');
const CryptoJS = require('crypto-js');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

// Configuration
const BACKUP_DIR = path.join(__dirname, '../.env-backups');
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'default-backup-key';

async function backupEnvironmentFiles() {
    try {
        // Create backup directory if it doesn't exist
        if (!fs.existsSync(BACKUP_DIR)) {
            await mkdir(BACKUP_DIR);
        }

        // Get timestamp for backup files
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

        // List of environment files to backup
        const envFiles = [
            '.env',
            '.env.development',
            '.env.production',
            '.env.staging'
        ];

        for (const envFile of envFiles) {
            const filePath = path.join(__dirname, '..', envFile);
            
            // Skip if file doesn't exist
            if (!fs.existsSync(filePath)) {
                console.log(`Skipping ${envFile} - file not found`);
                continue;
            }

            // Read environment file
            const content = await readFile(filePath, 'utf8');

            // Encrypt content
            const encrypted = CryptoJS.AES.encrypt(content, ENCRYPTION_KEY).toString();

            // Create backup file name
            const backupFileName = `${envFile}-${timestamp}.backup`;
            const backupPath = path.join(BACKUP_DIR, backupFileName);

            // Save encrypted backup
            await writeFile(backupPath, encrypted);
            console.log(`✅ Backed up ${envFile} to ${backupFileName}`);
        }

        // Create manifest file
        const manifest = {
            timestamp,
            files: fs.readdirSync(BACKUP_DIR),
            createdAt: new Date().toISOString()
        };

        await writeFile(
            path.join(BACKUP_DIR, 'manifest.json'),
            JSON.stringify(manifest, null, 2)
        );

        console.log('\n✅ Environment backup completed successfully!');
        console.log(`📁 Backup location: ${BACKUP_DIR}`);
        console.log('\nTo restore backups, use:');
        console.log('npm run restore-env -- --timestamp <backup-timestamp>');

    } catch (error) {
        console.error('❌ Error during backup:', error);
        process.exit(1);
    }
}

// Function to restore environment files
async function restoreEnvironmentFiles(timestamp) {
    try {
        if (!timestamp) {
            // If no timestamp provided, list available backups
            const manifest = require(path.join(BACKUP_DIR, 'manifest.json'));
            console.log('\nAvailable backups:');
            console.log(JSON.stringify(manifest, null, 2));
            return;
        }

        const backupFiles = fs.readdirSync(BACKUP_DIR)
            .filter(file => file.includes(timestamp) && file.endsWith('.backup'));

        if (backupFiles.length === 0) {
            console.error(`❌ No backup files found for timestamp: ${timestamp}`);
            return;
        }

        for (const backupFile of backupFiles) {
            const encrypted = await readFile(path.join(BACKUP_DIR, backupFile), 'utf8');
            const decrypted = CryptoJS.AES.decrypt(encrypted, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);

            const originalFileName = backupFile.replace(`-${timestamp}.backup`, '');
            const restorePath = path.join(__dirname, '..', originalFileName);

            await writeFile(restorePath, decrypted);
            console.log(`✅ Restored ${originalFileName}`);
        }

        console.log('\n✅ Environment restoration completed successfully!');

    } catch (error) {
        console.error('❌ Error during restoration:', error);
        process.exit(1);
    }
}

// Execute based on command line arguments
const args = process.argv.slice(2);
if (args.includes('--restore')) {
    const timestampIndex = args.indexOf('--timestamp');
    const timestamp = timestampIndex !== -1 ? args[timestampIndex + 1] : null;
    restoreEnvironmentFiles(timestamp);
} else {
    backupEnvironmentFiles();
}
