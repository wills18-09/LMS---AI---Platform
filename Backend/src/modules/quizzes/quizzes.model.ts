import pool from "../../db";

export class QuizModel {


  // Create quiz
  static async createQuiz(
    moduleId: string,
    title: string
  ) {

    const result = await pool.query(
      `
      INSERT INTO quizzes (
        module_id,
        title
      )
      VALUES ($1, $2)
      RETURNING *
      `,
      [
        moduleId,
        title
      ]
    );

    return result.rows[0];

  }





  // Add question
  static async addQuestion(
    quizId: string,
    questionText: string,
    questionType: string,
    orderIndex: number
  ) {

    const result = await pool.query(
      `
      INSERT INTO quiz_questions (
        quiz_id,
        question_text,
        question_type,
        order_index
      )
      VALUES ($1,$2,$3,$4)
      RETURNING *
      `,
      [
        quizId,
        questionText,
        questionType,
        orderIndex
      ]
    );

    return result.rows[0];

  }






  // Add option
  static async addOption(
    questionId: string,
    optionText: string,
    isCorrect: boolean
  ) {

    const result = await pool.query(
      `
      INSERT INTO quiz_options (
        question_id,
        option_text,
        is_correct
      )
      VALUES ($1,$2,$3)
      RETURNING *
      `,
      [
        questionId,
        optionText,
        isCorrect
      ]
    );


    return result.rows[0];

  }







  // Student starts attempt
  static async createAttempt(
    quizId: string,
    userId: string
  ) {


    const result = await pool.query(
      `
      INSERT INTO quiz_attempts (
        quiz_id,
        user_id
      )
      VALUES ($1,$2)
      RETURNING *
      `,
      [
        quizId,
        userId
      ]
    );


    return result.rows[0];

  }







  static async getCorrectOptions(
    questionId:string
  ) {


    const result = await pool.query(
      `
      SELECT id
      FROM quiz_options
      WHERE question_id = $1
      AND is_correct = true
      `,
      [
        questionId
      ]
    );


    return result.rows.map(
      row=>row.id
    );


  }







  static async saveAnswer(
    attemptId:string,
    questionId:string,
    selectedOptionIds:string[],
    isCorrect:boolean
  ) {


    const result = await pool.query(
      `
      INSERT INTO quiz_answers (
        attempt_id,
        question_id,
        selected_option_ids,
        is_correct
      )
      VALUES ($1,$2,$3,$4)
      RETURNING *
      `,
      [
        attemptId,
        questionId,
        selectedOptionIds,
        isCorrect
      ]
    );


    return result.rows[0];

  }








  static async updateScore(
    attemptId:string,
    score:number
  ) {


    const result = await pool.query(
      `
      UPDATE quiz_attempts
      SET
        score = $1,
        submitted_at = now()
      WHERE id = $2
      RETURNING *
      `,
      [
        score,
        attemptId
      ]
    );


    return result.rows[0];

  }








static async getQuizById(
  quizId:string
){


  const result = await pool.query(

    `
    SELECT

    q.id AS quiz_id,
    q.title,

    qq.id AS question_id,
    qq.question_text,
    qq.question_type,
    qq.order_index,

    qo.id AS option_id,
    qo.option_text,
    qo.is_correct


    FROM quizzes q


    LEFT JOIN quiz_questions qq
    ON qq.quiz_id = q.id


    LEFT JOIN quiz_options qo
    ON qo.question_id = qq.id


    WHERE q.id = $1


    ORDER BY qq.order_index ASC

    `,

    [
      quizId
    ]

  );



  if(result.rows.length === 0){

    return null;

  }




  const quiz = {

    quiz_id:
    result.rows[0].quiz_id,


    title:
    result.rows[0].title,


    questions:[] as any[]

  };







  result.rows.forEach(row=>{


    let question =
    quiz.questions.find(
      (q:any)=>q.id === row.question_id
    );



    if(!question){


      question = {

        id:
        row.question_id,


        question_text:
        row.question_text,


        question_type:
        row.question_type,


        options:[]

      };


      quiz.questions.push(question);

    }







    if(row.option_id){


      question.options.push({

        id:
        row.option_id,


        option_text:
        row.option_text,


        is_correct:
        row.is_correct

      });


    }


  });




  return quiz;


}



  // Get quizzes inside module
  static async getQuizzesByModule(
    moduleId:string
  ){


    const result =
    await pool.query(

      `
      SELECT

      id,
      title,
      is_ai_generated,
      generated_from_lecture_id

      FROM quizzes

      WHERE module_id=$1

      ORDER BY title ASC

      `,

      [
        moduleId
      ]

    );


    return result.rows;


  }

  // Get questions with options for instructor view
  static async getQuestions(
    quizId: string
  ){

    const result = await pool.query(

      `
      SELECT

      qq.id AS question_id,

      qq.question_text,

      qq.question_type,

      qq.order_index,


      qo.id AS option_id,

      qo.option_text,

      qo.is_correct


      FROM quiz_questions qq


      LEFT JOIN quiz_options qo

      ON qo.question_id = qq.id


      WHERE qq.quiz_id = $1


      ORDER BY qq.order_index ASC

      `,

      [
        quizId
      ]

    );



    const questions:any[] = [];



    result.rows.forEach(row=>{


      let question =
      questions.find(
        q => q.id === row.question_id
      );



      if(!question){


        question = {

          id: row.question_id,

          question_text:
          row.question_text,

          question_type:
          row.question_type,

          order_index:
          row.order_index,

          options: []

        };


        questions.push(question);

      }




      if(row.option_id){


        question.options.push({

          id:
          row.option_id,

          option_text:
          row.option_text,

          is_correct:
          row.is_correct

        });


      }


    });



    return questions;


  }



}