import {
useState
} from "react";

import {
useParams
} from "react-router-dom";

import api from "../../services/axios";

import "../../styles/quizBuilder.css";



function QuizBuilder(){


const {quizId}=useParams();



const [question,setQuestion]=useState("");

const [options,setOptions]=useState([
"",
"",
"",
""
]);


const [correct,setCorrect]=useState(0);





const updateOption=(index:number,value:string)=>{


const updated=[...options];

updated[index]=value;

setOptions(updated);


};






const addQuestion=async()=>{


try{


if(!quizId){

return;

}



const questionResponse =
await api.post(

`/quizzes/${quizId}/questions`,

{

question_text:question,

question_type:"mcq",

order_index:1

}

);





const questionId =
questionResponse.data.question.id;







for(
let i=0;
i<options.length;
i++
){


await api.post(

`/quizzes/questions/${questionId}/options`,

{

option_text:options[i],

is_correct:i===correct

}

);


}







alert(
"Question added successfully 🎉"
);




setQuestion("");

setOptions([
"",
"",
"",
""
]);


}
catch(error){


console.error(
error
);


alert(
"Failed adding question"
);


}


};







return(


<div className="quiz-builder-page">



<div className="quiz-builder-card">



<h1>

📝 Quiz Builder

</h1>



<p>

Create questions and options for your students.

</p>







<div className="question-box">



<label>

Question

</label>



<textarea

value={question}

onChange={(e)=>
setQuestion(e.target.value)
}

placeholder="Enter your question..."

/>



</div>







<h3>

Options

</h3>





{

options.map(
(option,index)=>(



<div

className="option-row"

key={index}

>



<input

type="radio"

name="correct"

checked={
correct===index
}

onChange={()=>setCorrect(index)}


/>



<input

value={option}

placeholder={`Option ${index+1}`}

onChange={(e)=>
updateOption(
index,
e.target.value
)
}


/>



</div>



)

)

}







<button

className="save-question-btn"

onClick={addQuestion}

>

💾 Save Question

</button>







</div>



</div>


);


}


export default QuizBuilder;