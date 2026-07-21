import { Request, Response } from "express";
import pool from "../../db";
import { AuthenticatedRequest } from "../../middleware/authMiddleware";


// CREATE LECTURE
export const createLecture = async (
  req: AuthenticatedRequest,
  res: Response
) => {

  try {

    const { moduleId } = req.params;


    const {
      title,
      video_url,
      transcript,
      duration_seconds,
      order_index,
      resource_urls
    } = req.body;


    const instructorId = req.user?.id;



    if (!title || order_index === undefined) {

      return res.status(400).json({
        message: "Title and order_index are required."
      });

    }



    // Check module belongs to instructor's course

    const moduleCheck = await pool.query(
      `
      SELECT m.id
      FROM modules m
      JOIN courses c
      ON m.course_id = c.id
      WHERE m.id = $1
      AND c.instructor_id = $2
      `,
      [
        moduleId,
        instructorId
      ]
    );



    if (moduleCheck.rows.length === 0) {

      return res.status(403).json({
        message: "You are not the owner of this course."
      });

    }




    const result = await pool.query(
      `
      INSERT INTO lectures
      (
        module_id,
        title,
        video_url,
        transcript,
        duration_seconds,
        order_index,
        resource_urls
      )
      VALUES
      ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *
      `,
      [
        moduleId,
        title,
        video_url,
        transcript,
        duration_seconds,
        order_index,
        resource_urls
      ]
    );



    return res.status(201).json({

      message: "Lecture created successfully.",

      lecture: result.rows[0]

    });



  } catch(error) {


    console.error(
      "CREATE LECTURE ERROR:",
      error
    );


    return res.status(500).json({

      message: "Server error while creating lecture."

    });

  }

};






// GET SINGLE LECTURE

export const getLectureById = async (
  req: Request,
  res: Response
) => {


  try {


    const { id } = req.params;



    const result = await pool.query(
      `
      SELECT
        id,
        module_id,
        title,
        video_url,
        transcript,
        duration_seconds,
        order_index,
        resource_urls
      FROM lectures
      WHERE id = $1
      `,
      [
        id
      ]
    );



    if (result.rows.length === 0) {


      return res.status(404).json({

        message: "Lecture not found"

      });


    }



    return res.status(200).json({

      lecture: result.rows[0]

    });



  } catch(error) {


    console.error(
      "GET LECTURE ERROR:",
      error
    );



    return res.status(500).json({

      message: "Server error while fetching lecture"

    });


  }


};