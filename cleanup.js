const fs = require('fs').promises;
const path = require('path');

const filesToRemove = [
  'src/lib/monitoring.ts',
  'src/lib/performance.ts',
  'scripts/monitor.js',
  'scripts/verify-deployment.js',
  'sentry.client.config.ts',
  'sentry.server.config.ts',
  'ENVIRONMENT-SETUP.md'
];

async function cleanup() {
  for (const file of filesToRemove) {
    try {
      await fs.unlink(file);
      console.log(`✅ Removed ${file}`);
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.error(`❌ Error removing ${file}:`, error);
      }
    }
  }
}

cleanup().catch(console.error);
