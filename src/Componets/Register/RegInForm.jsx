import React, { use, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthProvider } from "../../ContextProvider/Provider";
import Swal from "sweetalert2";

const RegInForm = () => {
  const { Createuser, Googlesign, UpdatedProfile } = use(AuthProvider);
  const [error, SetError] = useState("");
  const [success, SetSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Handle RegForm
  const handleregform = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    SetSuccess(false);
    SetError("");

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      SetError(
        "Password must be at least 6 characters and include uppercase and lowercase letters"
      );
      return;
    }

    Createuser(email, password)
      .then((result) => {
        const user = result.user;
        SetSuccess(true);
        UpdatedProfile(name, photo)
          .then(() => {
            Swal.fire("Success", "User Registered Successfully!", "success");
            e.target.reset();
            navigate("/");
          })
          .catch((error) => {
            Swal.fire("Error", error.message, "error");
          });
        console.log(user);
      })
      .catch((error) => {
        SetError(error);
        Swal.fire("Email Already Use");
      });
  };

  // Handle GoogleSignIn
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
    <div className="p-25 flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-300 to-indigo-200">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">
          Register for TravelEase
        </h2>

        {/* Registration Form */}
        <form onSubmit={handleregform} className="space-y-5">
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
            <p className="text-sm text-gray-400 mt-1">
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
        <div className="mt-4 flex items-center justify-center text-gray-400">
          <span className="mx-2">or register with</span>
        </div>

        {/* Google Button */}
        <button
          onClick={handlegooglesign}
          className="mt-4 w-full flex items-center justify-center gap-2 border border-gray-500 py-2 bg-purple-400 rounded-lg hover:bg-purple-600 transition-colors"
        >
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
          Register with Google
        </button>

        {/* Login Link */}
        <p className="mt-4 text-center text-gray-500">
          Already have an account?{" "}
          <NavLink to="/login" className="text-purple-500 hover:underline">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default RegInForm;
