import { Router } from "express";

import { QuizAIController } from "./quizzes.ai.controller";

import {
 authenticateToken,
 authorizeRoles
} from "../../middleware/authMiddleware";


const router = Router();


router.post(
 "/generate/:lectureId",
 authenticateToken,
 authorizeRoles("student"),
 QuizAIController.generateQuiz
);


export default router;