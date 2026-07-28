import { Request, Response } from "express";
import { QuizService } from "./quizzes.service";
import { AIService } from "../../services/ai.service";


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






  // Instructor views quiz questions
  static async getQuestions(
    req: Request,
    res: Response
  ){

    try {

      const quizId =
        req.params.id as string;



      const questions =
        await QuizService.getQuestions(
          quizId
        );



      res.status(200).json({
        questions
      });



    } catch(error){

      console.error(
        "GET QUESTIONS ERROR:",
        error
      );


      res.status(500).json({
        message:"Failed to fetch questions"
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





  static async getQuiz(
    req:Request,
    res:Response
  ){

    try{


      const quizId =
        req.params.id as string;



      const quiz =
        await QuizService.getQuizById(
          quizId
        );



      res.json({
        quiz
      });



    }
    catch(error){

      console.error(
        "GET QUIZ ERROR",
        error
      );


      res.status(500).json({
        message:"Failed loading quiz"
      });


    }

  }






  // Get quizzes by module (Instructor)
  static async getQuizzesByModule(
    req: Request,
    res: Response
  ){

    try {


      const moduleId =
        req.params.moduleId as string;



      const quizzes =
        await QuizService.getQuizzesByModule(
          moduleId
        );



      res.status(200).json({

        quizzes

      });



    }
    catch(error){


      console.error(
        "GET MODULE QUIZZES ERROR:",
        error
      );


      res.status(500).json({

        message:
        "Failed to fetch quizzes"

      });


    }

  }

  // Generate AI quiz from lecture
static async generateAIQuiz(
  req: Request,
  res: Response
){

  try{


    const lectureId =
      req.params.lectureId as string;



    const {
      module_id,
      title
    } = req.body;



    const aiQuiz =
      await AIService.generateQuiz(
        lectureId
      );



    const quiz =
  await QuizService.createAIQuiz(
    module_id,
    title || "AI Generated Quiz",
    lectureId
  );

    for(
      let i = 0;
      i < aiQuiz.questions.length;
      i++
    ){


      const question =
        await QuizService.addQuestion(
          quiz.id,
          aiQuiz.questions[i].question_text,
          "mcq",
          i + 1
        );



      for(
        const option of aiQuiz.questions[i].options
      ){


        await QuizService.addOption(
          question.id,
          option.option_text,
          option.is_correct
        );


      }


    }



    res.status(201).json({

      message:
      "AI quiz generated successfully",

      quiz_id:
      quiz.id

    });



  }catch(error:any){


    console.error(
      "AI QUIZ GENERATION ERROR:",
      error
    );


    res.status(500).json({

      message:error.message

    });


  }

}


}

