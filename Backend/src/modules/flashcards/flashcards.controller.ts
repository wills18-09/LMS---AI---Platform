import { Request, Response } from "express";

import { AIService } from "../../services/ai.service";

import { FlashcardModel } from "./flashcards.model";

import pool from "../../db";



export class FlashcardController {



  static async generate(
    req: Request,
    res: Response
  ) {

    try {


      const lectureId =
        req.params.lectureId as string;



      const lecture =
        await pool.query(
          `
          SELECT module_id
          FROM lectures
          WHERE id = $1
          `,
          [
            lectureId
          ]
        );



      if (
        lecture.rows.length === 0
      ) {

        return res.status(404).json({
          message: "Lecture not found"
        });

      }



      const moduleId =
        lecture.rows[0].module_id;



      const result =
        await AIService.generateFlashcards(
          lectureId
        );



      const saved =
        await FlashcardModel.createMany(
          moduleId,
          result.flashcards
        );



      res.json({
        flashcards: saved
      });



    } catch(error:any) {


      console.error(
        "FLASHCARD GENERATION ERROR:",
        error
      );


      res.status(500).json({
        message: error.message
      });

    }

  }





  static async getByModule(
    req: Request,
    res: Response
  ) {

    try {


      const moduleId =
        req.params.moduleId as string;



      const cards =
        await FlashcardModel.findByModule(
          moduleId
        );



      res.json({
        flashcards: cards
      });



    } catch(error:any) {


      console.error(
        "GET FLASHCARDS ERROR:",
        error
      );


      res.status(500).json({
        message: error.message
      });

    }

  }


}