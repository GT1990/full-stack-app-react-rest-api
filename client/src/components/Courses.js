import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";

/**
 * Courses renders a list of courses by sending a GET request to the REST API's /api/courses route.
 * Each course links to the respective Course Detail's page and a link to create a new course.
 * @param {object} props - context destructured from props
 * @returns {JSX} rendering a list of all courses
 */
const Courses = ({ context }) => {
  // redirects
  const navigate = useNavigate();
  // state
  const [cousesList, setCoursesList] = useState();
  const [loading, setLoading] = useState(true);

  /**
   * useEffect runs once on component mount calling the getCourses function from context.
   * If course{s} are returned they are saved in state to be rendered to page.
   */
  useEffect(() => {
    context.actions
      .getCourses()
      .then((courses) => {
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
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        navigate("/error");
      });
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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
      )}
    </>
  );
};

export default Courses;
