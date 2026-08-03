import { Router } from "express";

import {
  authenticateToken,
  authorizeRoles
} from "../../middleware/authMiddleware";

import {
  StudyPlansController
} from "./studyPlans.controller";


const router = Router();



router.post(

  "/generate",

  authenticateToken,

  authorizeRoles("student"),

  StudyPlansController.generatePlan

);



router.get(

  "/:courseId",

  authenticateToken,

  authorizeRoles("student"),

  StudyPlansController.getPlan

);



export default router;