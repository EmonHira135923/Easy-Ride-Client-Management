import React, { useState, use } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthProvider } from "../../ContextProvider/Provider";
import Swal from "sweetalert2";

const RegInForm = () => {
  const { Createuser, Googlesign, UpdatedProfile, LogoutUser } =
    use(AuthProvider);
  const [error, SetError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleregform = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    SetError("");

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      SetError(
        "Password must be at least 6 characters and include uppercase and lowercase letters"
      );
      Swal.fire(
        "Error",
        "Password must include uppercase and lowercase letters",
        "error"
      );
      return;
    }

    Createuser(email, password)
      .then(async (result) => {
        try {
          await UpdatedProfile(name, photo);
          Swal.fire(
            "Success",
            "User Registered Successfully! Please log in.",
            "success"
          );

          // Log the user out to prevent auto-login
          if (LogoutUser) {
            await LogoutUser();
          }

          e.target.reset(); // Reset form
        } catch (profileError) {
          SetError(profileError.message);
          Swal.fire("Error", profileError.message, "error");
        }
      })
      .catch((error) => {
        SetError(error.message);
        Swal.fire("Error", error.message, "error");
      });
  };

  const handlegooglesign = () => {
    Googlesign()
      .then(() => {
        Swal.fire("Success", "Registration Successful!", "success");
        navigate("/"); // Google login naturally logs in
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-300 to-indigo-200 px-4 py-8">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6 md:p-8 flex flex-col">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-purple-600 mb-6">
          Register for TravelEase
        </h2>

        <form onSubmit={handleregform} className="space-y-4">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Photo URL */}
          <div>
            <label
              htmlFor="photo"
              className="block text-gray-700 font-medium mb-1"
            >
              Photo URL
            </label>
            <input
              type="text"
              id="photo"
              name="photo"
              placeholder="Enter your photo URL"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                autoComplete="new-password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁" : "🙈"}
              </span>
            </div>
            <p className="text-xs md:text-sm text-gray-400 mt-1">
              Password must be at least 6 characters, include uppercase and
              lowercase letters
            </p>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-2 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition-colors"
          >
            Register
          </button>
        </form>

        {/* OR Divider */}
        <div className="mt-4 flex items-center justify-center text-gray-400 text-sm">
          <span className="mx-2">or register with</span>
        </div>

        {/* Google Button */}
        <button
          onClick={handlegooglesign}
          className="mt-4 w-full flex items-center justify-center gap-2 border border-gray-500 py-2 bg-purple-400 rounded-lg hover:bg-purple-600 transition-colors text-white font-medium"
        >
          Google
        </button>

        {/* Login Link */}
        <p className="mt-4 text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <NavLink to="/login" className="text-purple-500 hover:underline">
            Login
          </NavLink>
        </p>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}
      </div>
    </div>
  );
};

export default RegInForm;
