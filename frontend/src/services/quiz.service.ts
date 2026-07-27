import api from "./axios";


// Instructor

export const createQuiz = async(
  module_id:string,
  title:string
)=>{

const response =
await api.post(
"/quizzes",
{
module_id,
title
}
);

return response.data;

};




export const addQuestion = async(
quiz_id:string,
data:{
question_text:string;
question_type:string;
order_index:number;
}
)=>{


const response =
await api.post(
`/quizzes/${quiz_id}/questions`,
data
);


return response.data;


};





export const addOption = async(
question_id:string,
data:{
option_text:string;
is_correct:boolean;
}
)=>{


const response =
await api.post(
`/quizzes/questions/${question_id}/options`,
data
);


return response.data;

};





// Student


export const startQuiz = async(
quiz_id:string
)=>{


const response =
await api.post(
`/quizzes/${quiz_id}/attempt`
);


return response.data;


};





export const submitQuiz = async(
attempt_id:string,
answers:any[]
)=>{


const response =
await api.post(
`/quizzes/attempts/${attempt_id}/submit`,
{
answers
}
);


return response.data;


};