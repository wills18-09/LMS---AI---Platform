import { Request, Response } from "express";
import { PreferencesService } from "./preferences.service";

export class PreferencesController {

  static async getDifficulty(
    req: Request,
    res: Response
  ) {

    try {

      const userId = req.user!.id;

      const preference =
        await PreferencesService.getDifficulty(
          userId
        );

      return res.status(200).json(preference);

    }
    catch (error: any) {

      console.error(error);

      return res.status(500).json({
        message: error.message
      });

    }

  }

  static async updateDifficulty(
    req: Request,
    res: Response
  ) {

    try {

      const userId = req.user!.id;

      const {
        difficulty_mode
      } = req.body;

      const updated =
        await PreferencesService.updateDifficulty(
          userId,
          difficulty_mode
        );

      return res.status(200).json({
        message: "Difficulty updated successfully",
        preference: updated
      });

    }
    catch (error: any) {

      console.error(error);

      return res.status(500).json({
        message: error.message
      });

    }

  }

}