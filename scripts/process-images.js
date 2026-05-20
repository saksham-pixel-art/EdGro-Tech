import sharp from "sharp";
import fs from "fs";
import path from "path";

// Universities in the order they might appear in the collage
const UNIVERSITIES = [
  "amity", "dy-patil-pune", "jain-online", "lpu", "muj", "nmims",
  "niu", "shoolini", "smu", "uttaranchal", "vgu", "jamia"
];

// Configuration
const COLLAGE_PATH = path.resolve("C:/Users/acer/.gemini/antigravity/brain/1f299142-8df0-41b0-a7ae-f369e1059247/media__1778398934363.jpg");
const PUBLIC_DIR = path.resolve(process.cwd(), "public", "universities");

async function processImages() {
  if (!fs.existsSync(COLLAGE_PATH)) {
    console.error(`❌ Collage image not found at ${COLLAGE_PATH}`);
    console.log(`Please copy the collage image to the root folder and rename it to 'collage.png'`);
    process.exit(1);
  }

  console.log("🚀 Starting image optimization pipeline...");
  
  // Read collage metadata
  const metadata = await sharp(COLLAGE_PATH).metadata();
  console.log(`📸 Collage size: ${metadata.width}x${metadata.height}`);

  // Assuming a 6x2 or 4x3 grid for 12 images. 
  // You might need to adjust rows/cols based on your actual collage layout.
  const cols = 4;
  const rows = 3;
  const cellWidth = Math.floor(metadata.width / cols);
  const cellHeight = Math.floor(metadata.height / rows);

  let idx = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (idx >= UNIVERSITIES.length) break;
      const slug = UNIVERSITIES[idx];
      const dirPath = path.join(PUBLIC_DIR, slug);
      
      // Ensure directory exists
      if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });

      // Extract and compress to WebP
      const outPath = path.join(dirPath, "card.webp");
      
      await sharp(COLLAGE_PATH)
        .extract({ left: c * cellWidth, top: r * cellHeight, width: cellWidth, height: cellHeight })
        .resize(800, 450, { fit: 'cover' }) // Force 16:9 aspect ratio
        .webp({ quality: 85 })
        .toFile(outPath);
        
      console.log(`✅ Generated optimized WebP for ${slug} -> ${outPath}`);
      idx++;
    }
  }

  console.log("🎉 Image processing complete! All images are now standardized to 16:9 WebP format.");
}

processImages().catch(console.error);
