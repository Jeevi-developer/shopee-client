import React from "react";

export default function OrderTrackingPage() {
  const order = {
    id: "ORD123456",
    status: "Shipped",
    estDelivery: "Oct 15, 2025",
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        🚚 Order Tracking
      </h1>

      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <p className="text-lg font-medium text-gray-700">
          Order ID:{" "}
          <span className="font-bold text-indigo-700">{order.id}</span>
        </p>

        <p className="text-lg text-gray-700">
          Status:{" "}
          <span
            className={`font-semibold ${
              order.status === "Delivered"
                ? "text-green-600"
                : order.status === "Shipped"
                ? "text-blue-600"
                : "text-yellow-600"
            }`}
          >
            {order.status}
          </span>
        </p>

        <p className="text-lg text-gray-700">
          Estimated Delivery:{" "}
          <span className="font-semibold">{order.estDelivery}</span>
        </p>

        <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition">
          Contact Seller
        </button>
      </div>
    </div>
  );
}
