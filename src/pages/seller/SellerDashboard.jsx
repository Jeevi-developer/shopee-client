import React, { useState, useEffect } from "react";
import {
  User,
  ShoppingBag,
  Package,
  Settings,
  Home,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductsManagement from "../../components/ProductsManagement";
import OrdersManagement from "../../components/OrdersManagement";
import CustomersManagement from "../../components/CustomersManagement";
import SettingsManagement from "../../components/SettingsManagement";

// ⭐ Referral Component
function ReferralSection() {
  const seller = JSON.parse(localStorage.getItem("sellerData") || "{}");
  const referralCode = seller.referralCode || "Not available";
  const referralLink = `${window.location.origin}/register?ref=${referralCode}`;

  const copyCode = () => navigator.clipboard.writeText(referralCode);
  const copyLink = () => navigator.clipboard.writeText(referralLink);

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Referral Program
      </h2>
      <p className="text-gray-600 mb-6">
        Share your referral code with new sellers. Earn rewards when they join
        using your reference!
      </p>

      <div className="mb-6">
        <p className="font-semibold text-gray-700 mb-1">Referral Code:</p>
        <div className="flex items-center gap-3">
          <span className="px-4 py-2 bg-gray-100 rounded-lg font-mono text-gray-800">
            {referralCode}
          </span>
          <button
            onClick={copyCode}
            className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Copy
          </button>
        </div>
      </div>

      <p className="font-semibold text-gray-700 mb-1">Referral Link:</p>
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={referralLink}
          readOnly
          className="w-full px-3 py-2 bg-gray-100 rounded-lg text-gray-700"
        />
        <button
          onClick={copyLink}
          className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Copy Link
        </button>
      </div>
    </div>
  );
}

