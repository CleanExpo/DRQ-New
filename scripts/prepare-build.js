const fs = require('fs');
const path = require('path');

// Create necessary directories
const dirs = [
  'public/images',
  'public/images/locations',
  'public/images/services'
];

dirs.forEach(dir => {
  const fullPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Create placeholder images if they don't exist
const placeholders = [
  'public/images/default-service.jpg',
  'public/images/default-location.jpg',
  'public/images/water-damage-restoration.jpg',
  'public/images/flood-damage-cleanup.jpg',
  'public/images/mould-remediation.jpg',
  'public/images/storm-damage-repair.jpg',
  'public/images/sewage-cleanup.jpg',
  'public/images/locations/brisbane.jpg',
  'public/images/locations/gold-coast.jpg',
  'public/images/locations/ipswich.jpg'
];

placeholders.forEach(file => {
  const fullPath = path.join(process.cwd(), file);
  if (!fs.existsSync(fullPath)) {
    // Create a minimal 1x1 pixel JPEG
    const minimalJPEG = Buffer.from([
      0xff, 0xd8, // SOI marker
      0xff, 0xe0, 0x00, 0x10, 'JFIF', 0x00, 0x01, 0x01, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, // JFIF header
      0xff, 0xdb, 0x00, 0x43, 0x00, // DQT marker
      ...new Array(64).fill(1), // Quantization table
      0xff, 0xc0, 0x00, 0x0b, 0x08, 0x00, 0x01, 0x00, 0x01, 0x01, 0x01, 0x11, 0x00, // SOF marker
      0xff, 0xc4, 0x00, 0x14, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x09, // DHT marker
      0xff, 0xda, 0x00, 0x08, 0x01, 0x01, 0x00, 0x00, 0x3f, 0x00, // SOS marker
      0x37, // Image data
      0xff, 0xd9 // EOI marker
    ]);
    
    fs.writeFileSync(fullPath, minimalJPEG);
    console.log(`Created placeholder image: ${file}`);
  }
});

console.log('Build preparation complete!');
