Write-Host "Setting up environment variables..."

$env:NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = "AIzaSyDBAl2DLElY3-k2zcRivOr6U7bWxU13L14"
$env:MONGODB_URI = "mongodb+srv://phillmcgurk:CypWX7TNN1sE5pFh@disasterrecoveryqld.7obwi.mongodb.net/?retryWrites=true&w=majority&appName=DisasterRecoveryQld"
$env:NEXT_PUBLIC_SITE_URL = "https://www.disasterrecoveryqld.au"
$env:NEXT_PUBLIC_API_URL = "https://www.disasterrecoveryqld.au/api"

Write-Host "Environment variables set. Deploying..."

vercel deploy --prod --yes --force
