import { Response } from "express";

import {
  AuthenticatedRequest
} from "../../middleware/authMiddleware";

import {
  NotificationService
} from "./notifications.service";



export class NotificationController {



static async getNotifications(
  req: AuthenticatedRequest,
  res: Response
){

try{


const userId =
req.user?.id;



if(!userId){

return res.status(401).json({
message:"Unauthorized"
});

}




const notifications =
await NotificationService.getUserNotifications(
userId
);



return res.status(200).json({

notifications

});


}
catch(error){


console.error(
"GET NOTIFICATIONS ERROR:",
error
);



return res.status(500).json({

message:
"Failed to fetch notifications"

});


}


}








static async markAsRead(
req: AuthenticatedRequest,
res: Response
){

try{


const userId =
req.user?.id;



if(!userId){

return res.status(401).json({
message:"Unauthorized"
});

}



const id =
String(
req.params.id
);




const notification =
await NotificationService.markAsRead(
id,
userId
);



return res.status(200).json({

message:
"Notification marked as read",

notification

});


}
catch(error){


console.error(
"MARK NOTIFICATION READ ERROR:",
error
);



return res.status(500).json({

message:
"Failed to update notification"

});


}



}




static async createNotification(
req: AuthenticatedRequest,
res: Response
){

try{


const {
userId,
title,
body
}=req.body;




const notification =
await NotificationService.createNotification(
userId,
title,
body
);



return res.status(201).json({

notification

});


}
catch(error){


console.error(
"CREATE NOTIFICATION ERROR:",
error
);



return res.status(500).json({

message:
"Failed to create notification"

});


}


}



}