import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/dashboard";
import CourseDetails from "../pages/CourseDetails";
import CoursePlayer from "../pages/coursePlayer/CoursePlayer";


function AppRoutes() {

  return (
    <Routes>

      <Route
        path="/login"
        element={<Login />}
      />


      <Route
        path="/dashboard"
        element={<Dashboard />}
      />


      <Route
        path="/courses/:id"
        element={<CourseDetails />}
      />

      <Route
      path="/courses/:courseId/lectures/:lectureId"
      element={<CoursePlayer />}
/>

    </Routes>
  );

}


export default AppRoutes;