import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Automatically attach token for admin/seller/customer
axiosInstance.interceptors.request.use(
  (config) => {
    const adminToken = localStorage.getItem("adminToken");
    const sellerToken = localStorage.getItem("sellerToken");
    const customerToken = localStorage.getItem("authToken");

    const token = adminToken || sellerToken || customerToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Global response error handler
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const message = error.response.data?.message || "Request failed";
      console.error("API Error:", message);
      return Promise.reject(new Error(message));
    } else if (error.request) {
      return Promise.reject(new Error("Network error. Please check your connection."));
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
