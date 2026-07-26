import { useEffect, useState } from "react";
import api from "../../services/axios";
import CourseCard from "../../components/student/CourseCard";
import "../../styles/dashboard.css";


type Course = {
  id: string;
  title: string;
  description: string;
  progress_percent: string;
};


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


        setCourses(
          response.data
        );



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


    <div className="student-dashboard">



      {/* Header */}


      <div className="dashboard-header">


        <div>


          <h1>
            Welcome back 👋
          </h1>


          <p>
            Continue your learning journey and keep improving.
          </p>


        </div>



        <div className="student-badge">

          🎓 Student

        </div>


      </div>








      {/* Stats */}


      <div className="stats-container">


        <div className="stat-card">


          <h3>
            📚 Courses
          </h3>


          <p>
            {courses.length}
          </p>


        </div>





        <div className="stat-card">


          <h3>
            🎥 Learning
          </h3>


          <p>
            Active
          </p>


        </div>






        <div className="stat-card">


          <h3>
            🏆 Certificates
          </h3>


          <p>
            0
          </p>


        </div>



      </div>









      {/* Courses */}



      <div className="courses-section">


        <div className="section-header">


          <h2>
            My Courses
          </h2>


          <span>
            {courses.length} enrolled
          </span>


        </div>





        {
          courses.length > 0 ? (


            <div className="course-grid">


              {
                courses.map((course)=>(


                  <CourseCard

                    key={course.id}

                    id={course.id}

                    title={course.title}

                    description={course.description}

                    progress={course.progress_percent}

                  />


                ))
              }


            </div>


          ) : (


            <div className="empty-state">


              <h3>
                No courses yet 📚
              </h3>


              <p>
                Start learning by enrolling into a course.
              </p>


            </div>


          )
        }




      </div>




    </div>


  );



}



export default Dashboard;