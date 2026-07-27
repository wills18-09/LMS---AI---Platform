import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../services/axios";
import "../styles/CourseDetails.css";


type Lecture = {

 id:string;

 title:string;

 video_url:string;

 description?:string;

};


type Module = {

  id: string;

  title: string;

  lectures: Lecture[];

};



type Course = {

  id: string;

  title: string;

  description: string;

  category: string;

  difficulty?: string;

  instructor_name?: string;

  modules: Module[];

};





function CourseDetails() {


  const { id } = useParams();

  const navigate = useNavigate();



  const [course, setCourse] =
    useState<Course | null>(null);




  useEffect(() => {


    const fetchCourse = async () => {


      try {


        const response =
          await api.get(
            `/courses/${id}`
          );


        console.log(
          "Course details:",
          response.data
        );



        setCourse(
          response.data.course
        );



      } catch(error) {


        console.error(
          "Failed to load course:",
          error
        );


      }


    };



    if(id) {

      fetchCourse();

    }


  }, [id]);






  if(!course) {


    return (

      <div className="loading">

        Loading course...

      </div>

    );

  }






  const firstLecture =
    course.modules?.[0]?.lectures?.[0];






  return (


    <div className="course-details-page">





      {/* HERO */}



      <div className="course-hero">



        <div className="course-info">



          <span className="course-tag">

            🎓 {course.category}

          </span>




          <h1>

            {course.title}

          </h1>




          <p>

            {course.description}

          </p>





          <div className="course-meta">


            {
              course.difficulty && (

                <span>

                  🎯 {course.difficulty}

                </span>

              )
            }



            {
              course.instructor_name && (

                <span>

                  👨‍🏫 {course.instructor_name}

                </span>

              )
            }



          </div>





          {
            firstLecture && (


              <button

                className="start-button"

                onClick={() =>
                  navigate(
                    `/courses/${course.id}/lectures/${firstLecture.id}`
                  )
                }

              >

                Start Learning 🚀

              </button>


            )

          }



        </div>






        <div className="course-image">


          🎥


        </div>





      </div>









      {/* COURSE CONTENT */}



      <div className="content-section">



        <div className="section-header">


          <h2>

            📚 Course Content

          </h2>



          <span>

            {course.modules?.length || 0} Modules

          </span>



        </div>







        {
          course.modules &&
          course.modules.length > 0 ? (



            course.modules.map((module)=>(



              <div

                className="module-card"

                key={module.id}

              >




                <h3>

                  📂 {module.title}

                </h3>






                {
                  module.lectures &&
                  module.lectures.length > 0 ? (



                    module.lectures.map((lecture)=>(



                      <Link

                        key={lecture.id}

                        className="lecture-link"

                        to={
                          `/courses/${course.id}/lectures/${lecture.id}`
                        }

                      >

                        ▶ {lecture.title}


                      </Link>



                    ))



                  ) : (



                    <p>

                      No lectures available.

                    </p>



                  )

                }



              </div>



            ))



          ) : (



            <div className="empty">


              No modules available yet.


            </div>


          )

        }





      </div>









      {/* ASSIGNMENTS */}



      <div className="assignment-box">



        <h2>

          📝 Assignments

        </h2>




        <p>

          Complete assignments and submit your work.

        </p>




        <Link

          className="assignment-button"

          to={`/courses/${course.id}/assignments`}

        >

          View Assignments →

        </Link>




      </div>






    </div>


  );


}





export default CourseDetails;