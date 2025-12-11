import { Router } from "express";
import { ContentController } from "./content.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { upsertContentSchema } from "./content.model";
const router = Router();
router.get("/", ContentController.list);
router.get("/:slug", ContentController.get);
router.put("/:slug", validateRequest(upsertContentSchema), ContentController.upsert);
export const contentRouter = router;
//# sourceMappingURL=content.routes.js.map