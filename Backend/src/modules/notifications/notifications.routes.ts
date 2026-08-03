import {
Router
} from "express";


import {
NotificationController
} from "./notifications.controller";


import {
authenticateToken,
authorizeRoles
} from "../../middleware/authMiddleware";



const router =
Router();





// Logged in user gets notifications

router.get(

"/",

authenticateToken,

NotificationController.getNotifications

);






// Mark notification as read

router.put(

"/:id/read",

authenticateToken,

NotificationController.markAsRead

);







// Internal/admin use for creating notifications

router.post(

"/",

authenticateToken,

NotificationController.createNotification

);




export default router;