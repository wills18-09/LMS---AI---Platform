import {
NotificationModel
} from "./notifications.model";


export class NotificationService {



static async getUserNotifications(
userId:string
){

return await NotificationModel.getUserNotifications(
userId
);

}




static async markAsRead(
id:string,
userId:string
){

return await NotificationModel.markAsRead(
id,
userId
);

}




static async createNotification(
userId:string,
title:string,
body:string
){

return await NotificationModel.createNotification(
userId,
title,
body
);

}



}