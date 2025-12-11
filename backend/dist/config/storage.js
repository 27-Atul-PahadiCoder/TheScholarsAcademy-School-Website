import multer from "multer";
import fs from "fs";
import path from "path";
import { env } from "./env";
const uploadDir = path.resolve(process.cwd(), env.MEDIA_UPLOAD_DIR);
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
        const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${unique}${path.extname(file.originalname)}`);
    },
});
export const upload = multer({
    storage,
    limits: { fileSize: 15 * 1024 * 1024 },
});
//# sourceMappingURL=storage.js.map