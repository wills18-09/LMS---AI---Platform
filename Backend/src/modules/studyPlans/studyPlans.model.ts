import pool from "../../db";


export class StudyPlansModel {


  static async createPlan(
    userId:string,
    courseId:string,
    plan:any
  ){

    const result =
    await pool.query(

      `
      INSERT INTO study_plans
      (
        user_id,
        course_id,
        plan_json
      )

      VALUES
      ($1,$2,$3)

      RETURNING *
      `,

      [
        userId,
        courseId,
        plan
      ]

    );


    return result.rows[0];

  }





  static async getPlan(
    userId:string,
    courseId:string
  ){

    const result =
    await pool.query(

      `
      SELECT *

      FROM study_plans

      WHERE user_id=$1

      AND course_id=$2

      ORDER BY generated_at DESC

      LIMIT 1

      `,

      [
        userId,
        courseId
      ]

    );


    return result.rows[0];

  }


}