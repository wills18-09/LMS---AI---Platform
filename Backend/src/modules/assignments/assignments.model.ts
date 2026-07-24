import pool from "../../db";

export class AssignmentModel {

  static async createAssignment(data: {
    course_id: string;
    title: string;
    instructions: string;
    rubric?: any;
    due_date?: string;
  }) {

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
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *
      `,
      [
        data.course_id,
        data.title,
        data.instructions,
        data.rubric || null,
        data.due_date || null
      ]
    );


    return result.rows[0];

  }



  static async getAssignmentsByCourse(
    courseId:string
  ){

    const result = await pool.query(
      `
      SELECT *
      FROM assignments
      WHERE course_id=$1
      ORDER BY due_date ASC
      `,
      [
        courseId
      ]
    );


    return result.rows;

  }




  static async getAssignmentById(
    id:string
  ){

    const result = await pool.query(
      `
      SELECT *
      FROM assignments
      WHERE id=$1
      `,
      [
        id
      ]
    );


    return result.rows[0];

  }



  static async submitAssignment(data:{
    assignment_id:string;
    user_id:string;
    file_url:string;
  }){


    const result = await pool.query(
      `
      INSERT INTO assignment_submissions
      (
        assignment_id,
        user_id,
        file_url
      )
      VALUES ($1,$2,$3)
      RETURNING *
      `,
      [
        data.assignment_id,
        data.user_id,
        data.file_url
      ]
    );


    return result.rows[0];

  }




  static async gradeSubmission(data:{
    id:string;
    grade:number;
    feedback:string;
  }){


    const result = await pool.query(
      `
      UPDATE assignment_submissions
      SET 
        grade=$1,
        feedback=$2
      WHERE id=$3
      RETURNING *
      `,
      [
        data.grade,
        data.feedback,
        data.id
      ]
    );


    return result.rows[0];

  }



  static async getSubmissionById(
    id:string
  ){

    const result = await pool.query(
      `
      SELECT *
      FROM assignment_submissions
      WHERE id=$1
      `,
      [
        id
      ]
    );


    return result.rows[0];

  }


}