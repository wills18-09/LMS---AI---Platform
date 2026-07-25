import pool from "../../db";


export class AnnouncementModel {


  static async createAnnouncement(
    courseId: string,
    postedBy: string,
    content: string
  ) {

    const result = await pool.query(
      `
      INSERT INTO announcements
      (
        course_id,
        posted_by,
        content
      )

      VALUES
      ($1,$2,$3)

      RETURNING *
      `,
      [
        courseId,
        postedBy,
        content
      ]
    );


    return result.rows[0];

  }





  static async getCourseAnnouncements(
    courseId: string
  ) {

    const result = await pool.query(
      `
      SELECT

        a.id,
        a.content,
        a.created_at,

        u.full_name AS posted_by_name


      FROM announcements a


      JOIN users u

      ON a.posted_by = u.id


      WHERE a.course_id = $1


      ORDER BY a.created_at DESC

      `,
      [
        courseId
      ]
    );


    return result.rows;

  }


}