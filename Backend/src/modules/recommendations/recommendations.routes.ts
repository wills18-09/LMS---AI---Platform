import { Router } from "express";

import {
  authenticateToken,
  authorizeRoles
} from "../../middleware/authMiddleware";

import {
  RecommendationsController
} from "./recommendations.controller";


const router = Router();



// Generate fresh recommendations

router.post(
  "/generate",
  authenticateToken,
  authorizeRoles("student"),
  RecommendationsController.generateRecommendations
);



// Get student recommendations

router.get(
  "/",
  authenticateToken,
  authorizeRoles("student"),
  RecommendationsController.getRecommendations
);



export default router;