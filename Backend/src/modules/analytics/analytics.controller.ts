import { Request,Response } from "express";
import { AnalyticsService } from "./analytics.service";


export class AnalyticsController {


static async instructorAnalytics(
req:Request,
res:Response
){


try{


const userId =
req.user!.id;



const data =
await AnalyticsService.getInstructorAnalytics(
userId
);



res.json(data);



}
catch(error){


console.error(error);


res.status(500).json({

message:"Analytics failed"

});


}


}


}