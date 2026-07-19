type CourseCardProps = {
  title: string;
  description: string;
  progress: string;
};


function CourseCard({
  title,
  description,
  progress,
}: CourseCardProps) {

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "15px",
      }}
    >

      <h2>{title}</h2>

      <p>{description}</p>

      <p>
        Progress: {progress}%
      </p>


      <button>
        Continue Learning
      </button>

    </div>
  );
}


export default CourseCard;