const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  sitemap: 'https://disasterrecoveryqld.au/sitemap.xml',
  checkInterval: 5 * 60 * 1000, // 5 minutes
  timeout: 10000, // 10 seconds
  logFile: path.join(__dirname, '../logs/monitoring.log'),
  alertThresholds: {
    responseTime: 2000, // 2 seconds
    errorRate: 0.05, // 5%
  }
};

// Ensure logs directory exists
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Monitor a single URL
async function checkUrl(url) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    
    const request = https.get(url, {
      timeout: config.timeout
    }, (response) => {
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      resolve({
        url,
        status: response.statusCode,
        responseTime,
        timestamp: new Date().toISOString()
      });
    });

    request.on('error', (error) => {
      resolve({
        url,
        status: 'error',
        error: error.message,
        timestamp: new Date().toISOString()
      });
    });
  });
}

// Log results
function logResult(result) {
  const logEntry = `${result.timestamp} - ${result.url} - Status: ${result.status}${
    result.responseTime ? ` - Response Time: ${result.responseTime}ms` : ''
  }${result.error ? ` - Error: ${result.error}` : ''}\n`;

  fs.appendFile(config.logFile, logEntry, (err) => {
    if (err) console.error('Error writing to log file:', err);
  });

  // Alert on issues
  if (result.status !== 200 || (result.responseTime && result.responseTime > config.alertThresholds.responseTime)) {
    console.error(`⚠️ Alert: Issue detected with ${result.url}`);
    // Here you could add additional alerting (email, SMS, etc.)
  }
}

// Main monitoring function
async function monitor() {
  try {
    const result = await checkUrl(config.sitemap);
    logResult(result);

    // Schedule next check
    setTimeout(monitor, config.checkInterval);
  } catch (error) {
    console.error('Monitoring error:', error);
    // Retry after a short delay if there's an error
    setTimeout(monitor, 60000);
  }
}

// Start monitoring
console.log('🔍 Starting site monitoring...');
monitor();

// Handle script termination
process.on('SIGINT', () => {
  console.log('\n👋 Stopping monitoring...');
  process.exit();
});

// Export for potential programmatic usage
module.exports = {
  checkUrl,
  monitor
};
