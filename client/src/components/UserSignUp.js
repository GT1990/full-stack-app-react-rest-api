// UserSignUp - This component provides the "Sign Up" screen by rendering a form that allows a user to sign up by creating a new account. The component also renders a "Sign Up" button that when clicked sends a POST request to the REST API's /api/users route and signs in the user. This component also renders a "Cancel" button that returns the user to the default route (i.e. the list of courses).

import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

/**
 * UserSignUp component renders a sign up form allowing users to create a new account.
 * On submit a POST request is send to the REST API's /api/users route creating a new user,
 * then signing in the user. Lastly a cancel button is rendered returning to the default route.
 * @param {object} props - with context
 * @returns {JSX} sign up html form
 */
const UserSignUp = ({ context }) => {
  const [errors, setErrors] = useState([]); // state storing errors
  const [redirectTo, setredirectTo] = useState("/");
  // input refs
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailAddressRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate(); // for redirects
  const location = useLocation();
  useEffect(() => {
    if (location.state) {
      const from = location.state.from.location.pathname;
      setredirectTo(from); // sets redirect to page user came from
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
   * Handles form submit, preventing default behavior, creating and signin in user using the context functions passed in as props.
   * @param {event} e - form event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      emailAddress: emailAddressRef.current.value,
      password: passwordRef.current.value,
    };
    context.data
      .createUser(user)
      .then((errors) => {
        if (errors.length) {
          // errors found
          setErrors(errors);
        } else {
          // user created no errors, next sign in
          setErrors([]);
          firstNameRef.current.value = "";
          lastNameRef.current.value = "";
          emailAddressRef.current.value = "";
          passwordRef.current.value = "";
          console.log(`${user.emailAddress} has successfully signed up!`);
          context.actions
            .signIn(user.emailAddress, user.password)
            .then((response) => {
              if (response === null) {
                setErrors([
                  "Sorry there was error signing in. Please try again!",
                ]);
              } else {
                console.log(`${user.emailAddress} has successfully signed in!`);
                navigate(redirectTo);
              }
            })
            .catch((err) => {
              console.error(err);
              navigate("/error");
            });
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
      const errorsList = errors.map((error) => <li>{error}</li>);

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
    <main>
      <div className="form--centered">
        <h2>Sign Up</h2>
        {displayErrors()}
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            ref={firstNameRef}
            id="firstName"
            name="firstName"
            type="text"
          />
          <label htmlFor="lastName">Last Name</label>
          <input ref={lastNameRef} id="lastName" name="lastName" type="text" />
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
            Sign Up
          </button>
          <button className="button button-secondary" onClick={cancelHandler}>
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
