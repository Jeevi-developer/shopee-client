import axiosInstance from "./axios"; 

// =======================
// SELLERS BASE URL
// =======================
const SELLER_BASE = "/admin/sellers";

// =======================
// PRODUCTS BASE URL
// =======================
const PRODUCT_BASE = "/admin/products";

const adminService = {
  // =======================
  // SELLER MANAGEMENT
  // =======================
  listSellers: async (params) => {
    const res = await axiosInstance.get(SELLER_BASE, { params });
    return res.data;
  },

  getSeller: async (id) => {
    const res = await axiosInstance.get(`${SELLER_BASE}/${id}`);
    return res.data;
  },

  approveSeller: async (id, action, reason) => {
    const res = await axiosInstance.put(`${SELLER_BASE}/${id}/approve`, {
      action,
      reason,
    });
    return res.data;
  },

  updateStatus: async (id, status, reason) => {
    const res = await axiosInstance.put(`${SELLER_BASE}/${id}/status`, {
      status,
      reason,
    });
    return res.data;
  },

  updateSeller: async (id, payload) => {
    const res = await axiosInstance.patch(`${SELLER_BASE}/${id}`, payload);
    return res.data;
  },

  deleteSeller: async (id) => {
    const res = await axiosInstance.delete(`${SELLER_BASE}/${id}`);
    return res.data;
  },

  getStats: async () => {
    const res = await axiosInstance.get(`${SELLER_BASE}/stats`);
    return res.data;
  },

  // =======================
  // PRODUCT MANAGEMENT
  // =======================
  listProducts: async (params) => {
    const res = await axiosInstance.get(PRODUCT_BASE, { params });
    return res.data;
  },

  getProduct: async (id) => {
    const res = await axiosInstance.get(`${PRODUCT_BASE}/${id}`);
    return res.data;
  },

  approveProduct: async (id, action, reason) => {
    const res = await axiosInstance.put(
      `${PRODUCT_BASE}/${id}/approve`,
      { action, reason }
    );
    return res.data;
  },

  updateProduct: async (id, payload) => {
    const res = await axiosInstance.patch(`${PRODUCT_BASE}/${id}`, payload);
    return res.data;
  },

  deleteProduct: async (id) => {
    const res = await axiosInstance.delete(`${PRODUCT_BASE}/${id}`);
    return res.data;
  },

  bulkProductAction: async (ids, action, reason) => {
    const res = await axiosInstance.put(`${PRODUCT_BASE}/bulk`, {
      ids,
      action,
      reason,
    });
    return res.data;
  },
};

export default adminService;
