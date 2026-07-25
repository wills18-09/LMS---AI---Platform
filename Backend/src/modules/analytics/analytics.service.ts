import { AnalyticsModel } from "./analytics.model";

export class AnalyticsService {

  // Instructor dashboard summary
  static async getDashboardStats(
    instructorId: string
  ) {

    return await AnalyticsModel.getDashboardStats(
      instructorId
    );

  }



  // Single course analytics
  static async getCourseAnalytics(
    courseId: string,
    instructorId: string
  ) {

    return await AnalyticsModel.getCourseAnalytics(
      courseId,
      instructorId
    );

  }



  // Lecture engagement
  static async getLectureAnalytics(
    courseId: string,
    instructorId: string
  ) {

    return await AnalyticsModel.getLectureAnalytics(
      courseId,
      instructorId
    );

  }



  // Quiz performance
  static async getQuizAnalytics(
    courseId: string,
    instructorId: string
  ) {

    return await AnalyticsModel.getQuizAnalytics(
      courseId,
      instructorId
    );

  }

}