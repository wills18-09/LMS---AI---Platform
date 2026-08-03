import { PreferencesModel } from "./preferences.model";

export class PreferencesService {

  static async getDifficulty(
    userId: string
  ) {

    const preference =
      await PreferencesModel.getDifficulty(
        userId
      );

    return (
      preference || {
        difficulty_mode: "intermediate"
      }
    );

  }

  static async updateDifficulty(
    userId: string,
    difficultyMode: string
  ) {

    if (
      ![
        "beginner",
        "intermediate",
        "advanced"
      ].includes(difficultyMode)
    ) {

      throw new Error(
        "Invalid difficulty mode"
      );

    }

    return await PreferencesModel.updateDifficulty(
      userId,
      difficultyMode
    );

  }

}