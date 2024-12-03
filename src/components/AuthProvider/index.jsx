import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create Auth Context
const AuthContext = createContext();

// Provide Auth Context
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null); // Start with null, then initialize from localStorage
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAuth({ accessToken: token, userId: localStorage.getItem("userId") });
    }
  }, []); // Only run on the initial mount

  const login = (userData, navigate) => {
    console.log("User logged in:", userData);
    setAuth({ accessToken: userData.accessToken, userId: userData.id });
    localStorage.setItem("accessToken", userData.accessToken);
    localStorage.setItem("userId", userData.id);
    navigate("/shop");
  };

  const logout = (navigate) => {
    setAuth(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
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
