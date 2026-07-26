import { useState } from "react";
import api from "../../services/axios";

import "../../styles/modal.css";


type Props = {
    courseId:string;
    close:()=>void;
    refresh:()=>void;
};



function AddModuleModal({
    courseId,
    close,
    refresh
}:Props){


const [title,setTitle]=
useState("");



const createModule=async()=>{


try{


await api.post(
`/courses/${courseId}/modules`,
{
title
}
);



refresh();

close();



}
catch(error){

console.error(
"Creating module failed",
error
);


}



};



return (

<div className="modal-overlay">


<div className="modal-box">


<h2>
Create Module
</h2>


<input

placeholder="Module title"

value={title}

onChange={
e=>setTitle(e.target.value)
}

/>



<button
onClick={createModule}
>

Create

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


export default AddModuleModal;