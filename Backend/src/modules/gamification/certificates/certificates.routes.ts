import { Router } from "express";
import { CertificateController } from "./certificates.controller";

import {
  authenticateToken,
  authorizeRoles
} from "../../../middleware/authMiddleware";


const router = Router();


// Generate certificate (student)
router.post(
  "/:courseId/generate",
  authenticateToken,
  authorizeRoles("student"),
  CertificateController.generateCertificate
);


// Get my certificates (student)
router.get(
  "/me",
  authenticateToken,
  authorizeRoles("student"),
  CertificateController.getMyCertificates
);


export default router;