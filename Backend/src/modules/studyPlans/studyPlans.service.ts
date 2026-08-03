import pool from "../../db";
import { StudyPlansModel } from "./studyPlans.model";


export class StudyPlansService {



  static async generatePlan(
    userId:string,
    courseId:string
  ){


    // Get student's difficulty preference

    const preference =
    await pool.query(

      `
      SELECT difficulty_mode

      FROM student_preferences

      WHERE user_id=$1

      `,

      [
        userId
      ]

    );


    const difficulty =
    preference.rows[0]?.difficulty_mode
    ||
    "intermediate";




    // Get course lectures

    const lectures =
await pool.query(

`
SELECT

l.id,
l.title

FROM lectures l

JOIN modules m

ON m.id=l.module_id


WHERE m.course_id=$1

ORDER BY l.title ASC

`,

[
  courseId
]

);



    // Get mastery data

    const mastery =
    await pool.query(

      `
      SELECT

      lecture_id,
      mastery_score

      FROM student_mastery

      WHERE user_id=$1

      `,

      [
        userId
      ]

    );




    const masteryMap =
    new Map();


    mastery.rows.forEach(item=>{

      masteryMap.set(
        item.lecture_id,
        item.mastery_score
      );

    });





    const days =
    lectures.rows.map(

      (lecture,index)=>{


        const score =
        masteryMap.get(
          lecture.id
        )
        ||
        0;



        let task;



        if(score < 50){

          task =
          "Revise this topic and practice examples";

        }

        else if(score < 80){

          task =
          "Practice exercises and reinforce concepts";

        }

        else{

          task =
          "Move forward to the next topic";

        }




        return {

          day:index+1,

          lecture:
          lecture.title,

          task,

          difficulty

        };


      }

    );





    const plan = {

      courseId,

      difficulty,

      totalDays:
      days.length,

      days

    };





    return await StudyPlansModel.createPlan(

      userId,

      courseId,

      plan

    );


  }







  static async getPlan(
    userId:string,
    courseId:string
  ){

    return await StudyPlansModel.getPlan(
      userId,
      courseId
    );

  }



}