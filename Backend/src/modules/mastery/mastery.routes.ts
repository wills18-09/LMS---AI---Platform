import { Router } from "express";

import { MasteryController } from "./mastery.controller";

import {
  authenticateToken,
  authorizeRoles
} from "../../middleware/authMiddleware";

const router = Router();


// Get mastery for all lectures
router.get(
  "/",
  authenticateToken,
  authorizeRoles("student"),
  MasteryController.getCourseMastery
);


// Get mastery for a specific lecture
router.get(
  "/:lectureId",
  authenticateToken,
  authorizeRoles("student"),
  MasteryController.getLectureMastery
);


export default router;