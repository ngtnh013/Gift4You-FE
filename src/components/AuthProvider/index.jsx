import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Create Auth Context
const AuthContext = createContext();

// Provide Auth Context
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("accessToken");
    return token ? { accessToken: token } : null;
  });

  const login = (userData, navigate) => {
    console.log("User logged in:", userData);
    setAuth(userData);
    localStorage.setItem("accessToken", userData.accessToken);
    navigate("/shop");
  };

  const logout = (navigate) => {
    setAuth(null);
    localStorage.removeItem("accessToken");
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
