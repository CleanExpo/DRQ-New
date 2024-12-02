import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';

async function saveLogo() {
  const logoBuffer = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">
      <defs>
        <linearGradient id="outer-ring" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#d4af37;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#c5a028;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="inner-circle" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#000000;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1a1a1a;stop-opacity:1" />
        </linearGradient>
        <filter id="lightning-glow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0.5   1 1 1 0 1  0 0 0 1 0"/>
        </filter>
      </defs>
      
      <!-- Outer Ring -->
      <circle cx="250" cy="250" r="240" fill="url(#outer-ring)" />
      <circle cx="250" cy="250" r="220" fill="url(#inner-circle)" />
      
      <!-- Building -->
      <rect x="200" y="150" width="100" height="200" fill="#d4af37" />
      <rect x="220" y="170" width="20" height="20" fill="#ffffff" opacity="0.3" />
      <rect x="260" y="170" width="20" height="20" fill="#ffffff" opacity="0.3" />
      <rect x="220" y="210" width="20" height="20" fill="#ffffff" opacity="0.3" />
      <rect x="260" y="210" width="20" height="20" fill="#ffffff" opacity="0.3" />
      
      <!-- Lightning -->
      <path d="M150,150 L200,200 L175,250 L225,300 L200,350" 
            stroke="#00ffff" 
            stroke-width="10" 
            fill="none" 
            filter="url(#lightning-glow)" />
      
      <!-- Text -->
      <text x="250" y="100" 
            font-family="Arial Black" 
            font-size="24" 
            fill="#d4af37" 
            text-anchor="middle">DISASTER RECOVERY QLD</text>
      <text x="250" y="400" 
            font-family="Arial" 
            font-size="18" 
            fill="#d4af37" 
            text-anchor="middle">ESTD 2011</text>
      <text x="250" y="430" 
            font-family="Arial" 
            font-size="16" 
            fill="#d4af37" 
            text-anchor="middle">WATER · SEWAGE · STORM · MOULD</text>
      <text x="250" y="450" 
            font-family="Arial" 
            font-size="16" 
            fill="#d4af37" 
            text-anchor="middle">RESTORATION SERVICES</text>
    </svg>
  `);

  // Create the images directory if it doesn't exist
  const imagesDir = path.join(process.cwd(), 'public/images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  // Save the logo in different sizes
  const sizes = [
    { width: 120, height: 120, suffix: '' },
    { width: 240, height: 240, suffix: '@2x' },
    { width: 360, height: 360, suffix: '@3x' }
  ];

  for (const size of sizes) {
    const outputPath = path.join(
      process.cwd(),
      'public/images',
      `logo${size.suffix}.png`
    );

    await sharp(logoBuffer)
      .resize(size.width, size.height, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(outputPath);

    console.log(`✅ Saved logo${size.suffix}.png`);
  }

  // Save favicon
  const faviconPath = path.join(process.cwd(), 'public/favicon.ico');
  await sharp(logoBuffer)
    .resize(32, 32)
    .toFile(faviconPath);
  
  console.log('✅ Saved favicon.ico');
  console.log('\n✨ Logo processing complete!');
}

saveLogo().catch(console.error);
