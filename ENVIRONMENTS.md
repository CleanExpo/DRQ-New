# Environment Management Examples

## Available Environments

### Development (Local)
```bash
npm run env:dev
```
Features:
- Local API and database
- Debug mode enabled
- Test accounts enabled
- Analytics disabled
- No caching

### Staging
```bash
npm run env:staging
```
Features:
- Staging API and database
- Debug mode enabled
- Test accounts enabled
- Analytics enabled
- Short cache times

### Production
```bash
npm run env:prod
```
Features:
- Production API and database
- Debug mode disabled
- Test accounts disabled
- Analytics enabled
- Full caching

## Common Workflows

### Local Development
```bash
# Switch to development
npm run env:dev

# Start development server
npm run dev
```

### Testing in Staging
```bash
# Switch to staging
npm run env:staging

# Build and preview
npm run preview
```

### Production Deployment
```bash
# Switch to production
npm run env:prod

# Run safe deployment
npm run safe-deploy
```

## Environment Variables

### Common Variables
```env
NEXT_PUBLIC_API_URL=<api-url>
NEXT_PUBLIC_SITE_URL=<site-url>
MONGODB_URI=<database-url>
```

### Feature Flags
```env
ENABLE_ANALYTICS=true|false
ENABLE_MONITORING=true|false
ENABLE_DEBUG=true|false
ENABLE_TEST_ACCOUNTS=true|false
```

### Cache Settings
```env
CACHE_TTL=<seconds>
REVALIDATE_INTERVAL=<seconds>
```

## Environment Safety

### Before Switching
```bash
# Backup current environment
npm run env:backup
```

### After Switching
```bash
# Verify new environment
npm run verify:env
```

### View Environment Status
```bash
# List available backups
npm run env:list

# Check current environment
npm run verify:env
```

## Environment Examples

### Development (.env.development)
```env
NEXT_PUBLIC_API_URL=http://localhost:3005/api
NEXT_PUBLIC_SITE_URL=http://localhost:3005
MONGODB_URI=mongodb://localhost:27017/drq

ENABLE_ANALYTICS=false
ENABLE_MONITORING=false
ENABLE_DEBUG=true
ENABLE_TEST_ACCOUNTS=true

CACHE_TTL=0
REVALIDATE_INTERVAL=0
```

### Staging (.env.staging)
```env
NEXT_PUBLIC_API_URL=https://staging-api.drq.com.au/api
NEXT_PUBLIC_SITE_URL=https://staging.drq.com.au
MONGODB_URI=mongodb://staging-db:27017/drq-staging

ENABLE_ANALYTICS=true
ENABLE_MONITORING=true
ENABLE_DEBUG=true
ENABLE_TEST_ACCOUNTS=true

CACHE_TTL=60
REVALIDATE_INTERVAL=30
```

### Production (.env.production)
```env
NEXT_PUBLIC_API_URL=https://api.drq.com.au/api
NEXT_PUBLIC_SITE_URL=https://drq.com.au
MONGODB_URI=mongodb://production-db:27017/drq-prod

ENABLE_ANALYTICS=true
ENABLE_MONITORING=true
ENABLE_DEBUG=false
ENABLE_TEST_ACCOUNTS=false

CACHE_TTL=3600
REVALIDATE_INTERVAL=300
```

## Troubleshooting

### Environment Switch Failed
1. Check for errors:
```bash
npm run verify:env
```

2. Restore previous environment:
```bash
npm run env:restore YYYY-MM-DD
```

### Missing Variables
1. Compare with example:
```bash
cat .env.example
```

2. Copy missing variables:
```bash
npm run verify:env
```

### Invalid Configuration
1. Check environment:
```bash
npm run verify:env
```

2. Fix issues and verify again:
```bash
npm run verify:env
```

Remember: Always verify your environment after switching!
