const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const sourceDir = path.join(__dirname, 'postsss/elitewears.gallery');
const destDir = path.join(__dirname, 'src/assets');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Get all files
const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.webp') || f.endsWith('.jpg') || f.endsWith('.png'));

// Just pick 4 random files, or the first 4.
const selectedFiles = files.slice(0, 6);

async function compress() {
  for (let i = 0; i < selectedFiles.length; i++) {
    const file = selectedFiles[i];
    const sourcePath = path.join(sourceDir, file);
    const destPath = path.join(destDir, `product_${i + 1}.webp`);

    console.log(`Processing ${file}...`);
    try {
      await sharp(sourcePath)
        .resize({ width: 400 }) // resize to width 400px to drastically reduce size
        .webp({ quality: 50 }) // compress heavily to reach 10-30kb
        .toFile(destPath);
      
      const stats = fs.statSync(destPath);
      console.log(`Saved ${destPath} - Size: ${(stats.size / 1024).toFixed(2)} KB`);
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
}

compress();
