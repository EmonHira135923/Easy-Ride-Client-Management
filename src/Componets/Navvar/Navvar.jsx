import React, { useState, useContext } from "react";
import { NavLink } from "react-router";
import { Menu, X, LogOut, Car, BookOpen, Settings } from "lucide-react";
import { AuthProvider } from "../../ContextProvider/Provider";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, Signout } = useContext(AuthProvider);

  const publicLinks = [
    { name: "Home", path: "/", icon: <Car size={18} /> },
    {
      name: "All Vehicles",
      path: "/allvehicles",
      icon: <BookOpen size={18} />,
    },
  ];

  const privateLinks = [
    { name: "Add Vehicle", path: "/add-vehicles", icon: <Car size={18} /> },
    { name: "My Vehicles", path: "/my-vehicles", icon: <Settings size={18} /> },
    { name: "My Bookings", path: "/my-booking", icon: <BookOpen size={18} /> },
  ];

  const handleSignOut = () => {
    Signout();
    setIsOpen(false);
  };

  const gradientBtnClasses =
    "bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 px-6 py-2.5";

  const navLinkClasses = ({ isActive }) =>
    `flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
      isActive
        ? "bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-600 border border-purple-200 shadow-sm"
        : "text-gray-600 hover:text-purple-600 hover:bg-gray-50/80"
    }`;

  const mobileNavLinkClasses = ({ isActive }) =>
    `flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
      isActive
        ? "bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-600 border border-purple-200"
        : "text-gray-600 hover:text-purple-600 hover:bg-gray-50/80"
    }`;

  return (
    <nav className="bg-white/80 sticky top-0 z-50 shadow-sm border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink
            to="/"
            className="flex items-center space-x-3 group"
            onClick={() => setIsOpen(false)}
          >
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-xl shadow-lg">
              <Car className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              TravelEase
            </span>
          </NavLink>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1">
            {publicLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={navLinkClasses}
              >
                {link.icon}
                <span>{link.name}</span>
              </NavLink>
            ))}

            {user &&
              privateLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={navLinkClasses}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </NavLink>
              ))}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <>
                <NavLink to="/login" className={gradientBtnClasses}>
                  Sign In
                </NavLink>
                <NavLink to="/register" className={gradientBtnClasses}>
                  Sign Up
                </NavLink>
              </>
            ) : (
              <div className="flex items-center gap-4">
                {/* User Image with Hover Name */}
                <div className="relative group">
                  <img
                    src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                    alt="User"
                    className="w-10 h-10 rounded-xl border-2 border-purple-200 shadow-sm cursor-pointer"
                  />
                  {/* Hover Name Tooltip */}
                  <div className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                    {user.displayName || "User"}
                    <div className="absolute top-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-900 rotate-45"></div>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 text-red-600 font-medium hover:text-red-700 transition-colors duration-300"
                >
                  <LogOut size={18} />
                  <span>LogOut</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-gray-50/80 hover:bg-gray-100 transition-colors duration-300"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu Container */}
          <div className="fixed top-16 right-4 left-4 bg-white rounded-2xl shadow-xl border border-gray-200/50 z-50 p-4 space-y-2">
            {/* Public Links */}
            {publicLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={mobileNavLinkClasses}
                onClick={() => setIsOpen(false)}
              >
                {link.icon}
                <span>{link.name}</span>
              </NavLink>
            ))}

            {/* Private Links */}
            {user &&
              privateLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={mobileNavLinkClasses}
                  onClick={() => setIsOpen(false)}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </NavLink>
              ))}

            {/* Auth Section */}
            {!user ? (
              <div className="space-y-3 mt-4">
                <NavLink
                  to="/login"
                  className={
                    gradientBtnClasses + " block text-center px-4 py-3"
                  }
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/register"
                  className={
                    gradientBtnClasses + " block text-center px-4 py-3"
                  }
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </NavLink>
              </div>
            ) : (
              <div className="space-y-3 mt-4">
                {/* User Info */}
                <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-xl">
                  <img
                    src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                    alt="User"
                    className="w-12 h-12 rounded-xl border-2 border-purple-200"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {user.displayName || "Welcome Back"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleSignOut}
                  className="flex items-center justify-center space-x-2 w-full px-4 py-3 text-red-600 font-medium rounded-xl border border-red-200 hover:bg-red-50/80 transition-all duration-300"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
