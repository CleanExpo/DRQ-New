# Environment Management Guide

## Security Guidelines

1. **Never commit environment files**
   - All `.env` files are ignored by git
   - Use `.env.example` as a template
   - Keep sensitive values secure and private

2. **API Keys and Secrets**
   - Never hardcode API keys in scripts or code
   - Use environment variables for all sensitive data
   - Rotate keys if they are ever exposed

3. **Environment Files**
   - `.env.development` - Local development
   - `.env.staging` - Staging environment
   - `.env.production` - Production environment
   - `.env.local` - Local overrides (not tracked)

## Setup Instructions

1. Copy the template:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your values:
   - Never use production keys in development
   - Use different keys for each environment
   - Keep backup copies secure

3. Use the setup script:
   ```bash
   cp scripts/setup-env.template.ps1 scripts/setup-env.ps1
   # Edit setup-env.ps1 with your values
   ./scripts/setup-env.ps1
   ```

## Backup Management

1. Create encrypted backup:
   ```bash
   node scripts/backup-env.js create
   ```

2. List available backups:
   ```bash
   node scripts/backup-env.js list
   ```

3. Restore from backup:
   ```bash
   node scripts/backup-env.js restore YYYY-MM-DD
   ```

## Security Measures

1. **Encryption**
   - All backups are encrypted
   - Keep encryption keys secure
   - Store keys separately from backups

2. **Access Control**
   - Limit access to environment files
   - Use separate keys for each team member
   - Regularly audit access

3. **Monitoring**
   - Monitor for exposed secrets
   - Use GitHub's secret scanning
   - Set up alerts for potential exposures

## Emergency Response

If credentials are exposed:

1. Immediately rotate all exposed keys
2. Remove sensitive data from git history
3. Notify security team
4. Update all environments with new keys
5. Audit access logs for potential misuse

## Best Practices

1. Use environment-specific values
2. Never share credentials via unsecured channels
3. Regularly rotate sensitive keys
4. Keep documentation updated
5. Train team members on security practices

## Validation

Before deployment:

1. Verify all required variables are set
2. Check for any hardcoded values
3. Ensure proper encryption
4. Test environment loading
5. Verify access controls
