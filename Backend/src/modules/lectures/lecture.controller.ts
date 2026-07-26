import { Response } from "express";
import pool from "../../db";
import { AuthenticatedRequest } from "../../middleware/authMiddleware";




// CREATE LECTURE WITH VIDEO UPLOAD

export const createLecture = async (
  req: AuthenticatedRequest,
  res: Response
) => {

  try {

    const { moduleId } = req.params;


    const {
      title,
      transcript,
      duration_seconds,
      order_index,
      resource_urls
    } = req.body;



    const instructorId = req.user?.id;



    if (!title || order_index === undefined) {

      return res.status(400).json({
        message:"Title and order_index are required."
      });

    }



    let video_url = null;


    if(req.file){

      video_url = `/uploads/${req.file.filename}`;

    }



    const moduleCheck = await pool.query(

      `
      SELECT m.id
      FROM modules m

      JOIN courses c
      ON m.course_id = c.id

      WHERE m.id=$1
      AND c.instructor_id=$2
      `,

      [
        moduleId,
        instructorId
      ]

    );




    if(moduleCheck.rows.length===0){

      return res.status(403).json({
        message:"You are not the owner of this course."
      });

    }




    const result = await pool.query(

      `
      INSERT INTO lectures
      (
        module_id,
        title,
        video_url,
        transcript,
        duration_seconds,
        order_index,
        resource_urls
      )

      VALUES
      ($1,$2,$3,$4,$5,$6,$7)

      RETURNING *
      `,

      [
        moduleId,
        title,
        video_url,
        transcript,
        duration_seconds,
        order_index,
        resource_urls
      ]

    );




    return res.status(201).json({

      message:"Lecture created successfully",

      lecture:result.rows[0]

    });



  }
  catch(error){

    console.error(
      "CREATE LECTURE ERROR:",
      error
    );


    return res.status(500).json({

      message:"Server error"

    });

  }

};









// GET SINGLE LECTURE


export const getLectureById = async (

  req: AuthenticatedRequest,

  res: Response

)=>{


  try{


    const {id}=req.params;



    const result = await pool.query(

      `
      SELECT *
      FROM lectures
      WHERE id=$1
      `,

      [
        id
      ]

    );



    if(result.rows.length===0){

      return res.status(404).json({

        message:"Lecture not found"

      });

    }



    return res.json({

      lecture:result.rows[0]

    });



  }
  catch(error){

    console.error(
      "GET LECTURE ERROR:",
      error
    );


    return res.status(500).json({

      message:"Server error"

    });

  }


};









// UPDATE LECTURE PROGRESS


export const updateLectureProgress = async (

  req: AuthenticatedRequest,

  res: Response

)=>{


  try{


    const userId = req.user?.id;


    const lectureId = req.params.id;



    const {
      watched_seconds,
      completed
    } = req.body;




    if(!userId){

      return res.status(401).json({

        message:"Unauthorized"

      });

    }





    // find enrollment

    const enrollment = await pool.query(

      `
      SELECT e.id

      FROM enrollments e

      WHERE e.user_id=$1

      AND e.course_id = (

        SELECT c.id

        FROM courses c

        JOIN modules m

        ON c.id=m.course_id

        JOIN lectures l

        ON m.id=l.module_id

        WHERE l.id=$2

      )

      `,

      [
        userId,
        lectureId
      ]

    );





    if(enrollment.rows.length===0){

      return res.status(403).json({

        message:"Student not enrolled in this course"

      });

    }




    const enrollmentId =
      enrollment.rows[0].id;






    const result = await pool.query(

      `
      INSERT INTO lecture_progress
      (
        enrollment_id,
        lecture_id,
        watched_seconds,
        completed,
        last_watched_at
      )

      VALUES
      ($1,$2,$3,$4,NOW())


      ON CONFLICT
      (
        enrollment_id,
        lecture_id
      )

      DO UPDATE SET

      watched_seconds=$3,

      completed=$4,

      last_watched_at=NOW()


      RETURNING *

      `,


      [

        enrollmentId,

        lectureId,

        watched_seconds || 0,

        completed || false

      ]


    );




    return res.json({

      message:"Progress updated",

      progress:result.rows[0]

    });




  }
  catch(error){


    console.error(
      "UPDATE PROGRESS ERROR:",
      error
    );


    return res.status(500).json({

      message:"Failed updating progress"

    });


  }


};









// GET LECTURE PROGRESS


export const getLectureProgress = async (

  req: AuthenticatedRequest,

  res: Response

)=>{


  try{


    const userId=req.user?.id;


    const lectureId=req.params.id;




    const result = await pool.query(

      `
      SELECT

      lp.watched_seconds,

      lp.completed


      FROM lecture_progress lp


      JOIN enrollments e

      ON lp.enrollment_id=e.id


      WHERE e.user_id=$1

      AND lp.lecture_id=$2

      `,


      [

        userId,

        lectureId

      ]

    );





    if(result.rows.length===0){

      return res.json({

        progress:{

          watched_seconds:0,

          completed:false

        }

      });

    }




    return res.json({

      progress:result.rows[0]

    });




  }
  catch(error){


    console.error(
      "GET PROGRESS ERROR:",
      error
    );


    return res.status(500).json({

      message:"Failed fetching progress"

    });


  }


};