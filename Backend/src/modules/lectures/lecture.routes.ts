import { Router, RequestHandler } from "express";
import { createLecture } from "./lecture.controller";
import {
  authenticateToken,
  authorizeRoles,
} from "../../middleware/authMiddleware";

const router = Router();

router.post(
  "/:moduleId/lectures",
  authenticateToken as RequestHandler,
  authorizeRoles("instructor") as RequestHandler,
  createLecture as RequestHandler
);



export default router;