import React, { useState } from "react";
import { useForm } from "react-hook-form";
import LoginPageImage from "../../assets/LoginPageImage.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/AuthProvider";

function LoginPage() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [loading, setLoading] = useState(false); // Track loading state
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setLoading(true); // Set loading state to true before the API call

      const formData = {
        phoneNumber: data.phoneNumber.trim(),
        password: data.password.trim(),
      };


      // Use the login function from AuthProvider to store the user info
      login(formData, navigate); // Login and navigate to /shop
    } catch (error) {
      console.error("Error logging in:", error.response?.data || error.message);
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false); // Reset loading state after the request completes
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-12">
      <div className="col-span-7 relative">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${LoginPageImage})`,
          }}
        >
          <div className="absolute inset-0 bg-white opacity-20"></div>
        </div>
      </div>

      <div
        className="col-span-5 flex items-center justify-center"
        style={{
          backgroundColor: "#FFE1BB",
        }}
      >
        <div className="w-3/4 max-w-md">
          <h2 className="font-bold text-2xl text-left mb-2">Log in to Gift4You</h2>
          <h3 className="text-gray-600 text-left mb-6">Enter your details below</h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <input
                type="text"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/, // 10-digit phone number validation
                    message: "Invalid phone number",
                  },
                })}
                className="w-full px-4 py-2 border-b-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Phone Number"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
              )}
            </div>

            <div className="mb-6">
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full px-4 py-2 border-b-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full py-2 rounded-lg text-white transition-opacity hover:opacity-90 ${
                loading ? "bg-gray-500 cursor-not-allowed" : "bg-red-500"
              }`}
              disabled={loading} // Disable button while loading
            >
              {loading ? "Loading..." : "Log In"} {/* Show Loading text when loading */}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
