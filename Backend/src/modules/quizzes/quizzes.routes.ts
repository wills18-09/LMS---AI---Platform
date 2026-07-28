import { Router } from "express";
import { QuizController } from "./quizzes.controller";

import {
  authenticateToken,
  authorizeRoles
} from "../../middleware/authMiddleware";


const router = Router();



// =====================================
// INSTRUCTOR ROUTES
// =====================================


// Instructor creates quiz
router.post(
  "/",
  authenticateToken,
  authorizeRoles("instructor"),
  QuizController.createQuiz
);


// Generate AI quiz from lecture
router.post(
  "/generate-ai/:lectureId",
  authenticateToken,
  authorizeRoles("instructor"),
  QuizController.generateAIQuiz
);


// Instructor gets quizzes of a module
router.get(
  "/module/:moduleId",
  authenticateToken,
  authorizeRoles("instructor"),
  QuizController.getQuizzesByModule
);


// =====================================
// STUDENT ROUTES
// =====================================


// Student starts quiz attempt
router.post(
  "/:id/attempt",
  authenticateToken,
  authorizeRoles("student"),
  QuizController.startAttempt
);



// Student submits quiz
router.post(
  "/attempts/:id/submit",
  authenticateToken,
  authorizeRoles("student"),
  QuizController.submitAttempt
);



// =====================================
// QUIZ VIEW ROUTES
// =====================================


// Instructor view quiz

router.get(
  "/instructor/:id",
  authenticateToken,
  authorizeRoles("instructor"),
  QuizController.getQuiz
);



// Student views quiz

router.get(
  "/:id",
  authenticateToken,
  authorizeRoles("student"),
  QuizController.getQuiz
);


export default router;