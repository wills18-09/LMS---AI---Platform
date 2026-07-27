import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import api from "../../services/axios";

import "../../styles/assignment.css";



type Assignment = {

id:string;

title:string;

instructions:string;

due_date:string;

};




function InstructorAssignments(){



const { id } =
useParams();



const navigate =
useNavigate();



const [assignments,setAssignments] =
useState<Assignment[]>([]);



const [loading,setLoading] =
useState(true);






useEffect(()=>{


const loadAssignments = async()=>{


try{


const response =
await api.get(
`/assignments/course/${id}`
);



console.log(
"Instructor assignments:",
response.data
);



setAssignments(
response.data.assignments || []
);



}
catch(error){


console.error(
"Loading assignments failed:",
error
);


}
finally{


setLoading(false);


}



};



loadAssignments();



},[id]);







if(loading){


return (

<h2>

Loading assignments...

</h2>

);


}







return (

<div className="assignments-page">



<div className="assignments-header">


<h1>

📝 Course Assignments

</h1>


</div>







{

assignments.length===0 ?


<div className="empty-assignment">


<h2>

No assignments created

</h2>


</div>


:

<div className="assignment-grid">


{

assignments.map((assignment)=>(


<div

className="assignment-card"

key={assignment.id}

>


<h2>

{assignment.title}

</h2>



<p>

{assignment.instructions}

</p>



<p>

📅

{

new Date(
assignment.due_date
).toLocaleDateString()

}

</p>





<button


className="view-submissions-btn"


onClick={()=>{


navigate(

`/instructor/assignments/${assignment.id}/submissions`

);


}}


>


📂 View Submissions


</button>




</div>


))


}



</div>


}





</div>

);



}


export default InstructorAssignments;