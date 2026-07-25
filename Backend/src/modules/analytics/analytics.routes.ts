import { Router } from "express";
import { AnalyticsController } from "./analytics.controller";
import {authenticateToken,authorizeRoles} from "../../middleware/authMiddleware";

const router = Router();


// Instructor dashboard
router.get(
  "/dashboard",
  authenticateToken,
  authorizeRoles("instructor"),
  AnalyticsController.getDashboardStats
);


// Course analytics
router.get(
  "/course/:courseId",
  authenticateToken,
  authorizeRoles("instructor"),
  AnalyticsController.getCourseAnalytics
);


// Lecture analytics
router.get(
  "/course/:courseId/lectures",
  authenticateToken,
  authorizeRoles("instructor"),
  AnalyticsController.getLectureAnalytics
);


// Quiz analytics
router.get(
  "/course/:courseId/quizzes",
  authenticateToken,
  authorizeRoles("instructor"),
  AnalyticsController.getQuizAnalytics
);


export default router;