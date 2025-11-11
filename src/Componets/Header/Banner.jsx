import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import heroImage from "../../assets/heroimage.avif";

const Banner = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle theme
  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("homeTheme");
    if (savedTheme === "dark") setIsDarkMode(true);
  }, []);

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem("homeTheme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <section
      className={`flex flex-col md:flex-row h-screen relative transition-colors duration-500 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Left Side: Text + Buttons + Toggle */}
      <div className="md:w-1/2 flex flex-col justify-center items-center md:items-start px-6 md:px-16 text-center md:text-left relative">
        {/* Theme Toggle inside the section, top-left of text */}
        <button
          onClick={toggleTheme}
          className={`mb-6 mt-2 px-4 py-2 rounded-lg shadow-md transition-colors ${
            isDarkMode
              ? "bg-gray-800 text-white hover:bg-gray-700"
              : "bg-white text-gray-900 hover:bg-gray-100"
          }`}
        >
          {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        <h1
          className={`text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg transition-colors duration-500 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Explore Your{" "}
          <span className={isDarkMode ? "text-purple-300" : "text-purple-600"}>
            Next Journey
          </span>
        </h1>
        <p
          className={`text-lg md:text-2xl mb-10 drop-shadow-md transition-colors duration-500 ${
            isDarkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          Book vehicles{" "}
          <span className={isDarkMode ? "text-purple-300" : "text-blue-600"}>
            easily and manage your trips effortlessly.
          </span>
        </p>

        <div className="flex flex-wrap justify-center md:justify-start gap-4">
          <NavLink
            to="/allvehicles"
            className={`px-6 py-3 font-semibold rounded-lg transition-colors ${
              isDarkMode
                ? "bg-purple-700 text-white hover:bg-purple-600"
                : "bg-purple-500 text-white hover:bg-purple-600"
            }`}
          >
            All Vehicles
          </NavLink>
          <NavLink
            to="/add-vehicles"
            className={`px-6 py-3 border font-semibold rounded-lg transition-colors ${
              isDarkMode
                ? "border-purple-500 text-white hover:bg-purple-600"
                : "border-purple-400 text-black hover:bg-purple-500 hover:text-white"
            }`}
          >
            Add Vehicle
          </NavLink>
        </div>
      </div>

      {/* Right Side: Image */}
      <div className="md:w-1/2 h-80 md:h-full overflow-hidden relative mt-6 md:mt-0">
        <img
          src={heroImage}
          alt="Hero"
          className="w-full h-full object-cover transform transition-transform duration-1000 animate-heroMove"
        />
      </div>

      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes heroMove {
            0% { transform: scale(1) translateX(0); }
            50% { transform: scale(1.05) translateX(-10px); }
            100% { transform: scale(1) translateX(0); }
          }
          .animate-heroMove {
            animation: heroMove 10s ease-in-out infinite;
          }
        `}
      </style>
    </section>
  );
};

export default Banner;
