'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const images = [
  {
    src: '/logo1.jpg',
title: 'Discover Your Perfect Getaway Destination',
description: 'Unparalleled luxury and comfort await at  the world\'s most exclusive hotels and resorts. Start your journey today.',
  },
  {
    src: '/logo2.jpg',
    title: 'Tropical Island Retreat',
    description: 'Crystal-clear waters and beachfront villas await you.',
  },
  {
    src: '/logo3.jpg',
    title: 'Urban Elegance Downtown',
    description: 'Stay in style with premium comfort in the city center.',
  },
  {
    src: '/logo4.jpg',
    title: 'Luxury Escape in the Alps',
    description: 'Indulge in serene mountain views and cozy chalet vibes.',
  },
  {
    src: '/logo5.jpg',
    title: 'Tropical Island Retreat',
    description: 'Crystal-clear waters and beachfront villas await you.',
  },
  {
    src: '/logo6.jpg',
    title: 'Urban Elegance Downtown',
    description: 'Stay in style with premium comfort in the city center.',
  },
  {
    src: '/logo7.jpg',
    title: 'Luxury Escape in the Alps',
    description: 'Indulge in serene mountain views and cozy chalet vibes.',
  },
  {
    src: '/logo8.jpg',
    title: 'Tropical Island Retreat',
    description: 'Crystal-clear waters and beachfront villas await you.',
  },
  {
    src: '/logo3.jpg',
    title: 'Urban Elegance Downtown',
    description: 'Stay in style with premium comfort in the city center.',
  },
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Rotate background every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Center the active thumbnail
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const activeThumb = container.children[activeIndex];
      
      if (activeThumb) {
        const containerWidth = container.offsetWidth;
        const thumbLeft = (activeThumb as HTMLElement).offsetLeft;
        const thumbWidth = (activeThumb as HTMLElement).offsetWidth;
        
        container.scrollTo({
          left: thumbLeft - (containerWidth / 2) + (thumbWidth / 2),
          behavior: 'smooth'
        });
      }
    }
  }, [activeIndex]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={images[activeIndex].src}
          alt={images[activeIndex].title}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-opacity duration-1000"
          priority
        />
      </div>

      {/* Overlay Text */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-white text-center bg-black/40 px-4 z-10">
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-md mb-4">
          {images[activeIndex].title}
        </h1>
        <p className="text-lg md:text-xl max-w-2xl drop-shadow-md">
          {images[activeIndex].description}
        </p>
      </div>

      {/* Thumbnails Container */}
      <div className="absolute bottom-8 left-0 w-full z-20 px-4">
        <div className="relative max-w-4xl mx-auto">
          {/* Sliding Border */}
          <motion.div
            className="absolute -bottom-1 h-1  rounded-full"
            initial={false}
            animate={{
              width: '120px',
              x: `${activeIndex * 136}px`, // 120px (image) + 16px (gap)
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
          
          {/* Thumbnails */}
          <div 
            ref={containerRef}
            className="flex gap-4 overflow-x-hidden scroll-smooth py-2"
          >
            {images.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setActiveIndex(index)}
                className={`cursor-pointer rounded-lg overflow-hidden transition-all duration-300 flex-shrink-0 ${
                  index === activeIndex 
                    ? 'opacity-100' 
                    : 'opacity-70 hover:opacity-100 hover:scale-105'
                }`}
              >
                <Image 
                  src={img.src} 
                  alt={img.title} 
                  width={120} 
                  height={90} 
                  style={{ objectFit: 'cover' }}
                  className="w-full h-full"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}