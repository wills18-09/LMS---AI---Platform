import { Response } from "express";
import { AuthenticatedRequest } from "../../middleware/authMiddleware";
import { AnnouncementService } from "./announcements.service";


export class AnnouncementController {



  static async createAnnouncement(
    req: AuthenticatedRequest,
    res: Response
  ) {

    try {


      const {
        course_id,
        content
      } = req.body;



      const postedBy =
        req.user?.id;



      if (!postedBy) {

        return res.status(401).json({
          message: "Unauthorized"
        });

      }




      if (!course_id) {

        return res.status(400).json({
          message: "Course id is required"
        });

      }




      if (!content) {

        return res.status(400).json({
          message: "Announcement content is required"
        });

      }





      const announcement =
        await AnnouncementService.createAnnouncement(
          course_id,
          postedBy,
          content
        );





      return res.status(201).json({

        message:
          "Announcement created successfully",

        announcement

      });



    }
    catch (error:any) {


      console.error(
        "CREATE ANNOUNCEMENT ERROR:",
        error
      );



      return res.status(500).json({

        message:
          error.message ||
          "Server error while creating announcement"

      });


    }

  }








  static async getCourseAnnouncements(
    req: AuthenticatedRequest,
    res: Response
  ) {

    try {



      const courseId =
        String(
          req.params.id
        );





      const announcements =
        await AnnouncementService.getCourseAnnouncements(
          courseId
        );





      return res.status(200).json({

        announcements

      });




    }
    catch (error) {


      console.error(
        "GET ANNOUNCEMENTS ERROR:",
        error
      );




      return res.status(500).json({

        message:
          "Server error while fetching announcements"

      });


    }

  }



}