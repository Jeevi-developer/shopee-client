import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Lock,
  Mail,
  Eye,
  EyeOff,
  LogIn,
  User,
  Phone,
  MapPin,
  Calendar,
  Edit,
  LogOut,
} from "lucide-react";
import authService from "../../api/authService";
import { useNavigate } from "react-router-dom";

// Form Validation Helper
const validateForm = {
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return "Email is required";
    if (!emailRegex.test(value)) return "Invalid email format";
    return "";
  },
  mobile: (value) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!value) return "Mobile number is required";
    if (!mobileRegex.test(value))
      return "Invalid mobile number (10 digits starting with 6-9)";
    return "";
  },
  emailOrMobile: (value) => {
    if (!value) return "Email or mobile is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!emailRegex.test(value) && !mobileRegex.test(value)) {
      return "Enter valid email or 10-digit mobile number";
    }
    return "";
  },
  password: (value) => {
    if (!value) return "Password is required";
    if (value.length < 6) return "Password must be at least 6 characters";
    return "";
  },
  otp: (value) => {
    if (!value) return "OTP is required";
    if (!/^\d{6}$/.test(value)) return "OTP must be 6 digits";
    return "";
  },
};

// User Profile Component
function UserProfile({ userData, onLogout, onBack }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: userData.name || "",
    email: userData.email || "",
    mobile: userData.mobile || "",
    address: userData.address || "",
    city: userData.city || "",
    state: userData.state || "",
    pincode: userData.pincode || "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpdate = async () => {
    const newErrors = {};
    if (!profileData.name) newErrors.name = "Name is required";
    if (profileData.email && validateForm.email(profileData.email)) {
      newErrors.email = validateForm.email(profileData.email);
    }
    if (profileData.mobile && validateForm.mobile(profileData.mobile)) {
      newErrors.mobile = validateForm.mobile(profileData.mobile);
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await authService.updateProfile(profileData);
      sessionStorage.setItem("userData", JSON.stringify(response.user));
      setMessage("Profile updated successfully!");
      setIsEditing(false);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                  <User className="text-blue-600" size={40} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">
                    {userData.name || "User"}
                  </h1>
                  <p className="text-blue-100 mt-1">Customer Account</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-white text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-50 transition-all"
              >
                <LogOut size={20} /> Logout
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Personal Information
              </h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
                >
                  <Edit size={18} /> Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    disabled={loading}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all disabled:opacity-50"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}
            </div>

            {message && (
              <div
                className={`mb-4 p-4 rounded-lg ${
                  message.includes("success")
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {message}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline mr-2" size={16} />
                  Full Name
                </label>
                {isEditing ? (
                  <div>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) =>
                        setProfileData({ ...profileData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-900 font-semibold text-lg">
                    {userData.name || "Not provided"}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline mr-2" size={16} />
                  Email Address
                </label>
                {isEditing ? (
                  <div>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-900 font-semibold text-lg">
                    {userData.email || "Not provided"}
                  </p>
                )}
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="inline mr-2" size={16} />
                  Mobile Number
                </label>
                {isEditing ? (
                  <div>
                    <input
                      type="text"
                      value={profileData.mobile}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          mobile: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter mobile number"
                    />
                    {errors.mobile && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.mobile}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-900 font-semibold text-lg">
                    {userData.mobile || "Not provided"}
                  </p>
                )}
              </div>

              {/* Account Created */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline mr-2" size={16} />
                  Account Created
                </label>
                <p className="text-gray-900 font-semibold text-lg">
                  {userData.createdAt
                    ? new Date(userData.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline mr-2" size={16} />
                  Address
                </label>
                {isEditing ? (
                  <textarea
                    value={profileData.address}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        address: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Enter your address"
                  />
                ) : (
                  <p className="text-gray-900 font-semibold text-lg">
                    {userData.address || "Not provided"}
                  </p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.city}
                    onChange={(e) =>
                      setProfileData({ ...profileData, city: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter city"
                  />
                ) : (
                  <p className="text-gray-900 font-semibold text-lg">
                    {userData.city || "Not provided"}
                  </p>
                )}
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.state}
                    onChange={(e) =>
                      setProfileData({ ...profileData, state: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter state"
                  />
                ) : (
                  <p className="text-gray-900 font-semibold text-lg">
                    {userData.state || "Not provided"}
                  </p>
                )}
              </div>

              {/* Pincode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pincode
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.pincode}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        pincode: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter pincode"
                  />
                ) : (
                  <p className="text-gray-900 font-semibold text-lg">
                    {userData.pincode || "Not provided"}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Customer Login Component
function CustomerLogin({ setCurrentPage, onLoginSuccess, switchToSignup }) {
  const [loginData, setLoginData] = useState({
    emailOrMobile: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setLoginData({ ...loginData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate form
    const newErrors = {};
    const emailOrMobileError = validateForm.emailOrMobile(
      loginData.emailOrMobile
    );
    const passwordError = validateForm.password(loginData.password);

    if (emailOrMobileError) newErrors.emailOrMobile = emailOrMobileError;
    if (passwordError) newErrors.password = passwordError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await authService.login({
        emailOrMobile: loginData.emailOrMobile,
        password: loginData.password,
        userType: "customer",
      });

      // Store auth data
      sessionStorage.setItem("authToken", response.token);
      sessionStorage.setItem("userType", "customer");
      sessionStorage.setItem("userData", JSON.stringify(response.user));

      // Show success message briefly before redirecting
      setErrors({
        success: response.message || "Login successful! Redirecting...",
      });

      // Redirect to profile after 1.5 seconds
      setTimeout(() => {
        onLoginSuccess({ ...response, userType: "customer" });
      }, 1500);
    } catch (error) {
      setErrors({
        general:
          error.response?.data?.message ||
          error.message ||
          "Login failed. Please check your credentials.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <LogIn className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Customer Login</h1>
            <p className="text-gray-600 mt-2">Sign in to your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email or Mobile Number
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  value={loginData.emailOrMobile}
                  onChange={(e) =>
                    handleInputChange("emailOrMobile", e.target.value)
                  }
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-gray-900 ${
                    errors.emailOrMobile
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-200 focus:ring-blue-500"
                  }`}
                  placeholder="Enter email or mobile"
                />
              </div>
              {errors.emailOrMobile && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <span>⚠</span> {errors.emailOrMobile}
                </p>
              )}
            </div>

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
                    handleInputChange("password", e.target.value)
                  }
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 text-gray-900 ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-200 focus:ring-blue-500"
                  }`}
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <span>⚠</span> {errors.password}
                </p>
              )}
            </div>

            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm text-center">
                  {errors.general}
                </p>
              </div>
            )}

            {errors.success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-green-600 text-sm text-center font-semibold">
                  {errors.success}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Logging in...
                </>
              ) : (
                <>
                  Login <ArrowRight size={20} />
                </>
              )}
            </button>

            <div className="flex items-center gap-4 my-4">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-gray-500 text-sm">OR</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={switchToSignup}
                className="w-full border-2 border-purple-600 text-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-all"
              >
                Sign Up with OTP
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage("seller-login")}
                className="w-full border-2 border-green-600 text-green-600 py-3 rounded-lg font-semibold hover:bg-green-50 transition-all"
              >
                Seller Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Customer Signup Component
function CustomerSignup({ setCurrentPage, onLoginSuccess, switchToLogin }) {
  const [signupData, setSignupData] = useState({ mobile: "", otp: "" });
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setTimeout(() => setTimer(timer - 1), 1000);
    }
    return () => clearTimeout(countdown);
  }, [timer]);

  const handleInputChange = (field, value) => {
    setSignupData({ ...signupData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const sendOtp = async () => {
    const mobileError = validateForm.mobile(signupData.mobile);
    if (mobileError) {
      setErrors({ mobile: mobileError });
      setMessage("");
      return;
    }

    setLoading(true);
    setErrors({});
    try {
      const response = await authService.sendOtp(signupData.mobile);
      setOtpSent(true);
      setMessage(response.message || "OTP sent successfully!");
      setTimer(30);
    } catch (error) {
      setMessage("");
      setErrors({ general: error.message || "Error sending OTP" });
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    const otpError = validateForm.otp(signupData.otp);
    if (otpError) {
      setErrors({ otp: otpError });
      setMessage("");
      return;
    }

    setLoading(true);
    setErrors({});
    try {
      const response = await authService.verifyOtp(signupData);

      if (response.success) {
        setVerified(true);
        setMessage("OTP verified successfully! Redirecting to profile...");
        sessionStorage.setItem("authToken", response.token);
        sessionStorage.setItem("userType", "customer");
        sessionStorage.setItem("userData", JSON.stringify(response.user));
        setTimeout(() => {
          onLoginSuccess({ ...response, userType: "customer" });
        }, 1500);
      } else {
        setMessage("");
        setErrors({ otp: "Invalid OTP. Please try again." });
      }
    } catch (error) {
      setMessage("");
      setErrors({ general: error.message || "Error verifying OTP" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <Phone className="text-white" size={32} />
          </div>
          <h1 className="text-2xl font-bold">Sign Up with OTP</h1>
          <p className="text-gray-600 mt-2">Quick registration via mobile</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mobile Number
          </label>
          <input
            type="text"
            value={signupData.mobile}
            onChange={(e) => handleInputChange("mobile", e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.mobile
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-purple-500"
            }`}
            placeholder="Enter 10-digit mobile number"
            disabled={otpSent}
            maxLength={10}
          />
          {errors.mobile && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <span>⚠</span> {errors.mobile}
            </p>
          )}
        </div>

        {!otpSent && (
          <button
            onClick={sendOtp}
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 mb-4 disabled:opacity-50 font-semibold transition-all"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending OTP...
              </span>
            ) : (
              "Send OTP"
            )}
          </button>
        )}

        {otpSent && !verified && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter OTP
            </label>
            <input
              type="text"
              value={signupData.otp}
              onChange={(e) => handleInputChange("otp", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.otp
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-purple-500"
              }`}
              placeholder="Enter 6-digit OTP"
              maxLength={6}
            />
            {errors.otp && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <span>⚠</span> {errors.otp}
              </p>
            )}

            <button
              onClick={sendOtp}
              disabled={timer > 0 || loading}
              className="mt-2 text-sm text-purple-600 hover:text-purple-800 disabled:opacity-50 font-semibold"
            >
              {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
            </button>

            <button
              onClick={verifyOtp}
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 mt-4 disabled:opacity-50 font-semibold transition-all"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Verifying...
                </span>
              ) : (
                "Verify OTP"
              )}
            </button>
          </div>
        )}

        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-red-600 text-sm text-center">{errors.general}</p>
          </div>
        )}

        {message && (
          <div
            className={`border rounded-lg p-3 mb-4 ${
              verified
                ? "bg-green-50 border-green-200"
                : "bg-blue-50 border-blue-200"
            }`}
          >
            <p
              className={`text-sm text-center font-semibold ${
                verified ? "text-green-700" : "text-blue-700"
              }`}
            >
              {message}
            </p>
          </div>
        )}

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <button
            onClick={switchToLogin}
            className="text-purple-600 font-semibold hover:text-purple-700"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

// Main Customer Auth Page Component
export default function CustomerAuthPage({ setCurrentPage, onLoginSuccess }) {
  const [view, setView] = useState("login"); // "login", "signup", or "profile"
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const token = sessionStorage.getItem("authToken");
    const storedUserData = sessionStorage.getItem("userData");
    if (token && storedUserData) {
      setUserData(JSON.parse(storedUserData));
      setView("profile");
    }
  }, []);

  const handleLoginSuccess = (response) => {
    setUserData(response.user);
    setView("profile");
    if (onLoginSuccess) {
      onLoginSuccess(response);
    }
  };

  const handleLogout = () => {
    setUserData(null);
    setView("login");
    if (setCurrentPage) {
      setCurrentPage("home");
    }
  };

  if (view === "profile" && userData) {
    return (
      <UserProfile
        userData={userData}
        onLogout={handleLogout}
        onBack={() => setView("login")}
      />
    );
  }

  return (
    <>
      {view === "login" ? (
        <CustomerLogin
          setCurrentPage={setCurrentPage}
          onLoginSuccess={handleLoginSuccess}
          switchToSignup={() => setView("signup")}
        />
      ) : (
        <CustomerSignup
          setCurrentPage={setCurrentPage}
          onLoginSuccess={handleLoginSuccess}
          switchToLogin={() => setView("login")}
        />
      )}
    </>
  );
}
