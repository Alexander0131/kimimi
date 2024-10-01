import React from 'react';
import logo from '../././public/logo.png'; 

const Navbar = () => {
  return (
    <nav className="bg-gray-200 h-22 mb-4 flex items-center sticky top-0 z-50 border-b-2 border-pink-500 px-4">
      <div className="flex items-center justify-center w-full">
        {/* Group logo and text together */}
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <img 
            src={logo} 
            alt="Company Logo" 
            className="h-14"  // Adjusted the logo size
          />

          {/* Text: Hidden on mobile, shown on desktop */}
          <h1 className="hidden md:block text-black font-bold text-xl md:text-2xl lg:text-2xl">
            KIMIMI FABRICS AND ACCESSORIES
          </h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
