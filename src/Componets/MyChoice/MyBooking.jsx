import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useSpring, animated } from "@react-spring/web";
import { AuthProvider } from "../../ContextProvider/Provider";
const MyBooking = () => {
  const { user } = use(AuthProvider);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const springProps = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
  });

  useEffect(() => {
    if (user?.email) {
      axios
        .get("https://easy-ride-server-side.vercel.app/bookings")
        .then((res) => {
          const userBookings = res.data.filter(
            (booking) => booking.userEmail === user.email
          );
          setBookings(userBookings);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user?.email]);

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">My Bookings</h1>
      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <animated.div style={springProps} key={booking._id}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-white shadow-lg rounded-xl p-6"
              >
                <h2 className="text-xl font-semibold mb-2">
                  {booking.vehicleName}
                </h2>
                <p className="text-gray-600 mb-1">
                  Booking Date: {format(new Date(booking.bookingDate), "PPP")}
                </p>
                <p className="text-gray-600 mb-1">
                  Price Per Day: ${booking.pricePerDay}
                </p>
                <p className="text-gray-600 mb-1">
                  Location: {booking.location}
                </p>
              </motion.div>
            </animated.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooking;
