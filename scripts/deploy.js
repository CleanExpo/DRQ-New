const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function deploy() {
  try {
    // 1. Check for uncommitted changes
    console.log('📋 Checking git status...');
    const status = execSync('git status --porcelain').toString();
    
    if (status) {
      console.log('\n🔄 Uncommitted changes found:');
      console.log(status);
      
      const answer = await new Promise(resolve => {
        rl.question('\nWould you like to commit these changes? (y/n) ', resolve);
      });
      
      if (answer.toLowerCase() === 'y') {
        const message = await new Promise(resolve => {
          rl.question('Enter commit message: ', resolve);
        });
        
        execSync('git add .');
        execSync(`git commit -m "${message}"`);
        console.log('✅ Changes committed');
      } else {
        console.log('❌ Deployment cancelled - please commit your changes first');
        process.exit(1);
      }
    }

    // 2. Pull latest changes
    console.log('\n📥 Pulling latest changes...');
    execSync('git pull origin main');

    // 3. Install dependencies
    console.log('\n📦 Installing dependencies...');
    execSync('npm install');

    // 4. Build the project
    console.log('\n🏗️ Building project...');
    execSync('npm run build');

    // 5. Deploy to Vercel
    console.log('\n🚀 Deploying to Vercel...');
    execSync('vercel --prod');

    console.log('\n✨ Deployment complete!');
    console.log('Visit your site to see the changes.');

  } catch (error) {
    console.error('\n❌ Deployment failed:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run the deployment
deploy();
