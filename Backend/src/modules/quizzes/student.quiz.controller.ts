import { Request, Response } from "express";
import pool from "../../db";



export class StudentQuizController {



static async getQuizByLecture(
    req: Request,
    res: Response
){

    try{


        const {
            lectureId
        } = req.params;



        const quiz =
        await pool.query(
            `
            SELECT
                id,
                title

            FROM quizzes

            WHERE generated_from_lecture_id=$1

            LIMIT 1
            `,
            [
                lectureId
            ]
        );



        if(quiz.rows.length===0){

            return res.status(404).json({

                message:"No quiz available"

            });

        }



        const quizId =
        quiz.rows[0].id;




        const questions =
        await pool.query(
            `
            SELECT
                id,
                question_text,
                question_type,
                order_index

            FROM quiz_questions

            WHERE quiz_id=$1

            ORDER BY order_index
            `,
            [
                quizId
            ]
        );




        const formattedQuestions=[];



        for(
            const question of questions.rows
        ){


            const options =
            await pool.query(
                `
                SELECT
                    id,
                    option_text

                FROM quiz_options

                WHERE question_id=$1
                `,
                [
                    question.id
                ]
            );



            formattedQuestions.push({

                ...question,

                options:
                options.rows

            });


        }




        return res.json({

            quiz:{
                ...quiz.rows[0],

                questions:
                formattedQuestions
            }

        });



    }
    catch(error){


        console.error(
            "GET STUDENT QUIZ ERROR:",
            error
        );


        return res.status(500).json({

            message:"Failed loading quiz"

        });


    }

}






static async submitQuiz(
    req: Request,
    res: Response
){

    try{


        const userId =
        (req as any).user.id;



        const {
            quizId
        } = req.params;



        const {
            answers
        } = req.body;



        /*
        answers format:

        [
          {
            question_id:"",
            selected_option_ids:[""]
          }
        ]

        */



        let correctCount=0;



        const totalQuestions =
        answers.length;




        const attempt =
        await pool.query(
            `
            INSERT INTO quiz_attempts
            (
                quiz_id,
                user_id
            )

            VALUES
            ($1,$2)

            RETURNING id
            `,
            [
                quizId,
                userId
            ]
        );



        const attemptId =
        attempt.rows[0].id;




        for(
            const answer of answers
        ){



            const correct =
            await pool.query(
                `
                SELECT id

                FROM quiz_options

                WHERE question_id=$1

                AND is_correct=true

                `,
                [
                    answer.question_id
                ]
            );



            const correctIds =
            correct.rows.map(
                option=>option.id
            );



            const selected =
            answer.selected_option_ids;



            const isCorrect =
            JSON.stringify(
                selected.sort()
            )
            ===
            JSON.stringify(
                correctIds.sort()
            );



            if(isCorrect){

                correctCount++;

            }





            await pool.query(
                `
                INSERT INTO quiz_answers
                (
                    attempt_id,
                    question_id,
                    selected_option_ids,
                    is_correct
                )

                VALUES
                ($1,$2,$3,$4)

                `,
                [
                    attemptId,
                    answer.question_id,
                    selected,
                    isCorrect
                ]
            );


        }




        const score =
        (
            correctCount /
            totalQuestions
        )
        *
        100;




        await pool.query(
            `
            UPDATE quiz_attempts

            SET score=$1,
            submitted_at=NOW()

            WHERE id=$2

            `,
            [
                score,
                attemptId
            ]
        );





        return res.json({

            message:"Quiz submitted",

            score,

            correctAnswers:
            correctCount,

            totalQuestions

        });




    }
    catch(error){


        console.error(
            "SUBMIT QUIZ ERROR:",
            error
        );


        return res.status(500).json({

            message:"Quiz submission failed"

        });


    }


}


}