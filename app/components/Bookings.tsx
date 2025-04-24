'use client'

import React, { useState, useRef, useEffect } from 'react';
import { FiMapPin, FiCalendar, FiUsers, FiSearch } from 'react-icons/fi';

// Kenya counties list
const kenyaCounties = [
  'Mombasa', 'Kwale', 'Kilifi', 'Tana River', 'Lamu', 'Taita Taveta', 
  'Garissa', 'Wajir', 'Mandera', 'Marsabit', 'Isiolo', 'Meru', 
  'Tharaka-Nithi', 'Embu', 'Kitui', 'Machakos', 'Makueni', 'Nyandarua', 
  'Nyeri', 'Kirinyaga', 'Murang\'a', 'Kiambu', 'Turkana', 'West Pokot', 
  'Samburu', 'Trans Nzoia', 'Uasin Gishu', 'Elgeyo-Marakwet', 'Nandi', 
  'Baringo', 'Laikipia', 'Nakuru', 'Narok', 'Kajiado', 'Kericho', 'Bomet', 
  'Kakamega', 'Vihiga', 'Bungoma', 'Busia', 'Siaya', 'Kisumu', 'Homa Bay', 
  'Migori', 'Kisii', 'Nyamira', 'Nairobi'
];

interface SearchBarProps {
  className?: string;
}

const TravelSearchBar: React.FC<SearchBarProps> = ({ className }) => {
  const [destination, setDestination] = useState<string>('');
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');
  const [guests, setGuests] = useState<number>(1);
  const [isDestinationOpen, setIsDestinationOpen] = useState<boolean>(false);
  const [minCheckOutDate, setMinCheckOutDate] = useState<string>('');
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    // Close dropdown when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDestinationOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Update minimum check-out date when check-in date changes
    if (checkIn) {
      // Set min check-out date to the check-in date
      setMinCheckOutDate(checkIn);
      
      // Reset check-out date if it's now invalid
      if (checkOut && new Date(checkOut) < new Date(checkIn)) {
        setCheckOut('');
      }
    } else {
      setMinCheckOutDate(today);
    }
  }, [checkIn]);

  const handleDestinationSelect = (county: string) => {
    setDestination(county);
    setIsDestinationOpen(false);
  };

  const handleSearch = () => {
    console.log({
      destination,
      checkIn,
      checkOut,
      guests
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-5">
      <div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md">
        {/* Destination */}
        <div className="relative w-full md:w-auto md:flex-1 px-4 py-3 border-b md:border-b-0 md:border-r border-gray-200" ref={dropdownRef}>
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => setIsDestinationOpen(!isDestinationOpen)}
          >
            <FiMapPin className="text-gray-500 mr-2" />
            <div className="w-full">
              <p className="text-sm text-gray-500">Destination</p>
              <p className="text-gray-700">{destination || 'Select location'}</p>
            </div>
          </div>
          
          {isDestinationOpen && (
            <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
              {kenyaCounties.map((county) => (
                <div 
                  key={county} 
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleDestinationSelect(county)}
                >
                  {county}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Check-in */}
        <div className="w-full md:w-auto md:flex-1 px-4 py-3 border-b md:border-b-0 md:border-r border-gray-200">
          <div className="flex items-center">
            <FiCalendar className="text-gray-500 mr-2" />
            <div className="w-full">
              <p className="text-sm text-gray-500">Check in</p>
              <input
                type="date"
                className="w-full bg-transparent border-none focus:outline-none text-gray-700 p-0"
                value={checkIn}
                min={today}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Check-out */}
        <div className="w-full md:w-auto md:flex-1 px-4 py-3 border-b md:border-b-0 md:border-r border-gray-200">
          <div className="flex items-center">
            <FiCalendar className="text-gray-500 mr-2" />
            <div className="w-full">
              <p className="text-sm text-gray-500">Check out</p>
              <input
                type="date"
                className="w-full bg-transparent border-none focus:outline-none text-gray-700 p-0"
                value={checkOut}
                min={checkIn || today}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Guests */}
        <div className="w-full md:w-auto md:flex-1 px-4 py-3 border-b md:border-b-0 md:border-r border-gray-200">
          <div className="flex items-center">
            <FiUsers className="text-gray-500 mr-2" />
            <div className="w-full">
              <p className="text-sm text-gray-500">Guests</p>
              <input
                type="number"
                min="1"
                className="w-full bg-transparent border-none focus:outline-none text-gray-700 p-0"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
              />
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="w-full md:w-auto p-3 md:p-0">
          <button
            className="w-full md:h-full md:px-6 py-3 bg-black text-white rounded-lg md:rounded-l-none md:rounded-r-lg cursor-pointer flex items-center justify-center"
            onClick={handleSearch}
          >
            <FiSearch className="mr-1" />
            <span>Search</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravelSearchBar;