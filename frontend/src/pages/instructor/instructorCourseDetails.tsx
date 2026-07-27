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




type Module = {

  id:string;

  title:string;

  lectures:Lecture[];

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



const { id } =
useParams();


const navigate =
useNavigate();




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










if(!course){


return (

<h2>

Loading course...

</h2>

);

}









return (


<div className="instructor-course-page">






{/* COURSE HEADER */}



<div className="course-header">



<div>


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









{/* COURSE INFO */}



<div className="course-info-box">



<p>

🎓 Category:

{" "}

{course.category}

</p>





<p>

⚡ Difficulty:

{" "}

{course.difficulty || "Not set"}

</p>




</div>















{/* MODULES */}




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





<h3>

📂 {module.title}

</h3>







<button


onClick={()=>
setSelectedModule(module.id)
}


>

+ Add Lecture

</button>









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

style={{

cursor:"pointer"

}}

>


▶ {lecture.title}


</div>


))


:

<p>

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












{/* ADD MODULE */}



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














{/* ADD LECTURE */}



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