import pool from "../../db";

export class AnalyticsModel {

  // Overall instructor dashboard stats
  static async getDashboardStats(instructorId: string) {

    const result = await pool.query(
      `
      SELECT
        COUNT(DISTINCT c.id) AS total_courses,
        COUNT(DISTINCT e.user_id) AS total_students,
        COUNT(DISTINCT cert.id) AS certificates_issued

      FROM courses c

      LEFT JOIN enrollments e
      ON e.course_id = c.id

      LEFT JOIN certificates cert
      ON cert.course_id = c.id

      WHERE c.instructor_id = $1
      `,
      [instructorId]
    );

    return result.rows[0];

  }



  // Course-level analytics
  static async getCourseAnalytics(
  courseId: string,
  instructorId: string
) {

  const result = await pool.query(
    `
    SELECT

      COUNT(DISTINCT e.user_id)
      AS total_students,


      ROUND(
        AVG(
          COALESCE(
            (
              completed.completed_count::decimal
              /
              NULLIF(total.total_lectures, 0)
            ) * 100,
            0
          )
        ),
        2
      )
      AS average_progress


    FROM courses c


    LEFT JOIN enrollments e
    ON e.course_id = c.id


    LEFT JOIN (

      SELECT
        enrollment_id,
        COUNT(*) AS completed_count

      FROM lecture_progress

      WHERE completed = true

      GROUP BY enrollment_id

    ) completed

    ON completed.enrollment_id = e.id



    LEFT JOIN (

      SELECT
        m.course_id,
        COUNT(l.id) AS total_lectures

      FROM modules m

      JOIN lectures l
      ON l.module_id = m.id

      GROUP BY m.course_id

    ) total

    ON total.course_id = c.id



    WHERE
      c.id = $1
      AND c.instructor_id = $2


    GROUP BY c.id

    `,
    [
      courseId,
      instructorId
    ]
  );


  return result.rows[0];

}



  // Lecture engagement analytics
  static async getLectureAnalytics(
    courseId: string,
    instructorId: string
  ) {

    const result = await pool.query(
      `
      SELECT

        l.id,
        l.title,

        COUNT(lp.id)
        AS total_views,

        COUNT(*) FILTER(
          WHERE lp.completed = true
        )
        AS completed_views

      FROM lectures l

      LEFT JOIN lecture_progress lp
      ON lp.lecture_id = l.id

      JOIN modules m
      ON m.id = l.module_id

      JOIN courses c
      ON c.id = m.course_id

      WHERE
        c.id = $1
        AND c.instructor_id = $2

      GROUP BY l.id

      ORDER BY l.title

      `,
      [
        courseId,
        instructorId
      ]
    );

    return result.rows;

  }



  // Quiz performance analytics
  static async getQuizAnalytics(
    courseId: string,
    instructorId: string
  ) {

    const result = await pool.query(
      `
      SELECT

        q.id,
        q.title,

        COUNT(qa.id)
        AS attempts,

        ROUND(
          AVG(qa.score),
          2
        )
        AS average_score


      FROM quizzes q

      LEFT JOIN quiz_attempts qa
      ON qa.quiz_id = q.id

      JOIN modules m
      ON m.id = q.module_id

      JOIN courses c
      ON c.id = m.course_id

      WHERE
        c.id = $1
        AND c.instructor_id = $2

      GROUP BY q.id

      ORDER BY q.title

      `,
      [
        courseId,
        instructorId
      ]
    );

    return result.rows;

  }

}