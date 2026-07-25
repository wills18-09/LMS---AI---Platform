import { Router, RequestHandler } from "express";

import {
  createLecture,
  getLectureById
} from "./lecture.controller";


import {
  authenticateToken,
  authorizeRoles,
} from "../../middleware/authMiddleware";


import { upload } from "../uploads/uploads.middleware";


const router = Router();



// CREATE LECTURE WITH VIDEO UPLOAD
router.post(
  "/:moduleId/lectures",
  authenticateToken as RequestHandler,
  authorizeRoles("instructor") as RequestHandler,
  upload.single("video"),
  createLecture as RequestHandler
);



// GET LECTURE BY ID
router.get(
  "/:id",
  getLectureById as RequestHandler
);



export default router;