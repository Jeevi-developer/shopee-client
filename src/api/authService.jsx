import axiosInstance from "./axios";

// Customer base route
const CUSTOMER_AUTH = "/auth";

// Admin base route
const ADMIN_AUTH = "/admin";

const authService = {
  // -------------------------
  // CUSTOMER LOGIN
  // -------------------------
  loginCustomer: async ({ emailOrMobile, password }) => {
    const response = await axiosInstance.post(`${CUSTOMER_AUTH}/Login`, {
      emailOrMobile,
      password,
    });
    return response.data;
  },

  // -------------------------
  // ADMIN LOGIN
  // -------------------------
  loginAdmin: async ({ emailOrMobile, password }) => {
    const response = await axiosInstance.post(`${ADMIN_AUTH}/Login`, {
      emailOrMobile,
      password,
    });
    return response.data;
  },

  // -------------------------
  // OTP ROUTES (CUSTOMER ONLY)
  // -------------------------
  sendOtp: async (mobile) => {
    const response = await axiosInstance.post(`${CUSTOMER_AUTH}/send-otp`, {
      mobile,
    });
    return response.data;
  },

  verifyOtp: async (data) => {
    const response = await axiosInstance.post(`${CUSTOMER_AUTH}/verify-otp`, data);
    return response.data;
  },
};

export default authService;
