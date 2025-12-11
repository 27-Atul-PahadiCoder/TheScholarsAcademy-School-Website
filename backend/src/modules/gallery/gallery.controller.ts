import type { Request, Response } from "express";
import { sendSuccess } from "../../utils/http";
import { GalleryService } from "./gallery.service";
import type { GalleryUpdatePayload } from "./gallery.types";

const service = new GalleryService();

export const GalleryController = {
  listPublic: async (req: Request, res: Response) => {
    const { slug } = req.params;
    const photos = await service.listPhotos(slug, { includeInactive: false });
    return sendSuccess(res, photos);
  },
  listAdmin: async (req: Request, res: Response) => {
    const { slug } = req.params;
    const photos = await service.listPhotos(slug, { includeInactive: true });
    return sendSuccess(res, photos);
  },
  addPhoto: async (req: Request, res: Response) => {
    const { slug } = req.params;
    if (!req.file) {
      return res.status(400).json({ error: "Missing file" });
    }

    const photo = await service.addPhoto(slug, req.file, req.body.caption);
    return sendSuccess(res, photo, 201);
  },
  updatePhoto: async (req: Request, res: Response) => {
    const { slug, photoId } = req.params;
    const payload: GalleryUpdatePayload = {
      caption: req.body.caption,
      displayOrder:
        req.body.displayOrder !== undefined
          ? Number(req.body.displayOrder)
          : undefined,
      isActive:
        req.body.isActive !== undefined
          ? req.body.isActive === "true" || req.body.isActive === true
          : undefined,
    };

    const updated = await service.updatePhoto(slug, photoId, payload);
    if (!updated) {
      return res.status(404).json({ error: "Gallery photo not found" });
    }
    return sendSuccess(res, updated);
  },
  deletePhoto: async (req: Request, res: Response) => {
    const { slug, photoId } = req.params;
    const deleted = await service.deletePhoto(slug, photoId);
    if (!deleted) {
      return res.status(404).json({ error: "Gallery photo not found" });
    }
    return sendSuccess(res, { success: true });
  },
};
