import { Response } from "express";
import pool from "../../db";
import { AuthenticatedRequest } from "../../middleware/authMiddleware";



export class BookmarksController {



  // CREATE BOOKMARK

  static async createBookmark(

    req: AuthenticatedRequest,
    res: Response

  ){

    try {


      const userId = req.user!.id;

      const lectureId = req.params.id;



      const {
        timestamp_seconds
      } = req.body;




      if(!lectureId){

        return res.status(400).json({

          message:
          "Lecture id required"

        });

      }




      const result = await pool.query(

        `
        INSERT INTO bookmarks
        (
          user_id,
          lecture_id,
          timestamp_seconds
        )

        VALUES
        ($1,$2,$3)

        RETURNING *
        `,


        [
          userId,
          lectureId,
          timestamp_seconds || null
        ]

      );





      return res.status(201).json({

        message:
        "Bookmark created successfully",

        bookmark:
        result.rows[0]

      });



    }catch(error){


      console.error(
        "CREATE BOOKMARK ERROR:",
        error
      );



      return res.status(500).json({

        message:
        "Failed creating bookmark"

      });


    }


  }







  // GET BOOKMARKS FOR LECTURE

  static async getBookmarks(

    req: AuthenticatedRequest,
    res: Response

  ){

    try {


      const userId =
      req.user!.id;


      const lectureId =
      req.params.id;





      const result = await pool.query(

        `
        SELECT *
        FROM bookmarks

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

        bookmarks:
        result.rows

      });



    }catch(error){


      console.error(
        "GET BOOKMARKS ERROR:",
        error
      );



      return res.status(500).json({

        message:
        "Failed fetching bookmarks"

      });


    }


  }



}