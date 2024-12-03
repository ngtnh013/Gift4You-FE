import React from 'react';
import { FaEnvelope, FaPhoneAlt, FaComments } from 'react-icons/fa'; // Import the icons

const ContactInfo = () => {
  return (
    <div className="flex justify-center items-center bg-white">
      <div className="flex flex-col items-center justify-center w-full max-w-8xl p-24">
        <h1 className="text-4xl mb-6 text-gray-800 text-center font-bold">Contact Us</h1>
        <p className="text-xl mb-10 text-gray-600 text-center max-w-2xl">
          We would love to hear from you. Get in touch today!
        </p>
        <div className="flex justify-between gap-4 w-full">
          <div className="ml-4 mr-4 w-1/2 flex flex-col items-center text-center border border-gray-300 rounded-lg shadow-lg bg-gray-100 p-5 transition-transform transform hover:translate-y-1">
            <FaEnvelope className="text-blue-600 text-5xl mb-4" />
            <h2 className="text-2xl mb-2 text-gray-800">Email</h2>
            <p className="text-base mb-4 text-gray-700">
              Please feel free to reach out to us with any questions or inquiries. We are here to help!
            </p>
            <a href="mailto:contact@gift4u.com" className="text-blue-600 font-bold hover:text-blue-700">
              contact@gift4u.com
            </a>
          </div>
          <div className="ml-4 mr-4 w-1/2 flex flex-col items-center text-center border border-gray-300 rounded-lg shadow-lg bg-gray-100 p-5 transition-transform transform hover:translate-y-1">
            <FaPhoneAlt className="text-blue-600 text-5xl mb-4" />
            <h2 className="text-2xl mb-2 text-gray-800">Phone</h2>
            <p className="text-base mb-4 text-gray-700">
              Chat with our team for instant assistance.
            </p>
            <a href="tel:+1234567890" className="text-blue-600 font-bold hover:text-blue-700">
              +1 234 567 890
            </a>
          </div>
          <div className="ml-4 mr-4 w-1/2 flex flex-col items-center text-center border border-gray-300 rounded-lg shadow-lg bg-gray-100 p-5 transition-transform transform hover:translate-y-1">
            <FaComments className="text-blue-600 text-5xl mb-4" />
            <h2 className="text-2xl mb-2 text-gray-800">Messages</h2>
            <p className="text-base mb-4 text-gray-700">
              We are ready at all times to answer your questions about our service.
            </p>
            <a href="https://www.facebook.com/profile.php?id=61566621830610" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold hover:text-blue-700">
              facebook.com/gift4u
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
