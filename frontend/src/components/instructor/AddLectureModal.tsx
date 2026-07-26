import {
  useState
} from "react";

import api from "../../services/axios";

import "../../styles/modal.css";



type Props = {

  moduleId:string;

  close:()=>void;

  refresh:()=>void;

};





function AddLectureModal({
  moduleId,
  close,
  refresh
}:Props){



const [title,setTitle] =
useState("");



const [videoUrl,setVideoUrl] =
useState("");



const [duration,setDuration] =
useState("");



const [transcript,setTranscript] =
useState("");





const createLecture = async()=>{


try{


await api.post(

`/modules/${moduleId}/lectures`,

{

title,

video_url:videoUrl,

duration_seconds:Number(duration),

transcript

}

);




refresh();

close();



}
catch(error){


console.error(
"Creating lecture failed:",
error
);


}



};







return (


<div className="modal-overlay">



<div className="modal-box">



<h2>

Create Lecture

</h2>






<input

placeholder="Lecture title"

value={title}

onChange={
e=>setTitle(e.target.value)
}

/>





<input

placeholder="Video URL"

value={videoUrl}

onChange={
e=>setVideoUrl(e.target.value)
}

/>






<input

placeholder="Duration seconds"

value={duration}

onChange={
e=>setDuration(e.target.value)
}

/>







<textarea

placeholder="Transcript"

value={transcript}

onChange={
e=>setTranscript(e.target.value)
}

/>







<button

onClick={createLecture}

>

Create Lecture

</button>






<button

onClick={close}

>

Cancel

</button>




</div>


</div>


);


}



export default AddLectureModal;