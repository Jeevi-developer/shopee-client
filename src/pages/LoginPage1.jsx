import React, { useState, useEffect } from "react";
import {
  User,
  ArrowRight,
  Lock,
  Mail,
  Eye,
  EyeOff,
  LogIn,
  LogOut,
  Home,
  ShoppingBag,
  Package,
  Settings,
  Menu,
  X,
} from "lucide-react";
import authService from "../api/authService";

function CustomerLogin({ setCurrentPage, onLoginSuccess }) {
  const [loginData, setLoginData] = useState({
    emailOrMobile: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

 const handleLogin = async (e) => {
  e.preventDefault();
  const newErrors = {};
  if (!loginData.emailOrMobile)
    newErrors.emailOrMobile = "Email or mobile is required";
  if (!loginData.password) newErrors.password = "Password is required";
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setLoading(true);
  try {
    const response = await authService.login({
      emailOrMobile: loginData.emailOrMobile,
      password: loginData.password,
      userType: "customer", // important!
    });

    sessionStorage.setItem("authToken", response.token);
    sessionStorage.setItem("userType", "customer");
    sessionStorage.setItem("userData", JSON.stringify(response.user));
    onLoginSuccess({ ...response, userType: "customer" });
    alert(response.message || "Login successful!");
  } catch (error) {
    setErrors({ general: error.response?.data?.message || error.message || "Login failed" });
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

          <div className="space-y-4">
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
                    setLoginData({
                      ...loginData,
                      emailOrMobile: e.target.value,
                    })
                  }
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="Enter email or mobile"
                />
              </div>
              {errors.emailOrMobile && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.emailOrMobile}
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
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  onKeyPress={(e) => e.key === "Enter" && handleLogin(e)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
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
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"} <ArrowRight size={20} />
            </button>

            <div className="flex items-center gap-4 my-4">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-gray-500 text-sm">OR</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setCurrentPage("signup")}
                className="w-full border-2 border-purple-600 text-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-all"
              >
                Sign Up with OTP
              </button>
              <button
                onClick={() => setCurrentPage("seller-login")}
                className="w-full border-2 border-green-600 text-green-600 py-3 rounded-lg font-semibold hover:bg-green-50 transition-all"
              >
                Seller Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomerSignup({ setCurrentPage, onLoginSuccess }) {
  const [signupData, setSignupData] = useState({ mobile: "", otp: "" });
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setTimeout(() => setTimer(timer - 1), 1000);
    }
    return () => clearTimeout(countdown);
  }, [timer]);

  const sendOtp = async () => {
    if (!signupData.mobile) {
      setMessage("Please enter mobile number");
      return;
    }
    setLoading(true);
    try {
      const response = await authService.sendOtp(signupData.mobile);
      setOtpSent(true);
      setMessage(response.message || "OTP sent successfully!");
      setTimer(30);
    } catch (error) {
      setMessage(error.message || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!signupData.otp) {
      setMessage("Please enter OTP");
      return;
    }
    setLoading(true);
    try {
      const response = await authService.verifyOtp(signupData);

      if (response.success) {
        setVerified(true);
        setMessage("OTP verified successfully!");
        sessionStorage.setItem("authToken", response.token);
        sessionStorage.setItem("userType", "customer");
        sessionStorage.setItem("userData", JSON.stringify(response.user));
        setTimeout(() => {
          onLoginSuccess({ ...response, userType: "customer" });
        }, 1500);
      } else {
        setMessage("Invalid OTP. Try again.");
      }
    } catch (error) {
      setMessage(error.message || "Error verifying OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-center mb-6">
          Sign Up with OTP
        </h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mobile Number
          </label>
          <input
            type="text"
            name="mobile"
            value={signupData.mobile}
            onChange={(e) =>
              setSignupData({ ...signupData, mobile: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter mobile number"
            disabled={otpSent}
          />
        </div>

        {!otpSent && (
          <button
            onClick={sendOtp}
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 mb-4 disabled:opacity-50"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        )}

        {otpSent && !verified && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter OTP
            </label>
            <input
              type="text"
              name="otp"
              value={signupData.otp}
              onChange={(e) =>
                setSignupData({ ...signupData, otp: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter OTP"
            />

            <button
              onClick={sendOtp}
              disabled={timer > 0 || loading}
              className="mt-2 text-sm text-purple-600 hover:text-purple-800 disabled:opacity-50"
            >
              {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
            </button>

            <button
              onClick={verifyOtp}
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 mt-4 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        )}

        {verified && (
          <p className="text-green-600 text-center font-semibold mb-4">
            OTP Verified!
          </p>
        )}
        {message && (
          <p className="text-center text-gray-700 text-sm mb-2">{message}</p>
        )}

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <button
            onClick={() => setCurrentPage("login")}
            className="text-purple-600 font-semibold hover:text-purple-700"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

function SellerRegistration({ setCurrentPage }) {
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
      setCurrentPage("seller-login");
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

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Name
              </label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) =>
                  setFormData({ ...formData, businessName: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter business name"
              />
              {errors.businessName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.businessName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile
              </label>
              <input
                type="text"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter mobile number"
              />
              {errors.mobile && (
                <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
              )}
            </div>

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

            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register as Seller"}
            </button>

            <p className="text-center text-gray-600 mt-4">
              Already have a seller account?{" "}
              <button
                onClick={() => setCurrentPage("seller-login")}
                className="text-green-600 font-semibold hover:text-green-700"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SellerLogin({ setCurrentPage, onLoginSuccess }) {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!loginData.email) newErrors.email = "Email is required";
    if (!loginData.password) newErrors.password = "Password is required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await authService.login({
        emailOrMobile: loginData.email,
        password: loginData.password,
        userType: "seller", // important!
      });

      sessionStorage.setItem("authToken", response.token);
      sessionStorage.setItem("userType", "seller");
      sessionStorage.setItem("userData", JSON.stringify(response.user));
      onLoginSuccess({ ...response, userType: "seller" });
      alert(response.message || "Login successful!");
    } catch (error) {
      alert(error.response?.data?.message || error.message || "Login failed");
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
            <h1 className="text-3xl font-bold text-gray-800">Seller Login</h1>
            <p className="text-gray-600 mt-2">Access your seller dashboard</p>
          </div>

          <div className="space-y-4">
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
                  onKeyPress={(e) => e.key === "Enter" && handleLogin(e)}
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

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? "Logging in..." : "Login"} <ArrowRight size={20} />
            </button>

            <div className="space-y-2 mt-4">
              <button
                onClick={() => setCurrentPage("seller-register")}
                className="w-full border-2 border-green-600 text-green-600 py-3 rounded-lg font-semibold hover:bg-green-50 transition-all"
              >
                Register as Seller
              </button>
              <button
                onClick={() => setCurrentPage("login")}
                className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all"
              >
                Back to Customer Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomerHomePage({ onLogout }) {
  const [showProfile, setShowProfile] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("userData") || "{}");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Home className="text-blue-600" size={28} />
            <h1 className="text-2xl font-bold text-gray-800">ShopZone</h1>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-full transition-all"
            >
              <User size={20} className="text-blue-600" />
              <span className="font-medium text-gray-800">
                {user.name || user.mobile || "User"}
              </span>
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <User size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold">{user.name || "Customer"}</p>
                      <p className="text-sm opacity-90">
                        {user.email || user.mobile}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg flex items-center gap-3">
                    <User size={18} className="text-gray-600" />
                    <span>My Profile</span>
                  </button>
                  <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg flex items-center gap-3">
                    <Package size={18} className="text-gray-600" />
                    <span>My Orders</span>
                  </button>
                  <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg flex items-center gap-3">
                    <Settings size={18} className="text-gray-600" />
                    <span>Settings</span>
                  </button>
                  <hr className="my-2" />
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

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome to ShopZone!
          </h2>
          <p className="text-gray-600 mb-6">
            Browse thousands of products from verified sellers
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="p-6 bg-blue-50 rounded-lg">
              <ShoppingBag className="mx-auto mb-3 text-blue-600" size={40} />
              <h3 className="font-semibold text-lg mb-2">Shop Products</h3>
              <p className="text-gray-600 text-sm">Discover amazing deals</p>
            </div>
            <div className="p-6 bg-purple-50 rounded-lg">
              <Package className="mx-auto mb-3 text-purple-600" size={40} />
              <h3 className="font-semibold text-lg mb-2">Track Orders</h3>
              <p className="text-gray-600 text-sm">Monitor your deliveries</p>
            </div>
            <div className="p-6 bg-green-50 rounded-lg">
              <User className="mx-auto mb-3 text-green-600" size={40} />
              <h3 className="font-semibold text-lg mb-2">Your Account</h3>
              <p className="text-gray-600 text-sm">Manage your profile</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function SellerDashboard({ onLogout }) {
  const [showProfile, setShowProfile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const seller = JSON.parse(sessionStorage.getItem("userData") || "{}");

  return (
    <div className="min-h-screen bg-gray-50">
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

          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 bg-green-100 hover:bg-green-200 px-4 py-2 rounded-full transition-all"
            >
              <User size={20} className="text-green-600" />
              <span className="font-medium text-gray-800">
                {seller.businessName || seller.email || seller.phonenumber || "Seller"}
              </span>
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-blue-600 p-4 text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <ShoppingBag size={24} className="text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold">
                        {seller.businessName || "Seller"}
                      </p>
                      <p className="text-sm opacity-90">{seller.email}</p>
                       <p className="text-sm opacity-90">{seller.phonenumber}</p>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg flex items-center gap-3">
                    <User size={18} className="text-gray-600" />
                    <span>Business Profile</span>
                  </button>
                  <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg flex items-center gap-3">
                    <Settings size={18} className="text-gray-600" />
                    <span>Settings</span>
                  </button>
                  <hr className="my-2" />
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
        <aside
          className={`${
            sidebarOpen ? "block" : "hidden"
          } lg:block w-64 bg-white shadow-lg min-h-screen p-4`}
        >
          <nav className="space-y-2">
            <button className="w-full text-left px-4 py-3 bg-green-50 text-green-600 rounded-lg font-semibold flex items-center gap-3">
              <Home size={20} />
              <span>Dashboard</span>
            </button>
            <button className="w-full text-left px-4 py-3 hover:bg-green-50 text-green-600 rounded-lg flex items-center gap-3">
              <Package size={20} />
              <span>Products</span>
            </button>
            <button className="w-full text-left px-4 py-3 hover:bg-green-50 text-green-600 rounded-lg flex items-center gap-3">
              <ShoppingBag size={20} />
              <span>Orders</span>
            </button>
            <button className="w-full text-left px-4 py-3 hover:bg-green-50 text-green-600 rounded-lg flex items-center gap-3">
              <User size={20} />
              <span>Customers</span>
            </button>
            <button className="w-full text-left px-4 py-3 hover:bg-green-50 text-green-600 rounded-lg flex items-center gap-3">
              <Settings size={20} />
              <span>Settings</span>
            </button>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Welcome back, {seller.businessName}!
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Total Products</p>
                    <p className="text-3xl font-bold text-gray-800">0</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Package className="text-blue-600" size={24} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Total Orders</p>
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
                    <p className="text-gray-600 text-sm mb-1">Revenue</p>
                    <p className="text-3xl font-bold text-gray-800">₹0</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 text-2xl font-bold">
                      ₹
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Customers</p>
                    <p className="text-3xl font-bold text-gray-800">0</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <User className="text-orange-600" size={24} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="p-4 border-2 border-green-200 rounded-lg hover:bg-green-50 transition-all text-left">
                  <Package className="text-green-600 mb-2" size={24} />
                  <h4 className="font-semibold text-gray-800">Add Product</h4>
                  <p className="text-sm text-gray-600">List a new product</p>
                </button>
                <button className="p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition-all text-left">
                  <ShoppingBag className="text-blue-600 mb-2" size={24} />
                  <h4 className="font-semibold text-gray-800">View Orders</h4>
                  <p className="text-sm text-gray-600">Manage your orders</p>
                </button>
                <button className="p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition-all text-left">
                  <Settings className="text-purple-600 mb-2" size={24} />
                  <h4 className="font-semibold text-gray-800">Settings</h4>
                  <p className="text-sm text-gray-600">Configure your store</p>
                </button>
              </div>
            </div>

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
          </div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState("login");
  const [currentView, setCurrentView] = useState("dashboard");

  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    const type = sessionStorage.getItem("userType");
    const data = sessionStorage.getItem("userData");

    if (token && type && data) {
      setIsAuthenticated(true);
      setUserType(type);
      setUserData(JSON.parse(data));
    }
  }, []);

  const handleLoginSuccess = (data) => {
    setUserData(data);
    setIsAuthenticated(true);
    setUserType(data.userType);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setIsAuthenticated(false);
    setUserData(null);
    setUserType(null);
    setCurrentPage("login");
    alert("Logged out successfully!");
  };

  if (isAuthenticated) {
    if (userType === "seller") {
      return <SellerDashboard userData={userData} onLogout={handleLogout} />;
    } else {
      return <CustomerHomePage userData={userData} onLogout={handleLogout} />;
    }
  }

  return (
    <div>
      {currentPage === "login" && (
        <CustomerLogin
          setCurrentPage={setCurrentPage}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {currentPage === "signup" && (
        <CustomerSignup
          setCurrentPage={setCurrentPage}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {currentPage === "seller-register" && (
        <SellerRegistration
          setCurrentPage={setCurrentPage}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {currentPage === "seller-login" && (
        <SellerLogin
          setCurrentPage={setCurrentPage}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
}
         