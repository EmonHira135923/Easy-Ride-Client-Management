import React from "react";
import { NavLink } from "react-router";

const Error404 = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-2">
      {/* Big 404 */}
      <h1 className="text-[10rem] md:text-[12rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600 animate-pulse">
        404
      </h1>

      {/* Optional Illustration */}
      <div className="mt-3 mb-3">
        <img
          src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
          alt="404 Illustration"
          className="w-full max-w-md mx-auto rounded-2xl"
        />
      </div>

      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-400 mt-4 mb-3">
        Oops! Page Not Found
      </h2>

      {/* Description */}
      <p className="text-gray-600 text-center max-w-md mb-6">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      {/* Go Home Button */}
      <NavLink
        to="/"
        className="px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition-colors"
      >
        Back to Home
      </NavLink>
    </div>
  );
};

export default Error404;
