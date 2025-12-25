import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("authToken");

    // ✅ Debug logs
    console.log("📦 Stored User:", storedUser);
    console.log("🔑 customerOwnCode:", storedUser?.customerOwnCode);
    console.log("📋 All localStorage:", {
      user: localStorage.getItem("user"),
      token: localStorage.getItem("authToken"),
    });

    if (!storedUser || !token) {
      navigate("/Login");
      return;
    }

    setUser(storedUser);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6 text-black">
      {/* Header */}
      <header className="w-full max-w-4xl flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          👋 Welcome, {user.fullName || "Customer"}
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>

      {/* Dashboard Content */}
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 space-y-6">
        {/* Profile Info */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
          <div className="space-y-2">
            <p>
              <strong>Full Name:</strong> {user.fullName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Mobile:</strong> {user.mobile}
            </p>
          </div>
        </div>

        {/* Referral Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Referral Info</h2>
          <div className="space-y-2">
            <p>
              <strong>My Referral Code:</strong> {user.customerOwnCode || "-"}
            </p>
            <p>
              <strong>Referral Code Used:</strong>{" "}
              {user.referralCodeUsed || "-"}
            </p>
            {user.customerOwnCode && (
              <button
                onClick={() =>
                  navigator.clipboard.writeText(user.customerOwnCode)
                }
                className="px-3 py-1 bg-indigo-100 hover:bg-indigo-200 rounded-md font-medium text-sm"
              >
                📋 Copy My Referral Code
              </button>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate("/orders")}
              className="p-4 bg-blue-100 hover:bg-blue-200 rounded-lg font-medium"
            >
              🛍 My Orders
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="p-4 bg-green-100 hover:bg-green-200 rounded-lg font-medium"
            >
              👤 Edit Profile
            </button>
            <button
              onClick={() => navigate("/support")}
              className="p-4 bg-yellow-100 hover:bg-yellow-200 rounded-lg font-medium"
            >
              💬 Help & Support
            </button>
            <button
              onClick={() => navigate("/referrals")}
              className="p-4 bg-purple-100 hover:bg-purple-200 rounded-lg font-medium"
            >
              🎁 My Referrals
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
