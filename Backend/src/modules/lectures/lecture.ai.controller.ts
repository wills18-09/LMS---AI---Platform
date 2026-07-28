import { Request, Response } from "express";

import { AIService } from "../../services/ai.service";

import { LectureSummaryModel } from "./lecture.summary.model";


export class LectureAIController {


  static async summarizeLecture(
    req: Request,
    res: Response
  ) {

    try {


      const lectureId =
        req.params.lectureId as string;



      // Check if summary already exists

      const existingSummary =
        await LectureSummaryModel.findByLectureId(
          lectureId
        );


      if (existingSummary) {

        return res.json({

          summary:
            existingSummary.summary,

          cached: true

        });

      }



      // Generate summary using AI service

      const result =
        await AIService.generateSummary(
          lectureId
        );



      // Save generated summary

      const savedSummary =
        await LectureSummaryModel.create(
          lectureId,
          result.summary
        );



      res.json({

        summary:
          savedSummary.summary,

        sources:
          result.sources,

        cached: false

      });



    } catch(error:any) {


      console.error(
        "SUMMARY CONTROLLER ERROR:",
        error
      );


      res.status(500).json({

        message:
          error.message

      });


    }

  }


}