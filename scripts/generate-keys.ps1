# Generate SSH Key
$sshPath = "..\DRQ-New\.ssh"
$email = "admin@disasterrecoveryqld.au"
$name = "Disaster Recovery QLD"

# Create .ssh directory if it doesn't exist
if (-not (Test-Path $sshPath)) {
    New-Item -ItemType Directory -Path $sshPath
}

Write-Host "Generating SSH key..."
ssh-keygen -t ed25519 -C $email -f "$sshPath\id_ed25519" -N '""'

# Generate GPG Key
$gpgConfig = @"
%echo Generating GPG key
Key-Type: RSA
Key-Length: 4096
Subkey-Type: RSA
Subkey-Length: 4096
Name-Real: $name
Name-Email: $email
Expire-Date: 0
%no-protection
%commit
%echo Done
"@

$gpgConfig | Out-File -FilePath "$sshPath\gpg-gen-key.conf" -Encoding ASCII

Write-Host "Generating GPG key..."
gpg --batch --generate-key "$sshPath\gpg-gen-key.conf"

# Display the keys
Write-Host "`nSSH Public Key:"
Get-Content "$sshPath\id_ed25519.pub"

Write-Host "`nGPG Key:"
gpg --list-secret-keys --keyid-format LONG

Write-Host "`nAdd these keys to your GitHub account:"
Write-Host "1. Add the SSH public key to: https://github.com/settings/keys"
Write-Host "2. Add the GPG key to: https://github.com/settings/gpg/new"
