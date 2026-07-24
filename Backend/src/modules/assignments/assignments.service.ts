import { AssignmentModel } from "./assignments.model";

export class AssignmentService {

  static async createAssignment(data: {
    course_id: string;
    title: string;
    instructions: string;
    rubric?: any;
    due_date?: string;
  }) {

    return await AssignmentModel.createAssignment(data);

  }



  static async getAssignmentsByCourse(
    courseId: string
  ) {

    return await AssignmentModel.getAssignmentsByCourse(courseId);

  }



  static async submitAssignment(data: {
    assignment_id: string;
    user_id: string;
    file_url: string;
  }) {

    const assignment =
      await AssignmentModel.getAssignmentById(
        data.assignment_id
      );

    if (!assignment) {
      throw new Error("Assignment not found");
    }

    return await AssignmentModel.submitAssignment(data);

  }



  static async gradeSubmission(data: {
    id: string;
    grade: number;
    feedback: string;
  }) {

    const submission =
      await AssignmentModel.getSubmissionById(
        data.id
      );

    if (!submission) {
      throw new Error("Submission not found");
    }

    return await AssignmentModel.gradeSubmission(data);

  }

}