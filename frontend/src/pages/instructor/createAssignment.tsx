import {
  useEffect,
  useState
} from "react";

import api from "../../services/axios";

import "../../styles/createAssignment.css";



type Course = {

  id:string;

  title:string;

};



function CreateAssignment(){


const [courses,setCourses] =
useState<Course[]>([]);



const [form,setForm] =
useState({

  course_id:"",
  title:"",
  instructions:"",
  due_date:"",
  rubric:""

});



const [message,setMessage] =
useState("");





// LOAD INSTRUCTOR COURSES

useEffect(()=>{


const loadCourses = async()=>{


try{


const response =
await api.get(
"/courses/my"
);



setCourses(
response.data.courses
);



}
catch(error){


console.error(
"Failed loading courses",
error
);


}



};



loadCourses();



},[]);







const handleChange = (
e:React.ChangeEvent<
HTMLInputElement |
HTMLTextAreaElement |
HTMLSelectElement
>
)=>{


setForm({

...form,

[e.target.name]:
e.target.value


});


};








const createAssignment =
async()=>{


try{


await api.post(

"/assignments",

{

course_id:
form.course_id,


title:
form.title,


instructions:
form.instructions,


due_date:
form.due_date || null,


rubric:
form.rubric
?
JSON.parse(form.rubric)
:
null


}

);



setMessage(
"Assignment created successfully"
);



setForm({

course_id:"",
title:"",
instructions:"",
due_date:"",
rubric:""

});



}
catch(error:any){


console.error(error);


setMessage(

error.response?.data?.message ||
"Failed creating assignment"

);


}



};









return (

<div className="assignment-container">


<h1>
Create Assignment
</h1>




<select

name="course_id"

value={form.course_id}

onChange={handleChange}

>


<option value="">

Select Course

</option>



{

courses.map(course=>(


<option

key={course.id}

value={course.id}

>


{course.title}


</option>


))

}


</select>







<input

name="title"

placeholder="Assignment title"

value={form.title}

onChange={handleChange}

/>







<textarea

name="instructions"

placeholder="Assignment instructions"

value={form.instructions}

onChange={handleChange}

/>







<input

type="datetime-local"

name="due_date"

value={form.due_date}

onChange={handleChange}

/>







<textarea

name="rubric"

placeholder='Rubric JSON example:
{"accuracy":40,"quality":60}'

value={form.rubric}

onChange={handleChange}

/>







<button

onClick={createAssignment}

>

Create Assignment

</button>





<p>

{message}

</p>




</div>

);


}



export default CreateAssignment;