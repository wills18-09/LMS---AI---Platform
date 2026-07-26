import {
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import {
  submitAssignment
} from "../../services/assignment.service";

import "../../styles/assignment.css";



function AssignmentSubmit(){



const {
  id
}=useParams();



const navigate =
useNavigate();



const [file,setFile] =
useState<File | null>(null);



const [loading,setLoading] =
useState(false);



const [message,setMessage] =
useState("");





const handleSubmit =
async()=>{



if(!id){

return;

}




if(!file){


setMessage(
"Please choose a file first"
);


return;


}





try{


setLoading(true);



await submitAssignment(

id,

file

);





setMessage(
"✅ Assignment submitted successfully!"
);





setTimeout(()=>{


navigate(-1);


},1500);





}
catch(error){


console.error(
"Submission failed:",
error
);



setMessage(
"❌ Submission failed. Try again."
);



}
finally{


setLoading(false);


}



};







return (


<div className="submit-page">





<div className="submit-card">





<div className="submit-header">


<div className="submit-icon">

📤

</div>



<h1>

Submit Assignment

</h1>



<p>

Upload your completed work and send it to your instructor.

</p>


</div>










<div className="upload-container">



<input

id="file-upload"

type="file"


onChange={(e)=>{


if(e.target.files){


setFile(
e.target.files[0]
);


}


}}


/>






<label

htmlFor="file-upload"

className="custom-upload-btn"

>


📁 Choose File


</label>






{
file &&


<div className="file-preview">


<div className="file-icon">

📄

</div>



<div>


<p>

{file.name}

</p>


<span>

Ready to upload

</span>


</div>



</div>


}





</div>









<button


className="submit-btn"


onClick={handleSubmit}


disabled={loading}



>


{

loading

?

"Uploading..."

:

"🚀 Submit Assignment"

}



</button>









{
message &&


<div className="submit-message">


{message}


</div>


}










<button


className="back-btn"


onClick={()=>navigate(-1)}


>


← Go Back


</button>








</div>






</div>



);



}



export default AssignmentSubmit;