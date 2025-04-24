'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

interface NavLink {
  name: string;
  path: string;
}

interface User {
  name: string;
  image: string;
}

const Navbar = () => {
  const navLinks: NavLink[] = [
    { name: 'Home', path: '/' },
    { name: 'Hotels', path: '/Hotels' },
    { name: 'Experiences', path: '/experiences' },
    { name: 'About', path: '/about' },
  ];

  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [hasWhiteBg, setHasWhiteBg] = useState<boolean>(false);

  // Dummy auth data
  const isLoggedIn: boolean = false;
  const user: User = {
    name: 'John Doe',
    image: 'https://i.pravatar.cc/40',
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Check if current page has white background
    const checkBackground = () => {
      const bodyStyles = window.getComputedStyle(document.body);
      const bgColor = bodyStyles.backgroundColor;
      setHasWhiteBg(bgColor === 'rgb(255, 255, 255)' || bgColor === 'white');
    };

    window.addEventListener("scroll", handleScroll);
    checkBackground();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine text and background colors
  const getNavStyles = () => {
    // If page has white bg, always use dark text
    if (hasWhiteBg) {
      return {
        bg: 'bg-white shadow-md',
        text: 'text-gray-800',
        logoText: 'text-gray-800',
        underline: 'bg-gray-800',
        button: 'bg-black text-white',
        profileBorder: ''
      };
    }

    // Otherwise use scroll-dependent colors
    return isScrolled 
      ? {
          bg: 'bg-white/80 shadow-md backdrop-blur-lg',
          text: 'text-gray-700',
          logoText: 'text-gray-700',
          underline: 'bg-gray-700',
          button: 'bg-black text-white',
          profileBorder: ''
        }
      : {
          bg: 'bg-transparent',
          text: 'text-white',
          logoText: 'text-white',
          underline: 'bg-white',
          button: 'bg-white text-gray-800',
          profileBorder: 'border-2 border-white/30'
        };
  };

  const styles = getNavStyles();

  return (
    <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 py-4 md:py-6 ${styles.bg} ${styles.text}`}>
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image 
          src="/kenyan.png" 
          alt="Kenyan Flag" 
          width={52} 
          height={30} 
          className="rounded-sm"
        />
        <h1 className={`text-2xl font-bold ${styles.logoText}`}>Hotels254</h1>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link, i) => (
          <Link 
            key={i} 
            href={link.path} 
            className="group flex flex-col gap-0.5"
          >
            {link.name}
            <div className={`h-0.5 w-0 group-hover:w-full transition-all duration-300 ${styles.underline}`} />
          </Link>
        ))}
      </div>

      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-4 relative">
        <Link href="/search" className="h-6 w-6">
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </Link>

        {isLoggedIn ? (
          <div className="relative">
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Image 
                src={user.image} 
                alt="Profile" 
                width={40}
                height={40}
                className={`rounded-full ${styles.profileBorder}`}
              />
              <span>{user.name}</span>
            </div>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <Link href="/my-bookings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  My Bookings
                </Link>
                <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Edit Profile
                </Link>
                <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Settings
                </Link>
                <div className="border-t border-gray-100 my-1"></div>
                <Link href="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Logout
                </Link>
              </div>
            )}
          </div>
        ) : (
          <Link 
            href="/login" 
            className={`px-8 py-2.5 rounded-full transition-all duration-500 ${styles.button}`}
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-3 md:hidden">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="h-6 w-6 cursor-pointer"
          aria-label="Toggle menu"
        >
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu (always has dark text on white bg) */}
      <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 z-50 ${
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <button 
          className="absolute top-4 right-4" 
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {navLinks.map((link, i) => (
          <Link 
            key={i} 
            href={link.path} 
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-gray-600"
          >
            {link.name}
          </Link>
        ))}

        <Link 
          href="/new-launch" 
          className="border border-gray-300 px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all hover:bg-gray-100"
          onClick={() => setIsMenuOpen(false)}
        >
          New Launch
        </Link>

        {isLoggedIn ? (
          <>
            <div className="flex items-center gap-2 my-2">
              <Image 
                src={user.image} 
                alt="Profile" 
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
              <span>{user.name}</span>
            </div>
            <Link href="/my-bookings" className="text-gray-700 hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>
              My Bookings
            </Link>
            <Link href="/profile" className="text-gray-700 hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>
              Edit Profile
            </Link>
            <Link href="/settings" className="text-gray-700 hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>
              Settings
            </Link>
            <Link href="/logout" className="text-red-500 hover:text-red-600">
              Logout
            </Link>
          </>
        ) : (
          <Link 
            href="/login" 
            className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500 hover:bg-gray-800"
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;