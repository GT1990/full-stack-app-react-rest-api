import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * CreateCourse renders a form that allows a signed in user to create a new course.
 * When the "Create Course" button si clicked a POST request is sent to the REST API /api/courses route.
 * The cancel button returns the user to the default route.
 * @param {object} props - context destructured from props
 * @returns {JSX} - renders html form to create a new course
 */
const CreateCourse = ({ context }) => {
  const [user, setUser] = useState(); // state storing user
  const [errors, setErrors] = useState([]); // state storing errors

  const navigate = useNavigate(); // used for redirects
  const location = useLocation(); // used to send location along with navigate redirects

  // refs - form input refs
  const titleRef = useRef();
  const descriptionRef = useRef();
  const estimatedTimeRef = useRef();
  const materialsNeededRef = useRef();

  /**
   * When component mounts useEffect checks if the user is signed in.
   * If no user is signed in the user is redirected to /signin route,
   * with location info to be sent back to this route once signed in
   */
  useEffect(() => {
    const { authenticatedUser } = context;
    if (authenticatedUser) {
      setUser(authenticatedUser.user);
    } else {
      alert("You must sign in before creating a new course!");
      navigate("/signin", { state: { from: { location } } });
    }
  }, []);

  /**
   * Handles cancel button clicks,
   * preventing default behavior and redirecting to default route.
   * @param {event} e - input event
   */
  const cancelHandler = (e) => {
    e.preventDefault();
    navigate("/");
  };

  /**
   * Handles form submit,
   * prevents default behavior and calls createCourse function passed in through the context prop.
   * The req body is created along with user credentials that are passed in the the createCourse function as arguments.
   * If errors are returned they are displayed, else if course was created user is redirected to default route.
   * @param {event} e  - input event
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
      username: user.emailAddress,
      password: user.password,
    };
    context.actions
      .createCourse(body, credentials)
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);
        } else {
          navigate("/");
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
      {user ? (
        <main>
          <div className="wrap">
            <h2>Create Course</h2>
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

                  <p>
                    By {user.firstName} {user.lastName}
                  </p>

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
                Create Course
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
      ) : null}
    </>
  );
};

export default CreateCourse;
