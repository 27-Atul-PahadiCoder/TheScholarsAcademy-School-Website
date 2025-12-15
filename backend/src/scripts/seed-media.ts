import mongoose from "mongoose";
import fs from "fs/promises";
import path from "path";
import connectMongo from "../config/mongoClient";
import { env } from "../config/env";
import { MediaModel } from "../modules/media/media.model";

const SCAN_DIRECTORIES = [
  "../../frontend/public/images",
  "../../frontend/build/assets",
];

async function seedMedia() {

  await connectMongo();
  

  let filesProcessed = 0;

  for (const dir of SCAN_DIRECTORIES) {
    const targetDir = path.resolve(__dirname, dir);
    console.log(`\nScanning directory: ${targetDir}`);
    

    try {
      const files = await fs.readdir(targetDir, { withFileTypes: true });

      for (const file of files) {
        if (file.isDirectory()) continue;

        const filePath = path.join(targetDir, file.name);
        const fileExt = path.extname(file.name).toLowerCase();
        const mimeType = getMimeType(fileExt);

        if (!mimeType) {
          // console.log(`- Skipping non-media file: ${file.name}`);
          continue;
        }

        // We construct the URL relative to the backend's perspective.
        // This assumes the frontend can resolve these paths.
        const relativePath = path.relative(path.resolve(__dirname, "../../"), filePath);
        const url = `/${relativePath.replace(/\\/g, "/")}`;

        const existing = await MediaModel.findOne({ url }).exec();
        if (existing) {
          // console.log(`- Skipping existing media: ${file.name}`);
          continue;
        }

        const fileStats = await fs.stat(filePath);

        const newMedia = new MediaModel({
          filename: file.name,
          url: url,
          mime_type: mimeType,
          size: fileStats.size,
          description: `Discovered on ${new Date().toLocaleDateString()}`,
        });

        await newMedia.save();
        filesProcessed++;
        console.log(`+ Added new media record: ${file.name}`);
      }
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        console.warn(`! Directory not found, skipping: ${targetDir}`);
      } else {
        console.error(`Error scanning directory ${targetDir}:`, error);
      }
    }
  }

  console.log(`\nScan complete. Added ${filesProcessed} new media records.`);
  await mongoose.disconnect();
  
}

function getMimeType(extension: string): string | null {
  switch (extension) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".gif":
      return "image/gif";
    case ".mp4":
      return "video/mp4";
    case ".webm":
      return "video/webm";
    case ".svg":
      return "image/svg+xml";
    default:
      return null;
  }
}

seedMedia().catch((error) => {
  console.error("Failed to seed media:", error);
  mongoose.disconnect();
  process.exit(1);
});