import { Router } from "express";
import { BookmarksController } from "./bookmarks.controller";
import { authenticateToken } from "../../middleware/authMiddleware";


const router = Router();


router.post(
"/lectures/:id/bookmarks",
authenticateToken,
BookmarksController.createBookmark
);


export default router;