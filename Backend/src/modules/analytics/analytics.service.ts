import pool from "../../db";


export class AnalyticsService {


  static async getInstructorAnalytics(
    instructorId:string
  ){


    const courses =
    await pool.query(
      `
      SELECT COUNT(*)::int AS total_courses

      FROM courses

      WHERE instructor_id=$1
      `,
      [
        instructorId
      ]
    );




    const students =
    await pool.query(
      `
      SELECT COUNT(DISTINCT e.user_id)::int AS total_students

      FROM enrollments e

      JOIN courses c
      ON e.course_id=c.id

      WHERE c.instructor_id=$1
      `,
      [
        instructorId
      ]
    );





    const assignments =
    await pool.query(
      `
      SELECT COUNT(*)::int AS total_assignments

      FROM assignments a

      JOIN courses c
      ON a.course_id=c.id

      WHERE c.instructor_id=$1
      `,
      [
        instructorId
      ]
    );





    const submissions =
    await pool.query(
      `
      SELECT COUNT(*)::int AS total_submissions

      FROM assignment_submissions s

      JOIN assignments a
      ON s.assignment_id=a.id

      JOIN courses c
      ON a.course_id=c.id

      WHERE c.instructor_id=$1
      `,
      [
        instructorId
      ]
    );






    const pending =
    await pool.query(
      `
      SELECT COUNT(*)::int AS pending_reviews

      FROM assignment_submissions s

      JOIN assignments a
      ON s.assignment_id=a.id

      JOIN courses c
      ON a.course_id=c.id


      WHERE c.instructor_id=$1

      AND s.grade IS NULL

      `,
      [
        instructorId
      ]
    );






    const averageGrade =
    await pool.query(
      `
      SELECT

      COALESCE(
      ROUND(AVG(s.grade),2),
      0
      ) AS average_grade


      FROM assignment_submissions s


      JOIN assignments a
      ON s.assignment_id=a.id


      JOIN courses c
      ON a.course_id=c.id


      WHERE c.instructor_id=$1

      `,
      [
        instructorId
      ]
    );







    return {

      total_courses:
      courses.rows[0].total_courses,


      total_students:
      students.rows[0].total_students,


      total_assignments:
      assignments.rows[0].total_assignments,


      total_submissions:
      submissions.rows[0].total_submissions,


      pending_reviews:
      pending.rows[0].pending_reviews,


      average_grade:
      averageGrade.rows[0].average_grade

    };

  }


}