import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import api from "../../services/axios";

import "../../styles/instructorLectureDetails.css";




type Lecture = {

  id:string;

  title:string;

  video_url:string;

  transcript:string;

  duration_seconds:number;

  order_index:number;

};







function InstructorLectureDetails(){



const { id } =
useParams();



const navigate =
useNavigate();




const [lecture,setLecture] =
useState<Lecture | null>(null);



const [title,setTitle] =
useState("");



const [transcript,setTranscript] =
useState("");



const [duration,setDuration] =
useState("");



const [orderIndex,setOrderIndex] =
useState("");









const loadLecture = async()=>{


try{


if(!id){

return;

}



const response =
await api.get(
`/lectures/${id}`
);




console.log(
"Lecture:",
response.data
);




const data =
response.data.lecture;



console.log(
"VIDEO URL:",
data.video_url
);




setLecture(data);



setTitle(
data.title
);



setTranscript(
data.transcript || ""
);



setDuration(
String(data.duration_seconds || "")
);



setOrderIndex(
String(data.order_index || "")
);



}
catch(error){


console.error(
"Loading lecture failed:",
error
);


}


};









useEffect(()=>{


if(id){

loadLecture();

}


},[id]);











if(!lecture){


return (

<h2>

Loading lecture...

</h2>

);


}









const videoSource =
lecture.video_url.startsWith("http")

?
lecture.video_url

:

`http://localhost:5000${lecture.video_url}`;









const updateLecture = async()=>{


try{


await api.put(

`/lectures/${id}`,

{

title,

transcript,

duration_seconds:Number(duration),

order_index:Number(orderIndex)

}

);




alert(
"Lecture updated successfully"
);




loadLecture();




}
catch(error){


console.error(
"Updating lecture failed:",
error
);


}


};












const deleteLecture = async()=>{


try{


const confirmDelete =
window.confirm(
"Delete this lecture?"
);




if(!confirmDelete){

return;

}




await api.delete(

`/lectures/${id}`

);




alert(
"Lecture deleted"
);




navigate(-1);




}
catch(error){


console.error(
"Deleting lecture failed:",
error
);


}


};












return (


<div className="instructor-lecture-page">








<h1>

🎥 Manage Lecture

</h1>









<div className="lecture-box">







<label>

Title

</label>



<input

value={title}

onChange={
e=>setTitle(e.target.value)
}

/>









<label>

Duration seconds

</label>



<input

type="number"

value={duration}

onChange={
e=>setDuration(e.target.value)
}

/>









<label>

Order Index

</label>



<input

type="number"

value={orderIndex}

onChange={
e=>setOrderIndex(e.target.value)
}

/>









<label>

Transcript

</label>



<textarea

value={transcript}

onChange={
e=>setTranscript(e.target.value)
}

/>












{
lecture.video_url && (

<div>


<h3>

Video Preview

</h3>



<video

controls

width="500"

src={videoSource}

onError={(e)=>{

console.error(
"VIDEO LOAD ERROR:",
e.currentTarget.error
);

}}

>

Your browser does not support video.

</video>


<p>

Source:

{videoSource}

</p>


</div>

)

}











<button

onClick={updateLecture}

>

Save Changes

</button>








<button

onClick={deleteLecture}

>

Delete Lecture

</button>








</div>







</div>


);


}



export default InstructorLectureDetails;