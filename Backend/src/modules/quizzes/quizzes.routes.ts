import { Router } from "express";
import { QuizController } from "./quizzes.controller";

import {
  authenticateToken,
  authorizeRoles
} from "../../middleware/authMiddleware";


const router = Router();


// Instructor creates quiz
router.post(
  "/",
  authenticateToken,
  authorizeRoles("instructor"),
  QuizController.createQuiz
);


// Instructor adds question
router.post(
  "/:id/questions",
  authenticateToken,
  authorizeRoles("instructor"),
  QuizController.addQuestion
);


// Instructor adds option
router.post(
  "/questions/:id/options",
  authenticateToken,
  authorizeRoles("instructor"),
  QuizController.addOption
);


// Student starts attempt
router.post(
  "/:id/attempt",
  authenticateToken,
  authorizeRoles("student"),
  QuizController.startAttempt
);

router.post(
  "/attempts/:id/submit",
  authenticateToken,
  authorizeRoles("student"),
  QuizController.submitAttempt
);


export default router;