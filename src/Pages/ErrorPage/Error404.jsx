import React from "react";
import { NavLink } from "react-router";
import { Home, ArrowLeft, Search, MapPin } from "lucide-react";

const Error404 = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 px-4 py-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Large 404 Number */}
        <div className="relative">
          <h1 className="text-[10rem] md:text-[15rem] lg:text-[18rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-500 to-purple-600 leading-none tracking-tight">
            404
          </h1>
          <div className="absolute inset-0 text-[10rem] md:text-[15rem] lg:text-[18rem] font-black text-indigo-500/10 blur-2xl leading-none tracking-tight">
            404
          </div>
        </div>

        {/* Icon Illustration */}
        <div className="mt-6 mb-8 flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-indigo-500/50">
              <MapPin className="w-16 h-16 text-white animate-bounce" />
            </div>
            <div className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl">❓</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          Lost in Space
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-indigo-200 mb-3">
          Oops! This page has wandered off the map
        </p>

        {/* Description */}
        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable. Let's get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <NavLink
            to="/"
            className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/50 flex items-center gap-3"
          >
            <Home className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>Back to Home</span>
          </NavLink>

          <button
            onClick={() => window.history.back()}
            className="group px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-gray-400 text-sm mb-4">You might want to visit:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <NavLink
              to="/"
              className="text-indigo-300 hover:text-indigo-200 text-sm hover:underline transition-colors"
            >
              Home
            </NavLink>
            <span className="text-gray-600">•</span>
            <NavLink
              to="/allvehicles"
              className="text-indigo-300 hover:text-indigo-200 text-sm hover:underline transition-colors"
            >
              AllVehicle
            </NavLink>
          </div>
        </div>
      </div>

      {/* Floating Elements for Visual Interest */}
      <div className="absolute bottom-8 left-8 text-indigo-500/20 hidden lg:block">
        <Search className="w-24 h-24 animate-pulse" />
      </div>
      <div className="absolute top-8 right-8 text-blue-500/20 hidden lg:block">
        <MapPin className="w-20 h-20 animate-bounce" />
      </div>
    </div>
  );
};

export default Error404;
