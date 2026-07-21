import { useEffect, useState } from "react";
import api from "../../services/axios";
import CourseCard from "../../components/student/CourseCard";

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
        const response = await api.get("/enrollments/me");

        console.log("My courses:", response.data);

        setCourses(response.data);
      } catch (error) {
        console.error("Failed:", error);
      }
    };

    getCourses();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Student Dashboard</h1>

      <h2>My Courses</h2>

      <p>Courses found: {courses.length}</p>

      {courses.map((course) => (
        <CourseCard
          key={course.id}
          id={course.id}
          title={course.title}
          description={course.description}
          progress={course.progress_percent}
        />
      ))}
    </div>
  );
}

export default Dashboard;