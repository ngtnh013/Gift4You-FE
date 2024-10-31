import React from 'react';

const Footer = () => {
  return (
    <footer className="py-5 px-10 bg-white border-t border-gray-300">
      <div className="flex justify-between items-start flex-wrap pb-5 pr-40">
        {/* Left Section - Logo and Address */}
        <div className="flex-1 min-w-[300px] mr-2">
          <h2 className="text-2xl font-bold mb-11">Gift4U</h2>
          <p className="text-lg font-normal text-gray-600 mb-2">
            Placeholder address,<br />Vietnam
          </p>
        </div>

        {/* Middle Section - Links */}
        <div className="flex-1 min-w-[300px] mr-2">
          <h4 className="text-lg font-semibold text-gray-600 mb-12">Links</h4>
          <ul className="list-none p-0">
            <li className="mb-7"><a href="/" className="text-lg text-black hover:text-brown-700">Home</a></li>
            <li className="mb-7"><a href="/shop" className="text-lg text-black hover:text-brown-700">Shop</a></li>
            <li className="mb-7"><a href="/about" className="text-lg text-black hover:text-brown-700">About</a></li>
            <li className="mb-7"><a href="/contact" className="text-lg text-black hover:text-brown-700">Contact</a></li>
          </ul>
        </div>

        {/* Middle Section - Help */}
        <div className="flex-1 min-w-[300px] mr-2">
          <h4 className="text-lg font-semibold text-gray-600 mb-12">Help</h4>
          <ul className="list-none p-0">
            <li className="mb-7"><a href="/" className="text-lg text-black hover:text-brown-700">Payment Options</a></li>
            <li className="mb-7"><a href="/" className="text-lg text-black hover:text-brown-700">Returns</a></li>
            <li className="mb-7"><a href="/" className="text-lg text-black hover:text-brown-700">Privacy Policies</a></li>
          </ul>
        </div>

        {/* Right Section - Newsletter */}
        <div className="flex-1 min-w-[300px] mr-2">
          <h4 className="text-lg font-semibold text-gray-600 mb-12">Newsletter</h4>
          <div className="flex">
            <input type="email" placeholder="Enter Your Email Address" className="border border-gray-300 rounded-sm p-2 text-sm flex-1 h-9" />
            <button className="bg-black text-white border-none px-3 ml-2 rounded-sm h-9 hover:bg-brown-700">SUBSCRIBE</button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-300 pt-2">
        <p className="text-sm text-left pl-2">2023 Gift4U. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
