import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import api from "../../services/axios";

import "../../styles/quiz.css";



type Option = {

  id:string;

  option_text:string;

  is_correct:boolean;

};



type Question = {

  id:string;

  question_text:string;

  question_type:string;

  options:Option[];

};



type Quiz = {

  quiz_id:string;

  title:string;

  questions:Question[];

};




function QuizAttempt(){



const { id } =
useParams();



const navigate =
useNavigate();



const [quiz,setQuiz] =
useState<Quiz | null>(null);



const [attemptId,setAttemptId] =
useState("");



const [answers,setAnswers] =
useState<any[]>([]);



const [loading,setLoading] =
useState(true);



const [submitted,setSubmitted] =
useState(false);



const [score,setScore] =
useState<number | null>(null);






useEffect(()=>{


const loadQuiz = async()=>{


try{


// get quiz

const quizResponse =
await api.get(
`/quizzes/${id}`
);



console.log(
"Quiz:",
quizResponse.data
);



setQuiz(
quizResponse.data.quiz
);




// start attempt

const attemptResponse =
await api.post(
`/quizzes/${id}/attempt`
);



console.log(
"Attempt:",
attemptResponse.data
);



setAttemptId(
attemptResponse.data.attempt.id
);



}
catch(error){

console.error(
"Quiz loading failed:",
error
);

}
finally{

setLoading(false);

}


};



if(id){

loadQuiz();

}


},[id]);







const selectOption = (
questionId:string,
optionId:string
)=>{


setAnswers((previous)=>{


const filtered =
previous.filter(
(item)=>
item.question_id !== questionId
);



return [

...filtered,

{

question_id:questionId,

selected_option_ids:[
optionId
]

}

];


});


};








const submitQuiz = async()=>{


try{


const response =
await api.post(

`/quizzes/attempts/${attemptId}/submit`,

{

answers

}

);



console.log(
"Quiz Result:",
response.data
);



setScore(
response.data.result.score
);



setSubmitted(true);



}

catch(error){

console.error(
"Submit quiz failed:",
error
);

}


};








if(loading){


return (

<div className="quiz-loading">

Loading quiz...

</div>

);


}







if(!quiz){


return (

<div className="quiz-error">

Quiz not found.

</div>

);


}







return (


<div className="quiz-page">



<div className="quiz-header">


<div>


<h1>

🧠 {quiz.title}

</h1>


<p>

Test your knowledge and complete the quiz.

</p>


</div>


<div className="quiz-badge">

Quiz

</div>


</div>








{

submitted ?


<div className="result-card">


<h2>

🎉 Quiz Completed

</h2>



<p>

Your Score

</p>



<div className="score">

{score}

</div>




<button

className="back-button"

onClick={()=>navigate(-1)}

>

← Back to Course

</button>



</div>



:


<div className="questions-container">



{

quiz.questions.map(
(question,index)=>(


<div

className="question-card"

key={question.id}

>


<h3>

{index+1}. {question.question_text}

</h3>




<div className="options-container">


{

question.options.map(
(option)=>(


<label

key={option.id}

className="option-card"

>


<input

type="radio"

name={question.id}

value={option.id}

onChange={()=>selectOption(
question.id,
option.id
)}

/>


<span>

{option.option_text}

</span>


</label>


)

)

}



</div>



</div>


)

)

}



<button

className="submit-quiz-btn"

onClick={submitQuiz}

>

Submit Quiz 🚀

</button>



</div>


}



</div>


);


}



export default QuizAttempt;