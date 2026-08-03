import { AnnouncementModel } from "./announcements.model";
import { NotificationService } from "../notifications/notifications.service";


export class AnnouncementService {



static async createAnnouncement(
  courseId:string,
  postedBy:string,
  content:string
){


if(!content){

throw new Error(
"Announcement content is required"
);

}



const announcement =
await AnnouncementModel.createAnnouncement(
courseId,
postedBy,
content
);




// Get enrolled students

const students =
await AnnouncementModel.getCourseStudents(
courseId
);




// Create notifications

for(const student of students){


await NotificationService.createNotification(

student.user_id,

"New Announcement",

content

);


}



return announcement;


}






static async getCourseAnnouncements(
courseId:string
){

return await AnnouncementModel.getCourseAnnouncements(
courseId
);

}



}