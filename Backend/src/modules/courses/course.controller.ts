import { Request , Response } from "express";
import pool from "../../db";
import { AuthenticatedRequest } from "../../middleware/authMiddleware";

export const createCourse = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const {
      title,
      description,
      category,
      difficulty,
      thumbnail_url,
      price,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Course title is required.",
      });
    }

    const instructorId = req.user?.id;

    const result = await pool.query(
      `
      INSERT INTO courses
      (
        instructor_id,
        title,
        description,
        category,
        difficulty,
        thumbnail_url,
        price
      )
      VALUES
      ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *;
      `,
      [
        instructorId,
        title,
        description,
        category,
        difficulty,
        thumbnail_url,
        price ?? 0,
      ]
    );

    return res.status(201).json({
      message: "Course created successfully.",
      course: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error while creating course.",
    });
  }
};

export const getCourses = async (
  req: Request,
  res: Response
) => {
  try {
    const { category, difficulty, q } = req.query;

    let query = `
      SELECT *
      FROM courses
      WHERE status IN ('pending', 'approved')
    `;

    const values: any[] = [];

    if (category) {
      values.push(category);
      query += ` AND category = $${values.length}`;
    }

    if (difficulty) {
      values.push(difficulty);
      query += ` AND difficulty = $${values.length}`;
    }

    if (q) {
      values.push(`%${q}%`);
      query += ` AND title ILIKE $${values.length}`;
    }

    query += ` ORDER BY created_at DESC`;

    const result = await pool.query(query, values);

    return res.status(200).json({
      courses: result.rows,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error while fetching courses.",
    });
  }
};

export const getCourseById = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT 
        c.*,
        u.full_name AS instructor_name
      FROM courses c
      JOIN users u 
        ON c.instructor_id = u.id
      WHERE c.id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

    return res.status(200).json({
      course: result.rows[0]
    });

  } catch(error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error while fetching course"
    });
  }
};

export const updateCourse = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      category,
      difficulty,
      thumbnail_url,
      price,
    } = req.body;

    const instructorId = req.user?.id;

    // Check ownership
    const courseCheck = await pool.query(
      `
      SELECT *
      FROM courses
      WHERE id = $1
      AND instructor_id = $2
      `,
      [id, instructorId]
    );

    if (courseCheck.rows.length === 0) {
      return res.status(403).json({
        message: "You are not allowed to update this course."
      });
    }


    const result = await pool.query(
      `
      UPDATE courses
      SET
        title = COALESCE($1, title),
        description = COALESCE($2, description),
        category = COALESCE($3, category),
        difficulty = COALESCE($4, difficulty),
        thumbnail_url = COALESCE($5, thumbnail_url),
        price = COALESCE($6, price),
        updated_at = NOW()
      WHERE id = $7
      RETURNING *
      `,
      [
        title,
        description,
        category,
        difficulty,
        thumbnail_url,
        price,
        id
      ]
    );


    return res.status(200).json({
      message: "Course updated successfully.",
      course: result.rows[0]
    });


  } catch(error) {
  console.error("UPDATE COURSE ERROR:", error);

  return res.status(500).json({
    message: "Server error while updating course.",
    error: error
  });
}
};

export const approveCourse = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { id } = req.params;
  const { decision, comment } = req.body;

  try {
    const adminId = req.user?.id;

    if (!["approved", "rejected"].includes(decision)) {
      return res.status(400).json({
        message: "Decision must be approved or rejected"
      });
    }

    const courseResult = await pool.query(
      `
      SELECT *
      FROM courses
      WHERE id = $1
      `,
      [id]
    );

    if (courseResult.rows.length === 0) {
      return res.status(404).json({
        message: "Course not found"
      });
    }


    await pool.query(
      `
      INSERT INTO course_approvals
      (
        course_id,
        reviewed_by,
        decision,
        comment
      )
      VALUES
      ($1,$2,$3,$4)
      `,
      [
        id,
        adminId,
        decision,
        comment
      ]
    );


    await pool.query(
      `
      UPDATE courses
      SET status = $1
      WHERE id = $2
      `,
      [
        decision,
        id
      ]
    );


    res.status(200).json({
      message: `Course ${decision} successfully`
    });


  } catch(error) {
    console.error("APPROVAL ERROR:", error);

    res.status(500).json({
      message: "Server error while approving course"
    });
  }
};

