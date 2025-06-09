import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

function MainBanner() {
  return (
    <div className="relative text-white">
      {/* Banner Images */}
      <img src={assets.main_banner_bg} alt="Main Banner" className="w-full hidden md:block" />
      <img src={assets.main_banner_bg_sm} alt="Main Banner Mobile" className="w-full md:hidden" />

      {/* Text + Link Buttons */}
      <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
        <div className=" bg-opacity-50 p-6 rounded-xl max-w-xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Welcome to Our Store</h1>
          <p className="text-lg md:text-xl mb-6">
            Discover amazing products and unbeatable deals tailored just for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition text-center"
            >
              Shop Products
            </Link>
            <Link
              to="/deals"
              className="bg-yellow-400 text-black px-6 py-2 rounded-full hover:bg-yellow-300 transition text-center"
            >
              Explore Deals
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainBanner