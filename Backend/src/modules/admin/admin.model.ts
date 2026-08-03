import pool from "../../db";


export class AdminModel {



  // Get all users with their roles
  static async getUsers() {

    const result = await pool.query(
      `
      SELECT
        u.id,
        u.full_name,
        u.email,
        u.is_active,
        r.name AS role

      FROM users u

      LEFT JOIN user_roles ur
      ON ur.user_id = u.id

      LEFT JOIN roles r
      ON r.id = ur.role_id

      ORDER BY u.email;
      `
    );


    return result.rows;

  }





  // Update / assign user role
  static async updateUserRole(
    userId: string,
    roleName: string
  ) {


    const roleResult = await pool.query(
      `
      SELECT id
      FROM roles
      WHERE name = $1
      `,
      [
        roleName
      ]
    );



    if (roleResult.rows.length === 0) {

      throw new Error(
        "Role not found"
      );

    }



    const roleId =
      roleResult.rows[0].id;



    await pool.query(
      `
      DELETE FROM user_roles

      WHERE user_id = $1
      `,
      [
        userId
      ]
    );





    const result = await pool.query(
      `
      INSERT INTO user_roles(
        user_id,
        role_id
      )

      VALUES($1,$2)

      RETURNING *
      `,
      [
        userId,
        roleId
      ]
    );



    return result.rows[0];

  }





  // Suspend user account
  static async suspendUser(
    userId: string
  ) {


    const result = await pool.query(
      `
      UPDATE users

      SET
        is_active = false

      WHERE id = $1

      RETURNING
        id,
        email,
        is_active;
      `,
      [
        userId
      ]
    );



    return result.rows[0];

  }





  // Get all pending courses
  static async getPendingCourses() {


    const result = await pool.query(
      `
      SELECT

        c.id,
        c.title,
        c.description,
        c.category,
        c.difficulty,
        c.price,
        c.status,
        c.created_at,

        u.full_name AS instructor_name


      FROM courses c


      JOIN users u

      ON c.instructor_id = u.id


      WHERE c.status = 'pending'


      ORDER BY c.created_at ASC;
      `
    );



    return result.rows;

  }





  // Approve course
  static async approveCourse(
    courseId: string
  ) {


    const result = await pool.query(
      `
      UPDATE courses


      SET

        status = 'approved',

        updated_at = NOW()


      WHERE id = $1


      RETURNING *;
      `,
      [
        courseId
      ]
    );



    return result.rows[0];

  }





  // Reject course
  static async rejectCourse(
    courseId: string
  ) {


    const result = await pool.query(
      `
      UPDATE courses


      SET

        status = 'rejected',

        updated_at = NOW()


      WHERE id = $1


      RETURNING *;
      `,
      [
        courseId
      ]
    );



    return result.rows[0];

  }





  // Admin dashboard overview stats
  static async getOverview() {


    const result = await pool.query(
      `
      SELECT


      (
        SELECT COUNT(*)
        FROM users
      ) AS total_users,



      (
        SELECT COUNT(*)
        FROM courses
      ) AS total_courses,



      (
        SELECT COUNT(*)
        FROM enrollments
      ) AS total_enrollments,



      (
        SELECT COUNT(*)
        FROM certificates
      ) AS certificates_issued;

      `
    );



    return result.rows[0];

  }

    // Detailed admin analytics
  static async getDetailedAnalytics() {


    const result = await pool.query(
      `
      SELECT

      (
        SELECT COUNT(*)
        FROM users
        WHERE is_active = true
      ) AS active_users,


      (
        SELECT COUNT(*)
        FROM users u
        JOIN user_roles ur
        ON ur.user_id = u.id
        JOIN roles r
        ON r.id = ur.role_id
        WHERE r.name = 'student'
      ) AS total_students,


      (
        SELECT COUNT(*)
        FROM users u
        JOIN user_roles ur
        ON ur.user_id = u.id
        JOIN roles r
        ON r.id = ur.role_id
        WHERE r.name = 'instructor'
      ) AS total_instructors,



      (
        SELECT COUNT(*)
        FROM courses
        WHERE status = 'approved'
      ) AS approved_courses,



      (
        SELECT COUNT(*)
        FROM courses
        WHERE status = 'pending'
      ) AS pending_courses,



      (
        SELECT COUNT(*)
        FROM quiz_attempts
      ) AS quiz_attempts,



      (
        SELECT COUNT(*)
        FROM lecture_progress
        WHERE completed = true
      ) AS completed_lectures;



      `
    );


    return result.rows[0];


  }



}