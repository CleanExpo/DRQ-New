# Template for setting up environment variables
# DO NOT add actual keys to this file
# Copy this file to setup-env.ps1 and replace placeholder values

Write-Host "Setting up environment variables..."

# Load from .env file if it exists
if (Test-Path .env) {
    Get-Content .env | ForEach-Object {
        if ($_ -match '^([^=]+)=(.*)$') {
            $key = $matches[1]
            $value = $matches[2]
            Set-Item -Path "env:$key" -Value $value
        }
    }
}

# Verify required environment variables
$requiredVars = @(
    'NEXT_PUBLIC_GOOGLE_MAPS_API_KEY',
    'MONGODB_URI',
    'NEXT_PUBLIC_SITE_URL',
    'NEXT_PUBLIC_API_URL'
)

$missingVars = @()
foreach ($var in $requiredVars) {
    if (-not (Get-Item "env:$var" -ErrorAction SilentlyContinue)) {
        $missingVars += $var
    }
}

if ($missingVars.Count -gt 0) {
    Write-Host "Error: Missing required environment variables:" -ForegroundColor Red
    $missingVars | ForEach-Object { Write-Host "- $_" -ForegroundColor Red }
    exit 1
}

Write-Host "Environment variables verified successfully." -ForegroundColor Green

# Optional: Deploy if all variables are set
$deployChoice = Read-Host "Would you like to deploy? (y/N)"
if ($deployChoice -eq 'y') {
    Write-Host "Deploying..."
    vercel deploy --prod
} else {
    Write-Host "Deployment skipped."
}
