import { Request, Response } from "express";
import { StreakService } from "./streaks.service";

export class StreakController {

  // Update logged-in user's streak
  static async updateDailyStreak(
    req: Request,
    res: Response
  ) {

    try {

      const userId = req.user!.id;

      const streak =
        await StreakService.updateDailyStreak(
          userId
        );

      res.status(200).json({
        message: "Streak updated successfully",
        streak
      });

    } catch (error: any) {

      console.error(
        "UPDATE STREAK ERROR:",
        error
      );

      res.status(500).json({
        message:
          error.message ||
          "Failed to update streak"
      });

    }

  }



  // Get logged-in user's streak
  static async getMyStreak(
    req: Request,
    res: Response
  ) {

    try {

      const userId = req.user!.id;

      const streak =
        await StreakService.getMyStreak(
          userId
        );

      res.status(200).json({
        streak
      });

    } catch (error: any) {

      console.error(
        "GET STREAK ERROR:",
        error
      );

      res.status(500).json({
        message:
          error.message ||
          "Failed to fetch streak"
      });

    }

  }



  // Get all streaks (admin)
  static async getAllStreaks(
    req: Request,
    res: Response
  ) {

    try {

      const streaks =
        await StreakService.getAllStreaks();

      res.status(200).json({
        streaks
      });

    } catch (error: any) {

      console.error(
        "GET ALL STREAKS ERROR:",
        error
      );

      res.status(500).json({
        message:
          error.message ||
          "Failed to fetch streaks"
      });

    }

  }

}