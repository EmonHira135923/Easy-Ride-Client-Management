import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useSpring, animated } from "@react-spring/web";
import { AuthProvider } from "../../ContextProvider/Provider";
import { Spinner } from "../../ContextProvider/AuthContext";

const MyBooking = () => {
  const { user } = use(AuthProvider);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const springProps = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { duration: 300 },
  });

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(
          "https://easy-ride-server-side.vercel.app/bookings"
        );
        const userBookings = res.data.filter(
          (booking) => booking.userEmail === user.email
        );
        setBookings(userBookings);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
        setError("Failed to load bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user?.email]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto mt-10 px-4 flex justify-center items-center min-h-[60vh]">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto mt-10 px-4">
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-red-600 font-semibold mb-2">Error</p>
            <p className="text-gray-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 px-3 sm:px-4 md:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-gray-800">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No bookings found.</p>
          <p className="text-gray-400 mt-2">
            Start by booking your first vehicle!
          </p>
        </div>
      ) : (
        <animated.div style={springProps}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* ✅ Desktop Table */}
            <div className="hidden sm:block bg-white shadow-lg rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">
                        Vehicle
                      </th>
                      <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">
                        Booking Date
                      </th>
                      <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">
                        Price/Day
                      </th>
                      <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {bookings.map((booking, index) => (
                      <motion.tr
                        key={booking._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                              <span className="text-purple-600 font-semibold text-sm">
                                {booking.vehicleName?.charAt(0) || "V"}
                              </span>
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">
                                {booking.vehicleName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {booking.vehicleType || "Vehicle"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {format(new Date(booking.bookingDate), "PPP")}
                          </div>
                          <div className="text-sm text-gray-500">
                            {format(new Date(booking.bookingDate), "p")}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            ${booking.pricePerDay}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {booking.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              booking.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : booking.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : booking.status === "cancelled"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {booking.status || "confirmed"}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ✅ Mobile Card Layout */}
            <div className="sm:hidden space-y-4">
              {bookings.map((booking, index) => (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white shadow-md rounded-lg p-4 border border-gray-100"
                >
                  <div className="flex items-center mb-3">
                    <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 font-semibold text-sm">
                        {booking.vehicleName?.charAt(0) || "V"}
                      </span>
                    </div>
                    <div className="ml-3">
                      <h2 className="text-lg font-semibold text-gray-800">
                        {booking.vehicleName}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {booking.vehicleType || "Vehicle"}
                      </p>
                    </div>
                  </div>

                  <div className="text-sm text-gray-700 space-y-1">
                    <p>
                      <span className="font-semibold text-gray-800">
                        Booking Date:
                      </span>{" "}
                      {format(new Date(booking.bookingDate), "PPP")}{" "}
                      <span className="text-gray-500">
                        ({format(new Date(booking.bookingDate), "p")})
                      </span>
                    </p>
                    <p>
                      <span className="font-semibold text-gray-800">
                        Price/Day:
                      </span>{" "}
                      ${booking.pricePerDay}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-800">
                        Location:
                      </span>{" "}
                      {booking.location}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-800">
                        Status:
                      </span>{" "}
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : booking.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : booking.status === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {booking.status || "confirmed"}
                      </span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ✅ Summary Section */}
            <div className="mt-6 bg-white shadow-lg rounded-xl p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center sm:text-left">
                Booking Summary
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">
                    {bookings.length}
                  </p>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">
                    $
                    {bookings.reduce(
                      (total, booking) =>
                        total + (parseFloat(booking.pricePerDay) || 0),
                      0
                    )}
                  </p>
                  <p className="text-sm text-gray-600">Total Cost/Day</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">
                    {bookings.filter((b) => b.status === "confirmed").length}
                  </p>
                  <p className="text-sm text-gray-600">Confirmed</p>
                </div>
              </div>
            </div>
          </motion.div>
        </animated.div>
      )}
    </div>
  );
};

export default MyBooking;
