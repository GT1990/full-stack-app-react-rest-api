import React from "react";
import { Link } from "react-router-dom";

/**
 * Header renders the page menu bar including signing up, signing in or
 * (if signed in with authenticated user) displays user's name and a sign out button.
 * User info is passed in through context by props.
 * @param {object} props - destructures context from props
 * @returns {JSX} renders the html for the page header
 */
const Header = ({ context }) => {
  let header; // stores nav portion of header dependent on signed in or out
  if (context.authenticatedUser) {
    // if user is signed in display user's name and sign out button
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
    // else if signed out display signup and signin buttons
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
