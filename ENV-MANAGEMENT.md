# Environment Management Guide

## Quick Commands

### Switch Environments
```bash
npm run env:prod     # Switch to production
npm run env:dev      # Switch to development
npm run env:staging  # Switch to staging
```

### Backup and Restore
```bash
npm run env:backup   # Backup current environment
npm run env:list     # List available backups
npm run env:restore  # Restore from backup
```

## Environment Files

### Types of Environment Files
- `.env.development` - Local development settings
- `.env.production` - Production settings
- `.env.staging` - Staging environment settings
- `.env` - Active environment (copied from one of the above)

### Required Variables
```bash
NEXT_PUBLIC_API_URL=http://localhost:3005/api
NEXT_PUBLIC_SITE_URL=http://localhost:3005
MONGODB_URI=mongodb://localhost:27017/drq
```

## Environment Switching

### Safe Environment Switch
1. Backup current environment:
```bash
npm run env:backup
```

2. Switch to desired environment:
```bash
npm run env:prod   # or env:dev, env:staging
```

3. Verify the switch:
```bash
npm run verify
```

### Manual Environment Switch
1. Copy environment file:
```bash
cp .env.production .env  # or .env.development, .env.staging
```

2. Verify setup:
```bash
npm run verify
```

## Environment Security

### Backup System
- Automatic backups before switching
- Encrypted storage
- Version tracking
- Easy restoration

### Best Practices

1. **Always Backup First**
```bash
npm run env:backup
```

2. **Use Switch Commands**
```bash
npm run env:prod
npm run env:dev
npm run env:staging
```

3. **Verify After Switching**
```bash
npm run verify
```

4. **Review Changes**
```bash
npm run env:list
```

## Environment Setup

### New Environment Setup
1. Copy template:
```bash
cp .env.example .env.development
```

2. Edit variables:
```bash
nano .env.development
```

3. Switch to new environment:
```bash
npm run env:dev
```

### Environment Migration
1. Backup current environment:
```bash
npm run env:backup
```

2. Switch environments:
```bash
npm run env:prod
```

3. Verify migration:
```bash
npm run verify
```

## Troubleshooting

### Missing Environment
1. Check available environments:
```bash
ls .env.*
```

2. Copy from example:
```bash
cp .env.example .env.development
```

3. Switch to environment:
```bash
npm run env:dev
```

### Invalid Environment
1. List backups:
```bash
npm run env:list
```

2. Restore backup:
```bash
npm run env:restore YYYY-MM-DD
```

### Environment Verification
```bash
npm run verify
```

## Deployment with Environments

### Production Deployment
1. Switch to production:
```bash
npm run env:prod
```

2. Deploy:
```bash
npm run deploy:prod
```

### Staging Deployment
1. Switch to staging:
```bash
npm run env:staging
```

2. Deploy:
```bash
npm run deploy:staging
```

Remember: Always verify your environment configuration after switching!
