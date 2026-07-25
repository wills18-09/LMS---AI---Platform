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


}