import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

function MyOrders() {
  const [myOrders, setMyOrders] = useState([]);
  const { currency, formatDate, axios, user } = useAppContext();

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/user");
      if (data.success) {
        setMyOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyOrders();
    }
  }, [user]);

  const boxIcon =
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/boxIcon.svg";

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800">My Orders</h2>

      {myOrders.map((order, index) => (
        <div key={index} className="border rounded-md p-4 space-y-4 shadow-sm">
          {/* Order Summary */}
          <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-700 border-b pb-2">
            <div>Order #: {order._id}</div>
            <div className="text-center">
              Date: {formatDate(order.createdAt)}
            </div>
            <div className="text-right">
              Total: {currency}
              {order.amount}
            </div>
          </div>

          {/* Items Header */}
          <div className="grid grid-cols-3 gap-4 text-sm font-semibold text-gray-600 border-b pb-2">
            <span>Item</span>
            <span className="text-center">Quantity</span>
            <span className="text-right">Amount</span>
          </div>

          {/* Items List */}
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className="grid grid-cols-3 gap-4 items-center text-sm text-gray-800 py-2"
            >
              {/* Item Column: Image + Name */}
              <div className="flex items-center gap-3">
                <img
                  src={item.product.image[0]}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover bg-gray-100 rounded"
                />
                <span>{item.product.name}</span>
              </div>

              {/* Quantity */}
              <div className="text-center">{item.quantity}</div>

              {/* Amount */}
              <div className="text-right">
                {currency}
                {((order.amount / order.items.length) * item.quantity).toFixed(
                  2,
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default MyOrders;
