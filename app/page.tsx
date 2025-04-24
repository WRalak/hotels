import React from 'react'
import Home from './components/Home'
import Bookings from './components/Bookings'
import FeaturedHotels from './components/FeaturedHotels'
import Offers from './components/Offers'
import Testimonials from './components/Testimonials'
import Subscribe from './components/Subscribe'

const page = () => {
  return (
    <div>
      <Home/>
      <div className='px-4 md:px-16 lg:px-24 xl:px-32'>
        <Bookings/>
      <FeaturedHotels/>
      <Offers/>
      <Testimonials/>
      <Subscribe/></div>
      
    </div>
  )
}

export default page