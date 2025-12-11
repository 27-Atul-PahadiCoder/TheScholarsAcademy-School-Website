import { Router } from "express";
import { z } from "zod";
import { AdminController } from "./admin.controller";
import { validateRequest } from "../../middleware/validateRequest";

const router = Router();

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
  }),
});

router.post("/login", validateRequest(loginSchema), AdminController.login);
router.post("/seed", AdminController.seed);

export const adminRouter = router;
