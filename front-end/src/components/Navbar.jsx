import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

function Navbar() {
  const [open, setOpen] = React.useState(false);
  const {
    user,
    setUser,
    navigate,
    setShowUserLogin,
    setSearchQuery,
    searchQuery,
    setCartItems,
    count,
    axios,
  } = useAppContext();

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (data.success) {
        setUser(null);
        setCartItems({});
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <NavLink to="/" className="flex items-center gap-2">
        <img className="h-12 w-auto" src={assets.logo1} alt="logo" />
        <span className="text-lg md:text-xl font-medium text-gray-800">
          Nature's Crate
        </span>
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <button
          onClick={() => navigate("/seller")}
          className="px-3 py-1 text-sm text-green-700 bg-green-100 border border-green-200 rounded-full hover:bg-green-200 transition"
        >
          Seller Dashboard
        </button>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            value={searchQuery}
            placeholder="Search products"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <img className="w-4 h-4" src={assets.search_icon} alt="search icon" />
        </div>

        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          <img
            className="w-6 opacity-80"
            src={assets.cart_icon}
            alt="cart icon"
          />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
            {count}
          </button>
        </div>

        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary transition text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div className="relative group">
            <img
              src={assets.profile_icon}
              alt="profile_icon"
              className="w-10"
            />
            <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
              <li
                onClick={() => navigate("/my-orders")}
                className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
              >
                My Orders
              </li>
              <li
                onClick={logout}
                className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="flex items-center gap-6 sm:hidden">
        <div className="relative cursor-pointer">
          <img
            src={assets.nav_cart_icon}
            alt="cart"
            className="w-6 opacity-80"
          />
          <button
            onClick={() => navigate("/cart")}
            className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full"
          >
            {count}
          </button>
        </div>
        <button
          onClick={() => (open ? setOpen(false) : setOpen(true))}
          aria-label="Menu"
          className="sm:hidden"
        >
          {/* Menu Icon SVG */}
          <img src={assets.menu_icon} alt="menu" />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md py-4 flex flex-col items-start gap-2 px-5 text-sm md:hidden z-50">
          <button
            onClick={() => {
              navigate("/seller");
              setOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm text-green-700 border border-green-200 rounded-md bg-green-100 hover:bg-green-200 transition"
          >
            Seller Dashboard
          </button>
          <NavLink to="/" onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)}>
            Products
          </NavLink>
          <NavLink to="/contact" onClick={() => setOpen(false)}>
            Contact
          </NavLink>
          {user && (
            <NavLink
              to="/contact"
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
            >
              My Orders
            </NavLink>
          )}

          {user ? (
            <button
              onClick={logout}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary transition text-white rounded-full text-sm"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => setOpen(false)}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary transition text-white rounded-full text-sm"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
