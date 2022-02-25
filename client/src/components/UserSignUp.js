// UserSignUp - This component provides the "Sign Up" screen by rendering a form that allows a user to sign up by creating a new account. The component also renders a "Sign Up" button that when clicked sends a POST request to the REST API's /api/users route and signs in the user. This component also renders a "Cancel" button that returns the user to the default route (i.e. the list of courses).

import React from "react";
import { Link, useNavigate } from "react-router-dom";

const UserSignUp = () => {
  const navigate = useNavigate();

  const cancelHandler = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <main>
      <div class="form--centered">
        <h2>Sign Up</h2>
        <form>
          <label for="firstName">First Name</label>
          <input id="firstName" name="firstName" type="text" value="" />
          <label for="lastName">Last Name</label>
          <input id="lastName" name="lastName" type="text" value="" />
          <label for="emailAddress">Email Address</label>
          <input id="emailAddress" name="emailAddress" type="email" value="" />
          <label for="password">Password</label>
          <input id="password" name="password" type="password" value="" />
          <button class="button" type="submit">
            Sign Up
          </button>
          <button class="button button-secondary" onClick={cancelHandler}>
            Cancel
          </button>
        </form>
        <p>
          Already have a user account? Click here to{" "}
          <Link to="/signin">sign in</Link>!
        </p>
      </div>
    </main>
  );
};

export default UserSignUp;
