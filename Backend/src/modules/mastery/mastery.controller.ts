import { Request, Response } from "express";
import { MasteryService } from "./mastery.service";

export class MasteryController {

  // Get mastery for one lecture
  static async getLectureMastery(
    req: Request,
    res: Response
  ) {

    try {

      const userId = req.user!.id;

      const lectureId =
req.params.lectureId as string;

      const mastery =
        await MasteryService.getLectureMastery(
          userId,
          lectureId
        );

      return res.status(200).json({
        mastery
      });

    }
    catch(error){

      console.error(
        "GET LECTURE MASTERY ERROR:",
        error
      );

      return res.status(500).json({
        message:
        "Failed to load mastery."
      });

    }

  }



  // Get mastery for all lectures
  static async getCourseMastery(
    req: Request,
    res: Response
  ) {

    try{

      const userId = req.user!.id;

      const mastery =
        await MasteryService.getCourseMastery(
          userId
        );

      return res.status(200).json({
        mastery
      });

    }
    catch(error){

      console.error(
        "GET COURSE MASTERY ERROR:",
        error
      );

      return res.status(500).json({
        message:
        "Failed to load mastery."
      });

    }

  }

}