import express from "express";
import { requireAdmin } from "../middleware/auth";
import { contentRouter } from "../modules/content/content.routes";
import { mediaRouter } from "../modules/media/media.routes";
import { adminRouter } from "../modules/admin/admin.routes";
export const registerRoutes = (app) => {
    const api = express.Router();
    api.use("/admin", adminRouter);
    api.use("/content", requireAdmin, contentRouter);
    api.use("/media", requireAdmin, mediaRouter);
    app.use("/api", api);
};
//# sourceMappingURL=index.js.map