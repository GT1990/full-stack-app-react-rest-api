import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * Header renders the page menu bar including signing up, signing in or
 * (if signed in with authenticated user) displays user's name and a sign out button.
 * User info is passed in through context by props.
 * @param {object} props - destructures context from props
 * @returns {JSX} renders the html for the page header
 */
const Header = ({ context }) => {
  const location = useLocation();
  // state
  const [loading, setLoading] = useState(true);
  const [header, setHeader] = useState(); // stores nav portion of header dependent on signed in or out
  useEffect(() => {
    if (context.authenticatedUser) {
      // if user is signed in display user's name and sign out button
      const { firstName, lastName } = context.authenticatedUser.user;
      setHeader(
        <ul className="header--signedin">
          <li>
            Welcome, {firstName} {lastName}!
          </li>
          <li>
            <Link to="signout">Sign Out</Link>
          </li>
        </ul>
      );
      setLoading(false);
    } else {
      // else if signed out display signup and signin buttons
      setHeader(
        <ul className="header--signedout">
          <li>
            <Link to="/signup" state={{ from: { location } }}>
              Sign Up
            </Link>
          </li>
          <li>
            <Link to="signin" state={{ from: { location } }}>
              Sign In
            </Link>
          </li>
        </ul>
      );
      setLoading(false);
    }
  }, [context.authenticatedUser]);

  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/">Courses</Link>
        </h1>
        {loading ? null : <nav>{header}</nav>}
      </div>
    </header>
  );
};

export default Header;
