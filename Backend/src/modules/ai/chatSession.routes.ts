import { Router } from "express";


import {
  authenticateToken,
  authorizeRoles
} from "../../middleware/authMiddleware";


import {
  ChatSessionController
} from "./chatSession.controller";



const router = Router();





router.post(
  "/chat/sessions",
  authenticateToken,
  authorizeRoles("student"),
  ChatSessionController.createSession
);






router.post(
  "/chat/sessions/:id/messages",
  authenticateToken,
  authorizeRoles("student"),
  ChatSessionController.sendMessage
);






router.put(
  "/chat/sessions/:id/mode",
  authenticateToken,
  authorizeRoles("student"),
  ChatSessionController.updateMode
);






export default router;