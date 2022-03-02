import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

/**
 * If the user is authenticated child component is rendered.
 * Else redirects to /forbidden route
 * @param {object} props - destructures context from props
 * @returns {component} returns child component or redirects to /forbidden
 */
const PrivateRoute = ({ context }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const authenticated = context.authenticatedUser;
    if (!authenticated) {
      navigate("/forbidden");
    } else {
      setLoading(false);
    }
  }, []);
  return <>{loading ? null : <Outlet />}</>;
};

export default PrivateRoute;
