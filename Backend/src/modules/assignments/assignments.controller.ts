import { Request, Response } from "express";
import { AssignmentService } from "./assignments.service";

export class AssignmentController {

  // Instructor
  static async createAssignment(
    req: Request,
    res: Response
  ) {
    try {

      const assignment =
        await AssignmentService.createAssignment(
          req.body
        );

      return res.status(201).json({
        message: "Assignment created successfully",
        assignment,
      });

    } catch (error: any) {

      return res.status(500).json({
        message: error.message,
      });

    }
  }

  // Student
  static async getAssignmentsByCourse(
    req: Request,
    res: Response
  ) {
    try {

      const courseId = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

      const assignments =
        await AssignmentService.getAssignmentsByCourse(
          courseId
        );

      return res.json(assignments);

    } catch (error: any) {

      return res.status(500).json({
        message: error.message,
      });

    }
  }

  // Student
  static async submitAssignment(
    req: Request,
    res: Response
  ) {
    try {

      const assignmentId = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

      const submission =
        await AssignmentService.submitAssignment({
          assignment_id: assignmentId,
          user_id: req.user!.id,
          file_url: req.body.file_url,
        });

      return res.status(201).json({
        message: "Assignment submitted successfully",
        submission,
      });

    } catch (error: any) {

      return res.status(500).json({
        message: error.message,
      });

    }
  }

  // Instructor
  static async gradeSubmission(
    req: Request,
    res: Response
  ) {
    try {

      const submissionId = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

      const submission =
        await AssignmentService.gradeSubmission({
          id: submissionId,
          grade: req.body.grade,
          feedback: req.body.feedback,
        });

      return res.json({
        message: "Submission graded successfully",
        submission,
      });

    } catch (error: any) {

      return res.status(500).json({
        message: error.message,
      });

    }
  }

}