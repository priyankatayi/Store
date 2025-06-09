import React from "react";

function MyOrders() {
  const boxIcon =
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/boxIcon.svg";

  const orders = [
    {
      id: 1,
      items: [
        { product: { name: "Nike Air Max 270" }, quantity: 1 },
        { product: { name: "Nike Air Max 27067" }, quantity: 3 },
        { product: { name: "Nike Air Max 270" }, quantity: 1 },
        { product: { name: "Nike Air Max 27067" }, quantity: 3 },
      ],
      address: {
        firstName: "John",
        lastName: "Doe",
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipcode: "10001",
        country: "USA",
      },
      amount: 320.0,
      paymentType: "Credit Card",
      orderDate: "10/10/2022",
      isPaid: true,
    },
    {
      id: 1,
      items: [{ product: { name: "Nike Air Max 270" }, quantity: 1 }],
      address: {
        firstName: "John",
        lastName: "Doe",
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipcode: "10001",
        country: "USA",
      },
      amount: 320.0,
      paymentType: "Credit Card",
      orderDate: "10/10/2022",
      isPaid: true,
    },
    {
      id: 1,
      items: [{ product: { name: "Nike Air Max 270" }, quantity: 1 }],
      address: {
        firstName: "John",
        lastName: "Doe",
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipcode: "10001",
        country: "USA",
      },
      amount: 320.0,
      paymentType: "Credit Card",
      orderDate: "10/10/2022",
      isPaid: true,
    },
  ];
  return (
    <div className="md:p-10 p-4 space-y-4">
      <h2 className="text-lg font-medium">Orders List</h2>
      {orders.map((order, index) => (
        <div
          key={index}
          className="max-w-4xl border border-gray-300 rounded-md p-5 space-y-4"
        >
          {/* Address + Order Meta */}
          <div className="text-sm text-gray-700">
            <p className="font-semibold">
              {order.address.firstName} {order.address.lastName}
            </p>
            <p>
              {order.address.street}, {order.address.city},{" "}
              {order.address.state}, {order.address.zipcode},{" "}
              {order.address.country}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Method: {order.paymentType} | Date: {order.orderDate} | Payment:{" "}
              {order.isPaid ? "Paid" : "Pending"}
            </p>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-[2fr_1fr_1fr] gap-4 text-sm font-medium text-gray-800 border-b pb-2">
            <span>Item</span>
            <span className="text-center">Qty</span>
            <span className="text-right">Amount</span>
          </div>

          {/* Items List */}
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className="grid grid-cols-[2fr_1fr_1fr] gap-4 items-center text-sm"
            >
              <div className="flex items-center gap-3">
                <img
                  src={boxIcon}
                  alt="item"
                  className="w-10 h-10 opacity-60"
                />
                <span>{item.product.name}</span>
              </div>
              <div className="text-center">{item.quantity}</div>
              <div className="text-right">
                ${(order.amount / order.items.length).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default MyOrders;
