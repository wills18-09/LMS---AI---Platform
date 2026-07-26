import { useNavigate } from "react-router-dom";

import "../../styles/instructorCourseCard.css";



type Course = {

  id:string;

  title:string;

  description:string;

  category:string;

  difficulty?:string;

  status?:string;

};



type Props = {

  course: Course;

};





function InstructorCourseCard({
  course
}:Props){



const navigate =
useNavigate();





return (



<div className="instructor-course-card">






{
course.status && (

<div className="course-status">

{course.status}

</div>

)

}






<h2>

📚 {course.title}

</h2>





<p>

{course.description}

</p>






<div className="course-info">



<span>

🎓 {course.category}

</span>




{
course.difficulty && (

<span>

⚡ {course.difficulty}

</span>

)

}




</div>







<button

onClick={()=>navigate(
`/instructor/courses/${course.id}`
)}

>

Manage Course →

</button>







</div>


);


}



export default InstructorCourseCard;