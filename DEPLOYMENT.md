# Deployment Checklist

## Pre-Deployment Security Checks

1. Environment Variables
   - [ ] Run `npm run backup-env` to backup current environment files
   - [ ] Verify all sensitive values are properly set in production environment
   - [ ] Ensure no development keys are present in production environment
   - [ ] Verify all API keys are production versions

2. Security Configurations
   - [ ] Check JWT_SECRET is properly set and secure
   - [ ] Verify ENCRYPTION_KEY is properly set
   - [ ] Confirm all API endpoints use HTTPS
   - [ ] Verify CSP headers are configured correctly

3. Database & Cache
   - [ ] Verify MongoDB connection string is production instance
   - [ ] Confirm Redis configuration is production setup
   - [ ] Check database access permissions
   - [ ] Verify database backups are configured

4. Monitoring Setup
   - [ ] Configure Sentry error tracking
   - [ ] Set up New Relic monitoring
   - [ ] Enable LogRocket session recording
   - [ ] Verify Google Analytics tracking

## Deployment Steps

1. Repository Preparation
   ```bash
   # Run all pre-deployment checks
   npm run pre-deploy

   # Backup environment files
   npm run backup-env

   # Build the application
   npm run build
   ```

2. Environment Configuration
   ```bash
   # Set up production environment
   cp .env.production .env

   # Verify environment variables
   node scripts/verify-env.js
   ```

3. Performance Optimization
   - [ ] Run Lighthouse audit
   - [ ] Check Core Web Vitals
   - [ ] Verify image optimization
   - [ ] Check bundle size analysis

4. SEO Verification
   - [ ] Verify sitemap.xml is generated
   - [ ] Check robots.txt configuration
   - [ ] Confirm meta tags are correct
   - [ ] Verify schema markup

## Post-Deployment Checks

1. Functionality
   - [ ] Test all service pages
   - [ ] Verify location-specific content
   - [ ] Check contact forms
   - [ ] Test emergency response features

2. Performance
   - [ ] Run performance monitoring
   - [ ] Check page load times
   - [ ] Verify CDN configuration
   - [ ] Test mobile responsiveness

3. Security
   - [ ] Run security scan
   - [ ] Check SSL configuration
   - [ ] Verify access controls
   - [ ] Test rate limiting

4. Monitoring
   - [ ] Verify error tracking
   - [ ] Check analytics setup
   - [ ] Test logging system
   - [ ] Monitor server resources

## Production URLs

- Main Site: https://www.disasterrecoveryqld.au
- API: https://api.disasterrecoveryqld.au
- Admin Dashboard: https://admin.disasterrecoveryqld.au

## Emergency Contacts

- Technical Support: support@disasterrecoveryqld.au
- Emergency Line: 1300 309 361

## Rollback Procedure

1. Access previous deployment
   ```bash
   # Get deployment history
   npm run deployment:list

   # Rollback to previous version
   npm run deployment:rollback
   ```

2. Restore environment backup
   ```bash
   # List available backups
   npm run backup-env -- --restore

   # Restore specific backup
   npm run backup-env -- --restore --timestamp <backup-timestamp>
   ```

## Security Policies

1. Environment Variables
   - Never commit .env files to repository
   - Use encrypted backups for sensitive data
   - Rotate secrets regularly

2. Access Control
   - Use principle of least privilege
   - Regular access review
   - Monitor suspicious activities

3. Data Protection
   - Regular backups
   - Encrypt sensitive data
   - Monitor data access

4. Incident Response
   - Document all incidents
   - Follow response procedure
   - Regular security updates

Remember to update this checklist as new requirements are added to the deployment process.
