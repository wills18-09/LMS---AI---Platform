import { MasteryModel } from "./mastery.model";

export class MasteryService {

  static async updateMastery(
    userId: string,
    lectureId: string,
    score: number
  ) {

    return await MasteryModel.updateMastery(
      userId,
      lectureId,
      score
    );

  }



  static async getLectureMastery(
    userId: string,
    lectureId: string
  ) {

    return await MasteryModel.getLectureMastery(
      userId,
      lectureId
    );

  }



  static async getCourseMastery(
    userId: string
  ) {

    return await MasteryModel.getCourseMastery(
      userId
    );

  }

}