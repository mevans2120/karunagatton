const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// Configuration for optimization
const CONFIG = {
  webp: {
    quality: 85,
    effort: 6
  },
  avif: {
    quality: 80,
    effort: 6
  },
  resize: {
    breakpoints: [640, 1080, 1920, 3840],
    withoutEnlargement: true,
    fit: 'inside'
  }
};

// Images to optimize (focusing on the large ones first)
const IMAGES_TO_OPTIMIZE = [
  '01_Yurt with flowers.jpg',  // 12 MB - highest priority
  '02_Karuna_Yurt.png',        // 9.2 MB
  '04_Yurt from a distance.jpg', // 7.6 MB
  'Photo of Yurt.jpg',         // 5.8 MB
  '03_karuna with drum.png',   // 3.9 MB
  '02_Purple house from driveway.jpg', // 3.0 MB
  'Karuna.jpg',                // 1.8 MB
  '03_path_to_yurt.jpg',       // 1.5 MB
  'Karuna in front of yurt.jpg', // 1.2 MB
  'Karuna_headshot.png',       // 1.2 MB
  'Homepage_Screenshot.png',   // 1.0 MB
  '01_Yurt_In_Spring.jpg',     // 858 KB
  '05_Purple house up close.JPG' // 477 KB
];

async function optimizeImage(inputPath, filename) {
  const ext = path.extname(filename);
  const nameWithoutExt = path.basename(filename, ext);
  const outputDir = path.dirname(inputPath);

  console.log(`\n📸 Processing: ${filename}`);

  try {
    // Get original file size
    const stats = await fs.stat(inputPath);
    const originalSize = (stats.size / 1024 / 1024).toFixed(2);
    console.log(`  Original size: ${originalSize} MB`);

    // Load the image
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Create WebP version at original size
    const webpPath = path.join(outputDir, `${nameWithoutExt}.webp`);
    await image
      .webp(CONFIG.webp)
      .toFile(webpPath);

    const webpStats = await fs.stat(webpPath);
    const webpSize = (webpStats.size / 1024 / 1024).toFixed(2);
    console.log(`  ✅ WebP created: ${webpSize} MB (${Math.round((1 - webpStats.size/stats.size) * 100)}% reduction)`);

    // Create AVIF version at original size (for modern browsers)
    const avifPath = path.join(outputDir, `${nameWithoutExt}.avif`);
    await image
      .avif(CONFIG.avif)
      .toFile(avifPath);

    const avifStats = await fs.stat(avifPath);
    const avifSize = (avifStats.size / 1024 / 1024).toFixed(2);
    console.log(`  ✅ AVIF created: ${avifSize} MB (${Math.round((1 - avifStats.size/stats.size) * 100)}% reduction)`);

    // Create responsive breakpoints for WebP
    for (const width of CONFIG.resize.breakpoints) {
      if (width < metadata.width) {
        const responsivePath = path.join(outputDir, `${nameWithoutExt}-${width}w.webp`);
        await sharp(inputPath)
          .resize(width, null, CONFIG.resize)
          .webp(CONFIG.webp)
          .toFile(responsivePath);

        const respStats = await fs.stat(responsivePath);
        const respSize = (respStats.size / 1024).toFixed(0);
        console.log(`  ✅ WebP ${width}w: ${respSize} KB`);
      }
    }

    return {
      original: originalSize,
      webp: webpSize,
      avif: avifSize,
      filename
    };

  } catch (error) {
    console.error(`  ❌ Error processing ${filename}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🚀 Starting image optimization...\n');

  const publicDir = path.join(__dirname, '..', 'public');
  const results = [];

  for (const filename of IMAGES_TO_OPTIMIZE) {
    const imagePath = path.join(publicDir, filename);

    try {
      await fs.access(imagePath);
      const result = await optimizeImage(imagePath, filename);
      if (result) results.push(result);
    } catch (error) {
      console.log(`  ⚠️  Skipping ${filename} - file not found`);
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 OPTIMIZATION SUMMARY');
  console.log('='.repeat(60));

  let totalOriginal = 0;
  let totalWebP = 0;
  let totalAVIF = 0;

  results.forEach(r => {
    totalOriginal += parseFloat(r.original);
    totalWebP += parseFloat(r.webp);
    totalAVIF += parseFloat(r.avif);
  });

  console.log(`\nTotal original size: ${totalOriginal.toFixed(2)} MB`);
  console.log(`Total WebP size: ${totalWebP.toFixed(2)} MB (${Math.round((1 - totalWebP/totalOriginal) * 100)}% reduction)`);
  console.log(`Total AVIF size: ${totalAVIF.toFixed(2)} MB (${Math.round((1 - totalAVIF/totalOriginal) * 100)}% reduction)`);
  console.log(`\n✨ Space saved: ${(totalOriginal - totalWebP).toFixed(2)} MB with WebP`);
  console.log(`✨ Space saved: ${(totalOriginal - totalAVIF).toFixed(2)} MB with AVIF`);

  console.log('\n✅ Image optimization complete!');
  console.log('\n📝 Next steps:');
  console.log('1. Update your components to use the .webp versions');
  console.log('2. Use the responsive variants for different screen sizes');
  console.log('3. Consider removing the original large JPG/PNG files after verification');
}

main().catch(console.error);