import React from "react";
import { NavLink } from "react-router";
import { motion } from "framer-motion";
import heroImage from "../../assets/heroimage.avif";
const Banner = () => {
  return (
    <section
      className="relative h-screen bg-cover bg-center flex items-center justify-center overflow-hidden"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-10 drop-shadow-lg">
          Explore Your <span className="text-purple-600">Next Journey</span>
        </h1>
        <p className="text-lg font-bold md:text-2xl text-blue-600 mb-10 drop-shadow-md">
          Book vehicles{" "}
          <span className="text-white">
            {" "}
            easily and manage your trips effortlessly.
          </span>
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 flex-wrap">
          <NavLink
            to="/vehicles"
            className="px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition-colors"
          >
            All Vehicles
          </NavLink>

          <NavLink
            to="/addVehicle"
            className="px-6 py-3 border border-purple-600 text-white font-semibold rounded-lg hover:bg-purple-600 hover:text-white transition-colors"
          >
            Add Vehicle
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default Banner;
