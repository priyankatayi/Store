import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [count, setCount] = useState();
  const currency = import.meta.env.VITE_CURRENCY;

  //fetch user status

  const isUserAutheticated = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cartItems);
      } else {
        setUser({});
        toast.error(data.message);
      }
    } catch (error) {
      setUser(null);
      toast.error(error.message);
    }
  };

  //fetch Seller status
  const isSellerAutheticated = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      if (data.success) {
        setIsSeller(true);
      } else {
        setIsSeller(false);
      }
    } catch (error) {
      setIsSeller(false);
      toast.error(error.message);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    isSellerAutheticated();
    fetchProducts();
    isUserAutheticated();
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
        fetchProducts,
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
        axios,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
