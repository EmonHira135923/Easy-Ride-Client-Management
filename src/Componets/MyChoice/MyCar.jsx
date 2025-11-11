import React from "react";
import { useNavigate } from "react-router";

const MyCar = ({ vehicle, handleDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-8">
      <img
        src={vehicle.coverImage}
        alt={vehicle.vehicleName}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{vehicle.vehicleName}</h2>
        <p className="text-gray-600 mb-2">Category: {vehicle.category}</p>
        <p className="text-gray-600 mb-2">
          Price Per Day: ${vehicle.pricePerDay}
        </p>
        <p className="text-gray-600 mb-4">Location: {vehicle.location}</p>

        <div className="flex justify-between">
          <button
            onClick={() => navigate(`/detailspage/${vehicle._id}`)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg"
          >
            View Details
          </button>
          <button
            onClick={() => navigate(`/update`, { state: { vehicle } })}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg"
          >
            Update
          </button>
          <button
            onClick={() => handleDelete(vehicle._id)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCar;
