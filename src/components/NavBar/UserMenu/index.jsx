import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom"; 
import { useAuth } from "../../AuthProvider";  // Use useAuth hook here

function UserMenu() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { auth, logout } = useAuth();  // Access auth and logout from context
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => setIsDropdownOpen(false);

  const handleLogout = () => {
    logout(navigate);
    navigate("/");  // Navigate to home page after logout
  };

  return (
    <div className="flex justify-center space-x-4">
      {auth?.accessToken ? (  // Check if the user is logged in
        <>
          {/* Dropdown menu */}
          <div className="relative">
            <span
              className="text-xl cursor-pointer flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 transition-colors"
              onClick={toggleDropdown}
            >
              <FaRegUser />
            </span>
            {isDropdownOpen && (
              <div className="absolute bg-white text-black p-2 rounded shadow-md right-0 mt-2">
                <Link
                  to="/profile"
                  className="block px-4 py-2 rounded hover:bg-gray-100 hover:text-blue-600 transition-colors"
                  onClick={closeDropdown}
                >
                  Profile
                </Link>
                <button
                  className="block w-full text-left px-4 py-2 rounded hover:bg-gray-100 hover:text-blue-600 transition-colors"
                  onClick={() => {
                    handleLogout();
                    closeDropdown();
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Cart icon */}
          <Link
            to="/view-my-order"
            className="text-xl cursor-pointer flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 transition-colors"
          >
            <BsCart3 />
          </Link>
        </>
      ) : (
        <>
          {/* Login/Register links */}
          <Link
            to="/login"
            className="px-4 py-2 rounded-full bg-white text-black hover:border hover:bg-gray-100 transition-colors"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 rounded-full bg-white text-black hover:border hover:bg-gray-100 transition-colors"
          >
            Register
          </Link>
        </>
      )}
    </div>
  );
}

export default UserMenu;
