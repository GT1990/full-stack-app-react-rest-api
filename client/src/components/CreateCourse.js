// CreateCourse - This component provides the "Create Course" screen by rendering a form that allows a user to create a new course. The component also renders a "Create Course" button that when clicked sends a POST request to the REST API's /api/courses route. This component also renders a "Cancel" button that returns the user to the default route (i.e. the list of courses).

import React from "react";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
  const navigate = useNavigate();
  const cancelHandler = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const user = {
    name: "Ahmad Ibrahim",
  };

  return (
    <main>
      <div class="wrap">
        <h2>Create Course</h2>
        <div class="validation--errors">
          <h3>Validation Errors</h3>
          <ul>
            <li>Please provide a value for "Title"</li>
            <li>Please provide a value for "Description"</li>
          </ul>
        </div>
        <form>
          <div class="main--flex">
            <div>
              <label for="courseTitle">Course Title</label>
              <input id="courseTitle" name="courseTitle" type="text" value="" />

              <p>By {user.name}</p>

              <label for="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
              ></textarea>
            </div>
            <div>
              <label for="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                value=""
              />

              <label for="materialsNeeded">Materials Needed</label>
              <textarea id="materialsNeeded" name="materialsNeeded"></textarea>
            </div>
          </div>
          <button class="button" type="submit">
            Create Course
          </button>
          <button class="button button-secondary" onClick={cancelHandler}>
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateCourse;
