import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import RegisterPageImage from "../../assets/LoginPageImage.png";
import { useAuth } from "../../components/AuthProvider"; // Importing useAuth hook
import { useNavigate } from "react-router-dom"; // Importing navigate hook

function RegisterPage() {

  const API_URL = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false); // Track loading state
  const { login } = useAuth(); // Accessing login function from AuthProvider
  const navigate = useNavigate(); // To navigate user after successful login

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Watch password for confirmPassword validation
  const password = watch("password");

  // Submit handler
  const onSubmit = async (data) => {
    try {
      setLoading(true); // Set loading state to true before the API call

      // Add default role to the data
      const requestData = { ...data, userName: "hehe", role: "customer" };

      // Step 1: Register the user
      const registrationResponse = await axios.post(`${API_URL}/v1/accounts`, requestData);

      console.log("Registration Successful:", registrationResponse.data);

      const formData = {
        phoneNumber: data.phoneNumber.trim(),
        password: data.password.trim(),
      };



      // Step 4: Call login function from context and store the access token and userId
      login(formData, navigate);

      // Step 5: Redirect user to the homepage or any desired page
      navigate("/shop"); // Change this route as per your app's flow

    } catch (error) {
      console.error("Registration or Login failed:", error.response?.data || error.message);

      // Handle error (e.g., show an error message to the user)
      alert(error.response?.data?.message || "Registration or Login failed. Please try again.");
    } finally {
      setLoading(false); // Reset loading state after the request completes
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-12">
      {/* Left - Image */}
      <div className="col-span-7 relative">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${RegisterPageImage})`,
          }}
        >
          <div className="absolute inset-0 bg-white opacity-20"></div>
        </div>
      </div>

      {/* Right - Form */}
      <div
        className="col-span-5 flex items-center justify-center"
        style={{ backgroundColor: "#FFE1BB" }}
      >
        <div className="w-3/4 max-w-md">
          <h2 className="font-bold text-2xl text-left mb-2">Create an account</h2>
          <h3 className="text-gray-600 text-left mb-6">Enter your details below</h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name */}
            <div className="mb-4">
              <input
                type="text"
                {...register("fullName", {
                  required: "Full name is required",
                })}
                className="w-full px-4 py-2 border-b-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"
                placeholder="Full Name"
                style={{ backgroundColor: "#FFE1BB" }}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="mb-4">
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
                className="w-full px-4 py-2 border-b-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"
                placeholder="Email"
                style={{ backgroundColor: "#FFE1BB" }}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Gender */}
            <div className="mb-4">
              <select
                {...register("gender", {
                  required: "Gender is required",
                })}
                className="w-full px-4 py-2 border-b-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"
                style={{ backgroundColor: "#FFE1BB" }}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <input
                type="tel"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^0\d{9}$/,
                    message: "Invalid phone number",
                  },
                })}
                className="w-full px-4 py-2 border-b-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"
                placeholder="Phone Number (e.g., 0935217206)"
                style={{ backgroundColor: "#FFE1BB" }}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
              )}
            </div>


            {/* Password */}
            <div className="mb-4">
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full px-4 py-2 border-b-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"
                placeholder="Password"
                style={{ backgroundColor: "#FFE1BB" }}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="w-full px-4 py-2 border-b-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"
                placeholder="Confirm Password"
                style={{ backgroundColor: "#FFE1BB" }}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full py-2 rounded-lg text-white transition-opacity hover:opacity-90 ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-500'}`}
              disabled={loading}  // Disable button while loading
            >
              {loading ? "Loading..." : "Register"}  {/* Show Loading text */}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
