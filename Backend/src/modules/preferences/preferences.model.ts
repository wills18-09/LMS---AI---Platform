import pool from "../../db";

export class PreferencesModel {

  static async getDifficulty(
    userId: string
  ) {

    const result = await pool.query(
      `
      SELECT difficulty_mode
      FROM student_preferences
      WHERE user_id = $1
      `,
      [userId]
    );

    return result.rows[0] || null;

  }

  static async updateDifficulty(
    userId: string,
    difficultyMode: string
  ) {

    const result = await pool.query(
      `
      INSERT INTO student_preferences (
        user_id,
        difficulty_mode
      )
      VALUES ($1,$2)

      ON CONFLICT (user_id)

      DO UPDATE SET

      difficulty_mode = EXCLUDED.difficulty_mode,
      updated_at = NOW()

      RETURNING *
      `,
      [
        userId,
        difficultyMode
      ]
    );

    return result.rows[0];

  }

}