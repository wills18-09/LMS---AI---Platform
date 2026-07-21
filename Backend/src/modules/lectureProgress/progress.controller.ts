import { Request, Response } from "express";
import { ProgressService } from "./progress.service";

export const updateLectureProgress = async (
  req: Request,
  res: Response
) => {

  try {

    const userId = req.user!.id;

    const lectureId = req.params.id as string;




    const {
      watched_seconds,
      completed
    } = req.body;



    

    if (!lectureId) {

      return res.status(400).json({
        message:"Lecture ID required"
      });

    }



    const progress =
      await ProgressService.updateProgress(
        userId,
        lectureId,
        watched_seconds,
        completed
      );



    

    return res.status(200).json({

      message:
        "Lecture progress updated successfully",

      progress

    });



  } catch(error:any){


    return res.status(400).json({
      message:error.message
    });

  }

};