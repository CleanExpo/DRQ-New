# Build Guide

## Build Commands

### Standard Build
```bash
npm run build
```

### Optimized Build
```bash
npm run build:optimize
```
Runs additional optimizations and analysis.

### Development Build
```bash
npm run dev
```
For local development with hot reloading.

## Build Configuration

### Environment Setup
1. Copy environment template:
```bash
cp .env.example .env.development
```

2. Set required variables:
```env
NEXT_PUBLIC_API_URL=http://localhost:3005/api
NEXT_PUBLIC_SITE_URL=http://localhost:3005
MONGODB_URI=mongodb://localhost:27017/drq
```

### Client vs Server Components

#### Client Components
Add 'use client' directive for components that:
- Use React hooks (useState, useEffect, etc.)
- Need browser APIs
- Require interactivity

Example:
```typescript
'use client';

import { useState } from 'react';

export function InteractiveComponent() {
  const [state, setState] = useState(null);
  // ...
}
```

#### Server Components
Default for all components. Better for:
- Static content
- SEO requirements
- Data fetching
- Reduced client-side JavaScript

## Build Troubleshooting

### Common Issues

1. Client/Server Component Errors
```
Error: You're importing a component that needs useState. It only works in a Client Component...
```
Solution: Add 'use client' directive to component file.

2. Environment Variables
```
Error: Missing environment variables...
```
Solution: Check .env.development and .env.production files.

3. Build Cache Issues
```bash
# Clear build cache
rm -rf .next
npm run build
```

### Performance Optimization

1. Analyze Bundle Size
```bash
npm run build:analyze
```

2. Optimize Images
- Use next/image component
- Configure in next.config.js
- Use WebP format

3. Code Splitting
- Use dynamic imports
- Lazy load components
- Configure chunking in next.config.js

## Build Scripts

### Pre-build Checks
```bash
npm run pre-deploy
```
Runs verification and safety checks.

### Build with Backup
```bash
npm run safe-deploy
```
Creates backups before building.

### Build Analysis
```bash
npm run build:analyze
```
Shows bundle size analysis.

## Deployment Builds

### Staging Build
```bash
npm run deploy:staging
```

### Production Build
```bash
npm run deploy:prod
```

## Best Practices

1. **Always Run Pre-checks**
```bash
npm run verify
```

2. **Create Backups**
```bash
npm run backup:all
```

3. **Test Locally**
```bash
npm run preview
```

4. **Check Bundle Size**
```bash
npm run build:analyze
```

5. **Use Safe Deployment**
```bash
npm run safe-deploy
```

## Build Pipeline

1. Pre-build Phase
   - Environment check
   - Dependency verification
   - Type checking

2. Build Phase
   - Code compilation
   - Asset optimization
   - Bundle generation

3. Post-build Phase
   - Build verification
   - Size analysis
   - Performance checks

## Monitoring Builds

### Build Logs
- Check `.next/build-logs`
- Monitor console output
- Review error messages

### Performance Metrics
- Bundle size
- Build time
- Chunk count

### Error Resolution
1. Check error messages
2. Review component structure
3. Verify environment setup
4. Clear cache if needed
5. Rebuild with verbose logging
