import { useNavigate } from "react-router-dom";
import "../../styles/CourseCard.css";

type CourseCardProps = {
  id: string;
  title: string;
  description: string;
  progress: string;
};


function CourseCard({
  id,
  title,
  description,
  progress,
}: CourseCardProps) {


  const navigate = useNavigate();


  return (

    <div className="course-card">


      <div className="course-image">

        🎬

      </div>



      <div className="course-content">


        <h2>
          {title}
        </h2>


        <p>
          {description}
        </p>



        <div className="progress-section">


          <div className="progress-text">

            <span>
              Progress
            </span>

            <span>
              {progress}%
            </span>

          </div>



          <div className="progress-bar">


            <div
              className="progress-fill"
              style={{
                width:`${progress}%`
              }}
            />


          </div>


        </div>




        <button
          onClick={() =>
            navigate(`/courses/${id}`)
          }
        >

          Continue Learning →

        </button>



      </div>



    </div>

  );

}


export default CourseCard;