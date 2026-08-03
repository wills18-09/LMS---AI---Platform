import {
  useEffect,
  useState
} from "react";


import {
  getStudyPlan
} from "../../services/studyPlans.service";


import "../../styles/studyPlanCard.css";



type StudyDay = {

  day:number;

  lecture:string;

  task:string;

  difficulty:string;

};



type StudyPlan = {

  courseId:string;

  totalDays:number;

  difficulty:string;

  days:StudyDay[];

};





type Props = {

 courseId:string;

};






function StudyPlanCard({
 courseId
}:Props){



const [
 plan,
 setPlan
]
=
useState<StudyPlan|null>(null);



const [
 showFullPlan,
 setShowFullPlan
]
=
useState(false);







useEffect(()=>{


const loadPlan =
async()=>{


try{


const response =
await getStudyPlan(
courseId
);



if(response.plan){

setPlan(
response.plan.plan_json
);

}


}
catch(error){


console.error(
"Study plan loading failed:",
error
);


}



};



loadPlan();



},[courseId]);









if(!plan){

return null;

}







return(



<div className="study-plan-card">





<div className="study-plan-header">


<div>

<h2>

📅 Your AI Study Plan

</h2>


<p>

Personalized learning roadmap

</p>


</div>



<span>

{plan.difficulty}

</span>



</div>









<div className="study-plan-days">





{

plan.days
.slice(
  0,
  showFullPlan
  ?
  plan.days.length
  :
  3
)
.map(
(day)=>(


<div

key={day.day}

className="study-day"

>


<div className="day-number">

Day {day.day}

</div>





<div>


<h3>

{day.lecture}

</h3>


<p>

{day.task}

</p>


</div>





</div>



))

}





</div>









<button

onClick={()=>

setShowFullPlan(
!showFullPlan
)

}

>


{

showFullPlan

?

"Show Less ↑"

:

"View Full Plan →"

}



</button>









</div>


);


}



export default StudyPlanCard;