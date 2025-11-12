import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import AllCarCard from "./AllCarCard";
import { Spinner } from "../../ContextProvider/AuthContext";

const AllVehicles = () => {
  const allvehiclesdata = useLoaderData() || [];
  const [vehicles, setVehicles] = useState(allvehiclesdata);
  const [filteredVehicles, setFilteredVehicles] = useState(allvehiclesdata);
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setIsFiltering(true);

    const filterTimer = setTimeout(() => {
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
      setIsFiltering(false);
    }, 500);

    return () => clearTimeout(filterTimer);
  }, [vehicles, category, location, sortBy, sortOrder]);

  const handleReset = () => {
    setCategory("");
    setLocation("");
    setSortBy("createdAt");
    setSortOrder("");
    setIsFiltering(true);
    setTimeout(() => {
      setFilteredVehicles(allvehiclesdata);
      setIsFiltering(false);
    }, 300);
  };

  // Loading Skeleton
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-3xl shadow-lg overflow-hidden animate-pulse"
        >
          <div className="h-56 bg-gray-300"></div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between">
              <div className="h-6 bg-gray-300 rounded w-3/4"></div>
              <div className="h-8 bg-gray-300 rounded w-16"></div>
            </div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            <div className="h-12 bg-gray-300 rounded-xl"></div>
          </div>
        </div>
      ))}
    </div>
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Explore Our Fleet
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the perfect vehicle for your journey from our curated
            collection of premium rides
          </p>
          <div className="mt-2 text-lg font-semibold text-purple-600">
            {filteredVehicles.length}{" "}
            {filteredVehicles.length === 1 ? "Vehicle" : "Vehicles"} Available
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 mb-12 border border-white/50">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
              {/* Category Filter */}
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Vehicle Type
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                >
                  <option value="">All Categories</option>
                  <option value="SUV">SUV</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Electric">Electric</option>
                  <option value="Van">Van</option>
                  <option value="Sports">Sports</option>
                  <option value="Luxury">Luxury</option>
                </select>
              </div>

              {/* Location Filter */}
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search location..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm pl-10"
                  />
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
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
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-end">
              {/* Sort Options */}
              <div className="flex gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm min-w-40"
                  >
                    <option value="createdAt">Newest First</option>
                    <option value="pricePerDay">Price</option>
                    <option value="vehicleName">Name</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Order
                  </label>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm min-w-32"
                  >
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                  </select>
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Loading State for Filtering */}
        {isFiltering && (
          <div className="flex justify-center mb-8">
            <div className="bg-blue-500/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-blue-200">
              <div className="flex items-center space-x-3 text-blue-600">
                <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="font-semibold">Applying filters...</span>
              </div>
            </div>
          </div>
        )}

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.map((v) => (
            <AllCarCard key={v._id} allcarcard={v} />
          ))}
        </div>

        {/* Empty State */}
        {filteredVehicles.length === 0 && !isFiltering && (
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 max-w-md mx-auto border border-gray-200 shadow-lg">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-purple-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1m4 0h-4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                No Vehicles Found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or search criteria to find more
                options.
              </p>
              <button
                onClick={handleReset}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllVehicles;
