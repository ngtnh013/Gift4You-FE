import React, { useEffect, useState } from "react";
import NavItem from "./NavItem";
import { useLocation } from "react-router-dom";
import UserMenu from "./UserMenu";
import { useAuth } from "../AuthProvider";

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const { auth } = useAuth();

  const items = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Shop",
      path: "/shop",
    },
    {
      label: "About",
      path: "/about",
    },
    {
      label: "Contact",
      path: "/contact",
    },
  ];


  return (
    <nav className="grid grid-cols-12 p-4 items-center">
      <div className="col-span-3 flex justify-center">
        <h1 className="font-bold">Gift4You</h1>
      </div>
      <div className="col-span-6">
        <ul className="flex justify-center space-x-6">
          {items.map((item, index) => (
            <NavItem
              item={item}
              key={index}
              isActive={location.pathname === item.path}
            />
          ))}
        </ul>
      </div>
      <div className="col-span-3">
          <UserMenu isLoggedIn={!!auth}/>
      </div>
    </nav>
  );
}

export default NavBar;
