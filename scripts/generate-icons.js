const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_DIR = path.join(__dirname, '../public');

async function generateIcons() {
  try {
    // Generate favicons from mark SVG
    const markSvg = fs.readFileSync(path.join(PUBLIC_DIR, 'mark-black.svg'));
    
    // Favicon sizes
    const faviconSizes = [16, 32, 48, 72, 96, 128, 144, 152, 192];
    
    for (const size of faviconSizes) {
      await sharp(markSvg)
        .resize(size, size)
        .toFile(path.join(PUBLIC_DIR, `favicon-${size}x${size}.png`));
      
      // Also create Apple icon versions
      if (size >= 72) {
        await sharp(markSvg)
          .resize(size, size)
          .toFile(path.join(PUBLIC_DIR, `apple-icon-${size}x${size}.png`));
      }
    }
    
    // Create favicon.ico (16x16)
    await sharp(markSvg)
      .resize(48, 48)
      .toFile(path.join(PUBLIC_DIR, 'favicon.ico'));
    
    // Generate Open Graph and Twitter images from logo
    const logoSvg = fs.readFileSync(path.join(PUBLIC_DIR, 'logo-teal.svg'));
    
    // Create OG image (1200x630)
    await sharp(logoSvg)
      .resize(1200, 630, { fit: 'contain', background: { r: 255, g: 255, b: 255 } })
      .toFile(path.join(PUBLIC_DIR, 'og-image.png'));
    
    // Create Twitter image (1200x600)
    await sharp(logoSvg)
      .resize(1200, 600, { fit: 'contain', background: { r: 255, g: 255, b: 255 } })
      .toFile(path.join(PUBLIC_DIR, 'twitter-image.png'));
    
    console.log('✅ All icons generated successfully!');
  } catch (error) {
    console.error('❌ Error generating icons:', error);
  }
}

generateIcons(); 