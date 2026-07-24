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
  questionId: string
) {
  const result = await pool.query(
    `
    SELECT id
    FROM quiz_options
    WHERE question_id = $1
    AND is_correct = true
    `,
    [questionId]
  );

  return result.rows.map(
    row => row.id
  );
}



static async saveAnswer(
  attemptId: string,
  questionId: string,
  selectedOptionIds: string[],
  isCorrect: boolean
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
  attemptId: string,
  score: number
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

}