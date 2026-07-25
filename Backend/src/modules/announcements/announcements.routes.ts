import { Router } from "express";
import { AnnouncementController } from "./announcements.controller";
import {
  authenticateToken,
  authorizeRoles
} from "../../middleware/authMiddleware";


const router = Router();


// Instructor creates announcement
router.post(
  "/announcements",
  authenticateToken,
  authorizeRoles("instructor"),
  AnnouncementController.createAnnouncement
);


// Students view course announcements
router.get(
  "/courses/:id/announcements",
  authenticateToken,
  AnnouncementController.getCourseAnnouncements
);


export default router;