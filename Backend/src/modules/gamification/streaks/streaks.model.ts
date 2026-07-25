import pool from "../../../db";

export class StreakModel {

  // Get user's streak
  static async getStreak(userId: string) {

    const result = await pool.query(
      `
      SELECT *
      FROM streaks
      WHERE user_id = $1
      `,
      [userId]
    );

    return result.rows[0];

  }



  // Create streak for new user
  static async createStreak(userId: string) {

    const result = await pool.query(
      `
      INSERT INTO streaks (
        user_id,
        current_streak,
        longest_streak,
        last_active_date
      )
      VALUES ($1,1,1,CURRENT_DATE)
      RETURNING *
      `,
      [userId]
    );

    return result.rows[0];

  }



  // Update streak
  static async updateStreak(
    userId: string,
    currentStreak: number,
    longestStreak: number
  ) {

    const result = await pool.query(
      `
      UPDATE streaks
      SET
        current_streak = $2,
        longest_streak = $3,
        last_active_date = CURRENT_DATE
      WHERE user_id = $1
      RETURNING *
      `,
      [
        userId,
        currentStreak,
        longestStreak
      ]
    );

    return result.rows[0];

  }



  // Get all streaks (leaderboard/admin)
  static async getAllStreaks() {

    const result = await pool.query(
      `
      SELECT
        s.*,
        u.full_name
      FROM streaks s
      JOIN users u
      ON u.id = s.user_id
      ORDER BY current_streak DESC
      `
    );

    return result.rows;

  }

}