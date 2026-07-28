import { Request, Response } from "express";
import axios from "axios";
import pool from "../../db";


const AI_SERVICE_URL = "http://127.0.0.1:8000";



export class QuizAIController {



  static async generateQuiz(
    req: Request,
    res: Response
  ){

    try {


      const lectureId =
        req.params.lectureId as string;



      const {
        module_id,
        title
      } = req.body;



      const lecture =
      await pool.query(
        `
        SELECT transcript
        FROM lectures
        WHERE id=$1
        `,
        [
          lectureId
        ]
      );



      if(!lecture.rows[0]){

        return res.status(404).json({
          message:"Lecture not found"
        });

      }




      // Call AI Service

      const response =
      await axios.post(
        `${AI_SERVICE_URL}/ai/quiz/`,
        {
          lecture_id: lectureId
        }
      );



      console.log(
        "AI RESPONSE:",
        JSON.stringify(
          response.data,
          null,
          2
        )
      );



      const questions =
      response.data.questions;



      if(
        !questions ||
        questions.length === 0
      ){

        return res.status(400).json({

          message:
          "AI did not generate questions"

        });

      }




      // Create quiz

      const quiz =
      await pool.query(
        `
        INSERT INTO quizzes(

          module_id,
          title,
          is_ai_generated,
          generated_from_lecture_id

        )

        VALUES($1,$2,true,$3)

        RETURNING *
        `,
        [
          module_id,
          title,
          lectureId
        ]
      );



      const quizId =
      quiz.rows[0].id;




      // Insert questions

      for(
        let i = 0;
        i < questions.length;
        i++
      ){


        const question =
        await pool.query(
          `
          INSERT INTO quiz_questions(

            quiz_id,
            question_text,
            question_type,
            order_index

          )

          VALUES($1,$2,$3,$4)

          RETURNING id

          `,
          [

            quizId,

            questions[i].question_text,

            "mcq",

            i + 1

          ]
        );



        const questionId =
        question.rows[0].id;




        // Insert options

        for(
          const option of questions[i].options
        ){


          await pool.query(
            `
            INSERT INTO quiz_options(

              question_id,
              option_text,
              is_correct

            )

            VALUES($1,$2,$3)

            `,
            [

              questionId,

              option.option_text,

              option.is_correct

            ]
          );


        }


      }




      return res.status(201).json({

        message:
        "AI quiz generated successfully",

        quiz_id:
        quizId,

        questions_added:
        questions.length

      });



    }
    catch(error:any){


      console.error(
        "AI QUIZ ERROR:",
        error.response?.data ||
        error.message
      );



      return res.status(500).json({

        message:
        "Failed generating AI quiz"

      });


    }


  }


}