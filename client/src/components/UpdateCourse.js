// UpdateCourse - This component provides the "Update Course" screen by rendering a form that allows a user to update one of their existing courses. The component also renders an "Update Course" button that when clicked sends a PUT request to the REST API's /api/courses/:id route. This component also renders a "Cancel" button that returns the user to the "Course Detail" screen.

import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "./Loading";
const UpdateCourse = ({ context }) => {
  // url query
  const { id } = useParams();
  const navigate = useNavigate();
  // state
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  // ref
  const titleRef = useRef();
  const descriptionRef = useRef();
  const estimatedTimeRef = useRef();
  const materialsNeededRef = useRef();

  /**
   * Handles cancel button clicks,
   * preventing default behavior and redirecting to default route.
   * @param {event} e - input event
   */
  const cancelHandler = (e) => {
    e.preventDefault();
    navigate("/");
  };

  useEffect(() => {
    context.actions.getCourse(id).then((course) => {
      if (course) {
        setLoading(false);
        titleRef.current.value = course.title;
        descriptionRef.current.value = course.description;
        estimatedTimeRef.current.value = course.estimatedTime;
        materialsNeededRef.current.value = course.materialsNeeded;
      } else {
        navigate("/course-not-found");
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      estimatedTime: estimatedTimeRef.current.value,
      materialsNeeded: materialsNeededRef.current.value,
    };
    const credentials = {
      username: context.authenticatedUser.user.emailAddress,
      password: context.authenticatedUser.user.password,
    };

    context.actions.updateCourse(id, body, credentials).then((errors) => {
      if (errors.length) {
        setErrors(errors);
      } else {
        navigate(`/courses/${id}`);
      }
    });
  };

  /**
   * displayErrors() takes errors state and returns jsx to display errors
   * @returns {JSX} html to display validation errors
   */
  const displayErrors = () => {
    if (errors.length) {
      const errorsList = errors.map((error, index) => (
        <li key={index}>{error}</li>
      ));

      return (
        <div className="validation--errors">
          <h3>Validation Errors</h3>
          <ul>{errorsList}</ul>
        </div>
      );
    }
    return null; // no errors
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <main>
          <div className="wrap">
            <h2>Update Course</h2>
            {displayErrors()}
            <form onSubmit={handleSubmit}>
              <div className="main--flex">
                <div>
                  <label htmlFor="courseTitle">Course Title</label>
                  <input
                    ref={titleRef}
                    id="courseTitle"
                    name="courseTitle"
                    type="text"
                  />

                  <p>By Joe Smith</p>

                  <label htmlFor="courseDescription">Course Description</label>
                  <textarea
                    ref={descriptionRef}
                    id="courseDescription"
                    name="courseDescription"
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="estimatedTime">Estimated Time</label>
                  <input
                    ref={estimatedTimeRef}
                    id="estimatedTime"
                    name="estimatedTime"
                    type="text"
                  />

                  <label htmlFor="materialsNeeded">Materials Needed</label>
                  <textarea
                    ref={materialsNeededRef}
                    id="materialsNeeded"
                    name="materialsNeeded"
                  ></textarea>
                </div>
              </div>
              <button className="button" type="submit">
                Update Course
              </button>
              <button
                className="button button-secondary"
                onClick={cancelHandler}
              >
                Cancel
              </button>
            </form>
          </div>
        </main>
      )}
    </>
  );
};

export default UpdateCourse;
