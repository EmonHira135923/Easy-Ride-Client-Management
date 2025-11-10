import React from "react";
import { useNavigate } from "react-router";

const AllCarCard = ({ allcarcard }) => {
  const navigate = useNavigate();
  return (
    <div className="relative bg-gradient-to-br from-white via-indigo-50 to-purple-50 border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Image */}
      <div className="overflow-hidden h-48">
        <img
          src={allcarcard.coverImage}
          alt={allcarcard.vehicleName}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-5 space-y-2">
        <h2 className="text-lg font-bold text-gray-800">
          {allcarcard.vehicleName}
        </h2>
        <p className="text-sm text-gray-600 capitalize">
          {allcarcard.category}
        </p>
        <p className="text-gray-800 font-semibold">${allcarcard.pricePerDay}</p>
        <p className="text-sm text-gray-600">{allcarcard.location}</p>
        <p className="text-sm text-gray-500">{allcarcard.description}</p>
        <p className="text-sm text-gray-500">Owner: {allcarcard.userEmail}</p>
        <p
          className={`text-sm font-medium ${
            allcarcard.availability === "Available"
              ? "text-green-600"
              : "text-red-500"
          }`}
        >
          {allcarcard.availability}
        </p>

        <button
          onClick={() => navigate(`/detailspage/${allcarcard._id}`)}
          className="w-full mt-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-xl shadow-md hover:shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default AllCarCard;
