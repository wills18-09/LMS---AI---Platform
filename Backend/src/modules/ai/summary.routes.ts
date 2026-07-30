import {Router} from "express";

import {
SummaryController
} from "./summary.controller";


const router = Router();


router.post(
"/:lectureId",
SummaryController.generate
);


export default router;