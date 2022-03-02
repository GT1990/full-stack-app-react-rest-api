import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "./Loading";

/**
 * UpdateCourse renders a form that allows a user to update one of thier existing courses.
 * The "Update Course" button sends a PUT request to the REST API's /api/courses/:id route.
 * The "Cancel" button, and a successful update returns the user to the Course Detail's page
 * @param {object} props - context destructured from props
 * @returns {JSX} rendering update course form
 */
const UpdateCourse = ({ context }) => {
  // url query
  const { id } = useParams();
  const navigate = useNavigate();
  // state
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]); // stores errors returned from REST API
  // ref - input form refs
  const titleRef = useRef();
  const descriptionRef = useRef();
  const estimatedTimeRef = useRef();
  const materialsNeededRef = useRef();

  /**
   * Handles cancel button clicks,
   * preventing default behavior and redirecting to course detail page.
   * @param {event} e - input event
   */
  const cancelHandler = (e) => {
    e.preventDefault();
    navigate(`/courses/${id}`);
  };

  /**
   * useEffect runs only once when component mounts.
   * Calls getCourse function, passed down through context prop, with the id from the url param.
   * If a course is retrieved the form bellow is initialized with the courses details.
   * Else if a course is not found user is redirected to /courses-not-found route.
   */
  useEffect(() => {
    context.actions
      .getCourse(id)
      .then((course) => {
        if (course) {
          const authenticatedUser = context.authenticatedUser.user.emailAddress;
          const courseUser = course.user.emailAddress;
          if (authenticatedUser === courseUser) {
            setLoading(false);
            titleRef.current.value = course.title;
            descriptionRef.current.value = course.description;
            estimatedTimeRef.current.value = course.estimatedTime;
            materialsNeededRef.current.value = course.materialsNeeded;
          } else {
            navigate("/forbidden");
          }
        } else {
          navigate("/notfound");
        }
      })
      .catch((err) => {
        console.error(err);
        navigate("/error");
      });
  }, []);

  /**
   * handleSubmit is called when form is submitted.
   * The functions creates the body, and credentials needed to call the updateCourse function.
   * @param {event} e - event object
   */
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

    context.actions
      .updateCourse(id, body, credentials)
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);
        } else {
          navigate(`/courses/${id}`);
        }
      })
      .catch((err) => {
        console.error(err);
        navigate("/error");
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
