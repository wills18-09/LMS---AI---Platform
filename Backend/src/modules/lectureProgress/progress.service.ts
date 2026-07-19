import { ProgressModel } from "./progress.model";

export const ProgressService = {

  async updateProgress(
    userId: string,
    lectureId: string,
    watchedSeconds: number,
    completed: boolean
  ) {

    return await ProgressModel.updateProgress(
      userId,
      lectureId,
      watchedSeconds,
      completed
    );

  }

};