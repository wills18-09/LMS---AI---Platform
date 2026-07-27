import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getLecture,
  updateLectureProgress,
  createLectureNote,
  createLectureBookmark,
  getLectureNotes,
  getLectureBookmarks
} from "../services/lecture.service";


function LecturePlayer(){


const {lectureId}=useParams();


const [lecture,setLecture]=useState<any>(null);

const [watched,setWatched]=useState(0);

const [note,setNote]=useState("");

const [notes,setNotes]=useState<any[]>([]);

const [bookmarks,setBookmarks]=useState<any[]>([]);





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

console.log(error);

}


};



if(lectureId){

loadLecture();

}


},[lectureId]);








const handleVideoProgress = async(
e:any
)=>{


const seconds =
Math.floor(
 e.currentTarget.currentTime
);



setWatched(seconds);



await updateLectureProgress(

lectureId!,

seconds,

false

);



};








const addNote = async()=>{


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

return <h2>Loading lecture...</h2>;

}





return (

<div>


<h1>
{lecture.title}
</h1>



<video

width="800"

controls

onTimeUpdate={handleVideoProgress}

>


<source

src={`http://localhost:5000${lecture.video_url}`}

/>


</video>




<p>

Duration:
{lecture.duration_seconds}s

</p>






<hr/>


<h2>
Notes
</h2>



<input

value={note}

placeholder="Add note..."

onChange={
(e)=>setNote(e.target.value)
}

/>



<button onClick={addNote}>

Add Note

</button>





{
notes.map((item)=>(

<p key={item.id}>

{item.content}

</p>

))
}





<hr/>




<h2>
Bookmarks
</h2>


<button onClick={addBookmark}>

🔖 Bookmark current time

</button>





{
bookmarks.map((item)=>(

<p key={item.id}>

⏱ {item.timestamp_seconds}s

</p>

))
}




</div>

);


}


export default LecturePlayer;