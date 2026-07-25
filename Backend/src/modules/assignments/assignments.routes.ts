import { Router } from "express";
import { AssignmentController } from "./assignments.controller";
import {
  authenticateToken,
  authorizeRoles,
} from "../../middleware/authMiddleware";
import { upload } from "../uploads/uploads.middleware";


const router = Router();


// Instructor creates an assignment
router.post(
  "/",
  authenticateToken,
  authorizeRoles("instructor"),
  AssignmentController.createAssignment
);


// Student views assignments for a course
router.get(
  "/course/:id",
  authenticateToken,
  authorizeRoles("student"),
  AssignmentController.getAssignmentsByCourse
);


// Student submits assignment with file upload
router.post(
  "/:id/submit",
  authenticateToken,
  authorizeRoles("student"),
  upload.single("file"),
  AssignmentController.submitAssignment
);


// Instructor grades submission
router.put(
  "/submissions/:id/grade",
  authenticateToken,
  authorizeRoles("instructor"),
  AssignmentController.gradeSubmission
);


export default router;