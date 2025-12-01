import React, { useState } from "react";
import {
  Package,
  Menu,
  X,
  LayoutDashboard,
  Wallet,
  Settings,
  LogOut,
  TrendingUp,
  ShoppingCart,
  Users,
  Plus,
  Eye,
  Edit,
  Trash2,
  IndianRupee,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
    />
  </div>
);

const TextAreaField = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={3}
      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
    />
  </div>
);

const MobileResponsiveDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [formData, setFormData] = useState({
    storeName: "My Store",
    storeAddress: "123 Main Street, Salem",
    pickupAddress: "123 Main Street",
    pickupPincode: "636001",
    email: "store@example.com",
    mobile: "+91 00000 00000",
    natureOfConcern: "------",
    firmName: "My Store Pvt Ltd",
    gstin: "0000000000000",
    accountHolder: "Store Owner",
    accountNumber: "00000 00000",
    ifscCode: "XYZ00000000",
    bankName: "Bank",
  });
  const [products] = useState([
    {
      id: 1,
      name: "Premium Laptop",
      price: "45,999",
      category: "Electronics",
      stock: 25,
      status: "Active",
      sales: 156,
    },
    {
      id: 2,
      name: "Wireless Headphones",
      price: "2,999",
      category: "Audio",
      stock: 50,
      status: "Active",
      sales: 234,
    },
    {
      id: 3,
      name: "Smart Watch",
      price: "8,999",
      category: "Wearables",
      stock: 15,
      status: "Active",
      sales: 89,
    },
  ]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-64 bg-gradient-to-b from-blue-900 to-purple-900 text-white transition-transform duration-300 flex flex-col shadow-2xl`}
      >
        <div className="p-4 flex items-center justify-between border-b border-white/40">
          <div className="flex items-center space-x-3">
            <div
              className="flex items-center gap-x-3 text-xl font-bold nico-font"
              style={{ color: "#f9fafcff" }}
            >
              <img
                src="/assets/images/cdex-logo.png"
                alt="CDEX Logo"
                className="h-9 w-9"
              />
              iNDXiND SHOPEE
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 hover:bg-white/10 rounded-lg lg:hidden transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <button
            onClick={() => handleTabChange("dashboard")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === "dashboard"
                ? "bg-white/20 shadow-lg"
                : "hover:bg-white/10"
            }`}
          >
            <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">Dashboard</span>
          </button>
          <button
            onClick={() => handleTabChange("products")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === "products"
                ? "bg-white/20 shadow-lg"
                : "hover:bg-white/10"
            }`}
          >
            <Package className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">Products</span>
          </button>
          <button
            onClick={() => handleTabChange("wallet")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === "wallet"
                ? "bg-white/20 shadow-lg"
                : "hover:bg-white/10"
            }`}
          >
            <Wallet className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">Wallet</span>
          </button>
          <button
            onClick={() => handleTabChange("settings")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === "settings"
                ? "bg-white/20 shadow-lg"
                : "hover:bg-white/10"
            }`}
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">Settings</span>
          </button>
        </nav>

        <div className="p-3 border-t border-white/10">
          <button className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-white/10 rounded-lg transition-colors">
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full min-w-0">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg lg:hidden flex-shrink-0 transition-colors"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
              </button>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 truncate">
                  {activeTab === "dashboard" && "Dashboard"}
                  {activeTab === "products" && "Products"}
                  {activeTab === "wallet" && "Wallet"}
                  {activeTab === "settings" && "Settings"}
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 hidden sm:block truncate">
                  Welcome back, {formData.storeName}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs sm:text-sm font-semibold text-gray-800">
                Live
              </span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="space-y-4 lg:space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-3 sm:p-4 lg:p-6 border border-gray-100">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2 sm:mb-3">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600" />
                  </div>
                  <h3 className="text-gray-500 text-xs font-medium">
                    Total Revenue
                  </h3>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mt-1">
                    ₹45,280
                  </p>
                  <p className="text-green-600 text-xs mt-1">+12.5%</p>
                </div>

                <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-3 sm:p-4 lg:p-6 border border-gray-100">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-2 sm:mb-3">
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-purple-600" />
                  </div>
                  <h3 className="text-gray-500 text-xs font-medium">
                    Total Orders
                  </h3>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mt-1">
                    156
                  </p>
                  <p className="text-green-600 text-xs mt-1">+8.2%</p>
                </div>

                <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-3 sm:p-4 lg:p-6 border border-gray-100">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-green-100 rounded-lg flex items-center justify-center mb-2 sm:mb-3">
                    <Package className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-600" />
                  </div>
                  <h3 className="text-gray-500 text-xs font-medium">
                    Active Products
                  </h3>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mt-1">
                    {products.length}
                  </p>
                  <p className="text-blue-600 text-xs mt-1">3 pending</p>
                </div>

                <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-3 sm:p-4 lg:p-6 border border-gray-100">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-2 sm:mb-3">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-orange-600" />
                  </div>
                  <h3 className="text-gray-500 text-xs font-medium">
                    Total Customers
                  </h3>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mt-1">
                    892
                  </p>
                  <p className="text-green-600 text-xs mt-1">+18.7%</p>
                </div>
              </div>

              {/* Business Information */}
              <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-3 sm:p-4 lg:p-6 border border-gray-100">
                <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 mb-3 sm:mb-4 lg:mb-6">
                  Business Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Business Type</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {formData.natureOfConcern}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Firm Name</p>
                    <p className="text-sm font-semibold text-gray-800 break-words">
                      {formData.firmName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <p className="text-sm font-semibold text-gray-800 break-all">
                      {formData.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Mobile</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {formData.mobile}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">GSTIN</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {formData.gstin}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Pickup Pincode</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {formData.pickupPincode}
                    </p>
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-3 sm:p-4 lg:p-6 border border-gray-100">
                <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 mb-3 sm:mb-4 lg:mb-6">
                  Recent Orders
                </h2>

                {/* Mobile Card View */}
                <div className="block md:hidden space-y-3">
                  <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-sm text-gray-800">
                          #ORD-1001
                        </p>
                        <p className="text-xs text-gray-600">Raj Kumar</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                        Delivered
                      </span>
                    </div>
                    <p className="text-sm font-bold text-gray-800">₹1,299</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-sm text-gray-800">
                          #ORD-1002
                        </p>
                        <p className="text-xs text-gray-600">Priya Sharma</p>
                      </div>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                        Shipped
                      </span>
                    </div>
                    <p className="text-sm font-bold text-gray-800">₹899</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-sm text-gray-800">
                          #ORD-1003
                        </p>
                        <p className="text-xs text-gray-600">Amit Singh</p>
                      </div>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                        Processing
                      </span>
                    </div>
                    <p className="text-sm font-bold text-gray-800">₹2,199</p>
                  </div>
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                          Order ID
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                          Customer
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                          Amount
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-800">
                          #ORD-1001
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-800">
                          Raj Kumar
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-800">
                          ₹1,299
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                            Delivered
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-800">
                          #ORD-1002
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-800">
                          Priya Sharma
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-800">
                          ₹899
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                            Shipped
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-800">
                          #ORD-1003
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-800">
                          Amit Singh
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-800">
                          ₹2,199
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                            Processing
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === "products" && (
            <div className="space-y-4 lg:space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
                  Your Products
                </h2>
                <Link
                  to="/AddProduct" // 🔹 replace with your actual route
                  className="
    w-full sm:w-auto 
    flex items-center justify-center 
    space-x-2 
    px-4 lg:px-6 
    py-2.5 lg:py-3 
    bg-gradient-to-r from-blue-600 to-purple-600 
    hover:from-blue-700 hover:to-purple-700 
    text-white 
    rounded-lg 
    transition-all 
    shadow-md 
    text-sm 
    transform hover:scale-105 
    font-medium 
    inline-flex
  "
                >
                  <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
                  <span>Add Product</span>
                </Link>
              </div>

              {/* Mobile Card View */}
              <div className="block lg:hidden space-y-3">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-md p-4 border border-gray-100"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm text-gray-800 mb-1">
                          {product.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {product.category}
                        </p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full ml-2 flex-shrink-0">
                        {product.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-3">
                      <div>
                        <p className="text-xs text-gray-500">Price</p>
                        <p className="text-sm font-semibold text-gray-800">
                          ₹{product.price}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Stock</p>
                        <p className="text-sm font-semibold text-gray-800">
                          {product.stock}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Sales</p>
                        <p className="text-sm font-semibold text-gray-800">
                          {product.sales}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 pt-3 border-t border-gray-100">
                      <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium">
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                      <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-purple-50 text-purple-600 rounded-lg text-xs font-medium">
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg text-xs font-medium">
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden lg:block bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                          Product Name
                        </th>
                        <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                          Price
                        </th>
                        <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                          Category
                        </th>
                        <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                          Stock
                        </th>
                        <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                          Status
                        </th>
                        <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                          Sales
                        </th>
                        <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr
                          key={product.id}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="py-4 px-6 text-sm text-gray-800 font-medium">
                            {product.name}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-800">
                            ₹{product.price}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-500">
                            {product.category}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-800">
                            {product.stock}
                          </td>
                          <td className="py-4 px-6">
                            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                              {product.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-800">
                            {product.sales}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-2">
                              <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors">
                                <Eye className="w-4 h-4 text-blue-600" />
                              </button>
                              <button className="p-2 hover:bg-purple-50 rounded-lg transition-colors">
                                <Edit className="w-4 h-4 text-purple-600" />
                              </button>
                              <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Wallet Tab */}
          {activeTab === "wallet" && (
            <div className="space-y-4 lg:space-y-6">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg sm:rounded-xl shadow-lg p-5 sm:p-6 lg:p-8 text-white">
                <p className="text-blue-100 text-xs sm:text-sm mb-2">
                  Available Balance
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5 lg:mb-6">
                  ₹45,280.00
                </h2>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-4">
                  <button className="flex-1 sm:flex-none px-4 sm:px-5 lg:px-6 py-2.5 sm:py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-sm">
                    Withdraw
                  </button>
                  <button className="flex-1 sm:flex-none px-4 sm:px-5 lg:px-6 py-2.5 sm:py-3 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition-colors text-sm">
                    History
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-3 sm:p-4 lg:p-6 border border-gray-100">
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 mb-3 sm:mb-4 lg:mb-6">
                  Bank Account Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Account Holder</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {formData.accountHolder}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Account Number</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {formData.accountNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">IFSC Code</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {formData.ifscCode}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Bank Name</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {formData.bankName}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-3 sm:p-4 lg:p-6 border border-gray-100">
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 mb-3 sm:mb-4 lg:mb-6">
                  Recent Transactions
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3 min-w-0 flex-1">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <IndianRupee className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-gray-800 truncate">
                          Payment Received
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          Order #ORD-1001
                        </p>
                      </div>
                    </div>
                    <p className="text-sm sm:text-base text-green-600 font-bold flex-shrink-0 ml-2">
                      +₹1,299
                    </p>
                  </div>
                  <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3 min-w-0 flex-1">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <IndianRupee className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-gray-800 truncate">
                          Payment Received
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          Order #ORD-1002
                        </p>
                      </div>
                    </div>
                    <p className="text-sm sm:text-base text-green-600 font-bold flex-shrink-0 ml-2">
                      +₹899
                    </p>
                  </div>
                  <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3 min-w-0 flex-1">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <IndianRupee className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-gray-800 truncate">
                          Withdrawal
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          To bank account
                        </p>
                      </div>
                    </div>
                    <p className="text-sm sm:text-base text-red-600 font-bold flex-shrink-0 ml-2">
                      -₹10,000
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="space-y-4 lg:space-y-6">
              <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-3 sm:p-4 lg:p-6 border border-gray-100">
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 mb-3 sm:mb-4 lg:mb-6">
                  Store Settings
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <InputField
                    label="Store Name"
                    name="storeName"
                    value={formData.storeName}
                    onChange={handleInputChange}
                  />
                  <TextAreaField
                    label="Store Address"
                    name="storeAddress"
                    value={formData.storeAddress}
                    onChange={handleInputChange}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <InputField
                      label="Pickup Address"
                      name="pickupAddress"
                      value={formData.pickupAddress}
                      onChange={handleInputChange}
                    />
                    <InputField
                      label="Pincode"
                      name="pickupPincode"
                      value={formData.pickupPincode}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button className="w-full sm:w-auto px-5 lg:px-6 py-2.5 lg:py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all shadow-md text-sm font-medium">
                    Save Changes
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-3 sm:p-4 lg:p-6 border border-gray-100">
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 mb-3 sm:mb-4 lg:mb-6">
                  Account Settings
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <InputField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    type="email"
                  />
                  <InputField
                    label="Mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    type="tel"
                  />
                  <button className="w-full sm:w-auto px-5 lg:px-6 py-2.5 lg:py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all shadow-md text-sm font-medium">
                    Update Account
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-3 sm:p-4 lg:p-6 border border-gray-100">
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 mb-3 sm:mb-4 lg:mb-6">
                  Business Information
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Type
                    </label>
                    <input
                      type="text"
                      value={formData.natureOfConcern}
                      disabled
                      className="w-full px-3 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 cursor-not-allowed text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Firm Name
                    </label>
                    <input
                      type="text"
                      value={formData.firmName}
                      disabled
                      className="w-full px-3 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 cursor-not-allowed text-sm"
                    />
                  </div>
                  <InputField
                    label="GSTIN"
                    name="gstin"
                    value={formData.gstin}
                    onChange={handleInputChange}
                  />
                  <p className="text-xs text-gray-500 italic">
                    Contact support to modify business type or firm name
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileResponsiveDashboard;
