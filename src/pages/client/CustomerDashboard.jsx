import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import TopNavbar from "../../components/navbar/TopNavbar";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CustomerDashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [referrals, setReferrals] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [copied, setCopied] = useState(false);

  // ------------------------------------------------------
  // ✅ Load User & Referral Data
  // ------------------------------------------------------
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("authToken");

    // Fix redirect (React routes are case-sensitive)
    if (!storedUser || !token) {
      navigate("/login");
      return;
    }

    setUser(storedUser);

    // Fetch orders from localStorage
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const userReferrals = allOrders.filter(
      (order) => order?.referralCodeUsed === storedUser.customerOwnCode
    );

    const commissions = userReferrals.map((order) => ({
      orderId: order.id,
      name: order.customerName || "Customer",
      orderAmount: order.amount || 0,
      commission: Math.round((order.amount || 0) * 0.05),
    }));

    setReferrals(commissions);

    const earnings = commissions.reduce((sum, c) => sum + c.commission, 0);
    setTotalEarnings(earnings);
  }, [navigate]);

  // ------------------------------------------------------
  // Logout
  // ------------------------------------------------------
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (!user) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-xl font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  // ------------------------------------------------------
  // Chart Data
  // ------------------------------------------------------
  const chartData = {
    labels: referrals.map((r) => r.name),
    datasets: [
      {
        label: "Commission Earned (₹)",
        data: referrals.map((r) => r.commission),
        backgroundColor: "rgba(34,197,94,0.6)",
        borderColor: "rgba(34,197,94,1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Referral Commissions",
        font: { size: 18 },
      },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  // ------------------------------------------------------
  // Copy Referral Link
  // ------------------------------------------------------
  const referralLink = `https://www.indxindshopee.com/register?ref=${user.customerOwnCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ------------------------------------------------------
  // UI
  // ------------------------------------------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex flex-col items-center">
      <TopNavbar />

      {/* Header */}
      <header className="w-full max-w-5xl flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mt-6">
          👋 Welcome, {user.fullName || "Customer"}
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600 transition shadow-lg"
        >
          Logout
        </button>
      </header>

      {/* TOP SECTION ------------------------------------------------- */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-start space-y-3 text-gray-800">
          <h2 className="text-2xl font-semibold text-blue-800">
            👤 Your Profile
          </h2>

          <p>
            <strong>Name:</strong> {user.fullName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Mobile:</strong> {user.mobile}
          </p>

          <p>
            <strong>My Referral Code:</strong>
            <span className="bg-indigo-100 px-2 py-1 rounded ml-1">
              {user.customerOwnCode || "-"}
            </span>
          </p>

          {/* Referral Link */}
          <p className="text-gray-700">
            <strong>Your Referral Link:</strong>{" "}
            <span
              onClick={copyToClipboard}
              className="bg-indigo-100 px-2 py-1 rounded font-mono text-sm text-indigo-800 break-all cursor-pointer hover:bg-indigo-200 transition"
              title="Click to copy"
            >
              {referralLink}
            </span>
            {copied && (
              <span className="ml-2 text-green-600 text-sm font-semibold">
                Copied!
              </span>
            )}
          </p>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col space-y-4 text-gray-800">
          <h2 className="text-2xl font-semibold">⚡ Quick Links</h2>

          <div className="grid grid-cols-2 gap-4">
            {[
              {
                name: "My Orders",
                icon: "🛍",
                path: "/orders",
                bg: "bg-blue-100",
                hover: "hover:bg-blue-200",
              },
              {
                name: "Edit Profile",
                icon: "👤",
                path: "/profile",
                bg: "bg-green-100",
                hover: "hover:bg-green-200",
              },
              {
                name: "Help & Support",
                icon: "💬",
                path: "/support",
                bg: "bg-yellow-100",
                hover: "hover:bg-yellow-200",
              },
              {
                name: "My Referrals",
                icon: "🎁",
                path: "/referrals",
                bg: "bg-purple-100",
                hover: "hover:bg-purple-200",
              },
            ].map((link) => (
              <button
                key={link.name}
                onClick={() => navigate(link.path)}
                className={`p-4 rounded-xl ${link.bg} ${link.hover} transition shadow flex flex-col items-center`}
              >
                <span className="text-2xl">{link.icon}</span>
                <span className="mt-2 text-sm font-medium">{link.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* REFERRAL REWARDS SECTION ------------------------------------ */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-6 flex flex-col text-gray-800 mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-800">
          💰 Referral Rewards
        </h2>

        <p className="text-gray-700 mb-4">
          Total Earned:{" "}
          <span className="text-green-600 font-bold">
            <CountUp end={totalEarnings} duration={1.5} prefix="₹" />
          </span>
        </p>

        <p className="text-gray-600 text-sm mb-4">
          💡 You earn <span className="font-semibold text-green-600">5%</span>{" "}
          of each order placed using your referral code.
        </p>

        {referrals.length > 0 ? (
          <Bar data={chartData} options={chartOptions} />
        ) : (
          <p className="text-gray-600">
            You have not earned any referral rewards yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
