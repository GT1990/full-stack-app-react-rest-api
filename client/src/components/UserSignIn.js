import React, { useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

/**
 * UserSignIn renders a sign in form that allows user to sign in using an existing account.
 * Sign in button requests user info from the REST API /users route
 * using the GET method to authenticate user before signing in.
 * A cancel button takes you back to the default route.
 * @param {object} props - destructuring context from props
 * @returns {JSX} html for sign in form
 */
const UserSignIn = ({ context }) => {
  let redirectTo = "/"; // set redirect to home root by default

  // checks if user was redirected to signin page from another page, inorder to be redirected to that same page once signed in
  const location = useLocation();
  if (location.state) {
    const from = location.state.from.location.pathname;
    redirectTo = from; // sets redirect to page user came from
  }

  const [error, setError] = useState(null); // state to store sign in error
  const navigate = useNavigate(); // for redirects
  // refs
  const emailAddressRef = useRef();
  const passwordRef = useRef();

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
   * Handles form submit, preventing default behavior, signin in user using the context functions passed in as props.
   * @param {event} e - form event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = emailAddressRef.current.value;
    const password = passwordRef.current.value;
    context.actions
      .signIn(username, password)
      .then((user) => {
        if (user === null) {
          // error signing in
          emailAddressRef.current.value = "";
          passwordRef.current.value = "";
          setError("Sorry there was error signing in. Please try again!");
        } else {
          // successful sign in redirects to default route
          navigate(redirectTo);
        }
      })
      .catch((err) => {
        console.error(err);
        navigate("/error");
      });
  };

  /**
   * displayErrors() takes error state and returns jsx to display sign in error
   * @returns {JSX} html to display sign in error message
   */
  const displayErrors = () => {
    if (error) {
      return (
        <div className="validation--errors">
          <h3>Sign In Error</h3>
          <ul>
            <li>{error}</li>
          </ul>
        </div>
      );
    }
  };

  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>
        {displayErrors()}
        <form onSubmit={handleSubmit}>
          <label htmlFor="emailAddress">Email Address</label>
          <input
            ref={emailAddressRef}
            id="emailAddress"
            name="emailAddress"
            type="email"
          />
          <label htmlFor="password">Password</label>
          <input
            ref={passwordRef}
            id="password"
            name="password"
            type="password"
          />
          <button className="button" type="submit">
            Sign In
          </button>
          <button className="button button-secondary" onClick={cancelHandler}>
            Cancel
          </button>
        </form>
        <p>
          Don't have a user account? Click here to{" "}
          <Link to="/signup">sign up</Link>!
        </p>
      </div>
    </main>
  );
};

export default UserSignIn;
