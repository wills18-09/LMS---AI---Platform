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



// Instructor gets quizzes of a module
router.get(
  "/module/:moduleId",
  authenticateToken,
  authorizeRoles("instructor"),
  QuizController.getQuizzesByModule
);



// Instructor gets quiz questions
router.get(
  "/:id/questions",
  authenticateToken,
  authorizeRoles("instructor"),
  QuizController.getQuestions
);



// Instructor adds question to quiz
router.post(
  "/:id/questions",
  authenticateToken,
  authorizeRoles("instructor"),
  QuizController.addQuestion
);



// Instructor adds option to question
router.post(
  "/questions/:id/options",
  authenticateToken,
  authorizeRoles("instructor"),
  QuizController.addOption
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