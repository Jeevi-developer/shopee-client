import React, { useState } from "react";
import {
  Shield,
  Users,
  ShoppingBag,
  Package,
  Settings,
  Home,
  LogOut,
  Menu,
  X,
  TrendingUp,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import SellersManagement from "./SellersManagement";
// import CustomersManagement from "./CustomersManagement";
// import ProductsManagement from "./ProductsManagement";
// import OrdersManagement from "./OrdersManagement";
// import ReportsManagement from "./ReportsManagement";
// import SettingsManagement from "./SettingsManagement";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { admin, logoutAdmin } = useAuth();
  const [currentView, setCurrentView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const onLogout = () => {
    logoutAdmin();
    navigate("/admin/Login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
              <Shield className="text-purple-600" size={28} />
              <h1 className="text-2xl font-bold text-gray-800">
                Admin Dashboard
              </h1>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 bg-purple-100 hover:bg-purple-200 px-4 py-2 rounded-full transition-all"
            >
              <Shield size={20} className="text-purple-600" />
              <span className="font-medium text-gray-800">
                {admin?.name || admin?.email || "Admin"}
              </span>
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <Shield size={24} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold">{admin?.name || "Admin"}</p>
                      <p className="text-sm opacity-90">{admin?.email}</p>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <button
                    onClick={onLogout}
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

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
    fixed top-0 left-0 h-full bg-white shadow-lg w-64 z-50 transform transition-transform duration-300
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    lg:static lg:translate-x-0
  `}
        >
          <nav className="space-y-2 mt-20 lg:mt-0">
            <button
              onClick={() => setCurrentView("dashboard")}
              className={`w-full text-left px-4 py-3 rounded-lg font-semibold flex items-center gap-3 ${
                currentView === "dashboard"
                  ? "bg-purple-50 text-purple-600"
                  : "hover:bg-purple-50 text-purple-600"
              }`}
            >
              <Home size={20} />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setCurrentView("sellers")}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 ${
                currentView === "sellers"
                  ? "bg-purple-50 text-purple-600 font-semibold"
                  : "hover:bg-purple-50 text-purple-600"
              }`}
            >
              <ShoppingBag size={20} />
              <span>Sellers</span>
            </button>

            <button
              onClick={() => setCurrentView("customers")}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 ${
                currentView === "customers"
                  ? "bg-purple-50 text-purple-600 font-semibold"
                  : "hover:bg-purple-50 text-purple-600"
              }`}
            >
              <Users size={20} />
              <span>Customers</span>
            </button>

            <button
              onClick={() => setCurrentView("products")}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 ${
                currentView === "products"
                  ? "bg-purple-50 text-purple-600 font-semibold"
                  : "hover:bg-purple-50 text-purple-600"
              }`}
            >
              <Package size={20} />
              <span>Products</span>
            </button>

            <button
              onClick={() => setCurrentView("orders")}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 ${
                currentView === "orders"
                  ? "bg-purple-50 text-purple-600 font-semibold"
                  : "hover:bg-purple-50 text-purple-600"
              }`}
            >
              <TrendingUp size={20} />
              <span>Orders</span>
            </button>

            <button
              onClick={() => setCurrentView("reports")}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 ${
                currentView === "reports"
                  ? "bg-purple-50 text-purple-600 font-semibold"
                  : "hover:bg-purple-50 text-purple-600"
              }`}
            >
              <DollarSign size={20} />
              <span>Reports</span>
            </button>

            <button
              onClick={() => setCurrentView("settings")}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 ${
                currentView === "settings"
                  ? "bg-purple-50 text-purple-600 font-semibold"
                  : "hover:bg-purple-50 text-purple-600"
              }`}
            >
              <Settings size={20} />
              <span>Settings</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {currentView === "dashboard" && (
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Welcome back, {admin?.name || "Admin"}!
              </h2>

              {/* Stats Grid */}
              <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">
                        Total Sellers
                      </p>
                      <p className="text-3xl font-bold text-gray-800">0</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <ShoppingBag className="text-green-600" size={24} />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">
                        Total Customers
                      </p>
                      <p className="text-3xl font-bold text-gray-800">0</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="text-blue-600" size={24} />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">
                        Total Products
                      </p>
                      <p className="text-3xl font-bold text-gray-800">0</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Package className="text-purple-600" size={24} />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">
                        Total Revenue
                      </p>
                      <p className="text-3xl font-bold text-gray-800">₹0</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="text-orange-600" size={24} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Recent Activity
                </h3>
                <div className="text-center py-8 text-gray-500">
                  <AlertCircle size={48} className="mx-auto mb-3 opacity-50" />
                  <p>No recent activity</p>
                </div>
              </div>
            </div>
          )}

          {currentView === "sellers" && <SellersManagement />}
          {currentView === "customers" && <CustomersManagement />}
          {currentView === "products" && <ProductsManagement />}
          {currentView === "orders" && <OrdersManagement />}
          {currentView === "reports" && <ReportsManagement />}
          {currentView === "settings" && <SettingsManagement />}
        </main>
      </div>
    </div>
  );
}

// Placeholder components for different views
// function SellersManagement() {
//   return (
//     <div className="bg-white rounded-xl shadow-md p-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">
//         Sellers Management
//       </h2>
//       <p className="text-gray-600">View and manage all sellers</p>
//     </div>
//   );
// }

function CustomersManagement() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Customers Management
      </h2>
      <p className="text-gray-600">View and manage all customers</p>
    </div>
  );
}

function ProductsManagement() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Products Management
      </h2>
      <p className="text-gray-600">View and manage all products</p>
    </div>
  );
}

function OrdersManagement() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Orders Management
      </h2>
      <p className="text-gray-600">View and manage all orders</p>
    </div>
  );
}

function ReportsManagement() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Reports & Analytics
      </h2>
      <p className="text-gray-600">View detailed reports and analytics</p>
    </div>
  );
}

function SettingsManagement() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Platform Settings
      </h2>
      <p className="text-gray-600">Configure platform settings</p>
    </div>
  );
}
