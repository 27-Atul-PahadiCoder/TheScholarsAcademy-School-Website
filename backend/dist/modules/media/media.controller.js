import { sendSuccess } from "../../utils/http";
import { MediaService } from "./media.service";
const service = new MediaService();
export const MediaController = {
    list: async (_req, res) => {
        const items = await service.listMedia();
        return sendSuccess(res, items);
    },
    upload: async (req, res) => {
        if (!req.file) {
            return res.status(400).json({ error: "Missing file" });
        }
        const record = await service.recordUpload(req.file, req.body.description);
        return sendSuccess(res, record, 201);
    },
};
//# sourceMappingURL=media.controller.js.map