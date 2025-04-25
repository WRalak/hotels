'use client';
import React from 'react';
import { FaStar, FaLocationDot, FaArrowRight } from 'react-icons/fa6';
import Link from 'next/link';
import Image from 'next/image';

interface Hotel {
  id: number;
  name: string;
  image: string;
  rating: number;
  location: string;
  price: number;
  coordinates?: string;
}

const FeaturedHotels = () => {
  const hotels: Hotel[] = [
    {
      id: 1,
      name: 'Serena Luxury Resort',
      image: '/bed.jpg',
      rating: 4.8,
      location: 'Diani Beach, Kenya',
      price: 25000,
      coordinates: '-4.3150,39.5753'
    },
    {
      id: 2,
      name: 'Mount Safari Lodge',
      image: '/bed1.jpg',
      rating: 4.5,
      location: 'Mount Kenya',
      price: 18000,
      coordinates: '0.1519,37.3082'
    },
    {
      id: 3,
      name: 'Maasai Mara Camp',
      image: '/bed2.jpg',
      rating: 4.7,
      location: 'Maasai Mara',
      price: 32000,
      coordinates: '-1.5815,35.2518'
    },
    {
      id: 4,
      name: 'Lamu Heritage House',
      image: '/bed3.jpg',
      rating: 4.9,
      location: 'Lamu Island',
      price: 28000,
      coordinates: '-2.2718,40.9020'
    },
  ];

  const openGoogleMaps = (coordinates: string, locationName: string) => {
    if (coordinates) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${coordinates}`, '_blank');
    } else {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationName)}`, '_blank');
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="text-yellow-400 opacity-50" />);
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-gray-300" />);
    }

    return (
      <div className="flex items-center gap-1">
        {stars}
        <span className="ml-1 text-xs text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Featured Hotels</h2>
        <p className="text-sm text-gray-600 max-w-2xl mx-auto">
          Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <Link href={`/hotels/${hotel.id}`} passHref>
              <div className="relative h-48 w-full"> {/* Fixed height container */}
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  priority={hotel.id <= 2} // Only prioritize first two images
                />
              </div>
            </Link>

            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-sm">{hotel.name}</h3>
                {renderStars(hotel.rating)}
              </div>

              <div 
                className="flex items-center text-gray-600 mb-3 hover:text-blue-500 transition-colors cursor-pointer"
                onClick={() => openGoogleMaps(hotel.coordinates || '', hotel.location)}
              >
                <FaLocationDot className="mr-1 text-xs text-gray-500" />
                <span className="text-xs">{hotel.location}</span>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <p className="font-bold text-xs text-gray-900">KSH {hotel.price.toLocaleString()}/night</p>
                <Link href={`/hotels/${hotel.id}`} passHref>
                  <span className="flex items-center text-gray-600 text-xs font-medium hover:text-blue-500 transition-colors">
                    View details <FaArrowRight className="ml-1 text-xs" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link href="/Hotels" passHref>
          <button className="inline-flex items-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-600 bg-white hover:bg-gray-50 transition-colors">
            View all Hotels
          </button>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedHotels;