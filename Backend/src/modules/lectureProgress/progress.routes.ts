import { Router, RequestHandler } from "express";
import { updateLectureProgress } from "./progress.controller";
import {
  authenticateToken,
  authorizeRoles,
} from "../../middleware/authMiddleware";

const router = Router();


// Update lecture watch progress
router.post(
  "/:id/progress",
  authenticateToken as RequestHandler,
  authorizeRoles("student") as RequestHandler,
  updateLectureProgress as RequestHandler
);


export default router;