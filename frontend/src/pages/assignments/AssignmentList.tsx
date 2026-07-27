import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  Link
} from "react-router-dom";

import {
  getAssignmentsByCourse,
  getMySubmissions
} from "../../services/assignment.service";

import "../../styles/assignment.css";



type Assignment = {

  id:string;

  title:string;

  instructions:string;

  due_date:string;

};




type Submission = {

  id:string;

  assignment_id:string;

  file_url:string;

  status?:string;

  grade?:number|null;

};





function AssignmentList(){



const {
  id
}=useParams();





const [assignments,setAssignments]
=
useState<Assignment[]>([]);




const [submissions,setSubmissions]
=
useState<Submission[]>([]);




const [loading,setLoading]
=
useState(true);








useEffect(()=>{



const loadAssignments = async()=>{


try{


if(!id){

return;

}





const response =
await getAssignmentsByCourse(id);




console.log(
"Assignments API:",
response
);




setAssignments(

response?.assignments || []

);







const submissionResponse =
await getMySubmissions();




console.log(
"Submission API:",
submissionResponse
);




setSubmissions(

submissionResponse?.submissions || []

);





}
catch(error){


console.error(
"Failed loading assignments",
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

<div className="loading">

Loading assignments...

</div>

);


}









return (


<div className="assignments-page">






<div className="assignments-header">



<div>


<h1>

📝 Assignments

</h1>



<p>

Complete your tasks and submit your work.

</p>


</div>







<div className="assignment-count">


{

assignments?.length || 0

}


{" "}

Tasks


</div>





</div>









{

(assignments?.length || 0) === 0 ?



(

<div className="empty-assignment">


<h2>

📚 No assignments yet

</h2>


<p>

Your instructor has not added any assignments.

</p>


</div>


)





:





(



<div className="assignment-grid">





{

assignments?.map((assignment)=>(



<div

className="assignment-card"

key={assignment.id}

>







<div className="assignment-top">



<span className="assignment-status">



{

submissions.some(

submission =>

submission.assignment_id === assignment.id

)

?

"✅ Submitted"

:

"⏳ Pending"

}



</span>



</div>








<h2>

{assignment.title}

</h2>







<p className="instructions">

{assignment.instructions}

</p>







<div className="assignment-info">



<span>

📅 Due Date

</span>



<strong>

{

new Date(

assignment.due_date

).toLocaleDateString()

}


</strong>



</div>









<Link

className="view-assignment-btn"

to={`/assignments/${assignment.id}`}

>



{

submissions.some(

submission =>

submission.assignment_id === assignment.id

)

?

"View Submission →"

:

"Submit Assignment →"

}



</Link>








</div>



))



}






</div>



)



}







</div>


);



}





export default AssignmentList;