import React from 'react';
import { FaTrophy } from "react-icons/fa";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { FaTruck } from "react-icons/fa";
import { FaHeadset } from "react-icons/fa";
const FooterTopSection = () => {
  return (
    <div className="flex justify-around bg-amber-100 mt-5 pt-20 pb-20">
      <div className="flex items-center text-left">
        <FaTrophy className="text-amber-800 text-5xl mr-4"/>
        <div>
          <h4 className="text-amber-800 font-bold text-2xl">High Quality</h4>
          <p className="text-lg">crafted from top materials</p>
        </div>
      </div>

      <div className="flex items-center text-left">
        <IoShieldCheckmarkSharp className="text-amber-800 text-5xl mr-4"/>
        <div>
          <h4 className="text-amber-800 font-bold text-2xl">Warranty Protection</h4>
          <p className="text-lg">Over 2 years</p>
        </div>
      </div>

      <div className="flex items-center text-left">
        <FaTruck className="text-amber-800 text-5xl mr-4"/>
        <div>
          <h4 className="text-amber-800 font-bold text-2xl">Free Shipping</h4>
          <p className="text-lg">Order over 150 $</p>
        </div>
      </div>

      <div className="flex items-center text-left">
        <FaHeadset className="text-amber-800 text-5xl mr-4"/>
        <div>
          <h4 className="text-amber-800 font-bold text-2xl">24 / 7 Support</h4>
          <p className="text-lg">Dedicated support</p>
        </div>
      </div>
    </div>
  );
};

export default FooterTopSection;
