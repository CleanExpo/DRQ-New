# Environment Management Guide

## Overview

This guide covers how to manage environment variables and configurations safely across different environments.

## Environment Files

### Types of Environment Files
- `.env.development` - Local development settings
- `.env.production` - Production settings
- `.env.staging` - Staging environment settings
- `.env.local` - Local overrides (not tracked in git)

### Required Variables
```bash
NEXT_PUBLIC_API_URL=http://localhost:3005/api
NEXT_PUBLIC_SITE_URL=http://localhost:3005
MONGODB_URI=mongodb://localhost:27017/drq
```

## Backup System

The environment backup system includes encryption for security.

### Create Backup
```bash
npm run backup:env
```
This will:
- Create an encrypted backup of all env files
- Store them in `env-backups/YYYY-MM-DD/`
- Generate and save an encryption key (first time only)

### List Backups
```bash
npm run backup:env:list
```
Shows all available backups with their contents.

### Restore Backup
```bash
npm run backup:env:restore YYYY-MM-DD
```
Restores environment files from a specific backup date.

### Backup Everything
```bash
npm run backup:all
```
Backs up both content and environment files.

## Safe Deployment

### Pre-deployment with Environment Check
```bash
npm run pre-deploy
```
Includes environment variable validation.

### Full Safe Deployment
```bash
npm run safe-deploy
```
Includes:
1. Full backup (content + env)
2. Pre-deployment checks
3. Deployment

## Environment Security

### Encryption
- All environment backups are encrypted
- Encryption keys are stored separately
- Each backup has its own key file

### Best Practices

1. **Regular Backups**
   ```bash
   npm run backup:all
   ```

2. **Before Major Changes**
   ```bash
   npm run backup:env
   # Make your changes
   ```

3. **Verify Environment**
   ```bash
   npm run verify
   ```

4. **Safe Deployment**
   ```bash
   npm run safe-deploy
   ```

## Environment Setup

### New Environment Setup
1. Copy `.env.example` to new environment file:
   ```bash
   cp .env.example .env.development
   ```

2. Update variables as needed

3. Create backup:
   ```bash
   npm run backup:env
   ```

### Environment Migration
1. List available backups:
   ```bash
   npm run backup:env:list
   ```

2. Restore chosen backup:
   ```bash
   npm run backup:env:restore YYYY-MM-DD
   ```

3. Update variables for new environment

4. Create new backup:
   ```bash
   npm run backup:env
   ```

## Troubleshooting

### Missing Environment Files
1. Check for backups:
   ```bash
   npm run backup:env:list
   ```

2. Restore if available:
   ```bash
   npm run backup:env:restore YYYY-MM-DD
   ```

3. Or copy from example:
   ```bash
   cp .env.example .env.development
   ```

### Invalid Environment
1. Run verification:
   ```bash
   npm run verify
   ```

2. Check specific issues
3. Restore from backup if needed

Remember: Always backup before making environment changes!
