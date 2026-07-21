import { useNavigate } from "react-router-dom";

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
    <div
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        marginTop: "20px",
        borderRadius: "10px",
        width: "350px",
      }}
    >

      <h2>
        {title}
      </h2>


      <p>
        {description}
      </p>


      <p>
        Progress: {progress}%
      </p>


      <button
        onClick={() => navigate(`/courses/${id}`)}
      >
        Continue Learning
      </button>


    </div>
  );
}

export default CourseCard;