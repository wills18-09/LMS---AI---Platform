import { Response } from "express";
import { AuthenticatedRequest } from "../../middleware/authMiddleware";
import { AssignmentService } from "./assignments.service";


export class AssignmentController {


  // Instructor creates assignment
  static async createAssignment(
    req: AuthenticatedRequest,
    res: Response
  ) {

    try {

      const {
        course_id,
        title,
        instructions,
        rubric,
        due_date
      } = req.body;


      const assignment =
        await AssignmentService.createAssignment({

          course_id,
          title,
          instructions,
          rubric,
          due_date

        });



      return res.status(201).json({

        message:
        "Assignment created successfully",

        assignment

      });



    } catch(error:any) {


      console.error(
        "CREATE ASSIGNMENT ERROR:",
        error
      );


      return res.status(500).json({

        message:
        error.message ||
        "Server error"

      });

    }

  }






  // Student gets assignments for a course
  static async getAssignmentsByCourse(
    req: AuthenticatedRequest,
    res: Response
  ) {

    try {


      const courseId =
        req.params.id as string;



      const assignments =
        await AssignmentService.getAssignmentsByCourse(
          courseId
        );



      return res.status(200).json({

        assignments

      });



    } catch(error:any) {


      console.error(
        "GET ASSIGNMENTS ERROR:",
        error
      );


      return res.status(500).json({

        message:
        error.message ||
        "Server error"

      });

    }

  }







  // Student submits assignment with file
  static async submitAssignment(
    req: AuthenticatedRequest,
    res: Response
  ) {

    try {


      const assignmentId =
        req.params.id as string;



      const userId =
        req.user?.id;



      if(!userId){

        return res.status(401).json({

          message:
          "Unauthorized"

        });

      }




      if(!req.file){

        return res.status(400).json({

          message:
          "Assignment file is required"

        });

      }




      const fileUrl =
        `/uploads/${req.file.filename}`;





      const submission =
        await AssignmentService.submitAssignment({

          assignment_id:
          assignmentId,

          user_id:
          userId,

          file_url:
          fileUrl

        });





      return res.status(201).json({

        message:
        "Assignment submitted successfully",

        submission

      });



    } catch(error:any) {


      console.error(
        "SUBMIT ASSIGNMENT ERROR:",
        error
      );


      return res.status(500).json({

        message:
        error.message ||
        "Server error"

      });


    }

  }








  // Instructor grades submission
  static async gradeSubmission(
    req: AuthenticatedRequest,
    res: Response
  ) {

    try {


      const submissionId =
        req.params.id as string;



      const {
        grade,
        feedback

      } = req.body;





      const submission =
  await AssignmentService.gradeSubmission({

    id: submissionId,

    grade,

    feedback

  });





      return res.status(200).json({

        message:
        "Submission graded successfully",

        submission

      });



    } catch(error:any) {


      console.error(
        "GRADE SUBMISSION ERROR:",
        error
      );


      return res.status(500).json({

        message:
        error.message ||
        "Server error"

      });


    }

  }



}