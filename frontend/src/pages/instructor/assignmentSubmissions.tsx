import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import api from "../../services/axios";

import "../../styles/assignment.css";


type Submission = {

  id:string;

  assignment_id:string;

  file_url:string;

  grade:number | null;

  feedback:string | null;

  submitted_at:string;

  student_id:string;

  full_name:string;

  email:string;

};




function AssignmentSubmissions(){


const { id } =
useParams();



const [submissions,setSubmissions] =
useState<Submission[]>([]);



const [loading,setLoading] =
useState(true);



const [grades,setGrades] =
useState<Record<string,string>>({});



const [feedbacks,setFeedbacks] =
useState<Record<string,string>>({});





const loadSubmissions = async()=>{


try{


if(!id){

return;

}



const response =
await api.get(
`/assignments/${id}/submissions`
);



console.log(
"Submissions:",
response.data
);



setSubmissions(
response.data.submissions || []
);



}
catch(error){


console.error(
"Loading submissions failed:",
error
);


}
finally{


setLoading(false);


}


};







useEffect(()=>{


loadSubmissions();


},[id]);









const handleGrade = async(
submissionId:string
)=>{


try{


await api.put(

`/assignments/submissions/${submissionId}/grade`,

{

grade:
Number(
grades[submissionId]
),


feedback:
feedbacks[submissionId] || ""

}

);




alert(
"Submission graded successfully"
);



loadSubmissions();



}
catch(error){


console.error(
"Grading failed:",
error
);


alert(
"Failed grading submission"
);


}



};








if(loading){


return (

<h2>
Loading submissions...
</h2>

);


}








return (

<div className="assignments-page">



<div className="assignments-header">


<div>

<h1>

📂 Student Submissions

</h1>


<p>

Review uploaded assignments and grade students.

</p>


</div>



</div>









{

submissions.length === 0 ?


(

<div className="empty-assignment">

<h2>

No submissions yet

</h2>


<p>

Students have not submitted this assignment.

</p>


</div>


)

:

(

<div className="assignment-grid">


{

submissions.map((submission)=>(


<div

className="assignment-card"

key={submission.id}

>


<h2>

{submission.full_name}

</h2>



<p>

📧 {submission.email}

</p>





<p>

📄 File:

{" "}

<a

href={`http://localhost:5000${submission.file_url}`}

target="_blank"

rel="noreferrer"

>

View File

</a>


</p>







<p>

📅 Submitted:

{" "}

{
new Date(
submission.submitted_at
).toLocaleDateString()
}

</p>








<div>


<label>

⭐ Grade

</label>


<input

type="number"

placeholder="Enter grade"

defaultValue={
submission.grade ?? ""
}

onChange={(e)=>

setGrades({

...grades,

[submission.id]:
e.target.value

})

}


/>


</div>








<div>


<label>

💬 Feedback

</label>


<textarea

placeholder="Write feedback"

defaultValue={
submission.feedback ?? ""
}


onChange={(e)=>

setFeedbacks({

...feedbacks,

[submission.id]:
e.target.value

})

}


/>


</div>









<button

onClick={()=>

handleGrade(
submission.id
)

}

>


✅ Save Grade


</button>





</div>


))


}



</div>


)

}



</div>


);


}



export default AssignmentSubmissions;