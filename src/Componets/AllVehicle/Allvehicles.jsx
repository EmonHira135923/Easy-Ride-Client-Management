import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import AllCarCard from "./AllCarCard";

const AllVehicles = () => {
  const allvehiclesdata = useLoaderData() || [];
  const [vehicles, setVehicles] = useState(allvehiclesdata);
  const [filteredVehicles, setFilteredVehicles] = useState(allvehiclesdata);
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    let filtered = [...vehicles];

    if (category)
      filtered = filtered.filter(
        (v) => v.category?.toLowerCase() === category.toLowerCase()
      );
    if (location)
      filtered = filtered.filter((v) =>
        v.location?.toLowerCase().includes(location.toLowerCase())
      );

    if (sortBy === "pricePerDay")
      filtered.sort((a, b) =>
        sortOrder === "asc"
          ? a.pricePerDay - b.pricePerDay
          : b.pricePerDay - a.pricePerDay
      );
    else if (sortBy === "createdAt")
      filtered.sort((a, b) =>
        sortOrder === "asc"
          ? new Date(a.createdAt) - new Date(b.createdAt)
          : new Date(b.createdAt) - new Date(a.createdAt)
      );
    else if (sortBy === "vehicleName")
      filtered.sort((a, b) =>
        sortOrder === "asc"
          ? a.vehicleName.localeCompare(b.vehicleName)
          : b.vehicleName.localeCompare(a.vehicleName)
      );

    setFilteredVehicles(filtered);
  }, [vehicles, category, location, sortBy, sortOrder]);

  const handleReset = () => {
    setCategory("");
    setLocation("");
    setSortBy("createdAt");
    setSortOrder("");
    setFilteredVehicles(allvehiclesdata);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-10">
          All Vehicles ({filteredVehicles.length})
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <label>Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border px-4 py-2 rounded"
            >
              <option value="">All Categories</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Electric">Electric</option>
              <option value="Van">Van</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <label>Location:</label>
            <input
              type="text"
              placeholder="Enter location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border px-4 py-2 rounded"
            />
          </div>
          <div className="flex items-center gap-3">
            <label>Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border px-4 py-2 rounded"
            >
              <option value="createdAt">Added Date</option>
              <option value="pricePerDay">Price</option>
              <option value="vehicleName">Vehicle Name</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border px-4 py-2 rounded"
            >
              <option value="">Select Order</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-purple-500 text-white rounded"
          >
            Reset
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.map((v) => (
            <AllCarCard key={v._id} allcarcard={v} />
          ))}
        </div>

        {filteredVehicles.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No vehicles found</p>
        )}
      </div>
    </div>
  );
};

export default AllVehicles;
