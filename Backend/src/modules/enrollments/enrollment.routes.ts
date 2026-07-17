import { Router } from "express";

import {
    enrollCourse,
    getMyEnrollments
} from "./enrollment.controller";

import {
    authenticateToken,
    authorizeRoles
} from "../../middleware/authMiddleware";


const router = Router();


router.post(
    "/:id/enroll",
    authenticateToken,
    authorizeRoles("student"),
    enrollCourse
);


router.get(
    "/me",
    authenticateToken,
    authorizeRoles("student"),
    getMyEnrollments
);


export default router;