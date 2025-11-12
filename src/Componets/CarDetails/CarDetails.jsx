import React, { useEffect, useState, useContext } from "react";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import { AuthProvider } from "../../ContextProvider/Provider";
import { Spinner } from "../../ContextProvider/AuthContext";

const CarDetails = () => {
  const detailsData = useLoaderData();
  const { user } = useContext(AuthProvider);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  // Mock additional images for gallery (you can replace with actual data)
  const carImages = [
    detailsData.coverImage,
    "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  ];

  // Mock features data
  const features = [
    "Air Conditioning",
    "Bluetooth",
    "GPS Navigation",
    "Leather Seats",
    "Sunroof",
    "Backup Camera",
    "Keyless Entry",
    "Premium Sound System",
    "Heated Seats",
    "Apple CarPlay",
    "Android Auto",
    "Cruise Control",
  ];

  const displayedFeatures = showAllFeatures ? features : features.slice(0, 6);

  useEffect(() => {
    if (detailsData) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [detailsData]);

  const handleBookNow = () => {
    if (!user) {
      return Swal.fire({
        icon: "error",
        title: "Login Required",
        text: "Please login to book a vehicle.",
        confirmButtonColor: "#6366f1",
        background: "#1a1a1a",
        color: "#fff",
      });
    }

    const bookingData = {
      ...detailsData,
      userEmail: user.email,
      bookingDate: new Date().toISOString(),
    };

    fetch("https://easy-ride-server-side.vercel.app/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Booked Successfully!",
          text: "Your booking request has been sent successfully.",
          confirmButtonColor: "#6366f1",
          confirmButtonText: "Great!",
          background: "#1a1a1a",
          color: "#fff",
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Booking Failed",
          text: "Something went wrong! Please try again.",
          confirmButtonColor: "#dc2626",
          background: "#1a1a1a",
          color: "#fff",
        });
      });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <span>Home</span>
          <span>›</span>
          <span>Vehicles</span>
          <span>›</span>
          <span className="text-indigo-600 font-medium">
            {detailsData.vehicleName}
          </span>
        </nav>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden bg-gray-100">
                <img
                  src={carImages[activeImage]}
                  alt={detailsData.vehicleName}
                  className="w-full h-96 object-cover transform transition-transform duration-500 hover:scale-105"
                />
                {/* Status Badge */}
                <div
                  className={`absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm border ${
                    detailsData.availability === "Available"
                      ? "bg-green-500/90 text-white border-green-400"
                      : "bg-red-500/90 text-white border-red-400"
                  }`}
                >
                  {detailsData.availability}
                </div>
                {/* Favorite Button */}
                <button className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/50 hover:scale-110 transition-all duration-300">
                  <svg
                    className="w-6 h-6 text-gray-400 hover:text-red-500 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-3">
                {carImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      activeImage === index
                        ? "border-indigo-500 ring-2 ring-indigo-200"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${detailsData.vehicleName} view ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {detailsData.vehicleName}
                </h1>
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-1 text-indigo-500"
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
                    </svg>
                    {detailsData.location}
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-1 text-purple-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Listed by {detailsData.ownerName}
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl font-bold text-indigo-600">
                      ${detailsData.pricePerDay}
                    </span>
                    <span className="text-gray-600 ml-2">/ day</span>
                  </div>
                  <div className="flex items-center text-yellow-500">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 font-semibold text-gray-700">
                      4.8
                    </span>
                    <span className="text-gray-500 text-sm ml-1">
                      (24 reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {detailsData.description}
                </p>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Features
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {displayedFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 text-gray-600"
                    >
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                {features.length > 6 && (
                  <button
                    onClick={() => setShowAllFeatures(!showAllFeatures)}
                    className="mt-3 text-indigo-600 hover:text-indigo-700 font-medium text-sm transition-colors"
                  >
                    {showAllFeatures
                      ? "Show Less"
                      : `Show ${features.length - 6} More Features`}
                  </button>
                )}
              </div>

              {/* Specifications */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-sm text-gray-500">Category</div>
                  <div className="font-semibold text-gray-900">
                    {detailsData.category}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-sm text-gray-500">Transmission</div>
                  <div className="font-semibold text-gray-900">Automatic</div>
                </div>
              </div>

              {/* Book Now Button */}
              <button
                onClick={handleBookNow}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Book This Vehicle</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
