import { Router } from "express";
import { ReviewController } from "./reviews.controller";
import {
  authenticateToken,
  authorizeRoles
} from "../../middleware/authMiddleware";


const router = Router();


// Student adds review
router.post(
  "/courses/:id/reviews",
  authenticateToken,
  authorizeRoles("student"),
  ReviewController.createReview
);


// View course reviews
router.get(
  "/courses/:id/reviews",
  authenticateToken,
  ReviewController.getCourseReviews
);


export default router;