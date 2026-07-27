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


// Student views assignments for a course
router.get(
  "/course/:id",
  authenticateToken,
  authorizeRoles("student"),
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