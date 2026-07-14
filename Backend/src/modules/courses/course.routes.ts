import { Router, RequestHandler } from "express";
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  approveCourse,
} from "./course.controller";

import {
  authenticateToken,
  authorizeRoles,
} from "../../middleware/authMiddleware";

import { createModule } from "../modules/module.controller";

// 👇 NEW IMPORT
import { enrollCourse } from "../enrollments/enrollment.controller";

const router = Router();

// =======================
// COURSE ROUTES
// =======================

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

// Approve Course (Admin)
router.post(
  "/:id/approve",
  authenticateToken as RequestHandler,
  authorizeRoles("admin") as RequestHandler,
  approveCourse as RequestHandler
);

// Update Course
router.put(
  "/:id",
  authenticateToken as RequestHandler,
  authorizeRoles("instructor") as RequestHandler,
  updateCourse as RequestHandler
);

// =======================
// ENROLLMENT
// =======================

// Student enrolls in a course
router.post(
  "/:id/enroll",
  authenticateToken as RequestHandler,
  authorizeRoles("student") as RequestHandler,
  enrollCourse as RequestHandler
);

export default router;