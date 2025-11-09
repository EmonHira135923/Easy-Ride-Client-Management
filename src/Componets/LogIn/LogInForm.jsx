import React, { use } from "react";
import { NavLink } from "react-router";
import { AuthProvider } from "../../ContextProvider/Provider";

const LogInForm = () => {
  const { name } = use(AuthProvider);
  console.log(name);
  return (
    <div className="p-25 flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">
          Login to TravelEase
        </h2>

        {/* Login Form */}
        <form className="space-y-5">
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
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <div className="text-right mt-1">
              <NavLink
                to="/forgot-password"
                className="text-sm text-purple-500 hover:underline"
              >
                Forgot Password?
              </NavLink>
            </div>
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
        <div className="mt-4 flex items-center justify-center text-gray-400">
          <span className="mx-2">or login with</span>
        </div>

        {/* Google Button */}
        <button className="mt-4 w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition-colors">
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>

        {/* Register Link */}
        <p className="mt-4 text-center text-gray-500">
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
