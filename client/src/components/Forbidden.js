import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
/**
 * Access denied redirects here
 * @returns Forbidden page
 */
const Forbidden = ({ context }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const from = location.state.from.location.pathname;
      context.actions.setLocationHistory(from);
    }
  }, []);

  return (
    <main>
      <div className="wrap">
        <h2>Forbidden</h2>
        <p>Oh oh! You can't access this page.</p>
      </div>
    </main>
  );
};
export default Forbidden;
