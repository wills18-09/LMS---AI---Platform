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

  },


  async getProgress(
    userId: string,
    lectureId: string
  ) {

    return await ProgressModel.getProgress(
      userId,
      lectureId
    );

  }

};