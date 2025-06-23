import { Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import { useAppContext } from "./context/AppContext";
import Login from "./components/Login";
import AllProducts from "./pages/AllProducts";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AddAddress from "./pages/AddAddress";
import MyOrders from "./pages/MyOrders";
import SellerLogin from "./components/seller/SellerLogin";
import SellerLayout from "./pages/seller/SellerLayout";
import Orders from "./pages/seller/Orders";
import ProductList from "./pages/seller/ProductList";
import AddProduct from "./pages/seller/AddProduct";

function App() {
  const isSellerPath = useLocation().pathname.includes("seller");
  const { showUserLogin, isSeller } = useAppContext();
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-700">
      {!isSellerPath && <Navbar />}
      {showUserLogin && <Login />}
      <Toaster />

      {/* Main content */}
      <main
        className={`flex-grow ${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/seller-layout" element={<SellerLayout />} />
          <Route
            path="/seller"
            element={isSeller ? <SellerLayout /> : <SellerLogin />}
          >
            <Route index element={isSeller ? <AddProduct /> : null} />
            <Route
              path="product-list"
              element={isSeller ? <ProductList /> : null}
            />
            <Route path="my-orders" element={isSeller ? <Orders /> : null} />
          </Route>
        </Routes>
      </main>

      {/* Footer only on non-seller paths */}
      {!isSellerPath && <Footer />}
    </div>
  );
}

export default App;
