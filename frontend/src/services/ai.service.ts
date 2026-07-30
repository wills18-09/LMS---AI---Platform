import api from "./axios";



export const askAI = async(
    message:string
)=>{

    const response =
        await api.post(
            "/ai/chat",
            {
                message
            }
        );

    return response.data;

};





export const generateFlashcards = async(
    lectureId:string
)=>{

    const response =
        await api.post(
            `/flashcards/generate/${lectureId}`
        );

    return response.data;

};





export const generateQuiz = async(
    lectureId:string
)=>{

    const response =
        await api.post(
            `/quizzes/ai/${lectureId}`
        );

    return response.data;

};





export const generateSummary = async(
    lectureId:string
)=>{

    const response =
        await api.post(
            `/ai/summary/${lectureId}`
        );


    return response.data;

};