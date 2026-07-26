import { Router, RequestHandler } from "express";

import {
  createLecture,
  getLectureById,
  updateLectureProgress,
  getLectureProgress
} from "./lecture.controller";

import {
  authenticateToken,
  authorizeRoles,
} from "../../middleware/authMiddleware";

import { upload } from "../uploads/uploads.middleware";


const router = Router();




// CREATE LECTURE (INSTRUCTOR ONLY)


router.post(
  "/:moduleId/lectures",
  authenticateToken as RequestHandler,
  authorizeRoles("instructor") as RequestHandler,
  upload.single("video"),
  createLecture as RequestHandler
);





// GET SINGLE LECTURE


router.get(
  "/:id",
  authenticateToken as RequestHandler,
  getLectureById as RequestHandler
);





// UPDATE LECTURE PROGRESS



router.post(
  "/:id/progress",
  authenticateToken as RequestHandler,
  updateLectureProgress as RequestHandler
);





// GET LECTURE PROGRESS


router.get(
  "/:id/progress",
  authenticateToken as RequestHandler,
  getLectureProgress as RequestHandler
);



export default router;