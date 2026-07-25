import { Response } from "express";
import { AuthenticatedRequest } from "../../middleware/authMiddleware";
import { ReviewService } from "./reviews.service";


export class ReviewController {


  static async createReview(
    req: AuthenticatedRequest,
    res: Response
  ) {

    try {

      const courseId = req.params.id as string;


      const {
        rating,
        comment
      } = req.body;



      const userId = req.user?.id;



      if (!userId) {

        return res.status(401).json({
          message: "Unauthorized"
        });

      }



      if (!rating) {

        return res.status(400).json({
          message: "Rating is required"
        });

      }



      const review =
        await ReviewService.createReview(
          courseId,
          userId,
          Number(rating),
          comment
        );



      return res.status(201).json({

        message: "Review added successfully",

        review

      });



    } catch(error: any) {


      console.error(
        "CREATE REVIEW ERROR:",
        error
      );



      if(error.code === "23505") {

        return res.status(400).json({

          message:
          "You have already reviewed this course"

        });

      }



      return res.status(500).json({

        message:
        error.message ||
        "Server error while creating review"

      });


    }

  }





  static async getCourseReviews(
    req: AuthenticatedRequest,
    res: Response
  ) {

    try {


      const courseId = req.params.id as string;



      const reviews =
        await ReviewService.getCourseReviews(
          courseId
        );



      return res.status(200).json({

        reviews

      });



    } catch(error) {


      console.error(
        "GET REVIEWS ERROR:",
        error
      );



      return res.status(500).json({

        message:
        "Server error while fetching reviews"

      });

    }

  }


}