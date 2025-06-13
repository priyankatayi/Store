import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [count, setCount] = useState();
  const currency = import.meta.env.VITE_CURRENCY;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProducts(dummyProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const addToCart = (itemId) => {
    let cart = structuredClone(cartItems);
    if (cart[itemId]) cart[itemId] += 1;
    else cart[itemId] = 1;
    setCartItems(cart);
    toast.success("Added to Cart");
  };

  const updateCart = (itemId, qty) => {
    let cart = structuredClone(cartItems);
    if (cart[itemId]) cart[itemId] = Number(qty);
    setCartItems(cart);
    toast.success("updated Cart");
  };

  const removeFromCart = (itemId) => {
    let cart = structuredClone(cartItems);
    if (cart[itemId]) cart[itemId] -= 1;
    if (cart[itemId] === 0) delete cart[itemId];
    setCartItems(cart);
    toast.success("removed from Cart");
  };

  useEffect(() => {
    console.log(cartItems);
    const count = Object.values(cartItems).reduce((acc, item) => acc + item, 0);
    setCount(count);
  }, [cartItems]);

  const getCartTotal = () => {
    let totalAmount = 0;
    for (const key in cartItems) {
      const product = products.find((product) => product._id === key);
      totalAmount += product.offerPrice * cartItems[key];
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isSeller,
        setIsSeller,
        navigate,
        setShowUserLogin,
        showUserLogin,
        products,
        currency,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        updateCart,
        searchQuery,
        setSearchQuery,
        count,
        getCartTotal,
        formatDate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
