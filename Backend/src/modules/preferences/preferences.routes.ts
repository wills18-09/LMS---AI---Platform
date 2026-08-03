import { Router } from "express";

import { PreferencesController } from "./preferences.controller";

import {
  authenticateToken,
  authorizeRoles
} from "../../middleware/authMiddleware";

const router = Router();

router.get(
  "/",
  authenticateToken,
  authorizeRoles("student"),
  PreferencesController.getDifficulty
);

router.put(
  "/",
  authenticateToken,
  authorizeRoles("student"),
  PreferencesController.updateDifficulty
);

export default router;