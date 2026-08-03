import { Request, Response } from "express";
import { AdminService } from "./admin.service";


export class AdminController {


  // GET all users
  static async getUsers(
    req: Request,
    res: Response
  ) {

    try {

      const users = await AdminService.getUsers();

      res.json({
        users
      });

    } catch (error) {

      console.error("GET USERS ERROR:", error);

      res.status(500).json({
        message: "Failed to fetch users"
      });

    }

  }



  // Update user role
  static async updateUserRole(
    req: Request,
    res: Response
  ) {

    try {

      const { id } = req.params;
      const { role } = req.body;


      const updatedRole =
        await AdminService.updateUserRole(
          id as string,
          role
        );


      res.json({
        message: "User role updated successfully",
        role: updatedRole
      });


    } catch (error) {

      console.error("UPDATE ROLE ERROR:", error);

      res.status(500).json({
        message: "Failed to update user role"
      });

    }

  }




  // Suspend user
  static async suspendUser(
    req: Request,
    res: Response
  ) {

    try {

      const { id } = req.params;


      const user =
        await AdminService.suspendUser(
          id as string
        );


      res.json({
        message: "User suspended successfully",
        user
      });


    } catch (error) {

      console.error("SUSPEND USER ERROR:", error);

      res.status(500).json({
        message: "Failed to suspend user"
      });

    }

  }


  // Get pending courses
static async getPendingCourses(
  req: Request,
  res: Response
) {

  try {

    const courses =
      await AdminService.getPendingCourses();

    res.json({
      courses
    });

  }
  catch (error) {

    console.error(
      "GET PENDING COURSES ERROR:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch pending courses"
    });

  }

}



// Approve course
// Approve course
static async approveCourse(
  req: Request,
  res: Response
) {

  try {

    const { id } = req.params as {
      id: string;
    };


    const course =
      await AdminService.approveCourse(
        id
      );


    res.json({
      message: "Course approved successfully",
      course
    });


  }
  catch (error) {

    console.error(
      "APPROVE COURSE ERROR:",
      error
    );


    res.status(500).json({
      message: "Failed to approve course"
    });

  }

}





// Reject course
static async rejectCourse(
  req: Request,
  res: Response
) {

  try {

    const { id } = req.params as {
      id: string;
    };


    const course =
      await AdminService.rejectCourse(
        id
      );


    res.json({
      message: "Course rejected successfully",
      course
    });


  }
  catch (error) {

    console.error(
      "REJECT COURSE ERROR:",
      error
    );


    res.status(500).json({
      message: "Failed to reject course"
    });

  }

}



  // Platform analytics overview
  static async getOverview(
    req: Request,
    res: Response
  ) {

    try {

      const stats =
        await AdminService.getOverview();


      res.json({
        stats
      });


    } catch (error) {

      console.error("ADMIN OVERVIEW ERROR:", error);

      res.status(500).json({
        message: "Failed to fetch analytics"
      });

    }

  }

    static async getDetailedAnalytics(
    req: Request,
    res: Response
  ) {


    try {


      const analytics =
        await AdminService.getDetailedAnalytics();


      res.json({
        analytics
      });


    }
    catch(error){


      console.error(
        "DETAILED ANALYTICS ERROR:",
        error
      );


      res.status(500).json({

        message:
        "Failed to fetch detailed analytics"

      });


    }


  }


}