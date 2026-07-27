import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";


import {
  getLecture,
  updateLectureProgress,
  createLectureNote,
  createLectureBookmark,
  getLectureNotes,
  getLectureBookmarks
} from "../services/lecture.service";




function LecturePlayer(){


const { lectureId } = useParams();



const [lecture,setLecture] =
useState<any>(null);


const [watched,setWatched] =
useState(0);


const [note,setNote] =
useState("");


const [notes,setNotes] =
useState<any[]>([]);


const [bookmarks,setBookmarks] =
useState<any[]>([]);







useEffect(()=>{


const loadLecture = async()=>{


try{


const lectureData =
await getLecture(
  lectureId!
);



setLecture(
  lectureData.lecture
);





const notesData =
await getLectureNotes(
  lectureId!
);



setNotes(
  notesData.notes || []
);






const bookmarksData =
await getLectureBookmarks(
  lectureId!
);



setBookmarks(
  bookmarksData.bookmarks || []
);



}
catch(error){

console.error(
"Loading lecture failed:",
error
);

}


};




if(lectureId){

loadLecture();

}


},[lectureId]);











// Save progress while watching

const handleVideoProgress = async(
e:any
)=>{


if(!lecture){

return;

}



const video =
e.currentTarget;



let seconds =
Math.floor(
  video.currentTime
);




// prevent exceeding duration

if(
  lecture.duration_seconds &&
  seconds > Number(lecture.duration_seconds)
){

seconds =
Number(lecture.duration_seconds);

}



setWatched(seconds);



try{


await updateLectureProgress(

 lectureId!,

 seconds,

 false

);


}
catch(error){

console.error(
"Progress update failed:",
error
);


}



};











// Complete lecture when video ends

const handleVideoComplete = async()=>{


console.log(
"VIDEO ENDED FIRED"
);



try{


await updateLectureProgress(

 lectureId!,

 Number(lecture.duration_seconds),

 true

);



console.log(
"Lecture completed successfully"
);



}
catch(error){

console.error(
"Completion error:",
error
);


}



};












// Add note

const addNote = async()=>{


if(!note.trim()){

return;

}



await createLectureNote(

 lectureId!,

 note,

 watched

);



setNote("");



const updated =
await getLectureNotes(
 lectureId!
);



setNotes(
 updated.notes || []
);



};












// Add bookmark

const addBookmark = async()=>{


await createLectureBookmark(

 lectureId!,

 watched

);



const updated =
await getLectureBookmarks(
 lectureId!
);



setBookmarks(
 updated.bookmarks || []
);



};












if(!lecture){


return (

<h2>
Loading lecture...
</h2>

);


}









return(


<div className="lecture-player-page">





<h1>

{lecture.title}

</h1>







<video

width="800"

controls

onTimeUpdate={handleVideoProgress}

onEnded={handleVideoComplete}

>


<source

src={
`http://localhost:5000${lecture.video_url}`
}

/>


Your browser does not support video.


</video>







<p>

Duration:
{" "}
{lecture.duration_seconds}s

</p>









<hr/>








<h2>

📝 Notes

</h2>






<input

value={note}

placeholder="Add note..."

onChange={
(e)=>setNote(
e.target.value
)
}

/>





<button

onClick={addNote}

>

Add Note

</button>









{

notes.map((item)=>(


<div

key={item.id}

>


<p>

{item.content}

</p>


<small>

⏱ {item.timestamp_seconds}s

</small>


</div>


))

}









<hr/>








<h2>

🔖 Bookmarks

</h2>







<button

onClick={addBookmark}

>

Bookmark current time

</button>









{

bookmarks.map((item)=>(


<p

key={item.id}

>

⏱ {item.timestamp_seconds}s

</p>


))

}







</div>


);


}



export default LecturePlayer;