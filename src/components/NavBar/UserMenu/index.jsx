import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { GoHeart } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom"; 

function UserMenu({ isLoggedIn, onLogin, onLogout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/'); 
  };

  return (
    <div className="flex justify-center space-x-4">
      {isLoggedIn ? (
        <>
          <span 
            className="text-xl cursor-pointer relative" 
            onMouseEnter={toggleDropdown} 
            onMouseLeave={toggleDropdown}
          >
            <FaRegUser />
            {isDropdownOpen && (
              <div className="absolute bg-white text-black p-2 rounded shadow-md">
                <Link to="/profile" className="block">Profile</Link>
                <a href="#" className="block" onClick={handleLogout}>Logout</a>
              </div>
            )}
          </span>
          <Link to="/special-function" className="text-xl cursor-pointer">
            <GoHeart />   
          </Link>
          <Link to="/cart" className="text-xl cursor-pointer">
            <BsCart3 /> 
          </Link>
        </>
      ) :  (
        <>
          <Link to="/login" className="px-4 py-2 rounded-full bg-white text-black hover:border transition-colors">Login</Link>
          <Link to="/register" className="px-4 py-2 rounded-full bg-white text-black hover:border transition-colors">Register</Link>
        </>
      )}    
    </div>
  );
}

export default UserMenu;