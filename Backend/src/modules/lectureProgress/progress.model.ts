import pool from "../../db";

export const ProgressModel = {

  async updateProgress(
    userId: string,
    lectureId: string,
    watchedSeconds: number,
    completed: boolean
  ) {

    const enrollmentResult = await pool.query(
      `
      SELECT e.id AS enrollment_id
      FROM enrollments e
      JOIN courses c
        ON e.course_id = c.id
      JOIN modules m
        ON m.course_id = c.id
      JOIN lectures l
        ON l.module_id = m.id
      WHERE
        e.user_id = $1
        AND l.id = $2
      `,
      [userId, lectureId]
    );

    if (enrollmentResult.rows.length === 0) {
      throw new Error("Student is not enrolled in this course.");
    }

    const enrollmentId = enrollmentResult.rows[0].enrollment_id;


    const existing = await pool.query(
      `
      SELECT id
      FROM lecture_progress
      WHERE
        enrollment_id = $1
        AND lecture_id = $2
      `,
      [enrollmentId, lectureId]
    );


    if (existing.rows.length > 0) {

      const result = await pool.query(
        `
        UPDATE lecture_progress
        SET
          watched_seconds = $1,
          completed = $2,
          last_watched_at = NOW()
        WHERE
          enrollment_id = $3
          AND lecture_id = $4
        RETURNING *
        `,
        [
          watchedSeconds,
          completed,
          enrollmentId,
          lectureId
        ]
      );

      return result.rows[0];

    }



    const result = await pool.query(
      `
      INSERT INTO lecture_progress
      (
        enrollment_id,
        lecture_id,
        watched_seconds,
        completed,
        last_watched_at
      )
      VALUES
      (
        $1,
        $2,
        $3,
        $4,
        NOW()
      )
      RETURNING *
      `,
      [
        enrollmentId,
        lectureId,
        watchedSeconds,
        completed
      ]
    );


    return result.rows[0];

  },



  async getProgress(
    userId: string,
    lectureId: string
  ) {


    const result = await pool.query(
      `
      SELECT
        lp.lecture_id,
        lp.watched_seconds,
        lp.completed,
        lp.last_watched_at
      FROM lecture_progress lp

      JOIN enrollments e
        ON lp.enrollment_id = e.id

      WHERE
        e.user_id = $1
        AND lp.lecture_id = $2
      `,
      [
        userId,
        lectureId
      ]
    );



    if(result.rows.length === 0){

      return {
        lecture_id: lectureId,
        watched_seconds: 0,
        completed: false,
        last_watched_at: null
      };

    }


    return result.rows[0];

  }

};