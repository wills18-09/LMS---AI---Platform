import { Router } from "express";
import { BadgeController } from "./badges.controller";

import {
  authenticateToken,
  authorizeRoles
} from "../../../middleware/authMiddleware";


const router = Router();


// Create badge (admin)
router.post(
  "/",
  authenticateToken,
  authorizeRoles("admin"),
  BadgeController.createBadge
);



// Get all badges
router.get(
  "/",
  authenticateToken,
  BadgeController.getBadges
);



// Award badge (admin)
router.post(
  "/award",
  authenticateToken,
  authorizeRoles("admin"),
  BadgeController.awardBadge
);



// Get my badges (student)
router.get(
  "/me",
  authenticateToken,
  authorizeRoles("student"),
  BadgeController.getMyBadges
);


export default router;