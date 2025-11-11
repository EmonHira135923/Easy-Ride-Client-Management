import React, { useState, useContext } from "react";
import { NavLink } from "react-router";
import { Menu, X, LogOut } from "lucide-react";
import { AuthProvider } from "../../ContextProvider/Provider";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, Signout } = useContext(AuthProvider);

  // Common links (always visible)
  const publicLinks = [
    { name: "Home", path: "/" },
    { name: "All Vehicles", path: "/allvehicles" },
  ];

  // Private links (only show when logged in)
  const privateLinks = [
    { name: "Add Vehicle", path: "/add-vehicles" },
    { name: "My Vehicles", path: "/my-vehicles" },
    { name: "My Bookings", path: "/my-booking" },
  ];

  return (
    <nav className="bg-white text-black px-6 py-4 shadow-md ">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl sm:text-3xl font-bold text-purple-500">
          TravelEase
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Public Links */}
          {publicLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-purple-500 font-semibold"
                  : "hover:text-purple-500 transition-colors"
              }
            >
              {link.name}
            </NavLink>
          ))}

          {/* Private Links (only when logged in) */}
          {user &&
            privateLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-purple-500 font-semibold"
                    : "hover:text-purple-500 transition-colors"
                }
              >
                {link.name}
              </NavLink>
            ))}
        </div>

        {/* Right Side — Auth Buttons or Profile */}
        <div className="hidden md:flex items-center space-x-4">
          {!user ? (
            <>
              <NavLink
                to="/login"
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="border border-purple-500 px-4 py-2 rounded hover:bg-purple-500 hover:text-white"
              >
                Register
              </NavLink>
            </>
          ) : (
            <div className="flex items-center gap-3 relative group">
              {/* User Image */}
              <img
                src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-purple-500 cursor-pointer"
              />

              {/* Hover Name */}
              <span className="absolute bottom-[-2.5rem] left-1/2 transform -translate-x-1/2 bg-black text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {user.displayName || "User"}
              </span>

              {/* Logout Button */}
              <button
                onClick={Signout}
                className="flex items-center gap-1 text-purple-600 font-semibold hover:text-purple-800"
              >
                <LogOut size={18} /> LogOut
              </button>
            </div>
          )}
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
        <div className="md:hidden bg-purple-50 px-6 py-4 space-y-3">
          {/* Public Links */}
          {publicLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className="block hover:text-purple-600"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}

          {/* Private Links (if logged in) */}
          {user &&
            privateLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className="block hover:text-purple-600"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}

          {/* Auth Section */}
          {!user ? (
            <>
              <NavLink
                to="/login"
                className="block bg-purple-500 text-white px-4 py-2 rounded text-center"
                onClick={() => setIsOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="block border border-purple-500 px-4 py-2 rounded text-center hover:bg-purple-500 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Register
              </NavLink>
            </>
          ) : (
            <div className="flex flex-col items-center gap-3 mt-3">
              <img
                src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                alt="User"
                className="w-14 h-14 rounded-full border-2 border-purple-500"
              />
              <p className="text-purple-600 font-semibold">
                {user.displayName || "User"}
              </p>
              <button
                onClick={() => {
                  Signout();
                  setIsOpen(false);
                }}
                className="bg-purple-500 text-white px-4 py-2 rounded w-full"
              >
                LogOut
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
