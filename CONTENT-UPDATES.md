# Quick Guide: Making Content Updates

## Safety First: Backup Your Content

Before making any changes, create a backup:

```bash
npm run backup
```

This will create a dated backup of all content in the `backups` directory.

To restore a backup if needed:
```bash
npm run backup:restore YYYY-MM-DD
```

## Making Safe Content Updates

Use our content update command that automatically creates a backup:
```bash
npm run content:update
```

This will:
1. Create a backup
2. Start the development server
3. Let you make and preview changes safely

## Common Updates

### 1. Update Service Information

1. Open `src/config/content.ts`
2. Find the service you want to update in `SERVICE_CONTENT`
3. Modify the content
4. Deploy with:
```bash
npm run content:deploy
```

Example service content:
```typescript
WATER_DAMAGE: {
  title: "Water Damage Restoration",
  description: "Professional water damage restoration services",
  features: [
    "Emergency water extraction",
    "Structural drying",
    "Moisture detection"
  ]
}
```

### 2. Update Service Areas

1. Open `src/components/shared/ServiceAreas.tsx`
2. Update the `SERVICE_AREAS` array
3. Deploy with:
```bash
npm run content:deploy
```

### 3. Add New Images

1. Add your image to `public/images/`
2. Reference in content:
```typescript
image: "/images/your-new-image.jpg"
```
3. Deploy with:
```bash
npm run content:deploy
```

### 4. Update Contact Information

1. Open `src/config/contact.ts`
2. Update the relevant information
3. Deploy with:
```bash
npm run content:deploy
```

## Preview Changes

Always preview your changes locally before deploying:

```bash
npm run preview
```

Visit http://localhost:3005 to see your changes.

## Safe Deployment Process

1. Start a content update session:
```bash
npm run content:update
```

2. Make your changes and preview them

3. Deploy with automatic backup:
```bash
npm run content:deploy
```

## Backup Management

### Create Manual Backup
```bash
npm run backup
```

### List Available Backups
Check the `backups` directory for available dates.

### Restore from Backup
```bash
npm run backup:restore YYYY-MM-DD
```

## Need Help?

If you're unsure about making changes:

1. Always create a backup first (`npm run backup`)
2. Preview changes locally
3. Contact the development team if needed

Remember: Your content is safe with automatic backups before any major changes!
