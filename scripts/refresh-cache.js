const { MongoClient } = require('mongodb');
const cron = require('node-cron');

async function refreshMongoCache() {
  console.log('🔄 Starting MongoDB cache refresh...');
  
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db();
    
    // Get all collections
    const collections = await db.listCollections().toArray();
    
    for (const collection of collections) {
      const collectionName = collection.name;
      
      // Skip system collections
      if (collectionName.startsWith('system.')) continue;
      
      console.log(`📦 Refreshing cache for collection: ${collectionName}`);
      
      // Get all cached documents in the collection
      const cachedDocs = await db.collection(collectionName)
        .find({ cached: true })
        .toArray();
      
      // Update cache timestamp and refresh flag
      for (const doc of cachedDocs) {
        await db.collection(collectionName).updateOne(
          { _id: doc._id },
          {
            $set: {
              cacheRefreshedAt: new Date(),
              cacheExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
            }
          }
        );
      }
      
      console.log(`✅ Refreshed ${cachedDocs.length} documents in ${collectionName}`);
    }

    console.log('✨ Cache refresh completed successfully!');
  } catch (error) {
    console.error('❌ Error refreshing cache:', error);
    // Send alert to monitoring system
    if (process.env.ENABLE_MONITORING === 'true') {
      require('../lib/monitoring').reportError('cache-refresh-failed', error);
    }
  } finally {
    await client.close();
  }
}

// Schedule monthly cache refresh
// Runs at midnight on the first day of each month
cron.schedule('0 0 1 * *', refreshMongoCache);

// Export for manual execution
module.exports = refreshMongoCache;

// If running directly, execute immediately
if (require.main === module) {
  refreshMongoCache()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('Failed to refresh cache:', error);
      process.exit(1);
    });
}
