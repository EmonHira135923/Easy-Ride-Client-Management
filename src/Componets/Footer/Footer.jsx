import React from "react";
import { Facebook, Linkedin, Github, Mail } from "lucide-react";
import { NavLink } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-[#001931] text-white pt-8 md:pt-8 pb-8 md:pb-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Column 1: Brand & About */}
        <div className="flex flex-col">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-purple-400">
            TravelEase
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Smart vehicle booking and trip management platform. Explore, book,
            and manage vehicles seamlessly.
          </p>
          <p className="text-gray-500 text-xs sm:text-sm mt-4">
            © {new Date().getFullYear()} TravelEase — All rights reserved.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
            Quick Links
          </h3>
          <div className="flex flex-col gap-2 text-gray-400 text-sm sm:text-base">
            <NavLink to="/" className="hover:text-white hover:underline">
              Home
            </NavLink>
            <NavLink
              to="/vehicles"
              className="hover:text-white hover:underline"
            >
              All Vehicles
            </NavLink>
            <NavLink
              to="/addVehicle"
              className="hover:text-white hover:underline"
            >
              Add Vehicle
            </NavLink>
            <NavLink
              to="/myVehicles"
              className="hover:text-white hover:underline"
            >
              My Vehicles
            </NavLink>
            <NavLink
              to="/myBookings"
              className="hover:text-white hover:underline"
            >
              My Bookings
            </NavLink>
          </div>
        </div>

        {/* Column 3: Support */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
            Support
          </h3>
          <div className="flex flex-col gap-2 text-gray-400 text-sm sm:text-base">
            <NavLink to="/terms" className="hover:text-white hover:underline">
              Terms & Conditions
            </NavLink>
            <NavLink to="/privacy" className="hover:text-white hover:underline">
              Privacy Policy
            </NavLink>
            <NavLink to="/faq" className="hover:text-white hover:underline">
              FAQ
            </NavLink>
            <NavLink to="/support" className="hover:text-white hover:underline">
              Support Center
            </NavLink>
          </div>
        </div>

        {/* Column 4: Contact & Social */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
            Contact Us
          </h3>
          <p className="text-gray-400 text-sm sm:text-base">
            Phone: +8801817516654
          </p>
          <p className="text-gray-400 text-sm sm:text-base">
            Email: emonhossainhira231@gmail.com
          </p>
          <p className="text-gray-400 text-sm sm:text-base">
            Address: Dhaka, Bangladesh
          </p>

          <div className="mt-4 flex flex-wrap gap-4">
            <NavLink
              to="https://www.facebook.com/Emon1359"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="w-6 h-6 hover:text-purple-500 transition-colors duration-200" />
            </NavLink>
            <NavLink
              to="https://www.linkedin.com/in/emon135923"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="w-6 h-6 hover:text-purple-500 transition-colors duration-200" />
            </NavLink>
            <NavLink
              to="https://x.com/hira_bd"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="w-6 h-6 hover:text-purple-500 transition-colors duration-200"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M23.954 4.569a10 10 0 01-2.825.775 4.932 4.932 0 002.163-2.724 9.864 9.864 0 01-3.127 1.184 4.916 4.916 0 00-8.384 4.482A13.938 13.938 0 011.671 3.149a4.822 4.822 0 001.523 6.573 4.903 4.903 0 01-2.229-.616v.06a4.918 4.918 0 003.946 4.827 4.996 4.996 0 01-2.224.084 4.936 4.936 0 004.604 3.417 9.868 9.868 0 01-6.102 2.104c-.395 0-.788-.023-1.175-.069a13.945 13.945 0 007.557 2.212c9.054 0 14-7.496 14-13.986 0-.21 0-.423-.015-.633A9.936 9.936 0 0024 4.59z" />
              </svg>
            </NavLink>
            <NavLink
              to="https://github.com/EmonHira135923"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-6 h-6 hover:text-purple-500 transition-colors duration-200" />
            </NavLink>
            <NavLink to="mailto:emonhossainhira231@gmail.com">
              <Mail className="w-6 h-6 hover:text-purple-500 transition-colors duration-200" />
            </NavLink>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm sm:text-base">
        <p>© {new Date().getFullYear()} TravelEase. All rights reserved.</p>
        <p>Designed with ❤️ by Emon Hossain Hira for seamless travel booking</p>
      </div>
    </footer>
  );
};

export default Footer;
