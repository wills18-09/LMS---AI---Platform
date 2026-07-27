import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  Link,
  useNavigate
} from "react-router-dom";

import api from "../services/axios";

import "../styles/CourseDetails.css";



type Lecture = {

 id:string;

 title:string;

 video_url:string;

 description?:string;

 quiz_id?:string;

};



type Module = {

 id:string;

 title:string;

 lectures:Lecture[];

 quizzes?: {

  id:string;

  title:string;

 }[];

};



type Course = {

 id:string;

 title:string;

 description:string;

 category:string;

 difficulty?:string;

 instructor_name?:string;

 modules:Module[];

};






function CourseDetails(){


const {id}=useParams();

const navigate=useNavigate();



const [course,setCourse]=
useState<Course|null>(null);



const [certificateLoading,setCertificateLoading]=
useState(false);



const [certificateMessage,setCertificateMessage]=
useState("");





useEffect(()=>{


const fetchCourse=async()=>{


try{


const response =
await api.get(
`/courses/${id}`
);



console.log(
"Course details:",
response.data
);



setCourse(
response.data.course
);



}
catch(error){

console.error(
"Failed loading course",
error
);

}


};



if(id){

fetchCourse();

}


},[id]);








const generateCertificate = async()=>{


try{


setCertificateLoading(true);

setCertificateMessage("");



const response =
await api.post(
`/certificates/${course?.id}/generate`
);



console.log(
"Certificate generated:",
response.data
);



setCertificateMessage(
"🎉 Certificate generated successfully!"
);



}
catch(error:any){


console.error(
"Certificate generation failed:",
error
);



setCertificateMessage(

error.response?.data?.message ||

"Failed to generate certificate"

);



}
finally{


setCertificateLoading(false);


}



};









if(!course){


return(

<div className="loading">

Loading course...

</div>

);

}








const firstLecture =
course.modules?.[0]?.lectures?.[0];








return(


<div className="course-details-page">





<div className="course-hero">



<div className="course-info">



<div className="course-category">

🎓 {course.category}

</div>





<h1>

{course.title}

</h1>





<p className="course-description">

{course.description}

</p>








<div className="course-details-row">



{
course.difficulty &&

<div className="info-pill">

🎯 {course.difficulty}

</div>

}





{
course.instructor_name &&

<div className="info-pill">

👨‍🏫 {course.instructor_name}

</div>

}






<div className="info-pill">

📚 {course.modules.length} Modules

</div>





</div>









{
firstLecture &&

<button

className="start-learning-btn"

onClick={()=>navigate(

`/courses/${course.id}/lectures/${firstLecture.id}`

)}

>


<span>

🚀

</span>


Start Learning


</button>

}



</div>





<div className="course-image">

🎥

</div>





</div>









<div className="content-section">





<div className="section-header">


<h2>

📚 Course Content

</h2>



<span>

{course.modules?.length || 0} Modules

</span>



</div>









{
course.modules?.map(module=>(



<div

className="module-card"

key={module.id}

>



<h3>

📂 {module.title}

</h3>









{

module.lectures.map(lecture=>(



<div

key={lecture.id}

>



<Link

className="lecture-link"

to={

`/courses/${course.id}/lectures/${lecture.id}`

}

>

▶ {lecture.title}

</Link>







{

module.quizzes &&

module.quizzes.length > 0 &&



<Link

className="quiz-button"

to={`/quizzes/${module.quizzes[0].id}`}

>

📝 Take Quiz

</Link>

}



</div>



))


}





</div>



))


}





</div>









<div className="assignment-box">



<h2>

📝 Assignments

</h2>




<p>

Complete assignments and submit your work.

</p>





<Link

className="assignment-button"

to={`/courses/${course.id}/assignments`}

>

View Assignments →

</Link>




</div>













<div className="certificate-box">



<h2>

🏆 Course Certificate

</h2>



<p>

Complete all lectures and quizzes to earn your certificate.

</p>




<button

className="certificate-button"

onClick={generateCertificate}

disabled={certificateLoading}

>


{

certificateLoading

?

"Generating..."

:

"🎓 Generate Certificate"

}



</button>





{

certificateMessage &&


<p className="certificate-message">

{certificateMessage}

</p>


}





</div>








</div>


);


}





export default CourseDetails;