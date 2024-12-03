import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const AuthContext = createContext();

// Function to get cookie value by key
const getCookie = (name) => {
  return Cookies.get(name);
};

// Provide Auth Context
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null); // Track auth state
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  // Check if the user is authenticated on initial mount
  useEffect(() => {
    const accessToken = getCookie("accessToken");
    const userId = getCookie("userId");
    
    if (accessToken && userId) {
      setAuth({ accessToken, userId });
    }
  }, []);

  // Login function
  const login = async (data, navigate) => {
    try {
      const response = await axios.post(
        `${API_URL}/v1/auth/login`,
        {
          phoneNumber: data.phoneNumber.trim(),
          password: data.password.trim(),
        },
        { withCredentials: true } // Automatically manage cookies on the server-side
      );

      console.log("Log in success", response.data);
      

      const { accessToken, id } = response.data.data;

      // Store accessToken and userId in cookies
      Cookies.set("accessToken", accessToken, { expires: 7, secure: true, sameSite: "Strict" });
      Cookies.set("userId", id, { expires: 7, secure: true, sameSite: "Strict" });

      setAuth({ accessToken, userId: id });
      navigate("/shop"); // Redirect to shop or other protected route
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Login failed. Please check your credentials.");
    }
  };

  // Logout function
  const logout = (navigate) => {
    Cookies.remove("accessToken");
    Cookies.remove("userId");
    setAuth(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use Auth Context
export const useAuth = () => {
  return useContext(AuthContext);
};
