import { RecommendationsModel } from "./recommendations.model";
import pool from "../../db";


export class RecommendationsService {


  static async generateRecommendations(
    userId:string
  ){


    // remove old recommendations
    await RecommendationsModel.clearRecommendations(
      userId
    );



    /*
      Find weak areas based on mastery score

      Lower mastery = higher priority
    */

    const masteryResult =
    await pool.query(

      `
      SELECT

      sm.mastery_score,

      sm.lecture_id,

      l.title AS lecture_title,

      c.id AS course_id,

      c.title AS course_title


      FROM student_mastery sm


      JOIN lectures l

      ON l.id = sm.lecture_id


      JOIN modules m

      ON m.id = l.module_id


      JOIN courses c

      ON c.id = m.course_id


      WHERE sm.user_id=$1


      ORDER BY sm.mastery_score ASC

      `,

      [
        userId
      ]

    );



    const recommendations=[];



    for(const item of masteryResult.rows){


      let reason="";


      let score=0;



      if(item.mastery_score < 50){

        reason =
        `Revise ${item.lecture_title} because your mastery score is low`;

        score = 90;


      }

      else if(item.mastery_score < 75){

        reason =
        `Practice ${item.lecture_title} to improve understanding`;

        score = 70;


      }
      else{


        reason =
        `Move forward after completing ${item.lecture_title}`;

        score = 40;


      }




      const recommendation =

      await RecommendationsModel.createRecommendation(

        userId,

        item.course_id,

        item.lecture_id,

        reason,

        score

      );



      recommendations.push(
        recommendation
      );


    }



    return recommendations;


  }







  static async getRecommendations(
    userId:string
  ){

    return await RecommendationsModel.getRecommendations(
      userId
    );

  }


}