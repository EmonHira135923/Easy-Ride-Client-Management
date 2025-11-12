import React, { use, useContext } from "react";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import { AuthProvider } from "../../ContextProvider/Provider";

const CarDetails = () => {
  const detailsData = useLoaderData();
  const { user } = use(AuthProvider);

  if (!detailsData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading car details...</p>
      </div>
    );
  }

  const handleBookNow = () => {
    if (!user) {
      return Swal.fire({
        icon: "error",
        title: "Login Required",
        text: "Please login to book a vehicle.",
        confirmButtonColor: "#d33",
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
          title: "Booked!",
          text: "Your booking request has been sent successfully.",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! Please try again.",
          confirmButtonColor: "#d33",
        });
      });
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={detailsData.coverImage || "/placeholder.jpg"}
          alt={detailsData.vehicleName}
          className="w-full md:w-1/2 h-80 object-cover rounded-xl"
        />

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {detailsData.vehicleName}
            </h1>
            <p className="text-gray-700 mb-4">{detailsData.description}</p>

            <p className="text-lg font-semibold mb-2">
              Category: {detailsData.category || "N/A"}
            </p>
            <p className="text-lg font-semibold mb-2">
              Location: {detailsData.location || "N/A"}
            </p>
            <p className="text-xl font-bold text-blue-600 mb-6">
              Price: ${detailsData.pricePerDay || "N/A"}/day
            </p>
          </div>

          <div>
            <button
              onClick={handleBookNow}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-all"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
