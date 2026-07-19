import { Router } from "express";
import { NotesController } from "./notes.controller";
import { authenticateToken } from "../../middleware/authMiddleware";


const router = Router();


router.post(
"/lectures/:id/notes",
authenticateToken,
NotesController.createNote
);


export default router;