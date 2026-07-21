import { Router, RequestHandler } from "express";

import {
  createLecture,
  getLectureById
} from "./lecture.controller";


import {
  authenticateToken,
  authorizeRoles,
} from "../../middleware/authMiddleware";


const router = Router();



// CREATE LECTURE
router.post(
  "/:moduleId/lectures",
  authenticateToken as RequestHandler,
  authorizeRoles("instructor") as RequestHandler,
  createLecture as RequestHandler
);



// GET LECTURE BY ID
router.get(
  "/:id",
  getLectureById as RequestHandler
);



export default router;