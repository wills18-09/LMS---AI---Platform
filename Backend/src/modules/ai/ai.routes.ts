import { Router } from "express";

import {
  AIController
} from "./ai.controller";


const router = Router();



router.post(
  "/chat",
  AIController.chat
);



export default router;