import { Router } from "express";

import { QuizAIController } from "./quizzes.ai.controller";

import {
 authenticateToken,
 authorizeRoles
} from "../../middleware/authMiddleware";


const router = Router();


router.post(
 "/:lectureId",
 authenticateToken,
 authorizeRoles("instructor"),
 QuizAIController.generateQuiz
);


export default router;