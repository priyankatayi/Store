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

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800">My Orders</h2>

      {myOrders.map((order, index) => (
        <div key={index} className="border rounded-md p-4 space-y-4 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between gap-2 text-sm font-medium text-gray-700 border-b pb-2">
            <div className="space-y-1">
              <div className="flex flex-wrap gap-1">
                <span className="text-gray-600">Order #:</span>
                <span className="break-all">{order._id}</span>
              </div>
              <div className="flex flex-wrap gap-1 text-xs text-gray-500">
                <span className="text-gray-600">Date:</span>
                <span>{formatDate(order.createdAt)}</span>
              </div>
            </div>
            <div className="flex items-start sm:items-center sm:justify-end mt-2 sm:mt-0">
              <span className="text-gray-600 mr-1">Total:</span>
              <span>
                {currency}
                {order.amount}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-800 table-fixed">
              <thead className="border-b text-gray-600 font-semibold">
                <tr>
                  <th className="py-2 w-1/2">Item</th>
                  <th className="py-2 w-1/4 text-center">Quantity</th>
                  <th className="py-2 w-1/4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, idx) => (
                  <tr key={idx} className="border-b last:border-b-0">
                    <td className="py-3 flex items-center gap-3 overflow-hidden">
                      <img
                        src={item.product.image[0]}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover bg-gray-100 rounded shrink-0"
                      />
                      <span className="break-words">{item.product.name}</span>
                    </td>
                    <td className="py-3 text-center">{item.quantity}</td>
                    <td className="py-3 text-right">
                      {currency}
                      {item.quantity * item.product.offerPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyOrders;
