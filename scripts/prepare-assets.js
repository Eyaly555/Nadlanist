const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function prepareAssets() {
  try {
    console.log('🔧 Preparing assets for deployment...');
    
    // 1. Generate all icons
    console.log('📷 Generating icons...');
    execSync('node scripts/generate-icons.js', { stdio: 'inherit' });
    
    // 2. Update manifest.json
    console.log('📝 Checking manifest.json...');
    const manifestPath = path.join(__dirname, '../public/manifest.json');
    if (fs.existsSync(manifestPath)) {
      console.log('✅ manifest.json exists');
    } else {
      console.log('⚠️ manifest.json not found, creating it...');
      const manifest = {
        "name": "נדלניסט AI",
        "short_name": "נדלניסט",
        "description": "קונים? מוכרים? נדלניסט - המערכת החכמה לנדל\"ן",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#ffffff",
        "theme_color": "#00A6A2",
        "dir": "rtl", 
        "lang": "he",
        "icons": [
          {
            "src": "/favicon.ico",
            "sizes": "48x48",
            "type": "image/x-icon"
          },
          {
            "src": "/mark-black.svg",
            "sizes": "any",
            "type": "image/svg+xml"
          },
          {
            "src": "/favicon-16x16.png",
            "sizes": "16x16", 
            "type": "image/png"
          },
          {
            "src": "/favicon-32x32.png",
            "sizes": "32x32",
            "type": "image/png"
          },
          {
            "src": "/favicon-96x96.png",
            "sizes": "96x96",
            "type": "image/png"
          },
          {
            "src": "/apple-icon-72x72.png",
            "sizes": "72x72",
            "type": "image/png"
          },
          {
            "src": "/apple-icon-144x144.png", 
            "sizes": "144x144",
            "type": "image/png"
          },
          {
            "src": "/apple-icon-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          }
        ]
      };
      
      fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
      console.log('✅ manifest.json created');
    }
    
    // 3. Create robots.txt if it doesn't exist
    const robotsPath = path.join(__dirname, '../public/robots.txt');
    if (!fs.existsSync(robotsPath)) {
      console.log('📝 Creating robots.txt...');
      const robotsContent = `User-agent: *
Allow: /

Sitemap: ${process.env.NEXT_PUBLIC_APP_URL || 'https://nadlanist.ai'}/sitemap.xml`;
      
      fs.writeFileSync(robotsPath, robotsContent);
      console.log('✅ robots.txt created');
    }
    
    // 4. Create a basic sitemap.xml if it doesn't exist
    const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
    if (!fs.existsSync(sitemapPath)) {
      console.log('📝 Creating sitemap.xml...');
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nadlanist.ai';
      const today = new Date().toISOString().split('T')[0];
      
      const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/privacy</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${baseUrl}/terms</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>`;
      
      fs.writeFileSync(sitemapPath, sitemapContent);
      console.log('✅ sitemap.xml created');
    }
    
    console.log('✅ All assets prepared successfully!');
    
  } catch (error) {
    console.error('❌ Error preparing assets:', error);
    process.exit(1);
  }
}

prepareAssets(); 