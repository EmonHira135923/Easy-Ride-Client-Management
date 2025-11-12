import React from "react";
import { NavLink } from "react-router";

const AllCarCard = ({ allcarcard }) => {
  return (
    <div className="group relative bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-indigo-100">
      {/* Image Section with Overlay */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={allcarcard.coverImage}
          alt={allcarcard.vehicleName}
          className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-out"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Status Badge */}
        <div
          className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm border ${
            allcarcard.availability === "Available"
              ? "bg-green-500/90 text-white border-green-400"
              : "bg-red-500/90 text-white border-red-400"
          }`}
        >
          {allcarcard.availability}
        </div>

        {/* Price Tag */}
        <div className="absolute top-4 right-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-3 py-2 shadow-lg border border-white/50">
            <span className="text-lg font-bold text-indigo-600">
              ${allcarcard.pricePerDay}
            </span>
            <span className="text-xs text-gray-500 block">/ day</span>
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-black/70 text-white px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm border border-white/20">
            {allcarcard.category}
          </span>
        </div>

        {/* Favorite Button */}
        <button className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/50 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-red-50">
          <svg
            className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Header with Vehicle Info */}
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h2 className="text-xl font-bold text-gray-900 line-clamp-1 flex-1 pr-2 group-hover:text-indigo-600 transition-colors duration-300">
              {allcarcard.vehicleName}
            </h2>
          </div>

          {/* Location and Owner */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center text-gray-500 text-sm">
              <svg
                className="w-4 h-4 mr-2 text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {allcarcard.location}
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <svg
                className="w-4 h-4 mr-2 text-purple-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Listed by {allcarcard.ownerName}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed line-clamp-2 text-sm min-h-[40px]">
          {allcarcard.description}
        </p>

        {/* Features/Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-4">
          <div className="flex items-center space-x-1">
            <svg
              className="w-4 h-4 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-semibold text-gray-700">4.8</span>
            <span className="text-gray-400">(24)</span>
          </div>

          {/* Additional Info */}
          <div className="flex items-center space-x-1 text-gray-400">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-xs">Just added</span>
          </div>
        </div>

        {/* CTA Button */}
        <NavLink
          to={`/detailspage/${allcarcard._id}`}
          className="w-full inline-flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:translate-y-[-2px] transition-all duration-300 group/btn"
        >
          <span>View Details</span>
          <svg
            className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </NavLink>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-indigo-100 group-hover:shadow-2xl transition-all duration-300 pointer-events-none" />
    </div>
  );
};

export default AllCarCard;
