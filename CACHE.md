# Cache Management System

## Overview
The system implements a MongoDB-based caching system with automatic monthly refresh to ensure data freshness and optimal performance.

## Cache Commands

### Manual Cache Management
```bash
# Refresh cache manually
npm run cache:refresh

# Check cache status
npm run cache:status

# Monitor cache operations
npm run cache:monitor
```

### Automated Cache Management
The cache is automatically refreshed on the first day of each month via GitHub Actions workflow.

## Cache Configuration

### Environment Variables
```env
# Cache Settings
CACHE_TTL=3600                # Cache time-to-live in seconds
REVALIDATE_INTERVAL=300       # Revalidation interval in seconds
```

### MongoDB Cache Settings
- Cache Duration: 30 days
- Auto-refresh: Monthly
- Monitoring: Enabled
- Error Reporting: Integrated with Sentry

## Cache Operations

### Cache Refresh Process
1. Connects to MongoDB
2. Identifies cached documents
3. Updates cache timestamps
4. Refreshes cached data
5. Reports completion/errors

### Error Handling
- Automatic retry on failure
- Error reporting to Sentry
- GitHub Issue creation
- Slack notifications (if configured)

## Monitoring

### Cache Health Checks
```bash
# View cache status
npm run cache:status

# Monitor cache operations
npm run cache:monitor
```

### Cache Metrics
- Cache hit rate
- Cache size
- Refresh duration
- Error rate

## Troubleshooting

### Common Issues
1. Cache refresh failure
   ```bash
   npm run cache:refresh --force
   ```

2. Stale cache
   ```bash
   npm run cache:refresh --clear
   ```

3. Cache corruption
   ```bash
   npm run cache:refresh --rebuild
   ```

### Manual Intervention
```bash
# Force immediate refresh
npm run cache:refresh --force

# Clear cache entirely
npm run cache:refresh --clear

# Rebuild cache
npm run cache:refresh --rebuild
```

## GitHub Actions Integration

### Automated Workflow
- Schedule: Monthly (1st day)
- Trigger: `cron: '0 0 1 * *'`
- Manual trigger available

### Workflow Steps
1. Checkout code
2. Setup Node.js
3. Install dependencies
4. Run cache refresh
5. Handle notifications

### Monitoring
- GitHub Actions dashboard
- Workflow status notifications
- Error reporting to Sentry
- Issue creation on failure

## Best Practices

### Cache Management
1. Monitor cache size regularly
2. Review cache hit rates
3. Adjust TTL based on usage
4. Keep backup of critical cached data

### Performance Optimization
1. Use appropriate TTL values
2. Implement cache warming
3. Monitor memory usage
4. Regular performance audits

## Development Guidelines

### Adding Cached Data
```typescript
// Example of caching data
async function cacheData(key: string, data: any) {
  await db.collection('cache').updateOne(
    { _id: key },
    {
      $set: {
        data,
        cached: true,
        cacheRefreshedAt: new Date(),
        cacheExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      }
    },
    { upsert: true }
  );
}
```

### Cache Validation
```typescript
// Example of validating cache
async function isCacheValid(key: string): Promise<boolean> {
  const cached = await db.collection('cache').findOne({ _id: key });
  if (!cached) return false;
  return new Date() < new Date(cached.cacheExpires);
}
```

## Security Considerations

### Cache Security
- Encrypted sensitive data
- Access control implementation
- Regular security audits
- Secure cache invalidation

### Data Protection
- Backup procedures
- Data encryption
- Access logging
- Compliance checks
