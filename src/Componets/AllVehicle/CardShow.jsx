import React from "react";
import { FaUser, FaSuitcase } from "react-icons/fa";

const CardShow = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <div className="h-56 w-full overflow-hidden">
        <img
          src={data.coverImage}
          alt={data.vehicleName}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5 text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-1">
          {data.vehicleName}
        </h3>
        <p className="text-gray-500 mb-3">{data.category}</p>
        <div className="flex justify-center gap-4 text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <FaUser />
            <span>{data.userEmail}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaSuitcase />
            <span>{data.location}</span>
          </div>
        </div>
        <button className="w-full py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

export default CardShow;
