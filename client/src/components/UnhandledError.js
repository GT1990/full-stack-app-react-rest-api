import React from "react";

/**
 * Unhandled Error routes redirects here
 * @returns Error page
 */
const UnhandledError = () => {
  return (
    <main>
      <div className="wrap">
        <h2>Error</h2>
        <p>Sorry! We just encountered an unexpected error.</p>
      </div>
    </main>
  );
};
export default UnhandledError;
