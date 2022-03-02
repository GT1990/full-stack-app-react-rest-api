import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";

// formats the description and materials needed sections
import ReactMarkdown from "react-markdown";

/**
 * CourseDetail renders the Course Details by getting the course details of the id
 * passed in as a param. Using the getCourse, passed in by context prop, a
 * GET request is called on the REST API's /api/courses/:id to get course info.
 * A Delete and Update buttons are rendered if the user is the creator of the course,
 * the Delete button sends a DELETE request to the /api/courses/:id to delete the course.
 * A third button that returns to the default route.
 * @param {object} props - destructuring context from props
 * @returns {JSX} rendering the course details page
 */
const CourseDetail = ({ context }) => {
  // url params
  const { id } = useParams();
  // state
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState();
  const [error, setError] = useState(null);
  const [ownsCourse, setownsCourse] = useState(false);
  // redirects
  const navigate = useNavigate();

  /**
   * On component mount useEffect runs once,
   * calling getCourse function to get course details.
   */
  useEffect(() => {
    context.actions
      .getCourse(id)
      .then((course) => {
        if (course) {
          setCourse(course);
          const courseUser = course.user.emailAddress;
          if (context.authenticatedUser) {
            const authenticatedUser =
              context.authenticatedUser.user.emailAddress;
            if (courseUser === authenticatedUser) {
              setownsCourse(true);
            }
          }
          setLoading(false);
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
   * handleDelete function runs when the delete button is clicked.
   * First the function confirms if user wants to delete the course.
   * Then the deleteCourse function, from context, passing the course id and
   * credentials to delete the course. IF successful redirects to default route,
   * else displays errors or redirects to /error route.
   */
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to DELETE: ${course.title}?`)) {
      const credentials = {
        username: context.authenticatedUser.user.emailAddress,
        password: context.authenticatedUser.user.password,
      };
      context.actions
        .deleteCourse(id, credentials)
        .then((error) => {
          if (error) {
            setError(error);
          } else {
            navigate("/");
          }
        })
        .catch((err) => {
          console.error(err);
          navigate("/error");
        });
    }
  };

  /**
   * displayErrors() takes errors state and returns jsx to display errors
   * @returns {JSX} html to display validation errors
   */
  const displayErrors = () => {
    if (error) {
      return (
        <div className="validation--errors">
          <h3>Deletion Error</h3>
          <ul>
            <li>{error}</li>
          </ul>
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
          <div className="actions--bar">
            <div className="wrap">
              {ownsCourse ? (
                <>
                  <Link className="button" to={`/courses/${id}/update`}>
                    Update Course
                  </Link>
                  <button className="button" onClick={handleDelete}>
                    Delete Course
                  </button>
                </>
              ) : null}
              <Link className="button button-secondary" to="/">
                Return to List
              </Link>
            </div>
          </div>

          <div className="wrap">
            <h2>Course Detail</h2>
            {displayErrors()}
            <form>
              <div className="main--flex">
                <div>
                  <h3 className="course--detail--title">Course</h3>
                  <h4 className="course--name">{course.title}</h4>
                  <p>
                    By {course.user.firstName} {course.user.lastName}
                  </p>

                  {<ReactMarkdown>{course.description}</ReactMarkdown>}
                </div>
                <div>
                  <h3 className="course--detail--title">Estimated Time</h3>
                  <p>{course.estimatedTime}</p>

                  <h3 className="course--detail--title">Materials Needed</h3>
                  <ul className="course--detail--list">
                    {<ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>}
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
