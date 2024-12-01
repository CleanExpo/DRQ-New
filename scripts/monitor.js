#!/usr/bin/env node
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import Redis from 'ioredis';

// Load environment variables
dotenv.config();

// Get directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import monitoring modules
const { monitoring } = await import(join(__dirname, '..', 'src', 'lib', 'monitoring.ts'));
const { DEFAULT_THRESHOLDS } = await import(join(__dirname, '..', 'src', 'types', 'monitoring.ts'));

// Parse command line arguments
const args = process.argv.slice(2);
const showStatus = args.includes('--status');
const checkHealth = args.includes('--health');
const watchMode = args.includes('--watch');

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
        const cacheStats = await db.collection('cache').stats();
        console.log('📦 Cache:', {
          size: `${Math.round(cacheStats.size / 1024 / 1024)}MB`,
          documents: cacheStats.count,
          lastRefresh: await db.collection('cache').findOne(
            {},
            { sort: { cacheRefreshedAt: -1 } }
          )?.cacheRefreshedAt
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
