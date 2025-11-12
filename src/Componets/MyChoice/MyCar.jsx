import React from "react";
import { useNavigate } from "react-router";
import { Eye, Edit, Trash2, MapPin, Tag, DollarSign } from "lucide-react";

const MyCar = ({ vehicle, handleDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-indigo-100">
      {/* Image Section */}
      <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden">
        <img
          src={vehicle.coverImage}
          alt={vehicle.vehicleName}
          className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-out"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Status Badge */}
        <div
          className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm border ${
            vehicle.availability === "Available"
              ? "bg-green-500/90 text-white border-green-400"
              : "bg-red-500/90 text-white border-red-400"
          }`}
        >
          {vehicle.availability}
        </div>

        {/* Price Tag */}
        <div className="absolute top-4 right-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-3 py-2 shadow-lg border border-white/50">
            <span className="text-lg font-bold text-indigo-600">
              ${vehicle.pricePerDay}
            </span>
            <span className="text-xs text-gray-500 block">/ day</span>
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-black/70 text-white px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm border border-white/20">
            {vehicle.category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 sm:p-6 space-y-4">
        {/* Header */}
        <div className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors duration-300">
            {vehicle.vehicleName}
          </h2>

          {/* Location and Category */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:space-x-4 space-y-2 sm:space-y-0">
            <div className="flex items-center text-gray-500 text-sm">
              <MapPin className="w-4 h-4 mr-2 text-indigo-500" />
              <span className="truncate">{vehicle.location}</span>
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <Tag className="w-4 h-4 mr-2 text-purple-500" />
              <span className="truncate">{vehicle.category}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed line-clamp-2 text-sm min-h-[40px]">
          {vehicle.description || "No description available for this vehicle."}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch justify-between gap-3 pt-4 border-t border-gray-100">
          {/* View Details Button */}
          <button
            onClick={() => navigate(`/detailspage/${vehicle._id}`)}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2.5 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Eye className="w-4 h-4" />
            <span>Details</span>
          </button>

          {/* Update Button */}
          <button
            onClick={() => navigate(`/update`, { state: { vehicle } })}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium py-2.5 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Edit className="w-4 h-4" />
            <span>Update</span>
          </button>

          {/* Delete Button */}
          <button
            onClick={() => handleDelete(vehicle._id)}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-2.5 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>

        {/* Additional Info */}
        <div className="flex flex-wrap items-center justify-between text-xs text-gray-500 mt-3">
          <div className="flex items-center space-x-1">
            <DollarSign className="w-3 h-3 text-green-500" />
            <span>${vehicle.pricePerDay}/day</span>
          </div>
          <div className="text-gray-400 mt-1 sm:mt-0">
            Added {new Date(vehicle.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-indigo-100 group-hover:shadow-2xl transition-all duration-300 pointer-events-none" />
    </div>
  );
};

export default MyCar;
