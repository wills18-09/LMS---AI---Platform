import {
  useEffect,
  useState
} from "react";


import {
  useNavigate
} from "react-router-dom";


import {
  getRecommendations
} from "../../services/recommendations.service";


import "../../styles/recommendationCard.css";



type Recommendation = {

  id:string;

  recommended_course_id:string;

  course_title:string;

  lecture_title:string;

  reason:string;

  score:string;

};





function RecommendationCard(){



const navigate =
useNavigate();



const [
  recommendation,
  setRecommendation
] =
useState<Recommendation | null>(null);





useEffect(()=>{


const loadRecommendation =
async()=>{


try{


const response =
await getRecommendations();



if(
response.recommendations &&
response.recommendations.length > 0
){

setRecommendation(
response.recommendations[0]
);

}



}
catch(error){


console.error(
"Recommendation loading failed:",
error
);


}



};



loadRecommendation();



},[]);







if(!recommendation){

return null;

}







return(



<div className="recommendation-card">





<div className="recommendation-header">



<div className="recommendation-title">


<h2>

✨ AI Recommended Next

</h2>


<p>

Personalized based on your learning progress

</p>



</div>





<span className="ai-badge">

AI

</span>



</div>








<div className="recommendation-content">





<h3>

{recommendation.lecture_title}

</h3>





<p className="course-name">

📚 {recommendation.course_title}

</p>







<p className="recommendation-reason">

{recommendation.reason}

</p>





</div>









<div className="recommendation-footer">





<div className="mastery-box">


<span>

🎯 Mastery Score

</span>


<strong>

{recommendation.score}%

</strong>



</div>








<button

onClick={()=>


navigate(

`/courses/${recommendation.recommended_course_id}`

)


}

>

Continue Learning →

</button>







</div>







</div>



);


}





export default RecommendationCard;