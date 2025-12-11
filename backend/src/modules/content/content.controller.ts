import type { Request, Response } from "express";
import { sendSuccess } from "../../utils/http";
import { ContentService } from "./content.service";

const service = new ContentService();

export const ContentController = {
  list: async (_req: Request, res: Response) => {
    const pages = await service.listPages();
    return sendSuccess(res, pages);
  },
  get: async (req: Request, res: Response) => {
    const item = await service.getPage(req.params.slug);
    if (!item) {
      return res.status(404).json({ error: "Page not found" });
    }
    return sendSuccess(res, item);
  },
  upsert: async (req: Request, res: Response) => {
    const payload = { ...req.body, slug: req.params.slug };
    const saved = await service.upsertPage(payload);
    return sendSuccess(res, saved, 201);
  },
};
