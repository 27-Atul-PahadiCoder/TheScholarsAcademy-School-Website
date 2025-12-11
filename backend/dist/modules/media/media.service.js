import { getSqlClient } from "../../config/sqlClient";
import { env } from "../../config/env";
export class MediaService {
    async recordUpload(file, description) {
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
    buildPublicUrl(filename) {
        if (env.CDN_BASE_URL) {
            return `${env.CDN_BASE_URL.replace(/\/$/, "")}/${filename}`;
        }
        return `/uploads/${filename}`;
    }
}
//# sourceMappingURL=media.service.js.map