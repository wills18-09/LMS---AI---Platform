import pool from "../../db";

export class MasteryModel {

  static async updateMastery(
    userId: string,
    lectureId: string,
    score: number
  ) {

    const result = await pool.query(
      `
      INSERT INTO student_mastery (
        user_id,
        lecture_id,
        mastery_score
      )
      VALUES ($1,$2,$3)

      ON CONFLICT (
        user_id,
        lecture_id
      )

      DO UPDATE
      SET
        mastery_score = EXCLUDED.mastery_score,
        updated_at = now()

      RETURNING *
      `,
      [
        userId,
        lectureId,
        score
      ]
    );

    return result.rows[0];
  }



  static async getLectureMastery(
    userId: string,
    lectureId: string
  ) {

    const result = await pool.query(
      `
      SELECT *
      FROM student_mastery
      WHERE
      user_id = $1
      AND lecture_id = $2
      `,
      [
        userId,
        lectureId
      ]
    );

    return result.rows[0];
  }



  static async getCourseMastery(
    userId: string
  ) {

    const result = await pool.query(
      `
      SELECT
        sm.*,
        l.title AS lecture_title
      FROM student_mastery sm

      JOIN lectures l
      ON l.id = sm.lecture_id

      WHERE sm.user_id = $1

      ORDER BY l.title
      `,
      [
        userId
      ]
    );

    return result.rows;
  }

}