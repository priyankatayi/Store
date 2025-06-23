import { Link, NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { Outlet } from "react-router-dom";
import toast from "react-hot-toast";

const SellerLayout = () => {
  const { axios, navigate, setIsSeller } = useAppContext();
  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    {
      name: "Product List",
      path: "/seller/product-list",
      icon: assets.product_list_icon,
    },
    { name: "Orders", path: "/seller/my-orders", icon: assets.order_icon },
  ];

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/seller/logout");
      if (data.success) {
        toast.success(data.message);
        setIsSeller(false);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
        <Link to="/" className="flex items-center gap-2">
          <img className="h-12 w-auto" src={assets.logo1} alt="logo" />
          <span className="text-lg md:text-xl font-medium text-gray-800">
            Nature's Crate
          </span>
        </Link>
        <div className="flex items-center gap-5 text-gray-500">
          <button
            onClick={() => logout()}
            className="border rounded-full text-sm px-4 py-1"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex">
        <div className="md:w-64 w-16 border-r h-[95vh] text-base border-gray-300 pt-4 flex flex-col">
          {sidebarLinks.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              end={item.path === "/seller"}
              className={({ isActive }) => `flex items-center py-3 px-4 gap-3 
                            ${
                              isActive
                                ? "border-r-4 md:border-r-[6px] bg-primary/10 border-primary text-primary"
                                : "hover:bg-primary/90 border-white"
                            }`}
            >
              <img src={item.icon} alt="" className="w-7 h-7" />
              <p className="md:block hidden text-center">{item.name}</p>
            </NavLink>
          ))}
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default SellerLayout;
