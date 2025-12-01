import axiosInstance from "./axios";

const AUTH_URL = "/auth"; // relative path — axiosInstance already includes /api

const authService = {
  login: async ({ emailOrMobile, password, userType }) => {
    const response = await axiosInstance.post(`${AUTH_URL}/Login`, {
      emailOrMobile,
      password,
      userType, // "customer" | "admin"
    });
    return response.data;
  },

  sendOtp: async (mobile) => {
    const response = await axiosInstance.post(`${AUTH_URL}/send-otp`, {
      mobile,
    });
    return response.data;
  },

  verifyOtp: async (data) => {
    const response = await axiosInstance.post(`${AUTH_URL}/verify-otp`, data);
    return response.data;
  },
};

export default authService;
