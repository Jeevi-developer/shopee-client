import React, { useState } from "react";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Gift,
  Phone,
  MapPin, // ✅ added missing icon import
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../api/axios";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState("register"); // 'register' or 'verifyOTP'
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    referralCode: "",
    otp: "",
    address: "",
    city: "",
    country: "",
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // ✅ Updated for Render backend
  // const API_BASE_URL = "https://shopee-server-2.onrender.com/api";

  const API_BASE_URL = "http://localhost:5000/api";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setMessage({ type: "", text: "" });
  };

  const showMessage = (type, text, duration = 5000) => {
    setMessage({ type, text });
    if (duration > 0) {
      setTimeout(() => setMessage({ type: "", text: "" }), duration);
    }
  };

  // Step 1: Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();

    if (!formData.fullName)
      return showMessage("error", "Full name is required");
    if (!formData.email) return showMessage("error", "Email is required");
    if (!formData.password || formData.password.length < 6)
      return showMessage("error", "Password must be at least 6 characters");
    if (formData.password !== formData.confirmPassword)
      return showMessage("error", "Passwords do not match");
    if (!formData.agreeToTerms)
      return showMessage("error", "Please accept Terms & Conditions");

    setLoading(true);
    try {
      await axiosInstance.post(`${API_BASE_URL}/auth/send-otp`, {
        email: formData.email,
      });
      showMessage("success", "OTP sent to your email!");
      setTimeout(() => setStep("verifyOTP"), 1500);
    } catch (error) {
      console.error("Send OTP error:", error);
      showMessage(
        "error",
        error.response?.data?.message || "Failed to send OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    if (!formData.otp || formData.otp.length !== 6)
      return showMessage("error", "Please enter 6-digit OTP");

    setLoading(true);
    console.log("Sending:", formData);
    try {
      const response = await axiosInstance.post(
        `${API_BASE_URL}/auth/verify-otp`,
        {
          email: formData.email,
          otp: formData.otp,
          password: formData.password,
          name: formData.fullName,
          referralCode: formData.referralCode,
        }
      );

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
      }

      showMessage(
        "success",
        "Registration successful! Redirecting to login...",
        0
      );
      setTimeout(() => {
        navigate("/LoginPage", {
          state: {
            message: "Registration successful! Please login to continue.",
          },
        });
      }, 2000);
    } catch (error) {
      console.error("Verify OTP error:", error);
      showMessage(
        "error",
        error.response?.data?.message || "Invalid OTP or registration failed"
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

  // ============================
  // STEP 1: Registration Form
  // ============================
  if (step === "register") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                <User className="text-white" size={40} />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Create Your Account
              </h1>
              <p className="text-gray-600 text-sm">
                Join us and start your journey today
              </p>
            </div>

            <form onSubmit={handleSendOTP} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User
                    className="absolute left-4 top-3.5 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 outline-none transition text-gray-700"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
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
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mobile Number
                </label>
                <div className="relative">
                  <Phone
                    className="absolute left-4 top-3.5 text-gray-400"
                    size={20}
                  />
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 outline-none transition text-gray-700"
                    placeholder="Enter your mobile number"
                    pattern="[0-9]{10}"
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
                    placeholder="Create password"
                    minLength={6}
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

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-4 top-3.5 text-gray-400"
                    size={20}
                  />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 outline-none transition text-gray-700"
                    placeholder="Re-enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute left-4 top-3.5 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 outline-none transition text-gray-700"
                    placeholder="123 Main Street"
                    required
                  />
                </div>
              </div>

              {/* City & Country */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 outline-none transition"
                    placeholder="Mumbai"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 outline-none transition"
                    placeholder="India"
                  />
                </div>
              </div>

              {/* Referral Code */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Referral Code{" "}
                  <span className="text-gray-500">(Optional)</span>
                </label>
                <div className="relative">
                  <Gift
                    className="absolute left-4 top-3.5 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    name="referralCode"
                    value={formData.referralCode}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 outline-none transition"
                    placeholder="Enter referral code"
                  />
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  required
                />
                <label className="text-sm text-gray-600 leading-relaxed">
                  I agree to the{" "}
                  <Link to="/terms" className="text-indigo-600 font-medium">
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-indigo-600 font-medium">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <MessageAlert />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {loading ? "Sending OTP..." : "Create Account"}
              </button>

              <div className="text-center pt-4">
                <p className="text-gray-600 text-sm">
                  Already have an account?{" "}
                  <Link to="/Login" className="text-indigo-600 font-semibold">
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ============================
  // STEP 2: OTP Verification
  // ============================
  if (step === "verifyOTP") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-rose-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-4 shadow-lg">
                <Mail className="text-white" size={40} />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Verify Your Email
              </h1>
              <p className="text-gray-600 text-sm">Code sent to</p>
              <p className="text-purple-600 font-semibold mt-1 text-lg">
                {formData.email}
              </p>
              <p className="text-xs text-gray-500 mt-3">
                ✉️ Check your inbox for the 6-digit code
              </p>
            </div>

            <form onSubmit={handleVerifyOTP} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 text-center">
                  Enter 6-Digit Code
                </label>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  maxLength={6}
                  className="w-full px-4 py-4 text-center text-3xl tracking-widest border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-0 outline-none transition font-mono text-gray-800"
                  placeholder="000000"
                  required
                />
              </div>

              <MessageAlert />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3.5 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {loading ? "Verifying..." : "Verify & Complete Registration"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setFormData({ ...formData, otp: "" });
                  handleSendOTP({ preventDefault: () => {} });
                }}
                disabled={loading}
                className="w-full text-purple-600 hover:text-purple-700 font-medium py-2 transition disabled:opacity-50 text-sm"
              >
                Didn't receive code?{" "}
                <span className="underline font-semibold">Resend OTP</span>
              </button>

              <button
                type="button"
                onClick={() => setStep("register")}
                className="w-full text-gray-600 hover:text-gray-700 font-medium py-2 transition text-sm"
              >
                ← Back to Registration
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default RegisterPage;
