import { Router } from "express";
import { UploadController } from "./uploads.controller";
import {
  authenticateToken,
  authorizeRoles
} from "../../middleware/authMiddleware";
import { upload } from "./uploads.middleware";


const router = Router();


// Instructor + Student file uploads
router.post(
  "/upload",
  authenticateToken,
  authorizeRoles(
    "student",
    "instructor"
  ),
  upload.single("file"),
  UploadController.uploadFile
);


export default router;