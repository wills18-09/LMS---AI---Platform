import { Router } from "express";

import {
DiscussionController
} from "./discussion.controller";


import {
authenticateToken
} from "../../middleware/authMiddleware";



const router =
Router();



router.get(
"/course/:courseId",
authenticateToken,
DiscussionController.getThreads
);



router.post(
"/",
authenticateToken,
DiscussionController.createThread
);



router.get(
"/:threadId/posts",
authenticateToken,
DiscussionController.getPosts
);



router.post(
"/:threadId/posts",
authenticateToken,
DiscussionController.createPost
);



export default router;