import { Router } from "express";

import {
authenticateToken,
authorizeRoles
} from "../../middleware/authMiddleware";

import { AnalyticsController } from "./analytics.controller";


const router=Router();



router.get(
"/instructor",
authenticateToken,
authorizeRoles("instructor"),
AnalyticsController.instructorAnalytics
);



export default router;