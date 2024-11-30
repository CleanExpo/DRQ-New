# DRQ Website

## Making Updates to the Live Site

### Quick Update Process

1. Make your changes locally
2. Run one command to deploy:
```bash
npm run update:deploy
```

This will:
- Pull latest changes
- Install dependencies
- Build the site
- Deploy to production

### Step-by-Step Process

1. **Get Latest Changes**
```bash
npm run update
```

2. **Make Your Changes**
Edit the files you need to update.

3. **Preview Changes Locally**
```bash
npm run preview
```
Visit http://localhost:3005 to see your changes.

4. **Deploy to Production**
```bash
npm run deploy
```

### Available Commands

- `npm run dev` - Start development server
- `npm run preview` - Build and preview locally
- `npm run deploy` - Deploy to production (interactive)
- `npm run deploy:staging` - Deploy to staging
- `npm run deploy:prod` - Deploy to production (direct)
- `npm run update` - Get latest changes and install dependencies
- `npm run update:deploy` - Update and deploy in one step

### Common Update Scenarios

#### 1. Update Content
1. Find the content file in `src/config/content.ts`
2. Make your changes
3. Run `npm run update:deploy`

#### 2. Update Images
1. Add new images to `public/images/`
2. Update references in content files
3. Run `npm run update:deploy`

#### 3. Update Services
1. Edit service files in `src/app/en-AU/services/`
2. Update service content in `src/config/content.ts`
3. Run `npm run update:deploy`

### Deployment Environments

- **Staging**: For testing changes
  ```bash
  npm run deploy:staging
  ```

- **Production**: For live site
  ```bash
  npm run deploy:prod
  ```

### Troubleshooting

If you encounter issues:

1. **Clean Install**
```bash
rm -rf node_modules .next
npm install
```

2. **Reset Local Changes**
```bash
git reset --hard
git pull
npm install
```

3. **Check Build Locally**
```bash
npm run build
```

### Need Help?

1. Check the deployment logs in GitHub Actions
2. Review the Vercel deployment dashboard
3. Contact the development team for support

Remember to always preview changes locally before deploying to production.
