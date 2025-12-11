import { Router } from "express";
import { upload } from "../../config/storage";
import { requireAdmin } from "../../middleware/auth";
import { GalleryController } from "./gallery.controller";

const router = Router();

router.get("/:slug", GalleryController.listPublic);
router.get("/:slug/admin", requireAdmin, GalleryController.listAdmin);
router.post(
  "/:slug/photos",
  requireAdmin,
  upload.single("file"),
  GalleryController.addPhoto
);
router.patch(
  "/:slug/photos/:photoId",
  requireAdmin,
  GalleryController.updatePhoto
);
router.delete(
  "/:slug/photos/:photoId",
  requireAdmin,
  GalleryController.deletePhoto
);

export const galleryRouter = router;
