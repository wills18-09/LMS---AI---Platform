import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/dashboard/dashboard";
import CourseDetails from "../pages/CourseDetails";
import CoursePlayer from "../pages/coursePlayer/CoursePlayer";

import ProtectedRoute from "./ProtectedRoutes";

import AssignmentList from "../pages/assignments/AssignmentList";
import AssignmentSubmit from "../pages/assignments/AssignmentSubmit";

import CreateAssignment from "../pages/instructor/createAssignment";
import InstructorDashboard from "../pages/instructor/InstructorDashboard";
import InstructorCourseDetails from "../pages/instructor/instructorCourseDetails";
import InstructorLectureDetails from "../pages/instructor/instructorLectureDetails";
import AssignmentSubmissions from "../pages/instructor/assignmentSubmissions";
import InstructorAssignments from "../pages/instructor/instructorAssignments";

import QuizAttempt from "../pages/student/quizAttempt";

import QuizBuilder from "../pages/instructor/quizBuilder";
import CreateQuiz from "../pages/instructor/createQuiz";
import InstructorQuiz from "../pages/instructor/instructorQuiz";

import Certificates from "../pages/student/certificates";

import AdminDashboard from "../pages/adminPanel/adminDashboard";

import Layout from "../components/common/Layout";

import Courses from "../pages/student/Courses";

function AppRoutes() {


return (

<Routes>



<Route

path="/login"

element={<Login />}

/>


<Route
 path="/register"
 element={<Register/>}
/>


<Route element={<Layout />}>




<Route

path="/dashboard"

element={

<ProtectedRoute>

<Dashboard />

</ProtectedRoute>

}

/>


<Route
    path="/courses"
    element={<Courses/>}
/>


<Route

path="/courses/:id"

element={

<ProtectedRoute>

<CourseDetails />

</ProtectedRoute>

}

/>





<Route

path="/courses/:courseId/lectures/:lectureId"

element={

<ProtectedRoute>

<CoursePlayer />

</ProtectedRoute>

}

/>







{/* Student Assignments */}



<Route

path="/courses/:id/assignments"

element={

<ProtectedRoute>

<AssignmentList />

</ProtectedRoute>

}

/>





<Route

path="/assignments/:id"

element={

<ProtectedRoute>

<AssignmentSubmit />

</ProtectedRoute>

}

/>









{/* Instructor Dashboard */}



<Route

path="/instructor/dashboard"

element={

<ProtectedRoute>

<InstructorDashboard />

</ProtectedRoute>

}

/>





<Route

path="/instructor/courses/:id"

element={

<ProtectedRoute>

<InstructorCourseDetails />

</ProtectedRoute>

}

/>





<Route

path="/instructor/lectures/:id"

element={

<ProtectedRoute>

<InstructorLectureDetails />

</ProtectedRoute>

}

/>








{/* Instructor Assignments */}



<Route

path="/instructor/assignments/create"

element={

<ProtectedRoute>

<CreateAssignment />

</ProtectedRoute>

}

/>





<Route

path="/instructor/assignments/:id/submissions"

element={

<ProtectedRoute>

<AssignmentSubmissions />

</ProtectedRoute>

}

/>





<Route

path="/instructor/courses/:id/assignments"

element={

<ProtectedRoute>

<InstructorAssignments />

</ProtectedRoute>

}

/>









{/* Student Quiz */}



<Route

path="/quizzes/:id"

element={

<ProtectedRoute>

<QuizAttempt />

</ProtectedRoute>

}

/>








{/* Create Quiz */}



<Route

path="/instructor/modules/:moduleId/quiz/create"

element={

<ProtectedRoute>

<CreateQuiz />

</ProtectedRoute>

}

/>







{/* Instructor View Quiz Questions */}



<Route

path="/instructor/quizzes/:quizId"

element={

<ProtectedRoute>

<InstructorQuiz />

</ProtectedRoute>

}

/>








{/* Instructor Quiz Builder */}



<Route

path="/instructor/quizzes/:quizId/builder"

element={

<ProtectedRoute>

<QuizBuilder />

</ProtectedRoute>

}

/>





<Route

path="/certificates"

element={

<ProtectedRoute>

<Certificates />

</ProtectedRoute>

}

/>





{/* Admin Dashboard */}



<Route

path="/admin"

element={

<ProtectedRoute>

<AdminDashboard />

</ProtectedRoute>

}

/>





</Route>



</Routes>


);


}



export default AppRoutes;