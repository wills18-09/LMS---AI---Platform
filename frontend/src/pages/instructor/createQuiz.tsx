import {
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import api from "../../services/axios";

import "../../styles/createQuiz.css";



function CreateQuiz(){


const {
  moduleId
}=useParams();



const navigate =
useNavigate();



const [title,setTitle]=
useState("");



const [loading,setLoading]=
useState(false);





const createQuiz = async()=>{


try{


setLoading(true);



const response =
await api.post(
"/quizzes",
{
  module_id: moduleId,
  title
}
);



console.log(
"Quiz created:",
response.data
);



const quizId =
response.data.quiz.id;



navigate(
`/instructor/quizzes/${quizId}`
);



}
catch(error){

console.error(
"Create quiz failed",
error
);

}
finally{

setLoading(false);

}


};







return(


<div className="create-quiz-page">


<div className="create-quiz-card">


<h1>
📝 Create Quiz
</h1>


<p>
Create a quiz for this module.
</p>



<label>
Quiz Title
</label>


<input

type="text"

placeholder="Example: Node.js Basics Quiz"

value={title}

onChange={(e)=>
setTitle(e.target.value)
}

/>




<button

className="create-quiz-button"

onClick={createQuiz}

disabled={loading}

>

{
loading
?
"Creating..."
:
"Create Quiz 🚀"
}


</button>



</div>


</div>


);


}


export default CreateQuiz;