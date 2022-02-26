// UserSignUp - This component provides the "Sign Up" screen by rendering a form that allows a user to sign up by creating a new account. The component also renders a "Sign Up" button that when clicked sends a POST request to the REST API's /api/users route and signs in the user. This component also renders a "Cancel" button that returns the user to the default route (i.e. the list of courses).

import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserSignUp = (props) => {
  // state
  const [errors, setErrors] = useState([]);

  // refs
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailAddressRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  const cancelHandler = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { context } = props;
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
          console.log("ERRORS THEN: ", errors);
          setErrors(errors);
        } else {
          setErrors([]);
          firstNameRef.current.value = "";
          lastNameRef.current.value = "";
          emailAddressRef.current.value = "";
          passwordRef.current.value = "";
          console.log(`${user.emailAddress} has successfully signed up!`);
          context.actions.signIn(user.emailAddress, user.password);
        }
      })
      .catch((err) => {
        console.error("USERSIGNUP.js: ", err);
        this.props.history.push("/error");
      });
  };

  // display any form validation errors
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
    return null;
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
