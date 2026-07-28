import { Router } from "express";

import {
 FlashcardController
} from "./flashcards.controller";


const router = Router();



router.post(
 "/generate/:lectureId",
 FlashcardController.generate
);



router.get(
 "/module/:moduleId",
 FlashcardController.getByModule
);



export default router;