import { Request, Response } from "express";
import { RecommendationsService } from "./recommendations.service";


export class RecommendationsController {



  static async generateRecommendations(
    req:Request,
    res:Response
  ){

    try{


      const userId =
      req.user!.id;



      const recommendations =
      await RecommendationsService.generateRecommendations(
        userId
      );



      return res.json({

        message:
        "Recommendations generated successfully",

        recommendations

      });



    }
    catch(error:any){

      console.error(error);

      return res.status(500).json({

        message:
        error.message

      });

    }

  }







  static async getRecommendations(
    req:Request,
    res:Response
  ){

    try{


      const userId =
      req.user!.id;



      const recommendations =
      await RecommendationsService.getRecommendations(
        userId
      );



      return res.json({

        recommendations

      });


    }
    catch(error:any){

      console.error(error);


      return res.status(500).json({

        message:
        error.message

      });

    }

  }



}