# Quick Start Guide: Making Website Updates

## First Time Setup

1. Clone the repository:
```bash
git clone git@github.com:CleanExpo/DRQ-New.git
cd DRQ-New
```

2. Install and verify setup:
```bash
npm run setup
```

## Safe Deployment Process

### 1. Pre-deployment Check
```bash
npm run pre-deploy
```
This will:
- Check for uncommitted changes
- Pull latest changes
- Verify setup
- Create backup
- Build project
- Check environment variables

### 2. Making Updates

#### Content Updates (Safest)
```bash
npm run content:update
# Make your changes
npm run content:deploy
```

#### Direct Updates
```bash
npm run update:deploy
```

#### Preview Before Deploying
```bash
npm run preview
```

## Common Tasks

### Update Service Information
1. Edit `src/config/content.ts`
2. Run `npm run content:deploy`

### Add New Images
1. Add to `public/images/`
2. Run `npm run content:deploy`

### Update Service Areas
1. Edit `src/components/shared/ServiceAreas.tsx`
2. Run `npm run content:deploy`

## Deployment Commands

### Safe Deployment (Recommended)
```bash
npm run safe-deploy
```
Runs all checks and safeguards before deployment

### Quick Deployment
```bash
npm run deploy
```
Basic deployment with minimal checks

### Environment-Specific Deployment
```bash
npm run deploy:staging  # Deploy to staging
npm run deploy:prod    # Deploy to production
```

## Safety Features

### Create Backup
```bash
npm run backup
```

### Restore Backup
```bash
npm run backup:restore YYYY-MM-DD
```

### Verify Setup
```bash
npm run verify
```

## Need More Details?

- See `CONTENT-UPDATES.md` for detailed content update instructions
- See `README.md` for full documentation
- See `DEPLOYMENT.md` for deployment details

## Quick Commands Reference

- `npm run pre-deploy` - Run pre-deployment checks
- `npm run safe-deploy` - Full safe deployment process
- `npm run content:update` - Start content update session
- `npm run content:deploy` - Deploy content changes
- `npm run backup` - Create content backup
- `npm run verify` - Verify setup
- `npm run preview` - Preview changes locally

Remember: Always run `npm run pre-deploy` before deploying to ensure everything is ready!
