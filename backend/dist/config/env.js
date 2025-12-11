import dotenv from "dotenv";
let loaded = false;
export const loadEnv = () => {
    if (loaded)
        return;
    dotenv.config({ path: process.env.ADMIN_ENV_FILE ?? ".env" });
    loaded = true;
};
const requireValue = (value, key) => {
    if (!value) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
};
loadEnv();
export const env = {
    NODE_ENV: process.env.NODE_ENV ?? "development",
    PORT: Number(process.env.PORT ?? 4000),
    SQL_DATABASE_URL: requireValue(process.env.SQL_DATABASE_URL, "SQL_DATABASE_URL"),
    MONGODB_URI: requireValue(process.env.MONGODB_URI, "MONGODB_URI"),
    PINECONE_API_KEY: requireValue(process.env.PINECONE_API_KEY, "PINECONE_API_KEY"),
    PINECONE_INDEX: requireValue(process.env.PINECONE_INDEX, "PINECONE_INDEX"),
    PINECONE_NAMESPACE: process.env.PINECONE_NAMESPACE ?? "school-content",
    JWT_SECRET: requireValue(process.env.JWT_SECRET, "JWT_SECRET"),
    MEDIA_UPLOAD_DIR: process.env.MEDIA_UPLOAD_DIR ?? "uploads",
    CDN_BASE_URL: process.env.CDN_BASE_URL ?? "",
};
//# sourceMappingURL=env.js.map