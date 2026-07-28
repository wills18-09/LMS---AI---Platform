import { Request, Response } from "express";

import { AIService } from "../../services/ai.service";


export class AIController {


  static async chat(
    req: Request,
    res: Response
  ) {

    try {


      const {
        message
      } = req.body;



      if (!message) {

        return res.status(400).json({

          message: "Message is required"

        });

      }



      const response =
        await AIService.chat(
          message
        );



      res.json(response);



    } catch(error:any) {


      console.error(
        "AI CHAT CONTROLLER ERROR:",
        error
      );


      res.status(500).json({

        message:
          error.message

      });

    }

  }


}