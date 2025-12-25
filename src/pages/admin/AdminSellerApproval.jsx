import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminSellerApproval() {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    const res = await axios.get("http://localhost:5000/api/seller/all");
    setSellers(res.data);
  };

  const updateStatus = async (sellerId, status) => {
    await axios.put("http://localhost:5000/api/seller/update-status", {
      sellerId,
      status,
    });

    fetchSellers();
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Seller Agreement Approval</h1>

      <table className="w-full border text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Seller Name</th>
            <th className="p-2">Agreement</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {sellers.map((seller) => (
            <tr key={seller._id} className="border-b">
              <td className="p-2">{seller.name}</td>

              <td className="p-2">
                {seller.agreementUrl ? (
                  <a
                    href={seller.agreementUrl}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    View PDF
                  </a>
                ) : (
                  "Not uploaded"
                )}
              </td>

              <td className="p-2 font-semibold">
                {seller.status === "approved" ? (
                  <span className="text-green-600">Approved</span>
                ) : seller.status === "rejected" ? (
                  <span className="text-red-600">Rejected</span>
                ) : (
                  <span className="text-yellow-600">Pending</span>
                )}
              </td>

              <td className="p-2 space-x-2">
                <button
                  onClick={() => updateStatus(seller._id, "approved")}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(seller._id, "rejected")}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
