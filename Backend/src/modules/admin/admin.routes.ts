import { Router } from "express";
import { AdminController } from "./admin.controller";
import {
  authenticateToken,
  authorizeRoles,
} from "../../middleware/authMiddleware";


const router = Router();


// Get all users
router.get(
  "/users",
  authenticateToken,
  authorizeRoles("admin"),
  AdminController.getUsers
);



// Change user role
router.put(
  "/users/:id/role",
  authenticateToken,
  authorizeRoles("admin"),
  AdminController.updateUserRole
);



// Suspend user
router.put(
  "/users/:id/suspend",
  authenticateToken,
  authorizeRoles("admin"),
  AdminController.suspendUser
);

// Pending courses
router.get(
  "/courses/pending",
  authenticateToken,
  authorizeRoles("admin"),
  AdminController.getPendingCourses
);


// Approve course
router.put(
  "/courses/:id/approve",
  authenticateToken,
  authorizeRoles("admin"),
  AdminController.approveCourse
);


// Reject course
router.put(
  "/courses/:id/reject",
  authenticateToken,
  authorizeRoles("admin"),
  AdminController.rejectCourse
);

// Platform analytics
router.get(
  "/analytics/overview",
  authenticateToken,
  authorizeRoles("admin"),
  AdminController.getOverview
);

router.get(
  "/analytics/detailed",
  authenticateToken,
  authorizeRoles("admin"),
  AdminController.getDetailedAnalytics
);


export default router;