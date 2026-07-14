import {Router} from "express";

import {
enrollCourse
}
from "./enrollment.controller";

import {
authenticateToken,
authorizeRoles
}
from "../../middleware/authMiddleware";


const router=Router();



router.post(
"/:courseId",
authenticateToken,
authorizeRoles("student"),
enrollCourse
);



export default router;