const { execSync } = require('child_process');

async function deploy() {
  try {
    // Create new deployment with environment variables
    console.log('Creating new deployment...');
    
    const command = [
      'vercel deploy --prod --yes --force',
      '--build-env NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="AIzaSyDBAl2DLElY3-k2zcRivOr6U7bWxU13L14"',
      '--build-env MONGODB_URI="mongodb+srv://phillmcgurk:CypWX7TNN1sE5pFh@disasterrecoveryqld.7obwi.mongodb.net/?retryWrites=true&w=majority&appName=DisasterRecoveryQld"',
      '--build-env NEXT_PUBLIC_SITE_URL="https://www.disasterrecoveryqld.au"',
      '--build-env NEXT_PUBLIC_API_URL="https://www.disasterrecoveryqld.au/api"'
    ].join(' ');

    execSync(command, {
      stdio: 'inherit',
      shell: true
    });

    console.log('Deployment completed successfully!');
  } catch (error) {
    console.error('Deployment failed:', error);
    process.exit(1);
  }
}

deploy();
