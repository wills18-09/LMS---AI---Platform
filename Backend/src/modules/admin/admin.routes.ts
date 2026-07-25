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



// Platform analytics
router.get(
  "/analytics/overview",
  authenticateToken,
  authorizeRoles("admin"),
  AdminController.getOverview
);


export default router;