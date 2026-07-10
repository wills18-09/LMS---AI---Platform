import { Router, RequestHandler } from "express";
import { createCourse, getCourses, getCourseById , updateCourse } from "./course.controller";
import { approveCourse } from "./course.controller";
import {
  authenticateToken,
  authorizeRoles,
} from "../../middleware/authMiddleware";
import { createModule } from "../modules/module.controller";

const router = Router();

// GET /api/v1/courses
router.get(
  "/",
  getCourses as RequestHandler
);
router.get(
  "/:id",
  getCourseById as RequestHandler
);

// POST /api/v1/courses
router.post(
  "/",
  authenticateToken as RequestHandler,
  authorizeRoles("instructor") as RequestHandler,
  createCourse as RequestHandler
);

router.post(
  "/:id/approve",
  authenticateToken as RequestHandler,
  authorizeRoles("admin") as RequestHandler,
  approveCourse as RequestHandler
);

router.put(
  "/:id",
  authenticateToken as RequestHandler,
  authorizeRoles("instructor") as RequestHandler,
  updateCourse as RequestHandler
);

export default router;