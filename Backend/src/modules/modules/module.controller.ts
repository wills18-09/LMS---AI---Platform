import { Response } from "express";
import pool from "../../db";
import { AuthenticatedRequest } from "../../middleware/authMiddleware";


export const createModule = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { courseId } = req.params;
    const { title, order_index } = req.body;

    const instructorId = req.user?.id;

    if (!title || order_index === undefined) {
      return res.status(400).json({
        message: "Title and order_index are required."
      });
    }
console.log("COURSE ID:", courseId);
console.log("LOGGED USER:", instructorId);


    // Check if instructor owns this course
    const courseCheck = await pool.query(
      `
      SELECT id
      FROM courses
      WHERE id = $1
      AND instructor_id = $2
      `,
      [courseId, instructorId]
    );

    if (courseCheck.rows.length === 0) {
      return res.status(403).json({
        message: "You are not the owner of this course."
      });
    }


    const result = await pool.query(
      `
      INSERT INTO modules
      (
        course_id,
        title,
        order_index
      )
      VALUES
      ($1,$2,$3)
      RETURNING *
      `,
      [
        courseId,
        title,
        order_index
      ]
    );


    return res.status(201).json({
      message: "Module created successfully.",
      module: result.rows[0]
    });


  } catch(error) {
    console.error("CREATE MODULE ERROR:", error);

    return res.status(500).json({
      message: "Server error while creating module."
    });
  }
};