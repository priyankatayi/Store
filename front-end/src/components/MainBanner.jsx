import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

function MainBanner() {
  return (
    <div className="relative text-white">
      <img
        src={assets.main_banner_bg}
        alt="Main Banner"
        className="w-full hidden md:block"
      />
      <img
        src={assets.main_banner_bg_sm}
        alt="Main Banner Mobile"
        className="w-full md:hidden"
      />

      <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
        <div className="bg-opacity-50 p-6 rounded-xl max-w-xl">
          <h1 className="text-2xl md:text-4xl font-semibold mb-4 text-gray-800">
            Welcome to Our Store
          </h1>
          <p className="text-base md:text-lg mb-6 text-gray-700">
            Discover fresh, affordable, and quality products without leaving
            home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition text-center"
            >
              Shop Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainBanner;
