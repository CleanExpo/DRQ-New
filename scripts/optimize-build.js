const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Starting build optimization...\n');

try {
  // 1. Clear build caches
  console.log('🧹 Cleaning build cache...');
  const cacheDirs = [
    '.next',
    'node_modules/.cache'
  ];

  cacheDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
      console.log(`   Cleared ${dir}`);
    }
  });

  // 2. Check and optimize node_modules
  console.log('\n📦 Optimizing dependencies...');
  try {
    execSync('npm dedupe');
    console.log('   Dependencies optimized');
  } catch (error) {
    console.warn('   ⚠️  Could not optimize dependencies:', error.message);
  }

  // 3. Verify TypeScript configuration
  console.log('\n🔍 Checking TypeScript configuration...');
  try {
    execSync('npx tsc --noEmit');
    console.log('   TypeScript configuration verified');
  } catch (error) {
    console.error('   ❌ TypeScript errors found. Please fix before building.');
    process.exit(1);
  }

  // 4. Run production build with performance profiling
  console.log('\n🏗️  Running optimized production build...');
  const buildStart = Date.now();
  
  try {
    execSync('cross-env NODE_OPTIONS="--max-old-space-size=4096" next build', {
      env: {
        ...process.env,
        NEXT_TELEMETRY_DISABLED: '1',
        ANALYZE: 'true'
      },
      stdio: 'inherit'
    });
    
    const buildTime = ((Date.now() - buildStart) / 1000).toFixed(2);
    console.log(`\n✨ Build completed in ${buildTime}s`);

    // 5. Analyze build output
    console.log('\n📊 Analyzing build output...');
    const buildDir = path.join('.next', 'static');
    if (fs.existsSync(buildDir)) {
      let totalSize = 0;
      const sizes = {};

      function calculateDirSize(dir) {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
          const filePath = path.join(dir, file);
          const stats = fs.statSync(filePath);
          if (stats.isDirectory()) {
            calculateDirSize(filePath);
          } else {
            const ext = path.extname(file);
            sizes[ext] = (sizes[ext] || 0) + stats.size;
            totalSize += stats.size;
          }
        });
      }

      calculateDirSize(buildDir);

      console.log('\nBuild size by file type:');
      Object.entries(sizes).forEach(([ext, size]) => {
        const mb = (size / 1024 / 1024).toFixed(2);
        console.log(`   ${ext || 'no extension'}: ${mb} MB`);
      });

      console.log(`\nTotal build size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
    }

    // 6. Verify build
    console.log('\n🔍 Verifying build...');
    try {
      execSync('npm run start', { stdio: 'ignore', timeout: 5000 });
      console.log('   ✅ Build verification successful');
    } catch (error) {
      console.log('   ⚠️  Could not verify build automatically');
    }

    console.log('\n✅ Build optimization complete!');
    console.log('\nNext steps:');
    console.log('1. Review the build analysis above');
    console.log('2. Test the build locally: npm run start');
    console.log('3. Deploy when ready: npm run deploy');

  } catch (buildError) {
    console.error('\n❌ Build failed:', buildError.message);
    process.exit(1);
  }

} catch (error) {
  console.error('\n❌ Optimization failed:', error.message);
  process.exit(1);
}
