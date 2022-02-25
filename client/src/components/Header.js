// Header- Displays the top menu bar for the application and includes buttons for signing in and signing up (if there's not an authenticated user) or the user's name and a button for signing out (if there's an authenticated user).
import React from "react";

const Header = (props) => {
  return (
    <header>
      <div class="wrap header--flex">
        <h1 class="header--logo">
          <a href="index.html">Courses</a>
        </h1>
        <nav>
          {/* signed in */}
          {/* <ul class="header--signedin">
        <li>Welcome, Joe Smith!</li>
        <li>
          <a href="sign-out.html">Sign Out</a>
        </li>
      </ul> */}
          {/* signed out */}
          <ul class="header--signedout">
            <li>
              <a href="sign-up.html">Sign Up</a>
            </li>
            <li>
              <a href="sign-in.html">Sign In</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
