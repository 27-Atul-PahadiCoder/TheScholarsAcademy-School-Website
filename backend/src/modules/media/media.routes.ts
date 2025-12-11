import { Router } from "express";
import { MediaController } from "./media.controller";
import { upload } from "../../config/storage";

const router = Router();

router.get("/", MediaController.list);
router.post("/upload", upload.single("file"), MediaController.upload);

export const mediaRouter = router;
