import axios from "axios";


const AI_SERVICE_URL = "http://127.0.0.1:8000";


export class AIService {



  static async generateSummary(
    lectureId: string
  ) {

    try {


      const response = await axios.post(
        `${AI_SERVICE_URL}/summary/`,
        {
          lecture_id: lectureId
        }
      );


      return response.data;


    } catch(error:any) {


      console.error(
        "AI SUMMARY ERROR:",
        error.response?.data || error.message
      );


      throw new Error(
        "Failed to generate summary"
      );

    }

  }





  static async chat(
    message: string
  ) {

    try {


      const response = await axios.post(
        `${AI_SERVICE_URL}/ai/chat`,
        {
          message
        }
      );


      return response.data;


    } catch(error:any) {


      console.error(
        "AI CHAT ERROR:",
        error.response?.data || error.message
      );


      throw new Error(
        "Failed to generate AI response"
      );

    }

  }

static async generateFlashcards(
  lectureId: string
) {


  try {


    const response =
      await axios.post(
        `${AI_SERVICE_URL}/ai/flashcards/`,
        {
          lecture_id: lectureId
        }
      );


    return response.data;


  } catch(error:any) {


    console.error(
      "AI FLASHCARD ERROR:",
      error.response?.data || error.message
    );


    throw new Error(
      "Failed to generate flashcards"
    );

  }

}

static async generateQuiz(
  lectureId:string
){

  try{

    const response =
      await axios.post(
        `${AI_SERVICE_URL}/ai/quiz/`,
        {
          lecture_id: lectureId
        }
      );


    return response.data;


  }catch(error:any){

    console.error(
      "AI QUIZ ERROR:",
      error.response?.data || error.message
    );


    throw new Error(
      "Failed to generate quiz"
    );

  }

}


}