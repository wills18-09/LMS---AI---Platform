import { Request, Response } from "express";
import { AnalyticsService } from "./analytics.service";

export class AnalyticsController {


  // Instructor dashboard overview
  static async getDashboardStats(
    req: Request,
    res: Response
  ) {

    try {

      const instructorId = req.user!.id;

      const stats =
        await AnalyticsService.getDashboardStats(
          instructorId
        );

      res.status(200).json({
        stats
      });

    } catch (error: any) {

      console.error(
        "DASHBOARD ANALYTICS ERROR:",
        error
      );

      res.status(500).json({
        message:
          error.message ||
          "Failed to fetch dashboard analytics"
      });

    }

  }



  // Course analytics
  static async getCourseAnalytics(
    req: Request,
    res: Response
  ) {

    try {

      const instructorId = req.user!.id;

      const courseId =
        req.params.courseId as string;


      const analytics =
        await AnalyticsService.getCourseAnalytics(
          courseId,
          instructorId
        );


      res.status(200).json({
        analytics
      });


    } catch (error: any) {

      console.error(
        "COURSE ANALYTICS ERROR:",
        error
      );


      res.status(500).json({
        message:
          error.message ||
          "Failed to fetch course analytics"
      });

    }

  }





  // Lecture analytics
  static async getLectureAnalytics(
    req: Request,
    res: Response
  ) {

    try {

      const instructorId = req.user!.id;

      const courseId =
        req.params.courseId as string;


      const lectures =
        await AnalyticsService.getLectureAnalytics(
          courseId,
          instructorId
        );


      res.status(200).json({
        lectures
      });


    } catch (error: any) {

      console.error(
        "LECTURE ANALYTICS ERROR:",
        error
      );


      res.status(500).json({
        message:
          error.message ||
          "Failed to fetch lecture analytics"
      });

    }

  }





  // Quiz analytics
  static async getQuizAnalytics(
    req: Request,
    res: Response
  ) {

    try {

      const instructorId = req.user!.id;

      const courseId =
        req.params.courseId as string;


      const quizzes =
        await AnalyticsService.getQuizAnalytics(
          courseId,
          instructorId
        );


      res.status(200).json({
        quizzes
      });


    } catch (error: any) {

      console.error(
        "QUIZ ANALYTICS ERROR:",
        error
      );


      res.status(500).json({
        message:
          error.message ||
          "Failed to fetch quiz analytics"
      });

    }

  }


}