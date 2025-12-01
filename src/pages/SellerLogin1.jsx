import React, { useState } from "react";
import {
  ArrowRight,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShoppingCart,
  ShoppingBag,
} from "lucide-react";
import authService from "../api/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // ✅ use context instead of manual sessionStorage

// ---------------- SELLER LOGIN ---------------- //
function SellerLogin({ switchToRegister }) {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setToken, setSeller } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({}); // clear old errors

    // 🧩 Basic validation
    const newErrors = {};
    if (!loginData.email) newErrors.email = "Email is required";
    if (!loginData.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      // 🔥 Call backend API
      const response = await authService.login({
        emailOrMobile: loginData.email,
        password: loginData.password,
        userType: "seller",
      });

      console.log("✅ FULL LOGIN RESPONSE:", response);
      console.log("✅ Response Data:", response.data);
      console.log("✅ Response Token:", response.token || response.data?.token);
      console.log("✅ Response User:", response.user || response.data?.user);

      // 🧠 Handle different response structures
      const token = response?.token || response?.data?.token;
      const user = response?.user || response?.data?.user;
      const message = response?.message || response?.data?.message;

      if (token && user) {
        // Store in context (NOT in sessionStorage as per artifact restrictions)
        setToken(token);
        setSeller(user);

        alert(message || "Login successful!");
        navigate("/MainDashboard");

      } else {
        console.error("❌ Missing token or user in response:", {
          token,
          user,
          fullResponse: response,
        });
        alert("Invalid response from server. Missing authentication data.");
      }
    } catch (error) {
      console.error("❌ Login Error Full:", error);
      console.error("❌ Error Response:", error.response);
      console.error("❌ Error Data:", error.response?.data);
      console.error("❌ Error Message:", error.message);

      const errorMsg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Login failed. Please check your credentials.";

      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
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

            <div className="space-y-2 mt-4">
              <button
                type="button"
                onClick={switchToRegister}
                className="w-full border-2 border-green-600 text-green-600 py-3 rounded-lg font-semibold hover:bg-green-50 transition-all"
              >
                Register as Seller
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// ---------------- SELLER REGISTRATION ---------------- //
function SellerRegistration({ switchToLogin }) {
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    address: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.businessName)
      newErrors.businessName = "Business name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.mobile) newErrors.mobile = "Mobile is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords don't match";
    return newErrors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await authService.sellerRegister(formData);
      alert(response.message || "Registration successful!");
      switchToLogin();
    } catch (error) {
      alert(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <ShoppingBag className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">
              Seller Registration
            </h1>
            <p className="text-gray-600 mt-2">Create your seller account</p>
          </div>

          <form className="space-y-4" onSubmit={handleRegister}>
            {/* Inputs */}
            {[
              {
                label: "Business Name",
                key: "businessName",
                type: "text",
                placeholder: "Enter business name",
              },
              {
                label: "Email",
                key: "email",
                type: "email",
                placeholder: "Enter email",
              },
              {
                label: "Mobile",
                key: "mobile",
                type: "text",
                placeholder: "Enter mobile number",
              },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={formData[field.key]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.key]: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder={field.placeholder}
                />
                {errors[field.key] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[field.key]}
                  </p>
                )}
              </div>
            ))}

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Confirm password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address (Optional)
              </label>
              <textarea
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter business address"
                rows="2"
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register as Seller"}
            </button>

            <p className="text-center text-gray-600 mt-4">
              Already have a seller account?{" "}
              <button
                type="button"
                onClick={switchToLogin}
                className="text-green-600 font-semibold hover:text-green-700"
              >
                Login
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

// ---------------- MAIN AUTH PAGE ---------------- //
export default function SellerAuthPage() {
  const [view, setView] = useState("login");
  return view === "login" ? (
    <SellerLogin switchToRegister={() => setView("register")} />
  ) : (
    <SellerRegistration switchToLogin={() => setView("login")} />
  );
}
