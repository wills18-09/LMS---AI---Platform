import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/axios";


type Lecture = {
  id: string;
  title: string;
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
  modules: Module[];
};



function CourseDetails() {

  const { id } = useParams();


  const [course, setCourse] = useState<Course | null>(null);



  useEffect(() => {


    const fetchCourse = async () => {

      try {

        const response = await api.get(
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
      <h2>
        Loading course...
      </h2>
    );

  }




  return (

    <div style={{ padding: "30px" }}>


      <h1>
        {course.title}
      </h1>



      <p>
        {course.description}
      </p>



      <p>
        Category: {course.category}
      </p>




      <h2>
        Modules
      </h2>




      {
        course.modules && course.modules.length > 0 ? (

          course.modules.map((module) => (

            <div
              key={module.id}
              style={{
                marginBottom:"20px"
              }}
            >


              <h3>
                📂 {module.title}
              </h3>




              {
                module.lectures &&
                module.lectures.length > 0 ? (


                  module.lectures.map((lecture)=>(


                    <div
                      key={lecture.id}
                    >

                      <Link
                        to={`/courses/${course.id}/lectures/${lecture.id}`}
                      >

                        ▶ {lecture.title}

                      </Link>


                    </div>


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


          <p>
            No modules available yet.
          </p>


        )

      }



    </div>

  );

}


export default CourseDetails;