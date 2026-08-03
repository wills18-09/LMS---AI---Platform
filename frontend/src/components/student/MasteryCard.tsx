import {
  useEffect,
  useState
} from "react";


import {
  getMastery
} from "../../services/mastery.service";


import "../../styles/masteryCard.css";



type Mastery = {

  id:string;

  lecture_id:string;

  lecture_title:string;

  mastery_score:number;

};






function MasteryCard(){



const [
  mastery,
  setMastery
]
=
useState<Mastery[]>([]);








useEffect(()=>{



const loadMastery =
async()=>{


try{


const response =
await getMastery();



setMastery(

(response.mastery || [])
.sort(
(
a:Mastery,
b:Mastery
)=>
a.mastery_score - b.mastery_score
)

);



}
catch(error){


console.error(
"Mastery loading failed:",
error
);


}



};



loadMastery();



},[]);








if(
mastery.length === 0
){

return null;

}









return(



<div className="mastery-card">






<div className="mastery-header">


<div>

<h2>

📊 Your Learning Mastery

</h2>


<p>

Track your understanding across topics

</p>


</div>



</div>









<div className="mastery-list">





{

mastery.map(
(item)=>(


<div

key={item.id}

className="mastery-item"

>








<div className="mastery-info">


<h3>

{item.lecture_title}

</h3>





<div>


<span>

{item.mastery_score}%

</span>




{

item.mastery_score < 50

&&

<p className="weak-tag">

Needs Practice

</p>

}





{

item.mastery_score >= 50
&&
item.mastery_score < 80

&&

<p className="medium-tag">

Improving

</p>

}





{

item.mastery_score >= 80

&&

<p className="strong-tag">

Mastered

</p>

}



</div>





</div>









<div className="mastery-bar">



<div

className="mastery-fill"

style={{
width:`${item.mastery_score}%`
}}

/>



</div>









{

item.mastery_score >= 80

&&


<p className="mastery-message">

🎯 Topic mastered

</p>


}



{

item.mastery_score < 80

&&


<p className="mastery-message">

📚 Keep practicing this topic

</p>


}





</div>



)

)



}









</div>









</div>


);



}



export default MasteryCard;