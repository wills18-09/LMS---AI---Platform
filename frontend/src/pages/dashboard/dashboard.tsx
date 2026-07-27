import {
  useEffect,
  useState
} from "react";


import {
  Link
} from "react-router-dom";


import api from "../../services/axios";


import CourseCard from "../../components/student/CourseCard";


import "../../styles/dashboard.css";


import {
  getMyBadges
} from "../../services/badge.service";



type Course = {

  id:string;

  title:string;

  description:string;

  progress_percent:string;

};



type Certificate = {

  id:string;

  course_id:string;

  certificate_url:string;

};



type Badge = {

  id:number;

  name:string;

  description:string;

  icon_url:string;

  earned_at:string;

};





function Dashboard(){



const [courses,setCourses] =
useState<Course[]>([]);



const [certificates,setCertificates] =
useState<Certificate[]>([]);



const [badges,setBadges] =
useState<Badge[]>([]);






useEffect(()=>{


const loadDashboard = async()=>{


try{



const coursesResponse =
await api.get(
"/enrollments/me"
);



console.log(
"My courses:",
coursesResponse.data
);



setCourses(
coursesResponse.data
);






const certificateResponse =
await api.get(
"/certificates/me"
);



console.log(
"My certificates:",
certificateResponse.data
);



setCertificates(
certificateResponse.data.certificates || []
);






const badgesResponse =
await getMyBadges();



console.log(
"My badges:",
badgesResponse
);



setBadges(
badgesResponse.badges || []
);



}
catch(error){


console.error(
"Dashboard loading failed:",
error
);


}



};



loadDashboard();



},[]);








return(



<div className="student-dashboard">







<div className="dashboard-header">



<div>


<h1>

Welcome back 👋

</h1>



<p>

Continue your learning journey and keep improving.

</p>


</div>





<div className="student-badge">

🎓 Student

</div>



</div>









<div className="stats-container">





<div className="stat-card">


<h3>

📚 Courses

</h3>


<p>

{courses.length}

</p>


</div>








<div className="stat-card">


<h3>

🎥 Learning

</h3>


<p>

Active

</p>


</div>








<div className="stat-card">


<h3>

🏆 Certificates

</h3>


<p>

{certificates.length}

</p>


</div>






<div className="stat-card">


<h3>

🏅 Badges

</h3>


<p>

{badges.length}

</p>


</div>






</div>









{
certificates.length > 0 &&


<div className="certificate-dashboard-box">


<div>


<h2>

🏆 Your Achievements

</h2>



<p>

You have earned {certificates.length} certificate.

</p>


</div>




<Link

to="/certificates"

className="view-certificates-btn"

>

View Certificates →

</Link>



</div>

}









{
badges.length > 0 &&


<div className="badges-dashboard-box">



<div className="section-header">


<h2>

🏅 Your Badges

</h2>



<span>

{badges.length} earned

</span>



</div>







<div className="badges-grid">



{

badges.map((badge)=>(



<div

key={badge.id}

className="badge-card"

>





<div className="badge-icon">


{

badge.icon_url ? (


<img

src={badge.icon_url}

alt={badge.name}

/>


)

:

(

<span>

🏅

</span>


)

}



</div>







<h3>

{badge.name}

</h3>




<p>

{badge.description}

</p>




<small>

Earned 🎉

</small>





</div>



))


}



</div>




</div>



}









<div className="courses-section">





<div className="section-header">


<h2>

My Courses

</h2>



<span>

{courses.length} enrolled

</span>



</div>









{

courses.length > 0 ? (



<div className="course-grid">



{

courses.map((course)=>(



<CourseCard

key={course.id}

id={course.id}

title={course.title}

description={course.description}

progress={course.progress_percent}

/>



))


}



</div>



)

:(



<div className="empty-state">



<h3>

No courses yet 📚

</h3>



<p>

Start learning by enrolling into a course.

</p>



</div>



)



}







</div>







</div>



);



}



export default Dashboard;