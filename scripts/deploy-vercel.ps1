# Environment Variables
$env:NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION = "9JuBC8h4wi2w7UVLywNpDiZTO_W1apxHjOS49eOXStw"
$env:NEXT_PUBLIC_API_URL = "https://api.disasterrecoveryqld.au"
$env:NEXT_PUBLIC_SITE_URL = "https://www.disasterrecoveryqld.au"

Write-Host "Setting environment variables..."

# Add environment variables directly
vercel env add NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION $env:NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION production
vercel env add NEXT_PUBLIC_API_URL $env:NEXT_PUBLIC_API_URL production
vercel env add NEXT_PUBLIC_SITE_URL $env:NEXT_PUBLIC_SITE_URL production

Write-Host "Deploying to production..."
vercel deploy --prod
