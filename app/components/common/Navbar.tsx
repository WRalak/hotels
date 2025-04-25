'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

interface User {
  name: string;
  image?: string;
  role?: 'USER' | 'HOTEL_OWNER' | 'ADMIN';
}

interface NavLink {
  name: string;
  path: string;
  translationKey: string;
}

interface NavbarProps {
  user?: User | null;
  onLogout?: () => Promise<void>;
  currentLanguage?: string;
  onLanguageChange?: (locale: string) => void;
  translations: {
    home: string;
    hotels: string;
    regions: string;
    experiences: string;
    about: string;
    login: string;
    register: string;
    logout: string;
    dashboard: string;
    bookings: string;
    profile: string;
    settings: string;
    languageName: string;
    languageCode: string;
  };
}

export default function Navbar({
  user,
  onLogout,
  currentLanguage = 'en',
  onLanguageChange,
  translations
}: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [hasWhiteBg, setHasWhiteBg] = useState(false);

  const navLinks: NavLink[] = [
    { name: translations.home, path: '/', translationKey: 'home' },
    { name: translations.hotels, path: '/hotels', translationKey: 'hotels' },
    { name: translations.regions, path: '/regions', translationKey: 'regions' },
    { name: translations.experiences, path: '/experiences', translationKey: 'experiences' }
  ];

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
        button: 'bg-blue-600 text-white hover:bg-blue-700',
        profileBorder: ''
      };
    }

    // Otherwise use scroll-dependent colors
    return isScrolled 
      ? {
          bg: 'bg-white/90 shadow-md backdrop-blur-lg',
          text: 'text-gray-700',
          logoText: 'text-gray-700',
          underline: 'bg-gray-700',
          button: 'bg-blue-600 text-white hover:bg-blue-700',
          profileBorder: ''
        }
      : {
          bg: 'bg-transparent',
          text: 'text-white',
          logoText: 'text-white',
          underline: 'bg-white',
          button: 'bg-white text-gray-800 hover:bg-gray-100',
          profileBorder: 'border-2 border-white/30'
        };
  };

  const styles = getNavStyles();

  const handleLogout = async () => {
    if (onLogout) {
      await onLogout();
      router.push('/');
    }
    setUserMenuOpen(false);
  };

  const handleLanguageChange = () => {
    if (onLanguageChange) {
      const newLocale = translations.languageCode === 'en' ? 'sw' : 'en';
      onLanguageChange(newLocale);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${styles.bg} ${styles.text}`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/kenyan.png" 
              alt="Kenya Hotels Logo" 
              width={40} 
              height={24} 
              className="rounded-sm"
            />
            <h1 className={`text-xl font-bold ${styles.logoText}`}>Hotels254</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path} 
                className="group flex flex-col gap-0.5 font-medium"
                aria-current={pathname === link.path ? 'page' : undefined}
              >
                {link.name}
                <div 
                  className={`h-0.5 ${pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'} transition-all duration-300 ${styles.underline}`} 
                />
              </Link>
            ))}
            
            {/* Language Selector */}
            <button
              type="button"
              className="flex items-center font-medium"
              onClick={handleLanguageChange}
              aria-label={`Change language to ${translations.languageCode === 'en' ? 'Swahili' : 'English'}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>
              {translations.languageName}
            </button>
          </div>

          {/* Right side menu - Search & Login/User */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/search" className="h-6 w-6" aria-label="Search">
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </Link>
            
            {!user && (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className={`px-4 py-2 font-medium rounded-md ${styles.button}`}
                >
                  {translations.login}
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-blue-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-50 bg-white md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div className="pt-16 pb-6 px-4 h-full overflow-y-auto">
            <button
              className="absolute top-4 right-4"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              <button
                type="button"
                className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                onClick={handleLanguageChange}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  />
                </svg>
                {translations.languageName}
              </button>
              
              <Link
                href="/Search"
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="h-5 w-5 mr-2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                Search
              </Link>
              
              {!user && (
                <div className="border-t border-gray-200 my-2 pt-4 flex flex-col gap-3">
                  <Link
                    href="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700 text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {translations.login}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}