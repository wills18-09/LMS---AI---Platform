import { Router } from "express";

import { AssignmentController } from "./assignments.controller";

import {
  authenticateToken,
  authorizeRoles,
} from "../../middleware/authMiddleware";

import { upload } from "../uploads/uploads.middleware";


const router = Router();



// ================================
// INSTRUCTOR
// ================================


// Instructor creates assignment
router.post(
  "/",
  authenticateToken,
  authorizeRoles("instructor"),
  AssignmentController.createAssignment
);





// Instructor views submissions for an assignment
router.get(
  "/:id/submissions",
  authenticateToken,
  authorizeRoles("instructor"),
  AssignmentController.getAssignmentSubmissions
);





// Instructor grades submission
router.put(
  "/submissions/:id/grade",
  authenticateToken,
  authorizeRoles("instructor"),
  AssignmentController.gradeSubmission
);







// ================================
// STUDENT
// ================================


// Student and Instructor view assignments for a course
router.get(
  "/course/:id",
  authenticateToken,
  authorizeRoles("student","instructor"),
  AssignmentController.getAssignmentsByCourse
);





// Student submits assignment
router.post(
  "/:id/submit",
  authenticateToken,
  authorizeRoles("student"),
  upload.single("file"),
  AssignmentController.submitAssignment
);





// Student gets submitted assignments
router.get(
  "/submissions/me",
  authenticateToken,
  authorizeRoles("student"),
  AssignmentController.getMySubmissions
);





export default router;