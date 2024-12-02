const fs = require('fs');
const path = require('path');
const https = require('https');

const requiredImages = [
  {
    name: 'water-damage-restoration.jpg',
    url: 'https://source.unsplash.com/1920x1080/?flood,water,damage',
    width: 1920,
    height: 1080
  },
  {
    name: 'flood-damage-cleanup.jpg',
    url: 'https://source.unsplash.com/1920x1080/?flood,cleanup',
    width: 1920,
    height: 1080
  },
  {
    name: 'mould-remediation.jpg',
    url: 'https://source.unsplash.com/1920x1080/?mold,damage',
    width: 1920,
    height: 1080
  },
  {
    name: 'storm-damage-repair.jpg',
    url: 'https://source.unsplash.com/1920x1080/?storm,damage',
    width: 1920,
    height: 1080
  },
  {
    name: 'sewage-cleanup.jpg',
    url: 'https://source.unsplash.com/1920x1080/?sewage,cleanup',
    width: 1920,
    height: 1080
  },
  {
    name: 'default-service.jpg',
    url: 'https://source.unsplash.com/1920x1080/?restoration,service',
    width: 1920,
    height: 1080
  },
  {
    name: 'default-location.jpg',
    url: 'https://source.unsplash.com/1920x1080/?brisbane,city',
    width: 1920,
    height: 1080
  },
  {
    name: 'logo.png',
    url: 'https://placehold.co/200x80/0066cc/ffffff/png?text=DRQ',
    width: 200,
    height: 80
  }
];

const imagesDir = path.join(process.cwd(), 'public', 'images');

// Create images directory if it doesn't exist
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
  console.log('Created images directory');
}

// Function to download an image
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });

      fileStream.on('error', (err) => {
        fs.unlink(filepath, () => reject(err));
      });
    }).on('error', reject);
  });
}

// Check and download missing images
async function verifyImages() {
  console.log('Verifying required images...');
  
  for (const image of requiredImages) {
    const filepath = path.join(imagesDir, image.name);
    
    if (!fs.existsSync(filepath)) {
      console.log(`Downloading missing image: ${image.name}`);
      try {
        await downloadImage(image.url, filepath);
        console.log(`Successfully downloaded: ${image.name}`);
      } catch (error) {
        console.error(`Failed to download ${image.name}:`, error);
      }
    } else {
      console.log(`Image exists: ${image.name}`);
    }
  }

  console.log('Image verification complete');
}

// Run the verification
verifyImages().catch(console.error);
