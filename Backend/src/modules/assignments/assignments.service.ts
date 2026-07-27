import pool from "../../db";


export class AssignmentService {



  static async createAssignment(
    data:any
  ){

    // keep your existing create code here

  }







  static async getAssignmentsByCourse(
  courseId:string
){

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

    [
      courseId
    ]

  );


  return result.rows;

}





  static async submitAssignment(
    data:any
  ){

    // keep your existing submit code here

  }








  static async gradeSubmission(
    data:any
  ){

    // keep your existing grade code here

  }








  // Student gets his own submissions

  static async getMySubmissions(
    userId:string
  ){


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


      [
        userId
      ]


    );



    return result.rows;


  }



}