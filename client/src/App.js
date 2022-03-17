import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// component imports
import Header from "./components/Header";
// course component imports
import Courses from "./components/Courses";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import CourseDetail from "./components/CourseDetail";
// user sign up,in,out component imports
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";
// error component imports
import UnhandledError from "./components/UnhandledError";
import NotFound from "./components/NotFound";
import Forbidden from "./components/Forbidden";
// private route component imports
import PrivateRoute from "./components/PrivateRoute";
// wraps components with context
import withContext from "./Context";

// components wrapped with context
const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const PrivateRouteWithContext = withContext(PrivateRoute);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const ForbiddenWithContext = withContext(Forbidden);

/**
 * App Routes
 * @returns {routes}
 */
function App() {
  return (
    <BrowserRouter>
      <HeaderWithContext />
      <Routes>
        <Route
          path="/full-stack-app-react-rest-api"
          element={<Navigate replace to="/" />}
        />
        {/* default route */}
        <Route path="/" element={<CoursesWithContext />} />
        {/* courses routes */}
        <Route path="/courses/:id" element={<CourseDetailWithContext />} />
        {/* private courses routes */}
        <Route path="/courses/:id/update" element={<PrivateRouteWithContext />}>
          <Route
            path="/courses/:id/update"
            element={<UpdateCourseWithContext />}
          />
        </Route>
        <Route path="/courses/create" element={<PrivateRouteWithContext />}>
          <Route path="/courses/create" element={<CreateCourseWithContext />} />
        </Route>
        {/* sign up,in,out routes */}
        <Route path="/signin" element={<UserSignInWithContext />} />
        <Route path="/signup" element={<UserSignUpWithContext />} />
        <Route path="/signout" element={<UserSignOutWithContext />} />
        {/* error routes */}
        <Route path="/error" element={<UnhandledError />} />
        <Route path="/forbidden" element={<ForbiddenWithContext />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
