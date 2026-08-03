import pool from "../../db";


export class RecommendationsModel {


  static async createRecommendation(
    userId:string,
    courseId:string,
    lectureId:string | null,
    reason:string,
    score:number
  ){

    const result =
    await pool.query(

      `
      INSERT INTO recommendations
      (
        user_id,
        recommended_course_id,
        recommended_lecture_id,
        reason,
        score
      )

      VALUES
      ($1,$2,$3,$4,$5)

      RETURNING *
      `,

      [
        userId,
        courseId,
        lectureId,
        reason,
        score
      ]

    );


    return result.rows[0];

  }





  static async getRecommendations(
    userId:string
  ){

    const result =
    await pool.query(

      `
      SELECT

      r.*,

      c.title AS course_title,

      l.title AS lecture_title


      FROM recommendations r


      LEFT JOIN courses c

      ON c.id =
      r.recommended_course_id


      LEFT JOIN lectures l

      ON l.id =
      r.recommended_lecture_id


      WHERE r.user_id=$1


      ORDER BY r.score DESC

      `,

      [
        userId
      ]

    );


    return result.rows;

  }




  static async clearRecommendations(
    userId:string
  ){

    await pool.query(

      `
      DELETE FROM recommendations
      WHERE user_id=$1
      `,

      [
        userId
      ]

    );

  }


}