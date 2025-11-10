import React, { useState, useMemo } from "react";
import { useLoaderData } from "react-router";
import AllCarCard from "./AllCarCard";

const AllVehicles = () => {
  const allvehiclesdata = useLoaderData() || [];

  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  // Sorting logic
  const sortedVehicles = useMemo(() => {
    const sorted = [...allvehiclesdata];
    sorted.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];

      if (sortBy === "pricePerDay") {
        valA = Number(valA);
        valB = Number(valB);
      }
      if (sortBy === "createdAt") {
        valA = new Date(valA).getTime();
        valB = new Date(valB).getTime();
      }

      if (order === "asc") return valA > valB ? 1 : -1;
      else return valA < valB ? 1 : -1;
    });
    return sorted;
  }, [allvehiclesdata, sortBy, order]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-10">
          All Vehicles
        </h1>

        {/* Sort Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
          <div className="flex gap-3 items-center">
            <label className="font-semibold text-gray-700">Sort by:</label>
            <select
              className="border border-gray-300 bg-white shadow-sm px-4 py-2 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="createdAt">Added Date</option>
              <option value="pricePerDay">Price</option>
              <option value="vehicleName">Vehicle Name</option>
            </select>

            <select
              className="border border-gray-300 bg-white shadow-sm px-4 py-2 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sortedVehicles.map((allcarcard) => (
            <AllCarCard
              key={allcarcard._id}
              allcarcard={allcarcard}
            ></AllCarCard>
          ))}
        </div>

        {sortedVehicles.length === 0 && (
          <p className="text-center text-gray-500 mt-8 text-lg">
            No vehicles available right now
          </p>
        )}
      </div>
    </div>
  );
};

export default AllVehicles;
