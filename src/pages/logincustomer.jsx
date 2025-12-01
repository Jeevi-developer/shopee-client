import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Lock,
  Mail,
  Eye,
  EyeOff,
  LogIn,
} from "lucide-react";
import authService from "../api/authService";

// Customer Login Component
function CustomerLogin({ setCurrentPage, onLoginSuccess, switchToSignup }) {
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
        userType: "customer",
      });

      sessionStorage.setItem("authToken", response.token);
      sessionStorage.setItem("userType", "customer");
      sessionStorage.setItem("userData", JSON.stringify(response.user));
      onLoginSuccess({ ...response, userType: "customer" });
      alert(response.message || "Login successful!");
    } catch (error) {
      setErrors({
        general:
          error.response?.data?.message || error.message || "Login failed",
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

            {errors.general && (
              <p className="text-red-500 text-sm text-center">
                {errors.general}
              </p>
            )}

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
                onClick={switchToSignup}
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

// Customer Signup Component
function CustomerSignup({ setCurrentPage, onLoginSuccess, switchToLogin }) {
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
  const [view, setView] = useState("login"); // "login" or "signup"

  return (
    <>
      {view === "login" ? (
        <CustomerLogin
          setCurrentPage={setCurrentPage}
          onLoginSuccess={onLoginSuccess}
          switchToSignup={() => setView("signup")}
        />
      ) : (
        <CustomerSignup
          setCurrentPage={setCurrentPage}
          onLoginSuccess={onLoginSuccess}
          switchToLogin={() => setView("login")}
        />
      )}
    </>
  );
}