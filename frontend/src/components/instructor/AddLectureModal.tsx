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



const [video,setVideo] =
useState<File | null>(null);



const [duration,setDuration] =
useState("");



const [orderIndex,setOrderIndex] =
useState("");



const [transcript,setTranscript] =
useState("");






const createLecture = async()=>{


try{



const formData = new FormData();



formData.append(
"title",
title
);



formData.append(
"duration_seconds",
duration
);



formData.append(
"order_index",
orderIndex
);



formData.append(
"transcript",
transcript
);





if(video){

formData.append(
"video",
video
);

}





await api.post(

`/modules/${moduleId}/lectures`,

formData,

{
headers:{
"Content-Type":"multipart/form-data"
}
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

type="file"

accept="video/*"

onChange={
e=>
setVideo(
e.target.files?.[0] || null
)
}

/>








<input

placeholder="Duration seconds"

value={duration}

onChange={
e=>setDuration(e.target.value)
}

/>







<input

placeholder="Order index"

value={orderIndex}

onChange={
e=>setOrderIndex(e.target.value)
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