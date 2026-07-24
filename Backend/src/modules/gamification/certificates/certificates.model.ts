import pool from "../../../db";

export class CertificateModel {


  // Check if certificate already exists
  static async findByUserAndCourse(
    userId: string,
    courseId: string
  ) {

    const result = await pool.query(
      `
      SELECT *
      FROM certificates
      WHERE user_id = $1
      AND course_id = $2
      `,
      [
        userId,
        courseId
      ]
    );


    return result.rows[0];

  }



  // Create certificate record
  static async createCertificate(
    userId: string,
    courseId: string,
    certificateUrl: string
  ) {

    const result = await pool.query(
      `
      INSERT INTO certificates (
        user_id,
        course_id,
        certificate_url
      )
      VALUES ($1,$2,$3)
      RETURNING *
      `,
      [
        userId,
        courseId,
        certificateUrl
      ]
    );


    return result.rows[0];

  }



  // Get user's certificates
  static async getUserCertificates(
    userId: string
  ) {

    const result = await pool.query(
      `
      SELECT
        c.id,
        c.course_id,
        c.certificate_url,
        c.issued_at,
        courses.title AS course_title
      FROM certificates c
      JOIN courses
      ON courses.id = c.course_id
      WHERE c.user_id = $1
      ORDER BY c.issued_at DESC
      `,
      [
        userId
      ]
    );


    return result.rows;

  }


}