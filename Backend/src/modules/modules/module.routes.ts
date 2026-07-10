import { Router, RequestHandler } from "express";
import { createModule } from "./module.controller";
import {
  authenticateToken,
  authorizeRoles,
} from "../../middleware/authMiddleware";

const router = Router();

router.post(
  "/:courseId/modules",
  authenticateToken as RequestHandler,
  authorizeRoles("instructor") as RequestHandler,
  createModule as RequestHandler
);

export default router;