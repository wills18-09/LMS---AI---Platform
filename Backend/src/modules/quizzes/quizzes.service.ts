import { QuizModel } from "./quizzes.model";


export class QuizService {


  static async createQuiz(
    moduleId: string,
    title: string
  ) {
    return await QuizModel.createQuiz(
      moduleId,
      title
    );
  }



  static async addQuestion(
    quizId: string,
    questionText: string,
    questionType: string,
    orderIndex: number
  ) {
    return await QuizModel.addQuestion(
      quizId,
      questionText,
      questionType,
      orderIndex
    );
  }



  static async addOption(
    questionId: string,
    optionText: string,
    isCorrect: boolean
  ) {
    return await QuizModel.addOption(
      questionId,
      optionText,
      isCorrect
    );
  }



  static async startAttempt(
    quizId: string,
    userId: string
  ) {
    return await QuizModel.createAttempt(
      quizId,
      userId
    );
  }

  static async submitAttempt(
  attemptId: string,
  answers: any[]
) {

  let score = 0;


  for (const answer of answers) {


    const correctOptions =
      await QuizModel.getCorrectOptions(
        answer.question_id
      );


    const selected =
      answer.selected_option_ids
        .sort();


    const correct =
      correctOptions.sort();



    const isCorrect =
      JSON.stringify(selected)
      ===
      JSON.stringify(correct);



    if(isCorrect){
      score++;
    }



    await QuizModel.saveAnswer(
      attemptId,
      answer.question_id,
      answer.selected_option_ids,
      isCorrect
    );

  }



  const updatedAttempt =
    await QuizModel.updateScore(
      attemptId,
      score
    );


  return updatedAttempt;

}

}