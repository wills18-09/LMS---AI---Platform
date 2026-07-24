import { Request, Response } from "express";
import { BadgeService } from "./badges.service";


export class BadgeController {


  // Create badge (admin)
  static async createBadge(
    req: Request,
    res: Response
  ) {

    try {


      const {
        name,
        description,
        icon_url
      } = req.body;



      const badge =
        await BadgeService.createBadge(
          name,
          description,
          icon_url
        );



      res.status(201).json({

        message:
          "Badge created successfully",

        badge

      });



    } catch(error:any) {


      console.error(
        "CREATE BADGE ERROR:",
        error
      );


      res.status(500).json({

        message:
          error.message ||
          "Failed to create badge"

      });

    }

  }





  // Get all badges
  static async getBadges(
    req: Request,
    res: Response
  ) {

    try {


      const badges =
        await BadgeService.getBadges();



      res.json({

        badges

      });



    } catch(error:any) {


      res.status(500).json({

        message:
          error.message ||
          "Failed to fetch badges"

      });

    }

  }





  // Award badge to student
  static async awardBadge(
    req: Request,
    res: Response
  ) {

    try {


      const {
        userId,
        badgeId
      } = req.body;



      const badge =
        await BadgeService.awardBadge(
          userId,
          badgeId
        );



      res.status(201).json({

        message:
          "Badge awarded successfully",

        badge

      });



    } catch(error:any) {


      console.error(
        "AWARD BADGE ERROR:",
        error
      );


      res.status(500).json({

        message:
          error.message ||
          "Failed to award badge"

      });

    }

  }





  // Get logged-in user's badges
  static async getMyBadges(
    req: Request,
    res: Response
  ) {

    try {


      const userId =
        req.user!.id;



      const badges =
        await BadgeService.getUserBadges(
          userId
        );



      res.json({

        badges

      });



    } catch(error:any) {


      res.status(500).json({

        message:
          error.message ||
          "Failed to fetch user badges"

      });

    }

  }


}