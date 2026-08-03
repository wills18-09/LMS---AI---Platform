import {
    useEffect,
    useState
} from "react";

import {
    getAdminUsers,
    updateUserRole,
    suspendUser,
    getAdminOverview,
    getPendingCourses,
    approveCourse,
    rejectCourse
} from "../../services/admin.service";

import "../../styles/adminDashboard.css";

import AdminAnalytics from "../../components/admin/adminAnalytics";

type User = {

    id:string;

    full_name:string;

    email:string;

    role:string;

    is_active:boolean;

};



type Course = {

    id:string;

    title:string;

    description:string;

    category:string;

    difficulty:string;

    instructor_name:string;

};




type Stats = {

    total_users:number;

    total_courses:number;

    total_enrollments:number;

    certificates_issued:number;

};





function AdminDashboard(){



const [users,setUsers] =
useState<User[]>([]);



const [courses,setCourses] =
useState<Course[]>([]);



const [stats,setStats] =
useState<Stats>({

    total_users:0,

    total_courses:0,

    total_enrollments:0,

    certificates_issued:0

});



const [loading,setLoading] =
useState(true);



const [error,setError] =
useState("");






const loadData = async()=>{


try{


setLoading(true);



const usersResponse =
await getAdminUsers();



setUsers(
    usersResponse.users || []
);




const statsResponse =
await getAdminOverview();



setStats({

total_users:
Number(
statsResponse.stats.total_users
),


total_courses:
Number(
statsResponse.stats.total_courses
),


total_enrollments:
Number(
statsResponse.stats.total_enrollments
),


certificates_issued:
Number(
statsResponse.stats.certificates_issued
)

});






const coursesResponse =
await getPendingCourses();



setCourses(
    coursesResponse.courses || []
);




}
catch(error){

console.error(
"ADMIN LOAD ERROR:",
error
);


setError(
"Failed to load admin data"
);


}
finally{

setLoading(false);

}


};






useEffect(()=>{

loadData();

},[]);







const changeRole =
async(
id:string,
role:string
)=>{


try{


await updateUserRole(
    id,
    role
);


await loadData();


}
catch(error){

console.error(
"ROLE UPDATE ERROR:",
error
);

}


};







const disableUser =
async(
id:string
)=>{


try{


await suspendUser(
    id
);


await loadData();


}
catch(error){

console.error(
"SUSPEND ERROR:",
error
);

}


};







const approve =
async(
id:string
)=>{


try{


await approveCourse(
    id
);


await loadData();


}
catch(error){

console.error(
"APPROVE COURSE ERROR:",
error
);

}


};







const reject =
async(
id:string
)=>{


try{


await rejectCourse(
    id
);


await loadData();


}
catch(error){

console.error(
"REJECT COURSE ERROR:",
error
);

}


};








if(loading){

return (

<div className="admin-loading">

<h2>
Loading Admin Dashboard...
</h2>

</div>

);

}







return (

<div className="admin-page">



<div className="admin-header">


<div>

<h1>
⚙️ Admin Dashboard
</h1>


<p>
Manage users, courses and platform activity
</p>


</div>


</div>





{
error &&

<div className="admin-error">

{error}

</div>

}


<AdminAnalytics />




<div className="stats-grid">



<div className="stat-card">

<span>
👥
</span>

<h3>
Users
</h3>

<strong>
{stats.total_users}
</strong>


</div>





<div className="stat-card">

<span>
📚
</span>

<h3>
Courses
</h3>

<strong>
{stats.total_courses}
</strong>


</div>





<div className="stat-card">

<span>
🎓
</span>

<h3>
Enrollments
</h3>

<strong>
{stats.total_enrollments}
</strong>


</div>





<div className="stat-card">

<span>
🏆
</span>

<h3>
Certificates
</h3>

<strong>
{stats.certificates_issued}
</strong>


</div>



</div>









<section className="admin-section">


<div className="section-header">

<h2>
👥 User Management
</h2>


</div>





<div className="table-container">


<table>


<thead>

<tr>

<th>
Name
</th>


<th>
Email
</th>


<th>
Role
</th>


<th>
Status
</th>


<th>
Action
</th>


</tr>


</thead>





<tbody>


{

users.map(user=>(


<tr key={user.id}>


<td>

<strong>
{user.full_name}
</strong>

</td>




<td>
{user.email}
</td>





<td>


<select

className="role-select"

value={user.role}

onChange={
e=>
changeRole(
user.id,
e.target.value
)
}

>


<option value="student">
Student
</option>


<option value="instructor">
Instructor
</option>


<option value="admin">
Admin
</option>


</select>


</td>





<td>


<span

className={

user.is_active

?

"status active"

:

"status inactive"

}

>

{

user.is_active

?

"Active"

:

"Suspended"

}


</span>


</td>





<td>


<button

className="danger-btn"

disabled={
!user.is_active
}

onClick={()=>disableUser(user.id)}

>

Suspend

</button>


</td>



</tr>


))

}


</tbody>


</table>


</div>


</section>









<section className="admin-section">


<div className="section-header">


<h2>
📚 Course Approval Queue
</h2>


</div>





{

courses.length === 0

?

<p className="empty-state">

No pending courses 🎉

</p>


:

<div className="course-grid">


{

courses.map(course=>(


<div

className="course-card"

key={course.id}

>


<h3>
{course.title}
</h3>



<p>

👨‍🏫

{course.instructor_name}

</p>



<p>

{course.description}

</p>



<div className="course-meta">

<span>
{course.category}
</span>


<span>
{course.difficulty}
</span>


</div>






<div className="course-actions">


<button

className="approve-btn"

onClick={()=>approve(course.id)}

>

Approve

</button>





<button

className="reject-btn"

onClick={()=>reject(course.id)}

>

Reject

</button>


</div>



</div>


))

}


</div>


}





</section>





</div>


);


}



export default AdminDashboard;