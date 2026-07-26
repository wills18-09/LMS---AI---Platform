import {
  useEffect,
  useState
} from "react";

import api from "../../services/axios";

import InstructorCourseCard from "../../components/instructor/instructorCourseCard";

import "../../styles/instructorDashboard.css";



type Course = {

  id:string;

  title:string;

  description:string;

  category:string;

  difficulty?:string;

  status?:string;

};





function InstructorDashboard(){



const [courses,setCourses] =
useState<Course[]>([]);



const [loading,setLoading] =
useState(true);







useEffect(()=>{



const loadCourses = async()=>{



try{



const response =
await api.get(
"/courses/my"
);




console.log(
"Instructor courses:",
response.data
);




setCourses(
response.data.courses
);



}
catch(error){



console.error(
"Failed loading instructor courses:",
error
);



}
finally{


setLoading(false);


}



};




loadCourses();



},[]);








if(loading){


return (

<div className="loading">

Loading instructor dashboard...

</div>

);


}








return (



<div className="instructor-dashboard">







{/* HEADER */}



<div className="instructor-header">



<div>


<h1>

Welcome back 👋

</h1>



<p>

Manage your courses, lectures and students.

</p>


</div>






<div className="instructor-badge">


🧑‍🏫 Instructor


</div>




</div>













{/* STATS */}



<div className="instructor-stats">





<div className="instructor-stat-card">


<h3>

📚 Courses

</h3>


<p>

{courses.length}

</p>


</div>







<div className="instructor-stat-card">


<h3>

👨‍🎓 Students

</h3>


<p>

0

</p>


</div>







<div className="instructor-stat-card">


<h3>

📝 Assignments

</h3>


<p>

0

</p>


</div>





</div>












{/* COURSES */}



<div className="my-courses-section">





<div className="section-title">



<h2>

Your Courses

</h2>





<button className="create-course-btn">

+ Create Course

</button>




</div>









{

courses.length === 0 ?



(

<div className="empty-course">


<h3>

📚 No courses found

</h3>


<p>

Create your first course and start teaching.

</p>


</div>

)



:



(


<div className="instructor-course-grid">



{

courses.map(course=>(



<InstructorCourseCard


key={course.id}


course={course}


/>



))


}



</div>


)



}






</div>








</div>



);


}




export default InstructorDashboard;