import React, { useState, useEffect } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

const CustomerLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setCustomer, setToken } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

  useEffect(() => {
    if (location.state?.message) {
      showMessage("success", location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const showMessage = (type, text, duration = 5000) => {
    setMessage({ type, text });
    if (duration > 0) {
      setTimeout(() => setMessage({ type: "", text: "" }), duration);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setMessage({ type: "", text: "" });
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) return "Email is required";
    if (!emailRegex.test(formData.email)) return "Invalid email format";
    if (!formData.password) return "Password is required";
    if (formData.password.length < 6)
      return "Password must be at least 6 characters";
    return null;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) return showMessage("error", validationError);

    setLoading(true);

    try {
      let response;

      // 1️⃣ Try ADMIN login first
      try {
        response = await axios.post(`${API_BASE_URL}/admin/Login`, {
          emailOrMobile: formData.email.trim(),
          password: formData.password,
        });

        const { token, user } = response.data;

        // Save admin session
        sessionStorage.setItem("adminToken", token);
        sessionStorage.setItem("adminAuthData", JSON.stringify(user));
        sessionStorage.setItem("userType", "admin");

        // AuthContext update
        setAdmin(user);
        setToken(token);

        showMessage("success", "Admin login successful!", 0);

        setTimeout(() => navigate("/AdminDashboard"), 500);
        return;
      } catch (adminError) {
        // Ignore admin error → try customer login next
      }

      // 2️⃣ Not admin → now try CUSTOMER login
      response = await axios.post(`${API_BASE_URL}/auth/Login`, {
        emailOrMobile: formData.email.trim(),
        password: formData.password,
      });

      const { token, user } = response.data;

      // Save customer session
      sessionStorage.setItem("authToken", token);
      sessionStorage.setItem("userData", JSON.stringify(user));
      sessionStorage.setItem("userType", "customer");

      // Update AuthContext
      setCustomer(user);
      setToken(token);

      showMessage("success", "Login successful!", 0);

      setTimeout(() => navigate("/CustomerDashboard"), 500);
    } catch (error) {
      showMessage(
        "error",
        error.response?.data?.message || "Invalid credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  const MessageAlert = () => {
    if (!message.text) return null;
    const isSuccess = message.type === "success";
    return (
      <div
        className={`flex items-center gap-3 p-4 rounded-xl animate-fadeIn ${
          isSuccess
            ? "bg-green-50 border border-green-200"
            : "bg-red-50 border border-red-200"
        }`}
      >
        {isSuccess ? (
          <CheckCircle className="text-green-600 flex-shrink-0" size={22} />
        ) : (
          <AlertCircle className="text-red-600 flex-shrink-0" size={22} />
        )}
        <span
          className={`${
            isSuccess ? "text-green-700" : "text-red-700"
          } font-medium text-sm`}
        >
          {message.text}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <Lock className="text-white" size={40} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Login</h1>
            <p className="text-gray-600 text-sm">Sign in to your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <MessageAlert />

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-3.5 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 outline-none transition text-gray-700"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-3.5 text-gray-400"
                  size={20}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 outline-none transition text-gray-700"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          © 2024 Your Company. All rights reserved.
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-in-out; }
      `}</style>
    </div>
  );
};

export default CustomerLogin;
