import {
    useEffect,
    useState
} from "react";


import {
    getDetailedAnalytics
} from "../../services/admin.service";


import "../../styles/adminAnalytics.css";



type Analytics = {

    active_users:string;

    total_students:string;

    total_instructors:string;

    approved_courses:string;

    pending_courses:string;

    quiz_attempts:string;

    completed_lectures:string;

};



function AdminAnalytics(){


const [analytics,setAnalytics] =
useState<Analytics | null>(null);



useEffect(()=>{


const loadAnalytics = async()=>{


try{


const response =
await getDetailedAnalytics();


setAnalytics(
response.analytics
);


}
catch(error){

console.error(
"ANALYTICS ERROR",
error
);

}


};


loadAnalytics();


},[]);





if(!analytics){

return null;

}





return (

<div className="analytics-grid">



<div className="analytics-card">

<span>
🟢
</span>

<h3>
Active Users
</h3>

<strong>
{analytics.active_users}
</strong>

</div>





<div className="analytics-card">

<span>
🎓
</span>

<h3>
Students
</h3>

<strong>
{analytics.total_students}
</strong>

</div>






<div className="analytics-card">

<span>
👨‍🏫
</span>

<h3>
Instructors
</h3>

<strong>
{analytics.total_instructors}
</strong>

</div>







<div className="analytics-card">

<span>
✅
</span>

<h3>
Approved Courses
</h3>

<strong>
{analytics.approved_courses}
</strong>

</div>







<div className="analytics-card">

<span>
⏳
</span>

<h3>
Pending Courses
</h3>

<strong>
{analytics.pending_courses}
</strong>

</div>







<div className="analytics-card">

<span>
📝
</span>

<h3>
Quiz Attempts
</h3>

<strong>
{analytics.quiz_attempts}
</strong>

</div>







<div className="analytics-card">

<span>
▶️
</span>

<h3>
Completed Lectures
</h3>

<strong>
{analytics.completed_lectures}
</strong>

</div>





</div>

);


}


export default AdminAnalytics;