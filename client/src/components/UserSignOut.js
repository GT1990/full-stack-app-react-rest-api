import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * UserSignOut calls the signout function passed in by context prop.
 * The signout function in Context.js sets the authenticatedUser state to null,
 * add deletes the authenticatedUser cookie, finally redirecting to default route.
 * @param {object} props - destructuring context
 * @returns null - does NOT render anything, redirects to default route
 */
const SignOut = ({ context }) => {
  const navigate = useNavigate();
  useEffect(() => {
    context.actions.signOut();
    navigate("/");
  }, [context.actions, navigate]);

  return null;
};

export default SignOut;
