import { AnnouncementModel } from "./announcements.model";


export class AnnouncementService {


  static async createAnnouncement(
    courseId: string,
    postedBy: string,
    content: string
  ) {


    if (!content) {

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


    return announcement;

  }





  static async getCourseAnnouncements(
    courseId: string
  ) {

    return await AnnouncementModel.getCourseAnnouncements(
      courseId
    );

  }


}