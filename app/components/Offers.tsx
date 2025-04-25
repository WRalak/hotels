import React from 'react';
import Image from 'next/image';
import { FiArrowRight } from 'react-icons/fi';

interface Offer {
  id: number;
  imageUrl: string;
  discount: string;
  title: string;
  description: string;
  expiryDate: string;
  link: string;
}

const ExclusiveOffers: React.FC = () => {
  const offers: Offer[] = [
    {
      id: 1,
      imageUrl: '/offer1.jpg',
      discount: '30%',
      title: 'Summer Escape Package',
      description: 'Enjoy a complimentary night and daily breakfast',
      expiryDate: 'Expires August 31, 2025',
      link: '/offers/summer-escape',
    },
    {
      id: 2,
      imageUrl: '/offer2.jpg',
      discount: '25%',
      title: 'Weekend Getaway',
      description: 'Special rates for weekend stays with late checkout',
      expiryDate: 'Expires September 15, 2025',
      link: '/offers/weekend-getaway',
    },
    {
      id: 3,
      imageUrl: '/offer3.jpg',
      discount: '20%',
      title: 'Family Bundle',
      description: 'Kids stay free with discounted activities',
      expiryDate: 'Expires October 1, 2025',
      link: '/offers/family-bundle',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
        <div className="mb-6 lg:mb-0">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Exclusive Offers</h2>
          <p className="text-gray-600 max-w-lg">
            Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.
          </p>
        </div>
        <button className="flex  text-gray-400 items-center text-primary font-semibold hover:underline">
          View all offers
          <FiArrowRight className="ml-2" size={20} />
        </button>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <a 
            key={offer.id} 
            href={offer.link}
            className="relative group block rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* Offer Image with Overlay */}
            <div className="relative w-full h-[225px]">
              <Image
                src={offer.imageUrl}
                alt={offer.title}
                fill
                className="object-cover"
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
              
              {/* Discount Badge */}
              <div className="absolute top-4 left-4 bg-white text-xs text-primary font-bold px-2 py-1 rounded-md z-10">
                {offer.discount} OFF
              </div>
              
              {/* Text Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-sm font-semibold mb-1">{offer.title}</h3>
                <p className="mb-2 text-xs">{offer.description}</p>
                <p className="text-xs opacity-80">{offer.expiryDate}</p>
                <div className="mt-3 flex items-center text-sm font-medium">
                  View offer
                  <FiArrowRight className="ml-2" size={16} />
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Mobile View All Button */}
      <div className="mt-8 flex lg:hidden justify-center">
        <a href="/offers" className="flex items-center text-primary font-semibold hover:underline">
          View all offers
          <FiArrowRight className="ml-2" size={20} />
        </a>
      </div>
    </div>
  );
};

export default ExclusiveOffers;