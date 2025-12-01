import axiosInstance from "./axios";

// Base path relative to axiosInstance baseURL
const SELLER_URL = "/seller";

const sellerService = {
  // Seller Login
  login: async ({ email, password }) => {
    const response = await axiosInstance.post(`${SELLER_URL}/Login`, {
      email,
      password,
    });
    return response.data;
  },

  // Seller Register
  register: async (formData) => {
    const response = await axiosInstance.post(
      `${SELLER_URL}/register`,
      formData
    );
    return response.data;
  },
};

export default sellerService;
