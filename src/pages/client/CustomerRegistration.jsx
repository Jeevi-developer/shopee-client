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

const CustomerRegistration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState("register"); // 'register' or 'verifyOTP'
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    country: "",
    pincode: "",
    state: "",
    gender: "",
    dob: "",
    referralCode: "",
    agreeToTerms: false,
    emailOtp: "",
    smsOtp: "",
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
    // setMessage({ type: "", text: "" });
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
    if (!formData.mobile)
      return showMessage("error", "Mobile number is required");
    if (!formData.password || formData.password.length < 6)
      return showMessage("error", "Password must be at least 6 characters");
    if (formData.password !== formData.confirmPassword)
      return showMessage("error", "Passwords do not match");
    if (!formData.agreeToTerms)
      return showMessage("error", "Please accept Terms & Conditions");

    setLoading(true);

    try {
      // Send Email OTP
      await axiosInstance.post("/auth/send-otp", {
        email: formData.email,
      });

      // Send SMS OTP
      await axiosInstance.post("/auth/send-sms-otp", {
        mobile: formData.mobile,
      });

      showMessage("success", "Email OTP and SMS OTP sent!");
      setTimeout(() => setStep("verifyOTP"), 1500);
    } catch (error) {
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

    if (!formData.emailOtp || formData.emailOtp.length !== 6)
      return showMessage("error", "Enter valid 6-digit Email OTP");

    if (!formData.smsOtp || formData.smsOtp.length !== 6)
      return showMessage("error", "Enter valid 6-digit SMS OTP");

    setLoading(true);

    try {
      await axiosInstance.post("/auth/verify-otp", {
        email: formData.email,
        emailOtp: formData.emailOtp.toString(),
        smsOtp: formData.smsOtp.toString(),

        // registration data
        password: formData.password,
        name: formData.fullName,
        referralCode: formData.referralCode,
        mobile: formData.mobile,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        gender: formData.gender,
        dob: formData.dob,
        agreeToTerms: formData.agreeToTerms,
      });

      showMessage("success", "Registration successful! Redirecting...");

      setTimeout(() => {
        navigate("/Login");
      }, 2000);
    } catch (error) {
      showMessage(
        "error",
        error.response?.data?.message || "Invalid OTP or registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSendSMSOTP = async (e) => {
    e.preventDefault();

    if (!formData.mobile) {
      return showMessage("error", "Mobile number is required");
    }

    // Clean & format mobile number
    let formattedMobile = formData.mobile.toString().replace(/[^0-9]/g, "");

    // Add +91 if missing
    if (!formattedMobile.startsWith("91")) {
      formattedMobile = "91" + formattedMobile;
    }

    formattedMobile = "+" + formattedMobile;

    console.log("📤 Frontend sending mobile:", formattedMobile);

    setLoading(true);

    try {
      await axiosInstance.post("/auth/send-sms-otp", {
        mobile: formattedMobile,
      });

      showMessage("success", "SMS OTP sent!");
    } catch (error) {
      console.error("SMS OTP error:", error);
      showMessage("error", "Failed to send SMS OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmailOTP = () => {
    handleSendOTP({ preventDefault: () => {} });
  };

  const handleResendSMSOTP = () => {
    handleSendSMSOTP({ preventDefault: () => {} });
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
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 outline-none transition text-gray-700"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Others</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 outline-none transition text-gray-700"
                  required
                />
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
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Pincode
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 outline-none transition"
                  placeholder="400001"
                  pattern="[0-9]{6}"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 outline-none transition"
                  placeholder="Maharashtra"
                  required
                />
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
                  <Link
                    to="/TermsAndConditions"
                    className="text-indigo-600 font-medium"
                  >
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
                  <Link
                    to="/CustomerLogin"
                    className="text-indigo-600 font-semibold"
                  >
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
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-4 shadow-lg">
                <Mail className="text-white" size={40} />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Verify Your Account
              </h1>

              <p className="text-gray-600 text-sm">
                Email verification code sent to
              </p>
              <p className="text-purple-600 font-semibold mt-1 text-lg">
                {formData.email}
              </p>

              <p className="text-xs text-gray-500 mt-3">
                Please enter both Email OTP & SMS OTP
              </p>
            </div>

            <form onSubmit={handleVerifyOTP} className="space-y-6">
              {/* Email OTP */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 text-center">
                  Enter 6-Digit Email OTP
                </label>
                <input
                  type="text"
                  name="emailOtp"
                  value={formData.emailOtp}
                  onChange={handleChange}
                  maxLength={6}
                  className="w-full px-4 py-4 text-center text-3xl tracking-widest border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-0 outline-none transition font-mono text-gray-800"
                  placeholder="000000"
                  required
                />
              </div>

              <p className="text-gray-600 text-sm mt-4">
                SMS verification code sent to
              </p>
              <p className="text-pink-600 font-semibold mt-1 text-lg">
                {formData.mobile}
              </p>

              {/* SMS OTP */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 text-center">
                  Enter 6-Digit SMS OTP
                </label>
                <input
                  type="text"
                  name="smsOtp"
                  value={formData.smsOtp}
                  onChange={handleChange}
                  maxLength={6}
                  className="w-full px-4 py-4 text-center text-3xl tracking-widest border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:ring-0 outline-none transition font-mono text-gray-800"
                  placeholder="000000"
                  required
                />
              </div>

              <MessageAlert />

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3.5 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {loading ? "Verifying..." : "Verify & Complete Registration"}
              </button>

              {/* Resend Buttons */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => handleResendEmailOTP()}
                  disabled={loading}
                  className="w-full text-purple-600 hover:text-purple-700 font-medium py-2 transition disabled:opacity-50 text-sm"
                >
                  Resend Email OTP
                </button>

                <button
                  type="button"
                  onClick={() => handleResendSMSOTP()}
                  disabled={loading}
                  className="w-full text-pink-600 hover:text-pink-700 font-medium py-2 transition disabled:opacity-50 text-sm"
                >
                  Resend SMS OTP
                </button>
              </div>

              {/* Back */}
              <button
                type="button"
                onClick={() => setStep("register")}
                className="w-full text-gray-600 hover:text-gray-700 font-medium py-2 transition text-sm mt-2"
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

export default CustomerRegistration;
