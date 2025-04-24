'use client';

import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/' },
    { name: 'Contact', path: '/' },
    { name: 'About', path: '/' },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Dummy auth data — replace with actual auth logic
  const isLoggedIn = true;
  const user = {
    name: 'John Doe',
    image: 'https://i.pravatar.cc/40',
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
      isScrolled 
          ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" 
          : "bg-transparent text-white py-4 md:py-6"
    }`}>
      {/* Logo */}
      <a href="/" className="flex items-center gap-2">
        <img 
          src={"https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyLogoWhite.svg"} 
          alt="logo" 
          className={`h-9 ${isScrolled ? "invert opacity-80" : ""}`} 
        />
      </a>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link, i) => (
          <a 
            key={i} 
            href={link.path} 
            className={`group flex flex-col gap-0.5 ${isScrolled ? "text-gray-700" : "text-white"}`}
          >
            {link.name}
            <div className={`${isScrolled ? "bg-gray-700" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
          </a>
        ))}
        <button className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${
          isScrolled ? 'text-black border-gray-300' : 'text-white border-white'
        } transition-all`}>
          New Launch
        </button>
      </div>

      {/* Desktop Right - Conditional based on login status */}
      <div className="hidden md:flex items-center gap-4 relative">
        {/* Search icon */}
        <svg className={`h-6 w-6 ${isScrolled ? "text-gray-700" : "text-white"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        {isLoggedIn ? (
          <div className="relative">
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img 
                src={user.image} 
                alt="Profile" 
                className={`w-10 h-10 rounded-full ${!isScrolled ? "border-2 border-white/30" : ""}`}
              />
              <span className={isScrolled ? "text-gray-700" : "text-white"}>
                {user.name}
              </span>
            </div>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <a href="/my-bookings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  My Bookings
                </a>
                <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Edit Profile
                </a>
                <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Settings
                </a>
                <div className="border-t border-gray-100 my-1"></div>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className={`px-8 py-2.5 rounded-full transition-all duration-500 ${
            isScrolled ? 'bg-black text-white' : 'bg-white text-gray-800'
          }`}>
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-3 md:hidden">
        <svg 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="h-6 w-6 cursor-pointer text-white" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          viewBox="0 0 24 24"
        >
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 z-50 ${
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {navLinks.map((link, i) => (
          <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
            {link.name}
          </a>
        ))}

        <button className="border border-gray-300 px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all">
          New Launch
        </button>

        {isLoggedIn ? (
          <>
            <div className="flex items-center gap-2 my-2">
              <img 
                src={user.image} 
                alt="Profile" 
                className="w-10 h-10 rounded-full"
              />
              <span>{user.name}</span>
            </div>
            <a href="/my-bookings" className="text-gray-700" onClick={() => setIsMenuOpen(false)}>
              My Bookings
            </a>
            <a href="/profile" className="text-gray-700" onClick={() => setIsMenuOpen(false)}>
              Edit Profile
            </a>
            <a href="/settings" className="text-gray-700" onClick={() => setIsMenuOpen(false)}>
              Settings
            </a>
            <button className="text-red-500">
              Logout
            </button>
          </>
        ) : (
          <button className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500">
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;