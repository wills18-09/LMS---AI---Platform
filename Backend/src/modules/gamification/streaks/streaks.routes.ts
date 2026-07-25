import { Router } from "express";
import { StreakController } from "./streaks.controller";
import {
  authenticateToken,
  authorizeRoles,
} from "../../../middleware/authMiddleware";

const router = Router();

// Update logged-in user's streak
router.post(
  "/update",
  authenticateToken,
  StreakController.updateDailyStreak
);

// Get logged-in user's streak
router.get(
  "/me",
  authenticateToken,
  StreakController.getMyStreak
);

// Get all streaks (admin)
router.get(
  "/",
  authenticateToken,
  authorizeRoles("admin"),
  StreakController.getAllStreaks
);

export default router;