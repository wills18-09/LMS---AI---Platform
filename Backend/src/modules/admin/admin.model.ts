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

    // Find role id
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
      throw new Error("Role not found");
    }


    const roleId = roleResult.rows[0].id;


    // Remove existing role
    await pool.query(
      `
      DELETE FROM user_roles
      WHERE user_id = $1
      `,
      [
        userId
      ]
    );


    // Add new role
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

      SET is_active = false

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

}