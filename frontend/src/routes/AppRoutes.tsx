import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/dashboard";
import CourseDetails from "../pages/CourseDetails";
import CoursePlayer from "../pages/coursePlayer/CoursePlayer";

import ProtectedRoute from "./ProtectedRoutes";
import AssignmentList from "../pages/assignments/AssignmentList";
import AssignmentSubmit from "../pages/assignments/AssignmentSubmit";
import CreateAssignment from "../pages/instructor/createAssignment";
import InstructorDashboard from "../pages/instructor/instructorDashboard";
import InstructorCourseDetails from "../pages/instructor/instructorCourseDetails";


function AppRoutes() {


  return (

    <Routes>


      <Route

        path="/login"

        element={<Login />}

      />



      <Route

        path="/dashboard"

        element={

          <ProtectedRoute>

            <Dashboard />

          </ProtectedRoute>

        }

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
      
      path="/instructor/assignments/create"
      
      element={
      
      <ProtectedRoute>
        
        <CreateAssignment />
        
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
          
          element={<InstructorCourseDetails />}
          
          />


    </Routes>

  );

  

}


export default AppRoutes;