# GPG Key Configuration
$gpgConfig = @"
%echo Generating GPG key
Key-Type: RSA
Key-Length: 4096
Subkey-Type: RSA
Subkey-Length: 4096
Name-Real: Disaster Recovery QLD
Name-Email: admin@disasterrecoveryqld.au
Expire-Date: 0
%no-protection
%commit
%echo Done
"@

# Create temporary config file
$configPath = "gpg-gen-key.conf"
$gpgConfig | Out-File -FilePath $configPath -Encoding ASCII

# Generate key using the config file
Write-Host "Generating GPG key..."
gpg --batch --generate-key $configPath

# Clean up config file
Remove-Item $configPath

# Display the generated key
Write-Host "`nGPG Key Details:"
gpg --list-secret-keys --keyid-format LONG

Write-Host "`nTo export your public key for GitHub:"
Write-Host "1. Find your key ID from the output above (after 'sec 4096R/')"
Write-Host "2. Run: gpg --armor --export YOUR_KEY_ID"
Write-Host "3. Copy the output and add it to: https://github.com/settings/gpg/new"
