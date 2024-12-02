import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import sharp from 'sharp';
import { createClient, Photos, ErrorResponse } from 'pexels';

const PEXELS_API_KEY = 'AN6Hid9mUDtsXoMBxUEH2QfgivCwTm5ngpG0gqyZnCMRKq1viTGTi5Nq';
const client = createClient(PEXELS_API_KEY);

interface ImageSize {
  width: number;
  height: number;
  suffix: string;
}

interface ImageConfig {
  search: string;
  filename: string;
  sizes: ImageSize[];
}

const SERVICE_IMAGES: ImageConfig[] = [
  {
    search: 'water damage restoration professional',
    filename: 'water-damage',
    sizes: [
      { width: 1200, height: 800, suffix: '' },
      { width: 600, height: 400, suffix: '-sm' }
    ]
  },
  {
    search: 'mold remediation professional cleaning',
    filename: 'mould-remediation',
    sizes: [
      { width: 1200, height: 800, suffix: '' },
      { width: 600, height: 400, suffix: '-sm' }
    ]
  },
  {
    search: 'sewage cleanup professional service',
    filename: 'sewage-cleanup',
    sizes: [
      { width: 1200, height: 800, suffix: '' },
      { width: 600, height: 400, suffix: '-sm' }
    ]
  },
  {
    search: 'storm damage repair house',
    filename: 'storm-damage',
    sizes: [
      { width: 1200, height: 800, suffix: '' },
      { width: 600, height: 400, suffix: '-sm' }
    ]
  },
  {
    search: 'fire damage restoration service',
    filename: 'fire-damage',
    sizes: [
      { width: 1200, height: 800, suffix: '' },
      { width: 600, height: 400, suffix: '-sm' }
    ]
  }
];

const LOCATION_IMAGES: ImageConfig[] = [
  {
    search: 'Brisbane city skyline modern',
    filename: 'brisbane',
    sizes: [
      { width: 1200, height: 800, suffix: '' },
      { width: 600, height: 400, suffix: '-sm' }
    ]
  },
  {
    search: 'Gold Coast Australia beach skyline',
    filename: 'gold-coast',
    sizes: [
      { width: 1200, height: 800, suffix: '' },
      { width: 600, height: 400, suffix: '-sm' }
    ]
  },
  {
    search: 'Ipswich Queensland historic buildings',
    filename: 'ipswich',
    sizes: [
      { width: 1200, height: 800, suffix: '' },
      { width: 600, height: 400, suffix: '-sm' }
    ]
  },
  {
    search: 'Logan City Queensland aerial',
    filename: 'logan',
    sizes: [
      { width: 1200, height: 800, suffix: '' },
      { width: 600, height: 400, suffix: '-sm' }
    ]
  },
  {
    search: 'Redland Bay Queensland waterfront',
    filename: 'redland',
    sizes: [
      { width: 1200, height: 800, suffix: '' },
      { width: 600, height: 400, suffix: '-sm' }
    ]
  }
];

async function downloadImage(url: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const writeStream = fs.createWriteStream(filepath);
        response.pipe(writeStream);
        writeStream.on('finish', () => {
          writeStream.close();
          resolve();
        });
      } else {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function optimizeImage(inputPath: string, outputPath: string, width: number, height: number): Promise<void> {
  try {
    // Create WebP version
    await sharp(inputPath)
      .resize(width, height, {
        fit: 'cover',
        position: 'attention'
      })
      .webp({ 
        quality: 85,
        effort: 6,
        smartSubsample: true
      })
      .toFile(outputPath);

    // Create AVIF version
    await sharp(inputPath)
      .resize(width, height, {
        fit: 'cover',
        position: 'attention'
      })
      .avif({ 
        quality: 85,
        effort: 9,
        chromaSubsampling: '4:4:4'
      })
      .toFile(outputPath.replace('.webp', '.avif'));
  } catch (error) {
    console.error(`Error optimizing image: ${error}`);
    throw error;
  }
}

async function safeUnlink(filepath: string) {
  try {
    if (fs.existsSync(filepath)) {
      await fs.promises.unlink(filepath);
    }
  } catch (error) {
    console.warn(`Warning: Could not delete temporary file ${filepath}: ${error}`);
    // Continue execution even if temp file deletion fails
  }
}

async function processImage(config: ImageConfig): Promise<void> {
  console.log(`🔍 Searching for "${config.search}" images...`);
  
  const tempPath = path.join(process.cwd(), `temp-${config.filename}.jpg`);
  
  try {
    const results = await client.photos.search({
      query: config.search,
      per_page: 1,
      orientation: 'landscape',
      size: 'large'
    }) as Photos;

    if (results.photos && results.photos.length > 0) {
      const photo = results.photos[0];
      
      console.log(`⬇️ Downloading image for ${config.filename}...`);
      await downloadImage(photo.src.original, tempPath);

      for (const size of config.sizes) {
        const outputPath = path.join(
          process.cwd(),
          'public/images',
          `${config.filename}${size.suffix}.webp`
        );
        
        console.log(`🔧 Optimizing ${config.filename}${size.suffix}.webp...`);
        await optimizeImage(tempPath, outputPath, size.width, size.height);
      }

      // Create JSON metadata file
      const metadataPath = path.join(
        process.cwd(),
        'public/images',
        `${config.filename}.json`
      );
      
      const metadata = {
        id: photo.id,
        width: photo.width,
        height: photo.height,
        photographer: photo.photographer,
        photographerUrl: photo.photographer_url,
        originalUrl: photo.url,
        alt: config.search,
        sizes: config.sizes.map(size => ({
          width: size.width,
          height: size.height,
          webp: `/images/${config.filename}${size.suffix}.webp`,
          avif: `/images/${config.filename}${size.suffix}.avif`
        }))
      };

      await fs.promises.writeFile(metadataPath, JSON.stringify(metadata, null, 2));
      console.log(`✅ Completed processing ${config.filename}`);
    } else {
      console.error(`❌ No images found for "${config.search}"`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${config.filename}:`, error);
  } finally {
    // Clean up temp file
    await safeUnlink(tempPath);
  }
}

async function ensureDirectoryExists(dir: string) {
  try {
    await fs.promises.mkdir(dir, { recursive: true });
  } catch (error) {
    console.error(`Error creating directory ${dir}:`, error);
    throw error;
  }
}

async function fetchImages() {
  console.log('🎨 Starting image fetching process...\n');

  // Create images directory if it doesn't exist
  const imagesDir = path.join(process.cwd(), 'public/images');
  await ensureDirectoryExists(imagesDir);

  // Process service images
  console.log('📸 Processing service images...');
  for (const config of SERVICE_IMAGES) {
    await processImage(config);
    // Add delay to respect API rate limits
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Process location images
  console.log('\n📸 Processing location images...');
  for (const config of LOCATION_IMAGES) {
    await processImage(config);
    // Add delay to respect API rate limits
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n✨ Image fetching complete!');
}

fetchImages().catch(console.error);
