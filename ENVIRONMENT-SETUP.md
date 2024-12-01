# Environment Setup Guide

## Required Environment Variables

These variables must be set in Vercel's dashboard for production deployment:

### Essential APIs
```
NEXT_PUBLIC_API_URL=https://api.disasterrecoveryqld.au
NEXT_PUBLIC_SITE_URL=https://disasterrecoveryqld.au
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=[Your Google Maps API Key]
```

### Database
```
MONGODB_URI=[Your MongoDB Connection String]
```

### Analytics & Monitoring (Optional)
```
NEXT_PUBLIC_GA_ID=[Your Google Analytics ID]
NEXT_PUBLIC_GTM_ID=[Your Google Tag Manager ID]
SENTRY_AUTH_TOKEN=[Your Sentry Auth Token]
NEXT_PUBLIC_SENTRY_DSN=[Your Sentry DSN]
```

## Setting Up Environment Variables

1. Go to your project in the Vercel dashboard
2. Navigate to Settings > Environment Variables
3. Add each variable with its corresponding value
4. Make sure to mark variables as Production only if they shouldn't be used in development
5. Click "Save" after adding each variable

## Verifying Setup

1. After deploying, verify that:
   - Google Maps integration works correctly
   - Database connections are successful
   - Analytics are tracking properly (if configured)

## Security Notes

- Never commit real API keys or sensitive credentials to the repository
- Use different values for development and production environments
- Regularly rotate sensitive credentials
- Monitor usage and set up appropriate rate limiting
