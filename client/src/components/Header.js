// Header- Displays the top menu bar for the application and includes buttons for signing in and signing up (if there's not an authenticated user) or the user's name and a button for signing out (if there's an authenticated user).
import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
  const { context } = props;
  console.log("AUTH: ", context.authenticatedUser);
  let header;
  if (context.authenticatedUser.user) {
    const { firstName, lastName } = context.authenticatedUser.user;
    header = (
      <ul className="header--signedin">
        <li>
          Welcome, {firstName} {lastName}!
        </li>
        <li>
          <Link to="signout">Sign Out</Link>
        </li>
      </ul>
    );
  } else {
    header = (
      <ul className="header--signedout">
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
        <li>
          <Link to="signin">Sign In</Link>
        </li>
      </ul>
    );
  }
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <a href="index.html">Courses</a>
        </h1>
        <nav>{header}</nav>
      </div>
    </header>
  );
};

export default Header;
