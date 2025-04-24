import React from 'react';
import { FaQuoteLeft, FaStar, FaHotel, FaConciergeBell, FaUmbrellaBeach } from 'react-icons/fa';
import Image from 'next/image';

interface TestimonialProps {
  className?: string;
}

const Testimonials: React.FC<TestimonialProps> = ({ className }) => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Frequent Traveler',
      rating: 5,
      content: 'The hospitality at QuickStay is unmatched. From the warm welcome to the personalized service, every stay feels like coming home.',
     
      stay: 'Luxury Suite, Maasai Mara',
      image: '/testimonials.jpg' // 400x400px
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Business Executive',
      rating: 5,
      content: 'The attention to detail is incredible. The concierge remembered my coffee preference from my last visit six months ago!',
   
      stay: 'Executive Room, Nairobi',
      image: '/testimonials.jpg' // 400x400px
    },
    {
      id: 3,
      name: 'Amina & Raj Patel',
      role: 'Honeymooners',
      rating: 5,
      content: 'Our beachfront villa exceeded all expectations. The staff arranged the most romantic sunset dinner on the beach - pure magic!',
     
      stay: 'Beach Villa, Diani',
      image: '/testimonials.jpg' // 400x400px
    }
  ];

  return (
    <section className={`${className || ''} py-16 px-4 sm:px-6 lg:px-8 `}>
      <div className="max-w-7xl mx-auto">
        {/* Heading Section */}
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Guests Say</h2>
          <p className="text-sm text-gray-600 max-w-3xl mx-auto">
          Discover why discerning travelers choose QuickStay for their luxury accommodations <br />around the world.
          </p>
        </div>
        
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="text-blue-500">
                  <FaQuoteLeft className="text-3xl opacity-20" />
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className={`text-lg ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-200'}`} 
                    />
                  ))}
                </div>
              </div>
              
              <p className="text-gray-700 mb-6 italic">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 relative">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <Image
                      src={testimonial.image}
                      alt={`${testimonial.name}'s photo`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full">
                    <div className="bg-gray-100 p-2 rounded-full">
                  
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                  <p className="text-xs text-gray-600 mt-1">{testimonial.stay}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      
      </div>
    </section>
  );
};

export default Testimonials;