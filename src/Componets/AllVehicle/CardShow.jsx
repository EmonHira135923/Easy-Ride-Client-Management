import React from "react";
import { NavLink } from "react-router";

const CardShow = ({ data }) => {
  return (
    <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
      <div className="relative h-56 overflow-hidden">
        <img
          src={data.coverImage}
          alt={data.vehicleName}
          className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
        />
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl font-bold text-gray-900 line-clamp-1">
            {data.vehicleName}
          </h2>
          <div className="flex flex-col items-end">
            <span className="text-2xl font-bold text-indigo-600">
              ${data.pricePerDay}
            </span>
            <span className="text-xs text-gray-500">per day</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">{data.description}</p>

        <NavLink
          to={`/detailspage/${data._id}`}
          className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg"
        >
          View Details
        </NavLink>
      </div>
    </div>
  );
};

export default CardShow;
