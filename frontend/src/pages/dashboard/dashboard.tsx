import { useEffect, useState } from "react";
import api from "../../services/axios";


interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string | null;
  enrolled_at: string;
  progress_percent: string;
}


function Dashboard() {

  const [courses, setCourses] = useState<Course[]>([]);


  useEffect(() => {

    const getCourses = async () => {

      try {

        const response = await api.get(
          "/enrollments/me"
        );


        console.log(
          "My courses:",
          response.data
        );


        setCourses(response.data);


      } catch(error) {

        console.error(
          "Failed:",
          error
        );

      }

    };


    getCourses();

  }, []);



  return (
    <div>

      <h1>
        Student Dashboard
      </h1>


      <h2>
        My Courses
      </h2>


      <p>
        Courses found: {courses.length}
      </p>


      {
        courses.map((course) => (

          <div key={course.id}>

            <h3>
              {course.title}
            </h3>


            <p>
              {course.description}
            </p>


            <p>
              Progress: {course.progress_percent}%
            </p>


          </div>

        ))
      }


    </div>
  );

}


export default Dashboard;