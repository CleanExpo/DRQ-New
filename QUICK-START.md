# Quick Start Guide: Making Website Updates

## First Time Setup

1. Clone the repository:
```bash
git clone git@github.com:CleanExpo/DRQ-New.git
cd DRQ-New
```

2. Install dependencies:
```bash
npm install
```

## Making Quick Updates

### 1. Content Updates (Safest)
```bash
npm run content:update
# Make your changes
npm run content:deploy
```

### 2. Direct Updates
```bash
npm run update:deploy
```

### 3. Preview Before Deploying
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

## Safety Features

### Create Backup
```bash
npm run backup
```

### Restore Backup
```bash
npm run backup:restore YYYY-MM-DD
```

## Need More Details?

- See `CONTENT-UPDATES.md` for detailed content update instructions
- See `README.md` for full documentation
- See `DEPLOYMENT.md` for deployment details

## Quick Commands Reference

- `npm run dev` - Start development server
- `npm run preview` - Preview changes locally
- `npm run content:update` - Start content update session
- `npm run content:deploy` - Deploy content changes
- `npm run backup` - Create content backup
- `npm run deploy` - Deploy to production
- `npm run deploy:staging` - Deploy to staging

Remember: Always preview changes locally before deploying!
