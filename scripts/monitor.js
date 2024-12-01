#!/usr/bin/env node
const path = require('path');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const Redis = require('ioredis');

// Load environment variables
dotenv.config();

// Parse command line arguments
const args = process.argv.slice(2);
const showStatus = args.includes('--status');
const checkHealth = args.includes('--health');
const watchMode = args.includes('--watch');

// Import monitoring modules
const monitoring = require('../src/lib/monitoring');

// Default thresholds
const DEFAULT_THRESHOLDS = {
  cache: {
    refreshDuration: 60000,  // 1 minute
    errorRate: 0.05,         // 5%
    maxSize: 1000000000      // 1GB
  },
  api: {
    responseTime: 5000,      // 5 seconds
    errorRate: 0.01          // 1%
  },
  database: {
    queryTime: 1000,         // 1 second
    connectionTime: 5000     // 5 seconds
  }
};

async function monitorSystem() {
  console.log('🔍 Starting system monitoring...\n');

  try {
    // Initialize monitoring
    monitoring.init();

    // Health check
    if (checkHealth) {
      console.log('Running health check...');
      const healthy = await monitoring.healthCheck();
      console.log(healthy ? '✅ System is healthy' : '❌ System is unhealthy');
      if (!healthy && !watchMode) process.exit(1);
    }

    // Status report
    if (showStatus) {
      console.log('\nGenerating status report...');
      
      // Check MongoDB
      try {
        const client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        const startTime = Date.now();
        await client.db().command({ ping: 1 });
        const latency = Date.now() - startTime;
        console.log('✅ MongoDB:', {
          status: 'connected',
          latency: `${latency}ms`
        });
        await client.close();
      } catch (error) {
        console.error('❌ MongoDB:', {
          status: 'error',
          message: error.message
        });
      }

      // Check Redis
      if (process.env.REDIS_URL) {
        try {
          const redis = new Redis(process.env.REDIS_URL);
          const startTime = Date.now();
          await redis.ping();
          const latency = Date.now() - startTime;
          console.log('✅ Redis:', {
            status: 'connected',
            latency: `${latency}ms`
          });
          await redis.quit();
        } catch (error) {
          console.error('❌ Redis:', {
            status: 'error',
            message: error.message
          });
        }
      }

      // Check cache
      try {
        const client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        const db = client.db();
        
        // Get cache collection info
        const cacheCollection = db.collection('cache');
        const cacheCount = await cacheCollection.countDocuments();
        const lastRefresh = await cacheCollection.findOne(
          {},
          { 
            sort: { cacheRefreshedAt: -1 },
            projection: { cacheRefreshedAt: 1 }
          }
        );

        // Get database stats
        const dbStats = await db.stats();
        const cacheSize = Math.round(dbStats.dataSize / 1024 / 1024);

        console.log('📦 Cache:', {
          size: `${cacheSize}MB`,
          documents: cacheCount,
          lastRefresh: lastRefresh?.cacheRefreshedAt || 'Never'
        });
        await client.close();
      } catch (error) {
        console.error('❌ Cache:', {
          status: 'error',
          message: error.message
        });
      }

      // Performance thresholds
      console.log('\n⚡ Performance Thresholds:');
      Object.entries(DEFAULT_THRESHOLDS).forEach(([category, thresholds]) => {
        console.log(`\n${category.toUpperCase()}:`);
        Object.entries(thresholds).forEach(([metric, threshold]) => {
          console.log(`  ${metric}: ${threshold}ms`);
        });
      });
    }

    // Watch mode
    if (watchMode) {
      console.log('\n👀 Watching system metrics...');
      const interval = 60000; // 1 minute
      setInterval(async () => {
        const healthy = await monitoring.healthCheck();
        const timestamp = new Date().toISOString();
        console.log(`\n[${timestamp}] Health check:`, healthy ? '✅' : '❌');
      }, interval);
    } else {
      process.exit(0);
    }

  } catch (error) {
    console.error('❌ Monitoring failed:', error);
    process.exit(1);
  }
}

// Run monitoring
monitorSystem();
