// File: app/hotel/[id]/page.tsx
'use client'

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  FaWifi, FaCoffee, FaConciergeBell, FaStar, 
  FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaArrowLeft 
} from 'react-icons/fa';

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
  description: string;
  images: string[];
}

// This would typically come from an API or database
// For this example, I'm hardcoding it
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
    beds: 2,
    description: "Experience the elegance and timeless charm of Sarova Stanley, located in the heart of Nairobi CBD. Our luxury rooms feature classic design with modern amenities, offering a tranquil retreat from the bustling city. Enjoy our world-class dining options, historic bar, and attentive service that has made us a landmark destination since 1902.",
    images: ["/bed.jpg", "/room1.jpg", "/room2.jpg", "/dining.jpg"]
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
    beds: 1,
    description: "Nestled along the pristine white sands of Diani Beach, our resort offers breathtaking ocean views and direct beach access. Spacious rooms feature private balconies, perfect for enjoying the sea breeze. Relax by our infinity pool, indulge in spa treatments, or explore marine life through our water sports center.",
    images: ["/bed1.jpg", "/beach1.jpg", "/pool1.jpg", "/spa1.jpg"]
  },
  // Add more hotels with detailed information...
];

export default function HotelDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const hotelId = parseInt(params.id);
  
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [isBooking, setIsBooking] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Find the hotel with the matching ID
  const hotel = hotels.find(h => h.id === hotelId);
  
  // If hotel not found, show an error
  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Hotel Not Found</h1>
          <p className="mb-6">We couldn't find the hotel you're looking for.</p>
          <Link href="/hotels" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Back to Hotels
          </Link>
        </div>
      </div>
    );
  }
  
  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooking(true);
    
    // Here you would typically process the booking with an API
    // This is just a simulation
    setTimeout(() => {
      alert(`Booking confirmed at ${hotel.name}!\nCheck-in: ${checkInDate}\nCheck-out: ${checkOutDate}\nGuests: ${guests}`);
      setIsBooking(false);
      // Optionally redirect to a confirmation page
      // router.push(`/booking/confirmation/${hotel.id}`);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <div className="mb-6">
          <button 
            onClick={() => router.back()} 
            className="flex items-center text-blue-600 hover:underline"
          >
            <FaArrowLeft className="mr-2" /> Back to Hotel Listings
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Hotel Header */}
          <div className="p-6 border-b">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">{hotel.name}</h1>
                <div className="flex items-center mt-2">
                  <FaMapMarkerAlt className="text-red-500 mr-1" />
                  <p className="text-gray-600">{hotel.location}, {hotel.county}</p>
                </div>
                <div className="flex items-center mt-2">
                  {Array.from({ length: hotel.stars }).map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <p className="text-2xl font-bold text-gray-800">KSh {hotel.price.toLocaleString()}</p>
                <p className="text-gray-600">per night</p>
              </div>
            </div>
          </div>
          
          {/* Image Gallery */}
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-2/3">
              <div className="relative w-full h-96">
                <Image
                  src={hotel.images[selectedImage]}
                  alt={hotel.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex p-4 space-x-2 overflow-x-auto">
                {hotel.images.map((image, index) => (
                  <div 
                    key={index} 
                    className={`w-24 h-24 relative cursor-pointer ${selectedImage === index ? 'ring-2 ring-blue-500' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      src={image}
                      alt={`${hotel.name} image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Booking Form */}
            <div className="w-full md:w-1/3 p-6 bg-gray-50">
              <h2 className="text-xl font-bold mb-4">Book Your Stay</h2>
              <form onSubmit={handleBooking}>
                <div className="mb-4">
                  <label htmlFor="check-in" className="block text-gray-700 mb-2">Check-in Date</label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="date"
                      id="check-in"
                      required
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full pl-10 py-2 border rounded-md"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="check-out" className="block text-gray-700 mb-2">Check-out Date</label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="date"
                      id="check-out"
                      required
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      min={checkInDate || new Date().toISOString().split('T')[0]}
                      className="w-full pl-10 py-2 border rounded-md"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="guests" className="block text-gray-700 mb-2">Guests</label>
                  <div className="relative">
                    <FaUsers className="absolute left-3 top-3 text-gray-400" />
                    <select
                      id="guests"
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      className="w-full pl-10 py-2 border rounded-md"
                    >
                      {[1, 2, 3, 4].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isBooking || !checkInDate || !checkOutDate}
                  className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:bg-blue-300"
                >
                  {isBooking ? 'Processing...' : 'Book Now'}
                </button>
                
                {(!checkInDate || !checkOutDate) && (
                  <p className="text-sm text-gray-500 mt-2">Please select check-in and check-out dates to continue.</p>
                )}
              </form>
            </div>
          </div>
          
          {/* Hotel Description */}
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">About This Hotel</h2>
            <p className="text-gray-700 mb-6">{hotel.description}</p>
            
            {/* Amenities */}
            <h3 className="text-xl font-bold mb-3">Amenities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {hotel.amenities.wifi && (
                <div className="flex items-center">
                  <FaWifi className="text-blue-500 mr-2" />
                  <span>Free WiFi</span>
                </div>
              )}
              {hotel.amenities.breakfast && (
                <div className="flex items-center">
                  <FaCoffee className="text-blue-500 mr-2" />
                  <span>Complimentary Breakfast</span>
                </div>
              )}
              {hotel.amenities.roomService && (
                <div className="flex items-center">
                  <FaConciergeBell className="text-blue-500 mr-2" />
                  <span>24/7 Room Service</span>
                </div>
              )}
              <div className="flex items-center">
                <FaUsers className="text-blue-500 mr-2" />
                <span>Accommodates up to {hotel.beds * 2} guests</span>
              </div>
              {/* Add more amenities as needed */}
            </div>
            
            {/* Policies, etc. can be added here */}
          </div>
        </div>
      </div>
    </div>
  );
}