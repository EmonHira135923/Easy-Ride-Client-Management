import React, { useEffect, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  Plus,
  Filter,
  Search,
  TrendingUp,
  Calendar,
  MapPin,
  DollarSign,
  Users,
  Shield,
  AlertCircle,
} from "lucide-react";
import Swal from "sweetalert2";
import MyCar from "./MyCar";
import { AuthProvider } from "../../ContextProvider/Provider";
import { NavLink } from "react-router";
import { Spinner } from "../../ContextProvider/AuthContext";

const MyVehicle = () => {
  const { user } = useContext(AuthProvider);
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    setLoading(true);
    fetch("https://easy-ride-server-side.vercel.app/allvehicles")
      .then((res) => res.json())
      .then((data) => {
        const userVehicles = data.filter(
          (vehicle) => vehicle.userEmail === user?.email
        );
        setVehicles(userVehicles);
        setFilteredVehicles(userVehicles);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [user?.email]);

  // Filter and search vehicles
  useEffect(() => {
    let filtered = [...vehicles];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (vehicle) =>
          vehicle.vehicleName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          vehicle.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vehicle.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Availability filter
    if (filter !== "all") {
      filtered = filtered.filter((vehicle) => vehicle.availability === filter);
    }

    // Sorting
    if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "price-low") {
      filtered.sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.pricePerDay - a.pricePerDay);
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.vehicleName.localeCompare(b.vehicleName));
    }

    setFilteredVehicles(filtered);
  }, [vehicles, searchTerm, filter, sortBy]);

  // Delete function
  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Vehicle?",
      text: "This action cannot be undone. All associated bookings will be cancelled.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      background: "#fff",
      customClass: {
        title: "text-xl font-semibold text-gray-900",
        htmlContainer: "text-gray-600",
        confirmButton: "px-6 py-2 rounded-lg font-medium",
        cancelButton: "px-6 py-2 rounded-lg font-medium",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://easy-ride-server-side.vercel.app/allvehicles/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            setVehicles(vehicles.filter((vehicle) => vehicle._id !== id));
            Swal.fire({
              title: "Deleted!",
              text: "Your vehicle has been deleted successfully.",
              icon: "success",
              confirmButtonColor: "#10b981",
              background: "#fff",
              customClass: {
                title: "text-xl font-semibold text-gray-900",
                confirmButton: "px-6 py-2 rounded-lg font-medium",
              },
            });
          })
          .catch(() => {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete vehicle. Please try again.",
              icon: "error",
              confirmButtonColor: "#ef4444",
              background: "#fff",
              customClass: {
                title: "text-xl font-semibold text-gray-900",
                confirmButton: "px-6 py-2 rounded-lg font-medium",
              },
            });
          });
      }
    });
  };

  // Calculate stats
  const stats = {
    total: vehicles.length,
    available: vehicles.filter((v) => v.availability === "Available").length,
    unavailable: vehicles.filter((v) => v.availability === "Not Available")
      .length,
    totalValue: vehicles.reduce(
      (sum, vehicle) => sum + (parseInt(vehicle.pricePerDay) || 0),
      0
    ),
    categories: new Set(vehicles.map((v) => v.category)).size,
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            My Vehicles
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage your vehicle listings and track their performance
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Vehicles
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.total}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Car className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available</p>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  {stats.available}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unavailable</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">
                  {stats.unavailable}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Portfolio Value
                </p>
                <p className="text-3xl font-bold text-purple-600 mt-2">
                  ${stats.totalValue}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col lg:flex-row gap-4 mb-8"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search your vehicles by name, category, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
            />
          </div>

          <div className="flex gap-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-4 bg-white rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm appearance-none pr-10"
            >
              <option value="all">All Vehicles</option>
              <option value="Available">Available</option>
              <option value="Not Available">Unavailable</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-4 bg-white rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm appearance-none pr-10"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name A-Z</option>
            </select>

            <NavLink className="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Add Vehicle</span>
            </NavLink>
          </div>
        </motion.div>

        {/* Vehicles Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {filteredVehicles.length === 0 ? (
            <div className="text-center bg-white rounded-3xl p-12 shadow-sm border border-gray-100">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Car className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-3">
                {vehicles.length === 0
                  ? "No vehicles added yet"
                  : "No vehicles found"}
              </h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                {vehicles.length === 0
                  ? "Start by adding your first vehicle to the platform and begin earning from rentals."
                  : "Try adjusting your search or filter criteria to find what you're looking for."}
              </p>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                Add Your First Vehicle
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredVehicles.map((vehicle, index) => (
                  <motion.div
                    key={vehicle._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <MyCar vehicle={vehicle} handleDelete={handleDelete} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        {/* Footer Stats */}
        {filteredVehicles.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center text-gray-500 text-sm"
          >
            Showing {filteredVehicles.length} of {vehicles.length} vehicles
            {stats.categories > 0 && ` across ${stats.categories} categories`}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyVehicle;
