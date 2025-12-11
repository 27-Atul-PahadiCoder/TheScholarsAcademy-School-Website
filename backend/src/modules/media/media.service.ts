import path from "path";
import { getSqlClient } from "../../config/sqlClient";
import { env } from "../../config/env";

export type MediaRecord = {
  id: string;
  filename: string;
  url: string;
  type: string;
  size: number;
  description?: string;
};

export class MediaService {
  async recordUpload(file: Express.Multer.File, description?: string) {
    const db = getSqlClient();
    const [record] = await db("media_assets")
      .insert({
        filename: file.filename,
        mime_type: file.mimetype,
        size: file.size,
        description: description ?? null,
        url: this.buildPublicUrl(file.filename),
      })
      .returning(["id", "filename", "url", "mime_type", "size", "description"]);

    return record;
  }

  async listMedia(limit = 50) {
    const db = getSqlClient();
    return db("media_assets").orderBy("created_at", "desc").limit(limit);
  }

  private buildPublicUrl(filename: string) {
    if (env.CDN_BASE_URL) {
      return `${env.CDN_BASE_URL.replace(/\/$/, "")}/${filename}`;
    }
    return `/uploads/${filename}`;
  }
}
