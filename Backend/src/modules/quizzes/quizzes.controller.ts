import { Request, Response } from "express";
import { QuizService } from "./quizzes.service";


export class QuizController {


  // Instructor creates quiz
  static async createQuiz(
    req: Request,
    res: Response
  ) {

    try {

      const {
        module_id,
        title
      } = req.body;


      const quiz =
        await QuizService.createQuiz(
          module_id,
          title
        );


      res.status(201).json({
        message: "Quiz created successfully",
        quiz
      });


    } catch(error) {

      console.error("CREATE QUIZ ERROR:", error);

      res.status(500).json({
        message:"Failed to create quiz"
      });

    }

  }



  // Instructor adds question
  static async addQuestion(
    req: Request,
    res: Response
  ) {

    try {

      const quizId =
        req.params.id as string;


      const {
        question_text,
        question_type,
        order_index
      } = req.body;



      const question =
        await QuizService.addQuestion(
          quizId,
          question_text,
          question_type,
          order_index
        );


      res.status(201).json({
        message:"Question added successfully",
        question
      });


    } catch(error){

      console.error("ADD QUESTION ERROR:",error);

      res.status(500).json({
        message:"Failed to add question"
      });

    }

  }




  // Instructor adds option
  static async addOption(
    req: Request,
    res: Response
  ){

    try {


      const questionId =
        req.params.id as string;


      const {
        option_text,
        is_correct
      } = req.body;



      const option =
        await QuizService.addOption(
          questionId,
          option_text,
          is_correct
        );


      res.status(201).json({
        message:"Option added successfully",
        option
      });



    } catch(error){

      console.error("ADD OPTION ERROR:",error);


      res.status(500).json({
        message:"Failed to add option"
      });

    }

  }





  // Student starts attempt
  static async startAttempt(
    req: Request,
    res: Response
  ){

    try {

      const quizId =
        req.params.id as string;


      const userId =
        req.user!.id;



      const attempt =
        await QuizService.startAttempt(
          quizId,
          userId
        );



      res.status(201).json({
        message:"Quiz attempt started successfully",
        attempt
      });


    } catch(error){

      console.error("START ATTEMPT ERROR:",error);


      res.status(500).json({
        message:"Failed to start attempt"
      });

    }

  }

  static async submitAttempt(
  req: Request,
  res: Response
){

  try {

    const attemptId =
      req.params.id as string;


    const {
      answers
    } = req.body;



    const result =
      await QuizService.submitAttempt(
        attemptId,
        answers
      );


    res.json({
      message:
      "Quiz submitted successfully",
      result
    });



  } catch(error){

    console.error(
      "SUBMIT QUIZ ERROR:",
      error
    );


    res.status(500).json({
      message:
      "Failed to submit quiz"
    });

  }

}


}