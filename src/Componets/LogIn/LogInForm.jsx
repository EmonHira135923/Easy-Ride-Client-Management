import React, { use, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthProvider } from "../../ContextProvider/Provider";
import Swal from "sweetalert2";

const LogInForm = () => {
  const navigate = useNavigate();
  const { Googlesign, UserSignIn } = use(AuthProvider);
  const [showPassword, setShowPassword] = useState(false);

  // Handle LogIn
  const handlesignin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    UserSignIn(email, password)
      .then((result) => {
        console.log(result);
        e.target.reset();
        navigate("/");
        Swal.fire("Account LogIn Successfully.");
      })
      .catch((error) => {
        console.log(error);
        Swal.fire("Login Failed", error.message, "error");
      });
  };

  // Google SignIn
  const handlegooglesign = () => {
    Googlesign()
      .then(() => {
        Swal.fire("Success", "Login Successful!", "success");
        navigate("/");
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-300 to-indigo-200 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 md:p-10 flex flex-col justify-center">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-purple-600 mb-6">
          Login to TravelEase
        </h2>

        {/* Login Form */}
        <form onSubmit={handlesignin} className="space-y-4 md:space-y-5">
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
              placeholder="Enter your email"
              name="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
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
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 select-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁" : "🙈"}
              </span>
            </div>
            <p className="text-xs md:text-sm text-gray-400 mt-1">
              Enter your password
            </p>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition-colors"
          >
            Login
          </button>
        </form>

        {/* OR Divider */}
        <div className="mt-4 flex items-center justify-center text-gray-400 text-sm md:text-base">
          <span className="mx-2">or login with</span>
        </div>

        {/* Google Button */}
        <button
          onClick={handlegooglesign}
          className="mt-4 w-full flex items-center justify-center gap-2 border border-gray-500 py-2 bg-purple-400 rounded-lg hover:bg-purple-600 transition-colors text-white font-medium"
        >
          Google SignIn
        </button>

        {/* Register Link */}
        <p className="mt-4 text-center text-gray-500 text-sm md:text-base">
          Don't have an account?{" "}
          <NavLink to="/register" className="text-purple-500 hover:underline">
            Register
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default LogInForm;
