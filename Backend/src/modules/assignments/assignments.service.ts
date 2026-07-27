import pool from "../../db";

export class AssignmentService {

  // ==========================
  // Instructor creates assignment
  // ==========================
  static async createAssignment(data: any) {

    const result = await pool.query(
      `
      INSERT INTO assignments
      (
        course_id,
        title,
        instructions,
        rubric,
        due_date
      )
      VALUES
      ($1,$2,$3,$4,$5)
      RETURNING *;
      `,
      [
        data.course_id,
        data.title,
        data.instructions,
        data.rubric,
        data.due_date,
      ]
    );

    return result.rows[0];
  }

  // ==========================
  // Student gets assignments
  // ==========================
  static async getAssignmentsByCourse(
    courseId: string
  ) {

    const result = await pool.query(
      `
      SELECT
        id,
        title,
        instructions,
        rubric,
        due_date

      FROM assignments

      WHERE course_id = $1

      ORDER BY due_date ASC
      `,
      [courseId]
    );

    return result.rows;
  }

  // ==========================
  // Student submits assignment
  // ==========================
  static async submitAssignment(data: any) {

    // Check if already submitted
    const existing = await pool.query(
      `
      SELECT id
      FROM assignment_submissions
      WHERE assignment_id=$1
      AND user_id=$2
      `,
      [
        data.assignment_id,
        data.user_id,
      ]
    );

    if (existing.rows.length > 0) {

      const updated = await pool.query(
        `
        UPDATE assignment_submissions

        SET
          file_url=$1,
          submitted_at=NOW()

        WHERE assignment_id=$2
        AND user_id=$3

        RETURNING *;
        `,
        [
          data.file_url,
          data.assignment_id,
          data.user_id,
        ]
      );

      return updated.rows[0];
    }

    const result = await pool.query(
      `
      INSERT INTO assignment_submissions
      (
        assignment_id,
        user_id,
        file_url
      )

      VALUES
      ($1,$2,$3)

      RETURNING *;
      `,
      [
        data.assignment_id,
        data.user_id,
        data.file_url,
      ]
    );

    return result.rows[0];
  }

  // ==========================
  // Instructor grades submission
  // ==========================
  static async gradeSubmission(data: any) {

    const result = await pool.query(
      `
      UPDATE assignment_submissions

      SET
        grade=$1,
        feedback=$2

      WHERE id=$3

      RETURNING *;
      `,
      [
        data.grade,
        data.feedback,
        data.id,
      ]
    );

    return result.rows[0];
  }

  // ==========================
  // Student gets own submissions
  // ==========================
  static async getMySubmissions(
    userId: string
  ) {

    const result = await pool.query(
      `
      SELECT

        s.id,
        s.assignment_id,
        s.user_id,
        s.file_url,
        s.grade,
        s.feedback,
        s.submitted_at

      FROM assignment_submissions s

      WHERE s.user_id = $1

      ORDER BY s.submitted_at DESC
      `,
      [userId]
    );

    return result.rows;
  }


  // ==========================
// Instructor gets submissions for one assignment
// ==========================
static async getAssignmentSubmissions(
  assignmentId: string
) {

  const result = await pool.query(

    `
    SELECT

      s.id,
      s.assignment_id,
      s.file_url,
      s.grade,
      s.feedback,
      s.submitted_at,

      u.id AS student_id,
      u.full_name,
      u.email

    FROM assignment_submissions s

    INNER JOIN users u
      ON s.user_id = u.id

    WHERE s.assignment_id = $1

    ORDER BY s.submitted_at DESC
    `,

    [
      assignmentId
    ]

  );

  return result.rows;

}


}