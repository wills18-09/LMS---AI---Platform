import { Request, Response } from "express";

import { AIService } from "../../services/ai.service";

import { LectureSummaryModel } from "../lectures/lecture.summary.model";



export class SummaryController {


static async generate(
req:Request,
res:Response
){

try{


const lectureId =
req.params.lectureId as string;



if(!lectureId){

return res.status(400).json({

message:"Lecture id required"

});

}





// CHECK IF SUMMARY ALREADY EXISTS

const existingSummary =
await LectureSummaryModel.findByLectureId(
    lectureId
);



if(existingSummary){


return res.json({

summary:
existingSummary.summary,

cached:true

});


}





// GENERATE NEW SUMMARY FROM AI SERVICE

const result =
await AIService.generateSummary(
lectureId
);



const summary =
result.summary;





// SAVE GENERATED SUMMARY

const savedSummary =
await LectureSummaryModel.create(

lectureId,

summary

);





return res.json({

summary:
savedSummary.summary,

cached:false

});




}
catch(error:any){


console.error(
"SUMMARY ERROR:",
error
);



return res.status(500).json({

message:error.message

});


}


}


}