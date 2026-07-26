import { Router, RequestHandler } from "express";

import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  approveCourse,
  getInstructorCourses,
} from "./course.controller";


import {
  authenticateToken,
  authorizeRoles,
} from "../../middleware/authMiddleware";


import { enrollCourse } from "../enrollments/enrollment.controller";


const router = Router();



// =======================
// COURSE ROUTES
// =======================



// GET /api/v1/courses
// Public course listing
router.get(
  "/",
  getCourses as RequestHandler
);





// GET /api/v1/courses/my
// Instructor's own courses
router.get(
  "/my",
  authenticateToken as RequestHandler,
  authorizeRoles("instructor") as RequestHandler,
  getInstructorCourses as RequestHandler
);





// GET /api/v1/courses/:id
// Single course details
router.get(
  "/:id",
  getCourseById as RequestHandler
);





// POST /api/v1/courses
// Instructor creates course
router.post(
  "/",
  authenticateToken as RequestHandler,
  authorizeRoles("instructor") as RequestHandler,
  createCourse as RequestHandler
);





// POST /api/v1/courses/:id/approve
// Admin approves/rejects course
router.post(
  "/:id/approve",
  authenticateToken as RequestHandler,
  authorizeRoles("admin") as RequestHandler,
  approveCourse as RequestHandler
);





// PUT /api/v1/courses/:id
// Instructor updates course
router.put(
  "/:id",
  authenticateToken as RequestHandler,
  authorizeRoles("instructor") as RequestHandler,
  updateCourse as RequestHandler
);





// =======================
// ENROLLMENT
// =======================



// Student enrolls in course
router.post(
  "/:id/enroll",
  authenticateToken as RequestHandler,
  authorizeRoles("student") as RequestHandler,
  enrollCourse as RequestHandler
);





export default router;