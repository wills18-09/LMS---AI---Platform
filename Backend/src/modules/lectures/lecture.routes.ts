import { Router, RequestHandler } from "express";

import {
  createLecture,
  getLectureById,
  updateLectureProgress,
  getLectureProgress,
  updateLecture,
  deleteLecture
} from "./lecture.controller";

import {
  authenticateToken,
  authorizeRoles,
} from "../../middleware/authMiddleware";

import { upload } from "../uploads/uploads.middleware";

const router = Router();

// CREATE LECTURE
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

// UPDATE LECTURE
router.put(
  "/:id",
  authenticateToken as RequestHandler,
  authorizeRoles("instructor") as RequestHandler,
  upload.single("video"),
  updateLecture as RequestHandler
);

// DELETE LECTURE
router.delete(
  "/:id",
  authenticateToken as RequestHandler,
  authorizeRoles("instructor") as RequestHandler,
  deleteLecture as RequestHandler
);

// UPDATE PROGRESS
router.post(
  "/:id/progress",
  authenticateToken as RequestHandler,
  updateLectureProgress as RequestHandler
);

// GET PROGRESS
router.get(
  "/:id/progress",
  authenticateToken as RequestHandler,
  getLectureProgress as RequestHandler
);

export default router;