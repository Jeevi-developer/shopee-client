import React, { useState } from "react";
import {
  ArrowRight,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShoppingCart,
} from "lucide-react";
import sellerService from "../../api/sellerService";
import { useNavigate } from "react-router-dom";

function SellerLogin() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({});

    const newErrors = {};
    if (!loginData.email) newErrors.email = "Email is required";
    if (!loginData.password) newErrors.password = "Password is required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await sellerService.login({
        email: loginData.email,
        password: loginData.password,
      });

      console.log("✅ Seller Login Response:", response);

      const token = response?.token;
      const seller = response?.seller;

      if (token && seller) {
        // ✅ Save all login info in localStorage
        localStorage.setItem("authToken", token);
        localStorage.setItem("sellerData", JSON.stringify(seller));
        localStorage.setItem("userType", "seller");
        localStorage.setItem("sellerApproved", seller.isApproved); // true/false

        navigate("/SellerDashboard");
      } else {
        console.error("❌ Missing token or seller in response:", response);
      }
    } catch (error) {
      console.error("❌ Login Error:", error);
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please check your credentials.";
      setErrors({ general: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <ShoppingCart className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Seller Login</h1>
          <p className="text-gray-600 mt-2">Access your seller dashboard</p>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter email"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type={showPassword ? "text" : "password"}
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? "Logging in..." : "Login"} <ArrowRight size={20} />
          </button>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => navigate("/seller/forgot-password")}
              className="text-green-600 hover:text-green-700 text-sm font-medium"
            >
              Forgot Password?
            </button>

            {/* Register as Seller Button */}
            <button
              type="button"
              onClick={() => navigate("/SellerRegistration")}
              className="w-full border-2 border-green-600 text-green-600 py-3 rounded-lg font-semibold hover:bg-green-50 transition-all mt-2"
            >
              Register as Seller
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SellerLogin;
