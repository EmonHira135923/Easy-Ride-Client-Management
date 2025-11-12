import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import heroImage from "../../assets/heroimage.avif";

const Banner = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Toggle theme
  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  // Load theme from localStorage and trigger animations
  useEffect(() => {
    const savedTheme = localStorage.getItem("homeTheme");
    if (savedTheme === "dark") setIsDarkMode(true);

    // Trigger entrance animations
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem("homeTheme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <section
      className={`min-h-screen relative overflow-hidden transition-all duration-700 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
      }`}
    >
      {/* Background Grid Pattern */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isDarkMode ? "opacity-20" : "opacity-40"
        }`}
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(100,100,100,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(100,100,100,0.1)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black_40%,transparent_100%)]"></div>
      </div>

      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute -top-48 -right-48 w-96 h-96 rounded-full transition-all duration-1000 ${
            isDarkMode
              ? "bg-gradient-to-br from-purple-900/30 via-transparent to-blue-900/20 blur-3xl"
              : "bg-gradient-to-br from-purple-100/50 via-transparent to-blue-100/40 blur-3xl"
          }`}
        ></div>
        <div
          className={`absolute -bottom-32 -left-32 w-80 h-80 rounded-full transition-all duration-1000 ${
            isDarkMode
              ? "bg-gradient-to-br from-blue-900/20 via-transparent to-cyan-900/10 blur-3xl"
              : "bg-gradient-to-br from-blue-100/30 via-transparent to-cyan-100/20 blur-3xl"
          }`}
        ></div>
        <div
          className={`absolute top-1/3 left-1/4 w-48 h-48 rounded-full transition-all duration-1000 ${
            isDarkMode
              ? "bg-gradient-to-br from-cyan-900/10 to-emerald-900/5 blur-2xl"
              : "bg-gradient-to-br from-cyan-100/20 to-emerald-100/10 blur-2xl"
          }`}
        ></div>
      </div>

      <div className="relative flex flex-col lg:flex-row items-center justify-between min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Left Content */}
        <div
          className={`lg:w-1/2 flex flex-col justify-center space-y-8 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Theme Toggle */}
          <div className="flex justify-start mb-4">
            <button
              onClick={toggleTheme}
              className={`group relative flex items-center space-x-3 px-6 py-3 rounded-2xl font-medium backdrop-blur-md border transition-all duration-500 ${
                isDarkMode
                  ? "bg-gray-800/80 border-gray-700 text-gray-200 shadow-lg shadow-black/20"
                  : "bg-white/80 border-gray-200 text-gray-700 shadow-lg shadow-gray-200/50"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full transition-all duration-500 flex items-center justify-center ${
                  isDarkMode
                    ? "bg-gradient-to-br from-amber-400 to-orange-400 shadow-lg shadow-amber-400/25"
                    : "bg-gradient-to-br from-gray-600 to-gray-700 shadow-lg shadow-gray-400/25"
                }`}
              >
                {isDarkMode ? (
                  <span className="text-xs">☀️</span>
                ) : (
                  <span className="text-xs">🌙</span>
                )}
              </div>
              <span className="font-semibold">
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </span>
            </button>
          </div>

          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
              <span
                className={`block transition-colors duration-500 ${
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                Explore Your
              </span>
              <span
                className={`block bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent transition-all duration-700 ${
                  isVisible
                    ? "translate-x-0 opacity-100"
                    : "translate-x-10 opacity-0"
                }`}
              >
                Next Journey
              </span>
            </h1>

            <p
              className={`text-xl lg:text-2xl leading-relaxed max-w-2xl transition-colors duration-500 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Discover premium vehicles and{" "}
              <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                seamless booking
              </span>{" "}
              for your perfect travel experience.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <NavLink
              to="/allvehicles"
              className={`group relative px-8 py-4 font-semibold rounded-2xl transition-all duration-500 backdrop-blur-sm ${
                isDarkMode
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-2xl shadow-purple-500/25"
                  : "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-2xl shadow-purple-500/30"
              }`}
            >
              Explore Vehicles
            </NavLink>

            <NavLink
              to="/add-vehicles"
              className={`group relative px-8 py-4 font-semibold rounded-2xl border transition-all duration-500 backdrop-blur-sm ${
                isDarkMode
                  ? "border-gray-600 text-gray-200 shadow-lg shadow-black/10"
                  : "border-gray-300 text-gray-700 shadow-lg shadow-gray-200/50"
              }`}
            >
              List Your Vehicle
            </NavLink>
          </div>

          {/* Stats */}
          <div
            className={`flex flex-wrap gap-8 pt-8 transition-colors duration-500 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {[
              { number: "500+", label: "Premium Vehicles" },
              { number: "50+", label: "Cities Worldwide" },
              { number: "24/7", label: "Customer Support" },
              { number: "4.9★", label: "Rated Service" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center transition-all duration-500 delay-${
                  index * 100
                } ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-sm font-medium mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div
          className={`lg:w-1/2 flex items-center justify-center mt-12 lg:mt-0 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative">
            <div className={`relative rounded-3xl overflow-hidden`}>
              <img
                src={heroImage}
                alt="Modern Vehicles"
                className="w-full h-[600px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
