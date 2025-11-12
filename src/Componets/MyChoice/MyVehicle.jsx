import React, { useEffect, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  Plus,
  Search,
  TrendingUp,
  Calendar,
  DollarSign,
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

  // Fetch all vehicles of this user
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

  // Filter + Search + Sort
  useEffect(() => {
    let filtered = [...vehicles];

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

    if (filter !== "all") {
      filtered = filtered.filter((vehicle) => vehicle.availability === filter);
    }

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

  // Delete Function
  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Vehicle?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://easy-ride-server-side.vercel.app/allvehicles/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            setVehicles((prev) => prev.filter((v) => v._id !== id));
            Swal.fire("Deleted!", "Your vehicle was deleted.", "success");
          });
      }
    });
  };

  // Stats
  const stats = {
    total: vehicles.length,
    available: vehicles.filter((v) => v.availability === "Available").length,
    unavailable: vehicles.filter((v) => v.availability === "Not Available")
      .length,
    totalValue: vehicles.reduce(
      (sum, v) => sum + (parseInt(v.pricePerDay) || 0),
      0
    ),
  };

  if (loading) return <Spinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-6 sm:py-8 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            My Vehicles
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Manage your vehicle listings and track performance
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md text-center border">
            <p className="text-gray-500 text-sm">Total</p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
              {stats.total}
            </p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md text-center border">
            <p className="text-gray-500 text-sm">Available</p>
            <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-1">
              {stats.available}
            </p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md text-center border">
            <p className="text-gray-500 text-sm">Unavailable</p>
            <p className="text-2xl sm:text-3xl font-bold text-red-500 mt-1">
              {stats.unavailable}
            </p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md text-center border">
            <p className="text-gray-500 text-sm">Value</p>
            <p className="text-2xl sm:text-3xl font-bold text-indigo-600 mt-1">
              ${stats.totalValue}
            </p>
          </div>
        </div>

        {/* Search + Filter + Sort */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search Box */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search vehicle..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 sm:py-4 bg-white rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>

          {/* Dropdowns */}
          <div className="flex flex-wrap justify-between gap-3 sm:gap-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-3 sm:py-4 bg-white rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-sm"
            >
              <option value="all">All Vehicles</option>
              <option value="Available">Available</option>
              <option value="Not Available">Unavailable</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 sm:py-4 bg-white rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-sm"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name A–Z</option>
            </select>

            <NavLink
              to="/add-vehicles"
              className="px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Vehicle</span>
            </NavLink>
          </div>
        </div>

        {/* Vehicle Grid */}
        {filteredVehicles.length === 0 ? (
          <div className="text-center bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100">
            <Car className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-700">
              {vehicles.length === 0
                ? "No vehicles added yet"
                : "No vehicles found"}
            </h3>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              {vehicles.length === 0
                ? "Add your first vehicle to start earning."
                : "Try changing filters or search term."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
            <AnimatePresence>
              {filteredVehicles.map((vehicle, i) => (
                <motion.div
                  key={vehicle._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <MyCar vehicle={vehicle} handleDelete={handleDelete} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Footer Stats */}
        {filteredVehicles.length > 0 && (
          <p className="text-center text-gray-500 text-sm mt-6">
            Showing {filteredVehicles.length} of {vehicles.length} vehicles
          </p>
        )}
      </div>
    </div>
  );
};

export default MyVehicle;
