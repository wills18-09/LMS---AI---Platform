import { Request, Response } from "express";
import { StudyPlansService } from "./studyPlans.service";


export class StudyPlansController {



  static async generatePlan(
    req: Request,
    res: Response
  ) {

    try {


      const userId =
      req.user!.id;



      const {
        courseId
      } = req.body;



      if (!courseId) {

        return res.status(400).json({

          message:
          "courseId is required"

        });

      }



      const plan =
      await StudyPlansService.generatePlan(

        userId,

        courseId

      );



      return res.json({

        message:
        "Study plan generated successfully",

        plan

      });


    }
    catch(error:any) {

      console.error(error);



      return res.status(500).json({

        message:
        error.message

      });

    }

  }








  static async getPlan(
    req: Request,
    res: Response
  ) {

    try {


      const userId =
      req.user!.id;



      const courseId =
      req.params.courseId as string;



      const plan =
      await StudyPlansService.getPlan(

        userId,

        courseId

      );



      return res.json({

        plan

      });


    }
    catch(error:any) {

      console.error(error);



      return res.status(500).json({

        message:
        error.message

      });

    }

  }



}