import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import api from "../../services/axios";

import "../../styles/instructorQuiz.css";



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





function InstructorQuiz(){


const { quizId } = useParams();



const [quiz,setQuiz] =
useState<Quiz | null>(null);



const [question,setQuestion] =
useState("");



const [loading,setLoading] =
useState(false);



const [optionText,setOptionText] =
useState("");



const [selectedQuestion,setSelectedQuestion] =
useState<string | null>(null);



const [isCorrect,setIsCorrect] =
useState(false);








const loadQuiz = async()=>{


try{


if(!quizId){

return;

}



const response =
await api.get(
`/quizzes/instructor/${quizId}`
);



setQuiz(
response.data.quiz
);



}
catch(error){

console.error(
"Loading quiz failed:",
error
);

}


};







useEffect(()=>{


loadQuiz();


},[quizId]);









const addQuestion = async()=>{


try{


if(!question.trim()){

return;

}



setLoading(true);





await api.post(

`/quizzes/${quizId}/questions`,

{

question_text:question,

question_type:"mcq",

order_index:
(quiz?.questions?.length || 0)+1

}

);





setQuestion("");

await loadQuiz();



}
catch(error){


console.error(
"Adding question failed:",
error
);


}

finally{


setLoading(false);


}


};










const addOption = async()=>{


try{


if(
!selectedQuestion ||
!optionText.trim()
){

return;

}




await api.post(

`/quizzes/questions/${selectedQuestion}/options`,

{

option_text:optionText,

is_correct:isCorrect

}

);





setOptionText("");

setIsCorrect(false);

setSelectedQuestion(null);



await loadQuiz();



}
catch(error){


console.error(
"Adding option failed:",
error
);


}



};









if(!quiz){


return(

<div className="quiz-loading">

Loading quiz...

</div>

);


}









return(


<div className="instructor-quiz-page">





<div className="quiz-top-card">


<div>

<h1>

📝 {quiz.title}

</h1>


<p>

Create and manage quiz questions, options and answers.

</p>


</div>



<div className="question-count">


<span>

{quiz.questions?.length || 0}

</span>


Questions


</div>


</div>









<div className="questions-section">



<h2>

Questions

</h2>








{

quiz.questions &&
quiz.questions.length > 0 ?



quiz.questions.map((q,index)=>(



<div

className="question-card"

key={q.id}

>





<div className="question-header">


<h3>

{index+1}. {q.question_text}

</h3>


<span>

{q.question_type.toUpperCase()}

</span>


</div>







<div className="options-list">


{

q.options &&
q.options.length > 0 ?



q.options.map(option=>(


<div

className={
option.is_correct
?
"option-row correct"
:
"option-row"
}

key={option.id}

>


<div className="option-icon">

{

option.is_correct

?

"✓"

:

""

}

</div>


<p>

{option.option_text}

</p>



{

option.is_correct &&

<span className="answer-label">

Correct Answer

</span>

}



</div>


))



:


<p className="empty-text">

No options added yet.

</p>


}



</div>










<button


className="add-option-btn"


onClick={()=>

setSelectedQuestion(q.id)

}


>


➕ Add Option


</button>









{

selectedQuestion === q.id && (



<div className="option-form">


<input


placeholder="Enter option text"


value={optionText}


onChange={(e)=>

setOptionText(
e.target.value
)

}


/>





<label className="correct-checkbox">


<input


type="checkbox"


checked={isCorrect}


onChange={(e)=>

setIsCorrect(
e.target.checked
)

}


/>


Mark as correct


</label>







<div className="option-actions">


<button


className="save-option-btn"


onClick={addOption}


>


Save Option


</button>





<button


className="cancel-btn"


onClick={()=>{


setSelectedQuestion(null);

setOptionText("");

setIsCorrect(false);


}}


>


Cancel


</button>



</div>



</div>



)


}








</div>


))



:


<div className="empty-questions">


No questions created yet.

</div>



}







</div>









<div className="add-question-card">



<h2>

Add New Question

</h2>




<input


placeholder="Enter question"


value={question}


onChange={(e)=>

setQuestion(
e.target.value
)

}


/>






<button


className="add-question-btn"


onClick={addQuestion}


disabled={loading}


>


{

loading

?

"Adding..."

:

"+ Add Question"

}


</button>





</div>






</div>


);


}



export default InstructorQuiz;