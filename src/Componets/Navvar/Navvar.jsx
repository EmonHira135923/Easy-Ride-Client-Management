import React, { useState } from "react";
import { NavLink } from "react-router";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#001931] text-white px-6 py-4 shadow-md fixed w-full z-50">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl sm:text-3xl font-bold text-purple-400">
          TravelEase
        </div>

        {/* Navigation Links (desktop) */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-purple-400 font-semibold"
                : "hover:text-purple-400 transition-colors"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/vehicles"
            className={({ isActive }) =>
              isActive
                ? "text-purple-400 font-semibold"
                : "hover:text-purple-400 transition-colors"
            }
          >
            All Vehicles
          </NavLink>
          <NavLink
            to="/addVehicle"
            className={({ isActive }) =>
              isActive
                ? "text-purple-400 font-semibold"
                : "hover:text-purple-400 transition-colors"
            }
          >
            Add Vehicle
          </NavLink>
          <NavLink
            to="/myVehicles"
            className={({ isActive }) =>
              isActive
                ? "text-purple-400 font-semibold"
                : "hover:text-purple-400 transition-colors"
            }
          >
            My Vehicles
          </NavLink>
          <NavLink
            to="/myBookings"
            className={({ isActive }) =>
              isActive
                ? "text-purple-400 font-semibold"
                : "hover:text-purple-400 transition-colors"
            }
          >
            My Bookings
          </NavLink>
        </div>

        {/* Auth Buttons (desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <NavLink
            to="/login"
            className="px-4 py-2 bg-purple-500 rounded hover:bg-purple-600 transition-colors"
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="px-4 py-2 border border-purple-500 rounded hover:bg-purple-500 hover:text-white transition-colors"
          >
            Register
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#001931] px-6 py-4 space-y-3">
          <NavLink
            to="/"
            className="block hover:text-purple-400 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/vehicles"
            className="block hover:text-purple-400 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            All Vehicles
          </NavLink>
          <NavLink
            to="/addVehicle"
            className="block hover:text-purple-400 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Add Vehicle
          </NavLink>
          <NavLink
            to="/myVehicles"
            className="block hover:text-purple-400 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            My Vehicles
          </NavLink>
          <NavLink
            to="/myBookings"
            className="block hover:text-purple-400 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            My Bookings
          </NavLink>
          <NavLink
            to="/login"
            className="block px-4 py-2 bg-purple-500 rounded hover:bg-purple-600 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="block px-4 py-2 border border-purple-500 rounded hover:bg-purple-500 hover:text-white transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Register
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
