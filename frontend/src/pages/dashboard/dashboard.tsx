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


import {
  getMyStreak
} from "../../services/streak.service";


import RecommendationCard from "../../components/student/RecommendationCard";

import StudyPlanCard from "../../components/student/StudyPlanCard";

import MasteryCard from "../../components/student/MasteryCard";


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





type Streak = {

  current_streak:number;

  longest_streak:number;

};









function Dashboard(){



const [courses,setCourses] =
useState<Course[]>([]);



const [certificates,setCertificates] =
useState<Certificate[]>([]);



const [badges,setBadges] =
useState<Badge[]>([]);



const [streak,setStreak] =
useState<Streak|null>(null);





useEffect(()=>{


const loadDashboard = async()=>{


try{



const coursesResponse =
await api.get(
"/enrollments/me"
);



setCourses(
coursesResponse.data || []
);







const certificateResponse =
await api.get(
"/certificates/me"
);



setCertificates(
certificateResponse.data.certificates || []
);







const badgesResponse =
await getMyBadges();



setBadges(
badgesResponse.badges || []
);







const streakResponse =
await getMyStreak();



setStreak(
streakResponse.streak || null
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






const badgeImage = (
url:string
)=>{


if(!url){

return null;

}


return url.startsWith("http")

?

url

:

`http://localhost:5000${url}`;


};








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








<div className="stat-card streak-card">



<div className="streak-fire">

🔥

</div>




<div className="streak-info">


<h2>

{
streak
?
`${streak.current_streak} Days`
:
"0 Days"
}

</h2>



<p>

Current streak

</p>



</div>





<div className="streak-stats">


<div>

<span>

Best

</span>


<strong>

{
streak
?
streak.longest_streak
:
0
}

</strong>


</div>


</div>





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

badgeImage(badge.icon_url)

?

<img

src={
badgeImage(
badge.icon_url
)!
}

alt={badge.name}

onError={
(e)=>{

e.currentTarget.style.display="none";

}

}

/>


:

<span>

🏅

</span>


}



</div>







<h3>

{badge.name}

</h3>






<p>

{badge.description}

</p>






<div className="badge-earned">

✨ Earned

</div>





</div>



))


}




</div>





</div>



}



<RecommendationCard />


{
courses.length > 0 &&
<StudyPlanCard
courseId={courses[0].id}
/>
}


<MasteryCard />


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

:

(



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