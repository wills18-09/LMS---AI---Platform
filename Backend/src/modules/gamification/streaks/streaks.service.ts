import { StreakModel } from "./streaks.model";

export class StreakService {

  // Update user's daily streak
  static async updateDailyStreak(userId: string) {

    const streak = await StreakModel.getStreak(userId);

    // First activity ever
    if (!streak) {
      return await StreakModel.createStreak(userId);
    }

    const today = new Date();

    const lastActive = new Date(streak.last_active_date);

    // Remove time component
    today.setHours(0, 0, 0, 0);
    lastActive.setHours(0, 0, 0, 0);

    const diffDays = Math.floor(
      (today.getTime() - lastActive.getTime()) /
      (1000 * 60 * 60 * 24)
    );

    let currentStreak = streak.current_streak;
    let longestStreak = streak.longest_streak;

    if (diffDays === 0) {

      // Already active today
      return streak;

    } else if (diffDays === 1) {

      // Consecutive day
      currentStreak++;

      if (currentStreak > longestStreak) {
        longestStreak = currentStreak;
      }

    } else {

      // Missed one or more days
      currentStreak = 1;

    }

    return await StreakModel.updateStreak(
      userId,
      currentStreak,
      longestStreak
    );

  }



  // Get logged-in user's streak
  static async getMyStreak(userId: string) {

    return await StreakModel.getStreak(userId);

  }



  // Get all streaks
  static async getAllStreaks() {

    return await StreakModel.getAllStreaks();

  }

}