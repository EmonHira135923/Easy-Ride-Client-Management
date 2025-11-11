import React, { useState } from "react";
import { NavLink } from "react-router";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Map of routes for Navbar
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Vehicles", path: "/allvehicles" },
    { name: "Add Vehicle", path: "/add-vehicles" },
    { name: "My Vehicles", path: "/my-vehicles" },
    { name: "My Bookings", path: "/my-booking" },
  ];

  const authLinks = [
    {
      name: "Login",
      path: "/login",
      style: "bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600",
    },
    {
      name: "Register",
      path: "/register",
      style:
        "border border-purple-500 px-4 py-2 rounded hover:bg-purple-500 hover:text-white",
    },
  ];

  return (
    <nav className="bg-white text-black px-6 py-4 shadow-md fixed w-full z-50">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl sm:text-3xl font-bold text-purple-400">
          TravelEase
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-purple-400 font-semibold"
                  : "hover:text-purple-400 transition-colors"
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Auth Buttons (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          {authLinks.map((link) => (
            <NavLink key={link.name} to={link.path} className={link.style}>
              {link.name}
            </NavLink>
          ))}
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
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className="block hover:text-purple-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
          {authLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={`${link.style} block`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
