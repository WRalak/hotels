'use client'
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { FaWifi, FaCoffee, FaConciergeBell, FaStar, FaFilter, FaTimes, FaMapMarkerAlt } from 'react-icons/fa';
import Link from 'next/link';

interface Hotel {
  id: number;
  name: string;
  location: string;
  county: string;
  stars: number;
  amenities: {
    wifi: boolean;
    breakfast: boolean;
    roomService: boolean;
  };
  price: number;
  imageUrl: string;
  beds: number;
}

const HotelRoomsPage: React.FC = () => {
  const [visibleHotels, setVisibleHotels] = useState(4);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedBeds, setSelectedBeds] = useState<number[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const hotels: Hotel[] = [
    {
      id: 1,
      name: "Sarova Stanley",
      location: "Nairobi CBD",
      county: "Nairobi County",
      stars: 5,
      amenities: { wifi: true, breakfast: true, roomService: true },
      price: 15000,
      imageUrl: "/bed.jpg",
      beds: 2
    },
    {
      id: 2,
      name: "Diani Reef Beach Resort",
      location: "Diani Beach",
      county: "Kwale County",
      stars: 4,
      amenities: { wifi: true, breakfast: true, roomService: false },
      price: 12000,
      imageUrl: "/bed1.jpg",
      beds: 1
    },
    {
      id: 3,
      name: "Lake Naivasha Sopa Resort",
      location: "Lake Naivasha",
      county: "Nakuru County",
      stars: 4,
      amenities: { wifi: true, breakfast: false, roomService: true },
      price: 9500,
      imageUrl: "/bed2.jpg",
      beds: 3
    },
    {
      id: 4,
      name: "Serena Mountain Lodge",
      location: "Mount Kenya",
      county: "Nyeri County",
      stars: 3,
      amenities: { wifi: true, breakfast: false, roomService: false },
      price: 8000,
      imageUrl: "/bed3.jpg",
      beds: 2
    },
    {
      id: 5,
      name: "Hemingways Watamu",
      location: "Watamu Beach",
      county: "Kilifi County",
      stars: 5,
      amenities: { wifi: true, breakfast: true, roomService: true },
      price: 18000,
      imageUrl: "/bed2.jpg",
      beds: 2
    },
    {
      id: 6,
      name: "Great Rift Valley Lodge",
      location: "Naivasha",
      county: "Nakuru County",
      stars: 4,
      amenities: { wifi: true, breakfast: true, roomService: false },
      price: 11000,
      imageUrl: "/bed3.jpg",
      beds: 1
    },
    {
      id: 7,
      name: "Amboseli Serena Safari Lodge",
      location: "Amboseli National Park",
      county: "Kajiado County",
      stars: 4,
      amenities: { wifi: true, breakfast: true, roomService: true },
      price: 14500,
      imageUrl: "/bed.jpg",
      beds: 2
    },
    {
      id: 8,
      name: "Tribe Hotel",
      location: "Gigiri",
      county: "Nairobi County",
      stars: 5,
      amenities: { wifi: true, breakfast: true, roomService: true },
      price: 16000,
      imageUrl: "/bed1.jpg",
      beds: 2
    },
    {
      id: 9,
      name: "Mara Serena Safari Lodge",
      location: "Maasai Mara",
      county: "Narok County",
      stars: 4,
      amenities: { wifi: true, breakfast: true, roomService: true },
      price: 25000,
      imageUrl: "/bed2.jpg",
      beds: 3
    },
    {
      id: 10,
      name: "Voyager Beach Resort",
      location: "Nyali",
      county: "Mombasa County",
      stars: 4,
      amenities: { wifi: true, breakfast: true, roomService: true },
      price: 10500,
      imageUrl: "/bed3.jpg",
      beds: 2
    }
  ];

  // Extract unique locations for filtering
  const uniqueLocations = Array.from(new Set(hotels.map(hotel => hotel.location)));

  // Define price ranges for checkboxes
  const priceRanges = [
    { id: 'price-0-10000', label: 'Under KSh 10,000', min: 0, max: 10000 },
    { id: 'price-10000-15000', label: 'KSh 10,000 - 15,000', min: 10000, max: 15000 },
    { id: 'price-15000-20000', label: 'KSh 15,000 - 20,000', min: 15000, max: 20000 },
    { id: 'price-20000-plus', label: 'Above KSh 20,000', min: 20000, max: 100000 }
  ];

  const handleBedFilterChange = (beds: number) => {
    setSelectedBeds(prevSelectedBeds => 
      prevSelectedBeds.includes(beds)
        ? prevSelectedBeds.filter(b => b !== beds)
        : [...prevSelectedBeds, beds]
    );
  };

  const handleLocationFilterChange = (location: string) => {
    setSelectedLocations(prevSelectedLocations => 
      prevSelectedLocations.includes(location)
        ? prevSelectedLocations.filter(loc => loc !== location)
        : [...prevSelectedLocations, location]
    );
  };

  const handlePriceRangeChange = (rangeId: string) => {
    setSelectedPriceRanges(prevSelectedPriceRanges => 
      prevSelectedPriceRanges.includes(rangeId)
        ? prevSelectedPriceRanges.filter(id => id !== rangeId)
        : [...prevSelectedPriceRanges, rangeId]
    );
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const filteredHotels = hotels.filter(hotel => {
    // Filter by beds
    if (selectedBeds.length > 0 && !selectedBeds.includes(hotel.beds)) {
      return false;
    }
    
    // Filter by locations
    if (selectedLocations.length > 0 && !selectedLocations.includes(hotel.location)) {
      return false;
    }
    
    // Filter by price ranges
    if (selectedPriceRanges.length > 0) {
      const matchesAnyPriceRange = selectedPriceRanges.some(rangeId => {
        const range = priceRanges.find(r => r.id === rangeId);
        return range && hotel.price >= range.min && hotel.price <= range.max;
      });
      
      if (!matchesAnyPriceRange) {
        return false;
      }
    }
    
    return true;
  });

  const displayedHotels = filteredHotels.slice(0, visibleHotels);
  
  const showMoreHotels = () => {
    setVisibleHotels(prev => prev + 2);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 lg:px-32">
      <Head>
        <title>Kenyan Hotel Rooms | Special Offers</title>
        <meta name="description" content="Browse our Kenyan hotel rooms and special offers" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Hotel Rooms</h1>
        <p className="text-gray-600 mb-8">
          Take advantage of our limited-time offers and special packages to enhance <br /> your stay and create unforgettable memories across Kenya.
        </p>

        {/* Mobile Filter Toggle Button */}
        <div className="md:hidden mb-4">
          <button 
            onClick={toggleFilters}
            className="w-full flex items-center justify-center py-3 bg-blue-600 text-white rounded-md"
          >
            {showFilters ? (
              <>
                <FaTimes className="mr-2" /> Hide Filters
              </>
            ) : (
              <>
                <FaFilter className="mr-2" /> Show Filters
              </>
            )}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Hotel Listings (Left on desktop, top on mobile) */}
          <div className="w-full md:w-2/3 lg:w-3/4 order-2 md:order-1">
            <div className="space-y-6">
              {displayedHotels.length > 0 ? (
                displayedHotels.map((hotel) => (
                  <div key={hotel.id} className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-1/2 relative">
                        <Link href={`/product/${hotel.id}`}>
                          <Image
                            src={hotel.imageUrl}
                            alt={hotel.name}
                            width={412}
                            height={260}
                            className="w-full h-auto object-cover cursor-pointer"
                          />
                        </Link>
                      </div>
                      <div className="w-full md:w-1/2 p-6">
                        <div className="mb-2">
                          <p className="text-gray-600">{hotel.location}, {hotel.county}</p>
                          <h3 className="text-xl font-bold">{hotel.name}</h3>
                          <div className="flex items-center mt-1">
                            {Array.from({ length: hotel.stars }).map((_, i) => (
                              <FaStar key={i} className="text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex space-x-4 my-3">
                          {hotel.amenities.wifi && (
                            <div className="flex items-center">
                              <FaWifi className="text-gray-800 mr-1" />
                              <span className="text-sm">Free WiFi</span>
                            </div>
                          )}
                          {hotel.amenities.breakfast && (
                            <div className="flex items-center">
                              <FaCoffee className="text-gray-800 mr-1" />
                              <span className="text-sm">Breakfast</span>
                            </div>
                          )}
                          {hotel.amenities.roomService && (
                            <div className="flex items-center">
                              <FaConciergeBell className="text-gray-800 mr-1" />
                              <span className="text-sm">Room Service</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-4">
                          <p className="text-sm font-bold text-gray-800">KSh {hotel.price.toLocaleString()}<span className="text-sm text-gray-600">/night</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center p-8 bg-white rounded-lg shadow">
                  <p className="text-gray-600">No hotels match your filters. Please adjust your criteria.</p>
                </div>
              )}
            </div>

            {filteredHotels.length > visibleHotels && (
              <div className="mt-8 text-center">
                <button 
                  onClick={showMoreHotels}
                  className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
                >
                  Show More
                </button>
              </div>
            )}
          </div>

          {/* Filter Panel (Right on desktop, togglable on mobile) */}
          <div className={`w-full md:w-1/3 lg:w-1/4 order-1 md:order-2 ${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Filter Rooms</h2>
                <button 
                  onClick={toggleFilters} 
                  className="md:hidden text-gray-500"
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Number of Beds</h3>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map(bedNumber => (
                    <div key={bedNumber} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`bed-${bedNumber}`}
                        checked={selectedBeds.includes(bedNumber)}
                        onChange={() => handleBedFilterChange(bedNumber)}
                        className="mr-2"
                      />
                      <label htmlFor={`bed-${bedNumber}`}>
                        {bedNumber} {bedNumber === 1 ? 'Bed' : 'Beds'}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Price Range (KSh)</h3>
                <div className="space-y-2">
                  {priceRanges.map(range => (
                    <div key={range.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={range.id}
                        checked={selectedPriceRanges.includes(range.id)}
                        onChange={() => handlePriceRangeChange(range.id)}
                        className="mr-2"
                      />
                      <label htmlFor={range.id}>{range.label}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Locations</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {uniqueLocations.map(location => (
                    <div key={location} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`location-${location.replace(/\s+/g, '-').toLowerCase()}`}
                        checked={selectedLocations.includes(location)}
                        onChange={() => handleLocationFilterChange(location)}
                        className="mr-2"
                      />
                      <label htmlFor={`location-${location.replace(/\s+/g, '-').toLowerCase()}`} className="flex items-center">
                        <FaMapMarkerAlt className="mr-1 text-gray-500" /> {location}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 md:hidden">
                <button 
                  onClick={toggleFilters}
                  className="w-full py-2 bg-gray-700 text-white rounded-md"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelRoomsPage;