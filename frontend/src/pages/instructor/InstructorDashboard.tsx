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




type Analytics = {

  total_courses:number;

  total_students:number;

  total_assignments:number;

  total_submissions:number;

  pending_reviews:number;

  average_grade:string;

};







function InstructorDashboard(){



const [courses,setCourses] =
useState<Course[]>([]);



const [analytics,setAnalytics] =
useState<Analytics | null>(null);



const [loading,setLoading] =
useState(true);









useEffect(()=>{



const loadDashboard = async()=>{


try{



// Courses

const coursesResponse =
await api.get(
"/courses/my"
);



console.log(
"Instructor courses:",
coursesResponse.data
);



setCourses(
coursesResponse.data.courses
);









// Analytics

const analyticsResponse =
await api.get(
"/analytics/instructor"
);



console.log(
"Instructor analytics:",
analyticsResponse.data
);



setAnalytics(
analyticsResponse.data
);





}
catch(error){


console.error(
"Failed loading instructor dashboard:",
error
);



}
finally{


setLoading(false);


}


};





loadDashboard();



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









{/* ANALYTICS */}



<div className="instructor-stats">





<div className="instructor-stat-card">


<h3>

📚 Courses

</h3>



<p>

{
analytics?.total_courses || 0
}

</p>



</div>









<div className="instructor-stat-card">


<h3>

👨‍🎓 Students

</h3>



<p>

{
analytics?.total_students || 0
}

</p>



</div>









<div className="instructor-stat-card">


<h3>

📝 Assignments

</h3>



<p>

{
analytics?.total_assignments || 0
}

</p>



</div>









<div className="instructor-stat-card">


<h3>

📤 Submissions

</h3>



<p>

{
analytics?.total_submissions || 0
}

</p>



</div>









<div className="instructor-stat-card">


<h3>

⏳ Pending Reviews

</h3>



<p>

{
analytics?.pending_reviews || 0
}

</p>



</div>









<div className="instructor-stat-card">


<h3>

⭐ Average Grade

</h3>



<p>

{
analytics?.average_grade || 0
}

%

</p>



</div>






</div>









{/* COURSES */}



<div className="my-courses-section">









<div className="section-title">



<h2>

Your Courses

</h2>








<button

className="create-course-btn"

>

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