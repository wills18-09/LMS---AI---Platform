import { Response } from "express";
import pool from "../../db";
import { AuthenticatedRequest } from "../../middleware/authMiddleware";
import axios from "axios";




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

  video_url = `http://localhost:5000/uploads/${req.file.filename}`;

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




if(transcript){

  try {

    const course =
    await pool.query(
      `
      SELECT course_id
      FROM modules
      WHERE id=$1
      `,
      [
        moduleId
      ]
    );


    await axios.post(
  "http://127.0.0.1:8000/ingest/",
  {
    course_id: course.rows[0].course_id,
    lecture_id: result.rows[0].id,
    transcript: transcript
  }
);

    console.log(
      "Lecture transcript sent to AI ingestion"
    );


  }
  catch(error:any){

    console.error(
      "AI INGESTION ERROR:",
      error.response?.data || error.message
    );

  }

}




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

export const updateLecture = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {

    const { id } = req.params;

    const instructorId = req.user?.id;

    const {
      title,
      transcript,
      duration_seconds,
      order_index,
      resource_urls
    } = req.body;

    const ownerCheck = await pool.query(
      `
      SELECT l.id
      FROM lectures l
      JOIN modules m
      ON l.module_id = m.id
      JOIN courses c
      ON m.course_id = c.id
      WHERE l.id = $1
      AND c.instructor_id = $2
      `,
      [id, instructorId]
    );

    if (ownerCheck.rows.length === 0) {
      return res.status(403).json({
        message: "You do not own this lecture."
      });
    }

    let videoUrlQuery = "";
    let values: any[] = [
      title,
      transcript,
      duration_seconds,
      order_index,
      resource_urls
    ];

    if (req.file) {
      videoUrlQuery = ", video_url=$6";
      values.push(`/uploads/${req.file.filename}`);
      values.push(id);
    } else {
      values.push(id);
    }

    const query = req.file
      ? `
      UPDATE lectures
      SET
        title=$1,
        transcript=$2,
        duration_seconds=$3,
        order_index=$4,
        resource_urls=$5
        ${videoUrlQuery}
      WHERE id=$7
      RETURNING *
      `
      : `
      UPDATE lectures
      SET
        title=$1,
        transcript=$2,
        duration_seconds=$3,
        order_index=$4,
        resource_urls=$5
      WHERE id=$6
      RETURNING *
      `;

    const result = await pool.query(query, values);

    res.json({
      message: "Lecture updated successfully",
      lecture: result.rows[0]
    });

  } catch (error) {

    console.error("UPDATE LECTURE ERROR:", error);

    res.status(500).json({
      message: "Server error"
    });

  }
};

export const deleteLecture = async (
  req: AuthenticatedRequest,
  res: Response
) => {

  try {

    const { id } = req.params;


    const instructorId = req.user?.id;



    console.log("DELETE LECTURE DEBUG");

    console.log({
      lectureId: id,
      instructorId,
      user: req.user
    });



    if(!instructorId){

      return res.status(401).json({
        message:"Instructor not authenticated"
      });

    }




    const ownerCheck = await pool.query(

      `
      SELECT 
        l.id,
        c.instructor_id

      FROM lectures l

      JOIN modules m
      ON l.module_id = m.id

      JOIN courses c
      ON m.course_id = c.id

      WHERE l.id=$1

      `,

      [
        id
      ]

    );





    console.log(
      "OWNER RESULT:",
      ownerCheck.rows
    );





    if(ownerCheck.rows.length === 0){

      return res.status(404).json({

        message:"Lecture not found"

      });

    }





    const lectureOwner =
      ownerCheck.rows[0].instructor_id;




    if(
      lectureOwner !== instructorId
    ){

      console.log(
        "OWNER MISMATCH",
        {
          databaseOwner: lectureOwner,
          loggedInstructor: instructorId
        }
      );


      return res.status(403).json({

        message:"You do not own this lecture"

      });

    }







    await pool.query(

      `
      DELETE FROM lectures
      WHERE id=$1
      `,

      [
        id
      ]

    );






    return res.json({

      message:"Lecture deleted successfully"

    });





  }
  catch(error){


    console.error(
      "DELETE LECTURE ERROR:",
      error
    );


    return res.status(500).json({

      message:"Server error"

    });


  }

};