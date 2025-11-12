import React, { useState, useEffect, use } from "react";
import { useLocation } from "react-router";
import { AuthProvider } from "../../ContextProvider/Provider";
import Swal from "sweetalert2";
import { Spinner } from "../../ContextProvider/AuthContext";

const AddedCar = () => {
  const { user } = use(AuthProvider);
  const location = useLocation();

  const [vehicleData, setVehicleData] = useState({
    vehicleName: "",
    ownerName: "",
    category: "",
    pricePerDay: "",
    location: "",
    availability: "Available",
    description: "",
    coverImage: "",
    userEmail: user?.email || "",
  });

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  // Listen for route changes
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Handle image preview
  useEffect(() => {
    if (vehicleData.coverImage) {
      setImagePreview(vehicleData.coverImage);
    }
  }, [vehicleData.coverImage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData({ ...vehicleData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch("https://easy-ride-server-side.vercel.app/allvehicles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vehicleData),
    })
      .then((res) => res.json())
      .then(() => {
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Vehicle added successfully!",
          showConfirmButton: false,
          timer: 1500,
          background: "#1a1a1a",
          color: "#fff",
        });

        setVehicleData({
          vehicleName: "",
          ownerName: "",
          category: "",
          pricePerDay: "",
          location: "",
          availability: "Available",
          description: "",
          coverImage: "",
          userEmail: user?.email || "",
        });
        setImagePreview("");
      })
      .catch(() => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Failed to add vehicle",
          text: "Please try again",
          background: "#1a1a1a",
          color: "#fff",
        });
      });
  };

  if (loading) return <Spinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Add New Vehicle
          </h1>
          <p className="text-gray-600 text-lg">
            List your vehicle and start earning today
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Image Preview */}
            {imagePreview && (
              <div className="flex justify-center mb-6">
                <div className="relative w-48 h-32 rounded-2xl overflow-hidden border-2 border-gray-200">
                  <img
                    src={imagePreview}
                    alt="Vehicle preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Vehicle Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Vehicle Name *
                </label>
                <input
                  type="text"
                  name="vehicleName"
                  value={vehicleData.vehicleName}
                  onChange={handleChange}
                  placeholder="e.g., Toyota Camry 2023"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                  required
                />
              </div>

              {/* Owner Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Owner Name *
                </label>
                <input
                  type="text"
                  name="ownerName"
                  value={vehicleData.ownerName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Category *
                </label>
                <select
                  name="category"
                  value={vehicleData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white appearance-none cursor-pointer"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Sports">Sports</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>

              {/* Price Per Day */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Price Per Day ($) *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    name="pricePerDay"
                    value={vehicleData.pricePerDay}
                    onChange={handleChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full px-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    required
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={vehicleData.location}
                  onChange={handleChange}
                  placeholder="City, State"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                  required
                />
              </div>

              {/* Availability */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Availability
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="availability"
                      value="Available"
                      checked={vehicleData.availability === "Available"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">Available</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="availability"
                      value="Not Available"
                      checked={vehicleData.availability === "Not Available"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">Not Available</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Description *
              </label>
              <textarea
                name="description"
                value={vehicleData.description}
                onChange={handleChange}
                placeholder="Describe your vehicle features, condition, and any special notes..."
                rows="4"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white resize-none"
                required
              />
            </div>

            {/* Cover Image URL */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Cover Image URL
              </label>
              <input
                type="url"
                name="coverImage"
                value={vehicleData.coverImage}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
              />
            </div>

            {/* User Email (Read-only) */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Your Email
              </label>
              <input
                type="email"
                name="userEmail"
                value={vehicleData.userEmail}
                readOnly
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Adding Vehicle...</span>
                </div>
              ) : (
                "Add Vehicle to Listing"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddedCar;
