// Courses - This component provides the "Courses" screen by retrieving the list of courses from the REST API's /api/courses route and rendering a list of courses. Each course needs to link to its respective "Course Detail" screen. This component also renders a link to the "Create Course" screen.

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Courses = ({ context }) => {
  const [cousesList, setCoursesList] = useState();
  useEffect(() => {
    context.actions.getCourses().then((courses) => {
      if (courses) {
        let coursesElements = [];
        coursesElements = courses.map((course) => {
          return (
            <Link
              to={`/courses/${course.id}`}
              key={course.id}
              className="course--module course--link"
              href="course-detail.html"
            >
              <h2 className="course--label">Course</h2>
              <h3 className="course--title">{course.title}</h3>
            </Link>
          );
        });
        setCoursesList(coursesElements);
      }
    });
  }, []);

  return (
    <main>
      <div className="wrap main--grid">
        {/* List of all courses */}
        {cousesList}
        {/* Link to create a new course */}
        <Link
          className="course--module course--add--module"
          to="/courses/create"
        >
          <span className="course--add--title">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 13 13"
              className="add"
            >
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>
            New Course
          </span>
        </Link>
      </div>
    </main>
  );
};

export default Courses;
