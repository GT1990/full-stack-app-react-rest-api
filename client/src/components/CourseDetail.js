// CourseDetail - This component provides the "Course Detail" screen by retrieving the detail for a course from the REST API's /api/courses/:id route and rendering the course. The component also renders a "Delete Course" button that when clicked should send a DELETE request to the REST API's /api/courses/:id route in order to delete a course. This component also renders an "Update Course" button for navigating to the "Update Course" screen.

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "./Loading";
const CourseDetail = ({ context }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState();

  useEffect(() => {
    context.actions.getCourse(id).then((course) => {
      setCourse(course);
      setLoading(false);
    });
  }, []);

  const displayMaterialsNeeded = () => {
    if (course.materialsNeeded) {
      let materials = course.materialsNeeded
        .trim()
        .replace(/\*/g, "")
        .split("\n");
      return materials.map((item, index) => <li key={index}>{item}</li>);
    }
    return null;
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <main>
          <div className="actions--bar">
            <div className="wrap">
              <Link className="button" to={`/courses/${id}/update`}>
                Update Course
              </Link>
              <Link className="button" to={`/courses/${id}/delete`}>
                Delete Course
              </Link>
              <Link className="button button-secondary" to="/">
                Return to List
              </Link>
            </div>
          </div>

          <div className="wrap">
            <h2>Course Detail</h2>
            <form>
              <div className="main--flex">
                <div>
                  <h3 className="course--detail--title">Course</h3>
                  <h4 className="course--name">{course.title}</h4>
                  <p>
                    By {course.user.firstName} {course.user.lastName}
                  </p>

                  <p>{course.description}</p>
                </div>
                <div>
                  <h3 className="course--detail--title">Estimated Time</h3>
                  <p>{course.estimatedTime}</p>

                  <h3 className="course--detail--title">Materials Needed</h3>
                  <ul className="course--detail--list">
                    {displayMaterialsNeeded()}
                  </ul>
                </div>
              </div>
            </form>
          </div>
        </main>
      )}
    </>
  );
};

export default CourseDetail;
