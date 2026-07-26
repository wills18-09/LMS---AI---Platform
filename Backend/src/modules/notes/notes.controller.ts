import { Response } from "express";
import pool from "../../db";
import { AuthenticatedRequest } from "../../middleware/authMiddleware";



export class NotesController {



  // CREATE NOTE
  static async createNote(
    req: AuthenticatedRequest,
    res: Response
  ) {

    try {


      const userId = req.user!.id;

      const lectureId = req.params.id;


      const {
        timestamp_seconds,
        content
      } = req.body;



      if(!lectureId || !content){

        return res.status(400).json({

          message:
          "Lecture id and content are required"

        });

      }



      const result = await pool.query(

        `
        INSERT INTO notes
        (
          user_id,
          lecture_id,
          timestamp_seconds,
          content
        )

        VALUES
        ($1,$2,$3,$4)

        RETURNING *
        `,

        [
          userId,
          lectureId,
          timestamp_seconds || null,
          content
        ]

      );




      return res.status(201).json({

        message:
        "Note created successfully",

        note:
        result.rows[0]

      });



    } catch(error){


      console.error(
        "CREATE NOTE ERROR:",
        error
      );


      return res.status(500).json({

        message:
        "Failed creating note"

      });


    }


  }






  // GET NOTES FOR LECTURE
  static async getNotes(

    req: AuthenticatedRequest,
    res: Response

  ){

    try {


      const userId = req.user!.id;

      const lectureId = req.params.id;




      const result = await pool.query(

        `
        SELECT *
        FROM notes

        WHERE user_id=$1
        AND lecture_id=$2

        ORDER BY created_at DESC
        `,

        [
          userId,
          lectureId
        ]

      );




      return res.status(200).json({

        notes:
        result.rows

      });



    }catch(error){


      console.error(
        "GET NOTES ERROR:",
        error
      );


      return res.status(500).json({

        message:
        "Failed fetching notes"

      });


    }


  }



}