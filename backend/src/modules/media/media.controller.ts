import type { Request, Response } from "express";
import { sendSuccess } from "../../utils/http";
import { MediaService } from "./media.service";

const service = new MediaService();

export const MediaController = {
  list: async (_req: Request, res: Response) => {
    const items = await service.listMedia();
    return sendSuccess(res, items);
  },
  upload: async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ error: "Missing file" });
    }

    const record = await service.recordUpload(req.file, req.body.description);
    return sendSuccess(res, record, 201);
  },
};
