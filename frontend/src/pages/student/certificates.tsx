import {
  useEffect,
  useState
} from "react";


import api from "../../services/axios";


import "../../styles/certificates.css";



type Certificate = {

  id:string;

  course_id:string;

  certificate_url:string;

};





function Certificates(){



const [certificates,setCertificates] =
useState<Certificate[]>([]);



const [loading,setLoading] =
useState(true);






useEffect(()=>{


const loadCertificates = async()=>{


try{


const response =
await api.get(
"/certificates/me"
);



console.log(
"Certificates:",
response.data
);



setCertificates(
response.data.certificates || []
);



}
catch(error){


console.error(
"Failed loading certificates:",
error
);


}
finally{


setLoading(false);


}



};



loadCertificates();



},[]);








if(loading){


return(

<div className="certificate-loading">

Loading certificates... 🏆

</div>

);


}








return(


<div className="certificates-page">





<div className="certificates-header">


<div>


<h1>

🏆 My Certificates

</h1>



<p>

Your achievements and completed courses.

</p>


</div>



<div className="certificate-count">


{certificates.length}

<br/>

<span>

Earned

</span>


</div>



</div>









{

certificates.length > 0 ? (



<div className="certificates-container">



{

certificates.map((certificate)=>(



<div

className="certificate-card"

key={certificate.id}

>


<div className="certificate-top">


<div className="certificate-icon">

🏅

</div>



<div>

<h2>

Certificate of Completion

</h2>


<p>

Congratulations! You successfully completed this course.

</p>

</div>



</div>









<div className="certificate-info">


<div>

<strong>

Course ID

</strong>


<span>

{certificate.course_id}

</span>

</div>



<div>

<strong>

Certificate ID

</strong>


<span>

{certificate.id}

</span>

</div>


</div>








<a

href={`http://localhost:5000${certificate.certificate_url}`}

target="_blank"

rel="noreferrer"

className="view-certificate-btn"

>

📄 View Certificate

</a>






</div>



))


}



</div>



):(



<div className="empty-certificates">


<div className="empty-icon">

🎓

</div>


<h2>

No certificates yet

</h2>


<p>

Complete courses and quizzes to earn your first certificate.

</p>


</div>



)



}




</div>



);



}



export default Certificates;