import {
  Request,
  Response
} from "express";


import {
  ChatSessionService
} from "./chatSession.service";


import axios from "axios";




export class ChatSessionController {





static async createSession(
  req: Request,
  res: Response
){


  try{


    const userId =
    (req as any).user.id;



    const {
      course_id
    } = req.body;




    const session =
    await ChatSessionService.createSession(
      userId,
      course_id
    );




    res.json({
      session
    });



  }
  catch(error){


    console.error(
      "CREATE SESSION ERROR:",
      error
    );


    res.status(500).json({
      message:"Failed creating chat session"
    });


  }


}









static async updateMode(
  req: Request,
  res: Response
){


  try{


    const id =
    String(
      req.params.id
    );



    const {
      mode
    } = req.body;




    const session =
    await ChatSessionService.updateMode(
      id,
      mode
    );




    res.json({

      session

    });



  }
  catch(error){


    console.error(
      "UPDATE MODE ERROR:",
      error
    );


    res.status(500).json({

      message:"Mode update failed"

    });



  }


}









static async sendMessage(
  req: Request,
  res: Response
){


  try{


    const id =
    String(
      req.params.id
    );



    const {
      message
    } = req.body;




    const session =
    await ChatSessionService.getSession(
      id
    );




    if(!session){


      return res.status(404).json({

        message:"Session not found"

      });


    }







    await ChatSessionService.saveMessage(

      id,

      "student",

      message

    );









    const aiResponse =
await axios.post(

  `${process.env.AI_SERVICE_URL}/ai/chat`,

  {
    session_id: id,
    message
  }

);






    const reply =
    aiResponse.data.reply;



    const sources =
    aiResponse.data.sources || [];





    const sourceIds =
    sources.map(

      (source:any)=>

      source.lecture_id

    );






    await ChatSessionService.saveMessage(

      id,

      "assistant",

      reply,

      sourceIds

    );







    res.json({

      reply,

      sources

    });





  }
  catch(error){


    console.error(

      "SEND MESSAGE ERROR:",

      error

    );



    res.status(500).json({

      message:"AI chat failed"

    });



  }


}



}