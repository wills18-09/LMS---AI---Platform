import pool from "../../db";


export class ReviewModel {


  static async createReview(
    courseId: string,
    userId: string,
    rating: number,
    comment: string
  ) {

    const result = await pool.query(
      `
      INSERT INTO course_reviews
      (
        course_id,
        user_id,
        rating,
        comment
      )

      VALUES
      ($1,$2,$3,$4)

      RETURNING *
      `,
      [
        courseId,
        userId,
        rating,
        comment
      ]
    );


    return result.rows[0];

  }




  static async getCourseReviews(
    courseId: string
  ) {

    const result = await pool.query(
      `
      SELECT

        cr.id,
        cr.rating,
        cr.comment,
        cr.created_at,

        u.full_name AS student_name


      FROM course_reviews cr


      JOIN users u

      ON cr.user_id = u.id


      WHERE cr.course_id = $1


      ORDER BY cr.created_at DESC

      `,
      [
        courseId
      ]
    );


    return result.rows;

  }


}