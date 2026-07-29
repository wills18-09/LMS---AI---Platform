import {
  useEffect,
  useRef,
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import api from "../../services/axios";

import {
  getLectureProgress,
  updateLectureProgress,
  getLectureNotes,
  createLectureNote,
  getLectureBookmarks,
  createLectureBookmark
} from "../../services/lecture.service";

import "../../styles/coursePlayer.css";



type Lecture = {

  id:string;

  title:string;

  video_url:string;

  transcript:string;

  duration_seconds:number;

  resource_urls:string[];

};



type Module = {

  id:string;

  title:string;

  lectures:Lecture[];

};



type Course = {

  id:string;

  title:string;

  modules:Module[];

};



type Note = {

  id:string;

  content:string;

  timestamp_seconds:number|null;

};



type Bookmark = {

  id:string;

  timestamp_seconds:number|null;

};






function CoursePlayer(){



const {
  courseId,
  lectureId
}=useParams();



const navigate =
useNavigate();




const videoRef =
useRef<HTMLVideoElement|null>(null);



const lastUpdateRef =
useRef(0);





const [lecture,setLecture]
=
useState<Lecture|null>(null);



const [course,setCourse]
=
useState<Course|null>(null);




const [watchedSeconds,setWatchedSeconds]
=
useState(0);



const [notes,setNotes]
=
useState<Note[]>([]);



const [bookmarks,setBookmarks]
=
useState<Bookmark[]>([]);



const [newNote,setNewNote]
=
useState("");




const [activeTab,setActiveTab]
=
useState<
"notes"|
"bookmarks"|
"transcript"|
"resources"
>("notes");



const [question,setQuestion] =
useState("");

const [aiAnswer,setAiAnswer] =
useState("");

const [aiLoading,setAiLoading] =
useState(false);

const [showAI,setShowAI] =
useState(false);




// LOAD COURSE + FIND CURRENT LECTURE

useEffect(()=>{


const loadCourse = async()=>{


try{


if(!courseId || !lectureId){

return;

}



const response =
await api.get(
`/courses/${courseId}`
);




const data:Course =
response.data.course;



setCourse(data);




let selectedLecture:
Lecture|null = null;




for(
const module of data.modules
){


const found =
module.lectures.find(

lecture =>
lecture.id === lectureId

);



if(found){


selectedLecture =
found;


break;


}


}




setLecture(
selectedLecture
);



}
catch(error){


console.error(
"Course loading failed:",
error
);


}



};




loadCourse();



},[
courseId,
lectureId
]);












// LOAD SAVED PROGRESS

useEffect(()=>{


const loadProgress =
async()=>{


try{


if(!lectureId){

return;

}



const response =
await getLectureProgress(
lectureId
);




const seconds =
Number(
response.progress.watched_seconds
);



setWatchedSeconds(
seconds
);





const video =
videoRef.current;



if(video){


const setVideoTime = ()=>{


video.currentTime =
seconds;


};




if(video.readyState >= 1){


setVideoTime();


}
else{


video.addEventListener(

"loadedmetadata",

setVideoTime,

{
once:true
}

);


}



}



}
catch(error){


console.error(
"Progress loading failed:",
error
);


}



};




if(
lecture &&
lectureId
){


loadProgress();


}



},[
lecture,
lectureId
]);

// LOAD NOTES

const loadNotes = async()=>{


try{


if(!lectureId){

return;

}



const response =
await getLectureNotes(
lectureId
);



setNotes(
response.notes
);



}
catch(error){


console.error(
"Loading notes failed:",
error
);



}



};









// LOAD BOOKMARKS

const loadBookmarks = async()=>{


try{


if(!lectureId){

return;

}



const response =
await getLectureBookmarks(
lectureId
);



setBookmarks(
response.bookmarks
);



}
catch(error){


console.error(
"Loading bookmarks failed:",
error
);



}



};







useEffect(()=>{


if(lectureId){


loadNotes();

loadBookmarks();


}



},[
lectureId
]);











// UPDATE PROGRESS

const updateProgress =
async(
completed=false
)=>{


const video =
videoRef.current;



if(
!lectureId ||
!video ||
!lecture
){

return;

}




let current =
Math.floor(
video.currentTime
);





// prevent progress going above duration

if(
current >
Number(lecture.duration_seconds)
){

current =
Number(lecture.duration_seconds);

}





// when video ends mark full completion

if(completed){

current =
Number(lecture.duration_seconds);

}





setWatchedSeconds(
current
);





try{


await updateLectureProgress(

lectureId,

current,

completed

);



console.log(
"Progress saved:",
{
current,
completed
}
);



}
catch(error){


console.error(
"Progress update failed:",
error
);



}



};











// VIDEO TIME UPDATE

const handleTimeUpdate =
()=>{


const video =
videoRef.current;



if(!video){

return;

}





const current =
Math.floor(
video.currentTime
);






if(
current -
lastUpdateRef.current
>=10
){



lastUpdateRef.current =
current;



updateProgress(false);



}



};











// ADD NOTE

const addNote =
async()=>{


if(
!lectureId ||
!newNote.trim()
){

return;

}



try{


await createLectureNote(

lectureId,

newNote,

Math.floor(
videoRef.current?.currentTime ?? 0
)

);




setNewNote("");



loadNotes();



}
catch(error){


console.error(
"Adding note failed:",
error
);



}



};












// ADD BOOKMARK

const addBookmark =
async()=>{


if(!lectureId){

return;

}



try{


await createLectureBookmark(

lectureId,

Math.floor(
videoRef.current?.currentTime ?? 0
)

);




loadBookmarks();



}
catch(error){


console.error(
"Adding bookmark failed:",
error
);



}



};


// AI TUTOR


const askAI = async()=>{

try{

if(!question.trim()){
return;
}

setAiLoading(true);

const response =
await api.post(
"/ai/chat",
{
message:question
}
);

setAiAnswer(
    response.data.reply
);


}
catch(error){

console.error(
"AI Tutor failed:",
error
);

}
finally{

setAiLoading(false);

}

};







if(!lecture){


return (

<h2>

Loading...

</h2>

);


}






const percentage =
lecture.duration_seconds

?

Math.min(

100,

Math.floor(

(
watchedSeconds /
lecture.duration_seconds

)

*

100

)

)

:

0;






return (

<div className="player-container">


<h1 className="player-title">
{lecture.title}
</h1>



<div className="player-layout">



{/* LEFT SIDE */}

<div className="main-content">


<div className="video-section">


<video

ref={videoRef}

className="video-player"

controls

onTimeUpdate={handleTimeUpdate}

onEnded={()=>updateProgress(true)}

>


<source

src={
lecture.video_url.startsWith("http")
?
lecture.video_url
:
`http://localhost:5000${lecture.video_url}`
}

type="video/mp4"

/>


</video>




<div className="video-info">


<p>
Watched: {watchedSeconds}s
</p>


<p>
Progress: {percentage}%
</p>



<div className="progress-bar">


<div

className="progress-fill"

style={{
width:`${percentage}%`
}}

/>


</div>



</div>


</div>


</div>







{/* RIGHT SIDEBAR */}

<div className="right-sidebar">



{/* COURSE CONTENT */}

<div className="course-sidebar">


<h2>
📚 Course Content
</h2>



{
course?.modules.map(module=>(


<div

key={module.id}

className="module"

>


<h3>
📂 {module.title}
</h3>




{
module.lectures.map(item=>(


<div

key={item.id}

className={

item.id === lectureId

?

"lecture-item active-lecture"

:

"lecture-item"

}


onClick={()=>navigate(

`/courses/${courseId}/lectures/${item.id}`

)}


>


{
item.id === lectureId
?
"▶"
:
"○"
}

{" "}

{item.title}


</div>


))


}



</div>


))


}



</div>








{/* TABS */}


<div className="tabs">


<button onClick={()=>setActiveTab("notes")}>
Notes
</button>


<button onClick={()=>setActiveTab("bookmarks")}>
Bookmarks
</button>


<button onClick={()=>setActiveTab("transcript")}>
Transcript
</button>


<button onClick={()=>setActiveTab("resources")}>
Resources
</button>


</div>









{/* NOTES */}

{

activeTab==="notes" &&


<div>


<input

value={newNote}

onChange={
e=>setNewNote(e.target.value)
}

placeholder="Write note"

/>



<button onClick={addNote}>
Add
</button>




{

notes.map(note=>(


<div

className="item"

key={note.id}

>


<p>
📝 {note.content}
</p>



<button

onClick={()=>{


const video =
videoRef.current;



if(
video &&
note.timestamp_seconds !== null
){


video.currentTime =
note.timestamp_seconds;


video.play();


}


}}


>


Go {note.timestamp_seconds}s


</button>



</div>


))


}


</div>


}









{/* BOOKMARKS */}


{

activeTab==="bookmarks" &&


<div>


<button onClick={addBookmark}>
🔖 Add Bookmark
</button>




{

bookmarks.map(bookmark=>(


<div

className="item"

key={bookmark.id}

>


<button

onClick={()=>{


const video =
videoRef.current;



if(
video &&
bookmark.timestamp_seconds !== null
){


video.currentTime =
bookmark.timestamp_seconds;


video.play();


}



}}


>


Jump to {bookmark.timestamp_seconds ?? 0}s


</button>



</div>


))


}



</div>


}









{/* TRANSCRIPT */}


{

activeTab==="transcript" &&


<div className="transcript-box">


{lecture.transcript}


</div>


}









{/* RESOURCES */}


{

activeTab==="resources" &&


<div>


{

lecture.resource_urls?.map(

(url,index)=>(


<p key={index}>


<a

href={url}

target="_blank"

rel="noreferrer"

>


Resource {index+1}


</a>


</p>


)


)


}


</div>


}








{/* AI FLOATING TUTOR */}


<button

className="ai-floating-btn"

onClick={()=>setShowAI(!showAI)}

>

🤖 AI Tutor

</button>





{

showAI &&


<div className="ai-popup">



<div className="ai-header">


<h3>
🤖 AI Tutor
</h3>



<button

onClick={()=>setShowAI(false)}

>

✕

</button>


</div>





<input

placeholder="Ask something about this lecture..."

value={question}

onChange={
e=>setQuestion(e.target.value)
}

/>





<button

onClick={askAI}

disabled={aiLoading}

>


{

aiLoading

?

"Thinking..."

:

"Ask AI"

}


</button>







{

aiAnswer &&


<div className="ai-answer">


<p>
{aiAnswer}
</p>


</div>


}



</div>


}



</div>




</div>


</div>


);

}

export default CoursePlayer;