// ⭐ MAIN DASHBOARD
export default function SellerDashboard() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [sellerStatus, setSellerStatus] = useState(null); // ✅ Start with null, not "pending"
  const [isLoading, setIsLoading] = useState(true); // ✅ Add loading state
  const [highlightStatus, setHighlightStatus] = useState(true); // ✅ Highlight state

  const seller = JSON.parse(localStorage.getItem("sellerData") || "{}");

  // ⏱️ Auto-hide highlight after 1 minute
  useEffect(() => {
    const timer = setTimeout(() => {
      setHighlightStatus(false);
    }, 20000); // 60000ms = 1 minute

    return () => clearTimeout(timer);
  }, []);

  // 🔄 Auto fetch seller status every 10 sec
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    const fetchStatus = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/seller/profile`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const data = await res.json();
        console.log("✅ Fetched seller data:", data); // Debug log

        if (data?.success && data?.seller) {
          // ✅ Check both 'status' and 'accountStatus' fields
          const newStatus = (
            data.seller.status ||
            data.seller.accountStatus ||
            "pending"
          ).toLowerCase();

          console.log("✅ Seller status from API:", newStatus); // Debug log

          localStorage.setItem("sellerStatus", newStatus);
          localStorage.setItem("sellerData", JSON.stringify(data.seller));
          setSellerStatus(newStatus);
          setIsLoading(false);
        } else {
          console.error("❌ Invalid API response:", data);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("❌ Error fetching seller status:", err);
        // Even on error, stop loading and use cached status
        const cachedStatus = localStorage.getItem("sellerStatus");
        if (cachedStatus) {
          setSellerStatus(cachedStatus.toLowerCase());
        }
        setIsLoading(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  // ⏩ Auto redirect when Approved
  useEffect(() => {
    if (sellerStatus?.toLowerCase() === "approved") {
      setTimeout(() => setCurrentView("products"), 2000);
    }
  }, [sellerStatus]);

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("sellerData");
    localStorage.removeItem("sellerStatus");
    localStorage.removeItem("userType");
    navigate("/");
  };

  // ✅ Check if seller is approved
  const isApproved = sellerStatus?.toLowerCase() === "approved";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="flex items-center gap-2">
              <ShoppingBag className="text-green-600" size={28} />
              <h1 className="text-2xl font-bold text-gray-800">
                Seller Dashboard
              </h1>
            </div>
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 bg-green-100 hover:bg-green-200 px-4 py-2 rounded-full transition-all"
            >
              <User size={20} className="text-green-600" />
              <span className="font-medium text-gray-800">
                {seller.businessName || seller.email || "Seller"}
              </span>
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-blue-600 p-4 text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <ShoppingBag size={24} className="text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold">{seller.businessName}</p>
                      <p className="text-sm opacity-90">{seller.email}</p>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg flex items-center gap-3 text-black">
                    <User size={18} />
                    <span>Business Profile</span>
                  </button>
                  <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg flex items-center gap-3 text-black">
                    <Settings size={18} />
                    <span>Settings</span>
                  </button>

                  <hr className="my-2" />

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 hover:bg-red-50 rounded-lg flex items-center gap-3 text-red-600"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* SIDEBAR + CONTENT */}
      <div className="flex">
        <aside
          className={`${
            sidebarOpen ? "block" : "hidden"
          } lg:block w-64 bg-white shadow-lg min-h-screen p-4`}
        >
          <nav className="space-y-2">
            {[
              { id: "dashboard", icon: <Home size={20} />, label: "Dashboard" },
              {
                id: "products",
                icon: <Package size={20} />,
                label: "Products",
              },
              {
                id: "orders",
                icon: <ShoppingBag size={20} />,
                label: "Orders",
              },
              { id: "customers", icon: <User size={20} />, label: "Customers" },
              {
                id: "settings",
                icon: <Settings size={20} />,
                label: "Settings",
              },
              { id: "referral", icon: <User size={20} />, label: "Referral" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 ${
                  currentView === item.id
                    ? "bg-green-50 text-green-600 font-semibold"
                    : "hover:bg-green-50 text-green-600"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-6">
          {/* ✅ Account Status Messages - Only show after loading and during highlight period */}
          {!isLoading && highlightStatus && sellerStatus === "pending" && (
            <div className="mb-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded-lg shadow-md animate-pulse">
              <h3 className="text-yellow-700 text-lg font-semibold">
                ⚠️ Your KYC is waiting for admin approval
              </h3>
              <p className="text-yellow-700 text-sm mt-1">
                Adding products and orders will be enabled after approval.
              </p>
            </div>
          )}
          {!isLoading && highlightStatus && sellerStatus === "approved" && (
            <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-600 rounded-lg shadow-md animate-pulse">
              <h3 className="text-green-700 text-lg font-semibold">
                🎉 Your KYC has been approved!
              </h3>
              <p className="text-green-700 text-sm mt-1">
                You can now add products and start selling.
              </p>
            </div>
          )}
          {!isLoading && highlightStatus && sellerStatus === "rejected" && (
            <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-600 rounded-lg shadow-md animate-pulse">
              <h3 className="text-red-700 text-lg font-semibold">
                ❌ Your KYC has been rejected
              </h3>
              <p className="text-red-700 text-sm mt-1">
                Please update your documents and submit again.
              </p>
            </div>
          )}
          {!isLoading && highlightStatus && sellerStatus === "suspended" && (
            <div className="mb-6 p-4 bg-orange-100 border-l-4 border-orange-600 rounded-lg shadow-md animate-pulse">
              <h3 className="text-orange-700 text-lg font-semibold">
                ⛔ Your account has been suspended
              </h3>
              <p className="text-orange-700 text-sm mt-1">
                Contact support for reinstatement.
              </p>
            </div>
          )}

          {/* View Switch */}
          {currentView === "dashboard" && (
            <>
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Welcome, {seller.businessName || "Seller"}!
                </h2>
              </div>

              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                  {
                    label: "Total Products",
                    value: "0",
                    icon: <Package className="text-blue-600" size={24} />,
                    bg: "bg-blue-100",
                  },
                  {
                    label: "Total Orders",
                    value: "0",
                    icon: <ShoppingBag className="text-green-600" size={24} />,
                    bg: "bg-green-100",
                  },
                  {
                    label: "Revenue",
                    value: "₹0",
                    icon: (
                      <span className="text-purple-600 text-2xl font-bold">
                        ₹
                      </span>
                    ),
                    bg: "bg-purple-100",
                  },
                  {
                    label: "Customers",
                    value: "0",
                    icon: <User className="text-orange-600" size={24} />,
                    bg: "bg-orange-100",
                  },
                ].map((card, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-gray-600 text-sm mb-1">{card.label}</p>
                      <p className="text-3xl font-bold text-gray-800">
                        {card.value}
                      </p>
                    </div>
                    <div
                      className={`w-12 h-12 ${card.bg} rounded-lg flex items-center justify-center`}
                    >
                      {card.icon}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Add Product */}
                  <button
                    onClick={() => {
                      if (!isApproved) {
                        alert(
                          "Your account is under review. You cannot add products yet."
                        );
                        return;
                      }
                      navigate("/AddProduct");
                    }}
                    className={`p-4 border-2 rounded-lg transition-all text-left ${
                      !isApproved
                        ? "border-gray-300 bg-gray-100 cursor-not-allowed opacity-60"
                        : "border-green-200 hover:bg-green-50"
                    }`}
                    disabled={!isApproved}
                  >
                    <Package className="text-green-600 mb-2" size={24} />
                    <h4 className="font-semibold text-gray-800">Add Product</h4>
                    <p className="text-sm text-gray-600">List a new product</p>
                  </button>

                  {/* View Orders */}
                  <button
                    onClick={() => setCurrentView("orders")}
                    className="p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition-all text-left"
                  >
                    <ShoppingBag className="text-blue-600 mb-2" size={24} />
                    <h4 className="font-semibold text-gray-800">View Orders</h4>
                    <p className="text-sm text-gray-600">Manage your orders</p>
                  </button>

                  {/* Settings */}
                  <button
                    onClick={() => setCurrentView("settings")}
                    className="p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition-all text-left"
                  >
                    <Settings className="text-purple-600 mb-2" size={24} />
                    <h4 className="font-semibold text-gray-800">Settings</h4>
                    <p className="text-sm text-gray-600">
                      Configure your store
                    </p>
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-md p-6 mt-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Recent Activity
                </h3>

                <div className="text-center py-8 text-gray-500">
                  <Package size={48} className="mx-auto mb-3 opacity-50" />
                  <p>No recent activity</p>
                  <p className="text-sm">Start by adding your first product!</p>
                </div>
              </div>
            </>
          )}

          {currentView === "products" && <ProductsManagement />}
          {currentView === "orders" && <OrdersManagement />}
          {currentView === "customers" && <CustomersManagement />}
          {currentView === "settings" && <SettingsManagement />}
          {currentView === "referral" && <ReferralSection />}
        </main>
      </div>
    </div>
  );
}