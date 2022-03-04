import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

/**
 * If the user is authenticated child component is rendered.
 * Else redirects to /forbidden route
 * @param {object} props - destructures context from props
 * @returns {component} returns child component or redirects to /forbidden
 */
const PrivateRoute = ({ context }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const authenticated = context.authenticatedUser;
    if (!authenticated) {
      navigate("/signin", { state: { from: { location } } });
    } else {
      setLoading(false);
    }
  }, [context.authenticatedUser, location, navigate]);
  return <>{loading ? null : <Outlet />}</>;
};

export default PrivateRoute;
