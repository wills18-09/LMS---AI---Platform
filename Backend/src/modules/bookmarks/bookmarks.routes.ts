import { Router } from "express";
import { BookmarksController } from "./bookmarks.controller";
import { authenticateToken } from "../../middleware/authMiddleware";


const router = Router();



router.post(
  "/lectures/:id/bookmarks",
  authenticateToken,
  BookmarksController.createBookmark
);



router.get(
  "/lectures/:id/bookmarks",
  authenticateToken,
  BookmarksController.getBookmarks
);



export default router;