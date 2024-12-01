# Deployment Guide

## Environment Setup

### Production Environment
```bash
# Switch to production environment
npm run env:prod

# Deploy to production
npm run safe-deploy
```

Production URLs:
- Main site: https://disasterrecoveryqld.au
- API: https://api.disasterrecoveryqld.au

### Staging Environment
```bash
# Switch to staging environment
npm run env:staging

# Deploy to staging
npm run safe-deploy
```

Staging URLs:
- Main site: https://staging.disasterrecoveryqld.au
- API: https://staging-api.disasterrecoveryqld.au

### Development Environment
```bash
# Switch to development environment
npm run env:dev

# Start development server
npm run dev
```

Development URLs:
- Main site: https://dev.disasterrecoveryqld.au
- API: https://dev-api.disasterrecoveryqld.au

## Deployment Process

1. Pre-deployment Checks
   - Environment verification
   - Code linting
   - Type checking
   - Security audit

2. Backup Creation
   - Environment backup
   - Content backup
   - Database backup

3. Build Process
   - Next.js production build
   - Asset optimization
   - Cache generation

4. Deployment
   - Vercel deployment
   - DNS configuration
   - SSL certificate verification

5. Post-deployment Verification
   - Health checks
   - Monitoring setup
   - Performance validation

## Monitoring

### Health Checks
```bash
# Check system status
npm run monitor:status

# Run health check
npm run monitor:health

# Watch system metrics
npm run monitor:watch
```

### Cache Management
```bash
# Refresh cache
npm run cache:refresh

# Check cache status
npm run cache:status

# Monitor cache
npm run cache:monitor
```

## Rollback Process

If deployment fails:
```bash
# Restore environment
npm run env:restore

# Restore content
npm run backup:restore

# Verify restoration
npm run verify:all
```

## Security Measures

1. Environment Variables
   - Sensitive data encrypted
   - Different keys per environment
   - Regular rotation schedule

2. API Security
   - JWT authentication
   - Rate limiting
   - CORS configuration

3. Monitoring
   - Error tracking (Sentry)
   - Performance monitoring (New Relic)
   - User session recording (LogRocket)

## Database Management

1. MongoDB Atlas
   - Production database
   - Staging database
   - Development database

2. Redis Cache
   - Session management
   - API caching
   - Rate limiting

## Content Delivery

1. Image Optimization
   - Automatic WebP conversion
   - Responsive sizes
   - Lazy loading

2. Static Assets
   - CDN distribution
   - Cache control
   - Compression

## Troubleshooting

### Common Issues

1. Build Failures
   ```bash
   # Clean build cache
   npm run clean
   
   # Full reinstall
   npm run clean:full
   ```

2. Environment Issues
   ```bash
   # Verify environment
   npm run verify:env
   
   # List backups
   npm run env:list
   ```

3. Cache Issues
   ```bash
   # Clear cache
   npm run cache:refresh --clear
   
   # Rebuild cache
   npm run cache:refresh --rebuild
   ```

### Support Contacts

- Technical Support: admin@disasterrecoveryqld.au
- Emergency Contact: 1300 309 361
- Hours: 24/7 365 Emergency Services
