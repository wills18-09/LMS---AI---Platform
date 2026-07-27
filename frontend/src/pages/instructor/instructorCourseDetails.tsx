import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import api from "../../services/axios";

import "../../styles/instructorCourseDetails.css";

import AddModuleModal from "../../components/instructor/AddModuleModal";

import AddLectureModal from "../../components/instructor/AddLectureModal";




type Lecture = {

  id:string;

  title:string;

};



type Quiz = {

  id:string;

  title:string;

};



type Module = {

  id:string;

  title:string;

  lectures:Lecture[];

  quizzes:Quiz[];

};


type Course = {

  id:string;

  title:string;

  description:string;

  category:string;

  difficulty?:string;

  status?:string;

  modules:Module[];

};







function InstructorCourseDetails(){


const { id } = useParams();


const navigate = useNavigate();



const [course,setCourse] =
useState<Course | null>(null);



const [showModule,setShowModule] =
useState(false);



const [selectedModule,setSelectedModule] =
useState<string | null>(null);







const loadCourse = async()=>{

try{

if(!id){

return;

}


const response =
await api.get(
`/courses/${id}`
);


console.log(
"Instructor course:",
response.data
);


setCourse(
response.data.course
);


}
catch(error){

console.error(
"Loading course failed:",
error
);

}


};






useEffect(()=>{

loadCourse();

},[id]);








const createQuiz = async(moduleId:string)=>{

try{


const title =
prompt(
"Enter quiz title"
);


if(!title){

return;

}



const response =
await api.post(
"/quizzes",
{
module_id:moduleId,
title
}
);



console.log(
"Quiz created:",
response.data
);



alert(
"Quiz created successfully 🎉"
);



navigate(
`/instructor/quizzes/${response.data.quiz.id}`
);



}
catch(error){


console.error(
"Quiz creation failed:",
error
);



alert(
"Failed creating quiz"
);


}


};








if(!course){


return (

<div className="loading">

Loading course...

</div>

);

}








return (


<div className="instructor-course-page">






<div className="course-header">


<div>


<span className="instructor-course-tag">

📚 Instructor Course

</span>



<h1>

{course.title}

</h1>




<p>

{course.description}

</p>


</div>




<div className="course-status">

{course.status || "Draft"}

</div>


</div>









<div className="course-info-box">



<div className="info-item">

🎓 Category:

<strong>

{course.category}

</strong>

</div>





<div className="info-item">

⚡ Difficulty:

<strong>

{course.difficulty || "Not set"}

</strong>

</div>





<div className="info-item">

📦 Modules:

<strong>

{course.modules.length}

</strong>

</div>



</div>










<div className="assignment-management-card">


<div className="assignment-card-header">


<div>

<h2>

📝 Assignments

</h2>


<p>

Create assignments and review student submissions.

</p>


</div>


<div className="assignment-icon">

📚

</div>


</div>







<div className="assignment-actions">



<button

className="create-assignment-btn"

onClick={()=>{

navigate(
"/instructor/assignments/create"
);

}}

>

➕ Create Assignment

</button>








<button

className="view-submissions-btn"

onClick={()=>{

navigate(
`/instructor/courses/${course.id}/assignments`
);

}}

>

📂 Manage Assignments

</button>



</div>



</div>









<div className="modules-section">





<div className="section-top">


<h2>

📚 Course Modules

</h2>





<button

onClick={()=>setShowModule(true)}

>

+ Add Module

</button>




</div>









{

course.modules &&
course.modules.length > 0 ?



course.modules.map(module=>(



<div

className="module-card"

key={module.id}

>





{/* QUIZZES */}

<div className="quiz-section">


<div className="quiz-header">


<h4>

📝 Quizzes

</h4>





{

module.quizzes &&
module.quizzes.length > 0 && (


<button

className="view-quiz-btn"

onClick={()=>{


navigate(

`/instructor/quizzes/${module.quizzes[0].id}`

);


}}

>

View Questions →

</button>


)


}



</div>


</div>









<div className="module-title-row">


<h3>

📂 {module.title}

</h3>



<div className="quiz-management">



<button

className="add-quiz-btn"

onClick={()=>{

navigate(

`/instructor/modules/${module.id}/quiz/create`

)

}}

>

➕ Create Quiz

</button>







{

module.quizzes &&

module.quizzes.map((quiz)=>(


<div

key={quiz.id}

className="quiz-item"

>


📝 {quiz.title}



<button

onClick={()=>{


navigate(

`/instructor/quizzes/${quiz.id}`

)


}}

>

Manage

</button>



</div>


))


}



</div>





<span>

{module.lectures?.length || 0} Lectures

</span>



</div>









<div className="module-actions">



<button

onClick={()=>setSelectedModule(module.id)}

>

🎥 Add Lecture

</button>



</div>









{

module.lectures &&
module.lectures.length > 0 ?



module.lectures.map(lecture=>(


<div

className="lecture-row"

key={lecture.id}


onClick={()=>{


navigate(

`/instructor/lectures/${lecture.id}`

);


}}

>


▶ {lecture.title}


</div>


))


:


<p className="empty-text">

No lectures yet.

</p>



}






</div>



))


:



<div className="empty-course">


<p>

No modules created yet.

</p>


</div>


}





</div>









{

showModule && (


<AddModuleModal

courseId={course.id}

close={()=>setShowModule(false)}

refresh={()=>{

setShowModule(false);

loadCourse();

}}

/>


)

}









{

selectedModule && (


<AddLectureModal

moduleId={selectedModule}

close={()=>setSelectedModule(null)}

refresh={()=>{

setSelectedModule(null);

loadCourse();

}}

/>


)

}









</div>


);


}



export default InstructorCourseDetails;