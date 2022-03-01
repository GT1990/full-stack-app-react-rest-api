import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "./Loading";
const PrivateRoute = ({ context }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  //   const authenticated = false;
  useEffect(() => {
    const authenticated = context.authenticatedUser;
    console.log("AUTH: ", authenticated);
    if (!authenticated) {
      navigate("/forbidden");
    } else {
      setLoading(false);
    }
  }, []);
  return <>{loading ? <Loading /> : <Outlet />}</>;
};

export default PrivateRoute;
