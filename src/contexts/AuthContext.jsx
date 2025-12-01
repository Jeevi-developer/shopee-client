// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [seller, setSeller] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on app start
  useEffect(() => {
    try {
      // --- Admin ---
      const adminData = localStorage.getItem("adminAuthData");
      const adminToken = localStorage.getItem("adminToken");

      if (adminData && adminToken) {
        setAdmin(JSON.parse(adminData));
        setToken(adminToken);
        setLoading(false);
        return;
      }

      // --- Seller ---
      const sellerData = localStorage.getItem("sellerAuthData");
      const sellerToken = localStorage.getItem("sellerToken");

      if (sellerData && sellerToken) {
        setSeller(JSON.parse(sellerData));
        setToken(sellerToken);
        setLoading(false);
        return;
      }

      // --- Customer ---
      const customerData = localStorage.getItem("userData");
      const customerToken = localStorage.getItem("authToken");

      if (customerData && customerToken) {
        setCustomer(JSON.parse(customerData));
        setToken(customerToken);
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error("AuthContext Load Error:", error);
    }

    setLoading(false);
  }, []);

  // --- Update token ---
  const updateToken = (newToken) => {
    setToken(newToken);
    if (admin) localStorage.setItem("adminToken", newToken);
    else if (seller) localStorage.setItem("sellerToken", newToken);
    else if (customer) localStorage.setItem("authToken", newToken);
  };

  // --- Set Admin ---
  const updateAdmin = (adminData, token) => {
    setAdmin(adminData);
    setSeller(null);
    setCustomer(null);

    localStorage.setItem("adminAuthData", JSON.stringify(adminData));
    localStorage.setItem("adminToken", token);
    setToken(token);
  };

  // --- Set Seller ---
  const updateSeller = (sellerData, token) => {
    setSeller(sellerData);
    setAdmin(null);
    setCustomer(null);

    localStorage.setItem("sellerAuthData", JSON.stringify(sellerData));
    localStorage.setItem("sellerToken", token);
    setToken(token);
  };

  // --- Set Customer ---
  const updateCustomer = (customerData, token) => {
    setCustomer(customerData);
    setAdmin(null);
    setSeller(null);

    localStorage.setItem("userData", JSON.stringify(customerData));
    localStorage.setItem("authToken", token);
    setToken(token);
  };

  // --- Logout functions ---
  const logoutAdmin = () => {
    setAdmin(null);
    setToken(null);
    localStorage.removeItem("adminAuthData");
    localStorage.removeItem("adminToken");
  };

  const logoutSeller = () => {
    setSeller(null);
    setToken(null);
    localStorage.removeItem("sellerAuthData");
    localStorage.removeItem("sellerToken");
  };

  const logoutCustomer = () => {
    setCustomer(null);
    setToken(null);
    localStorage.removeItem("userData");
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        admin,
        seller,
        customer,
        loading,
        setToken: updateToken,
        setAdmin: updateAdmin,
        setSeller: updateSeller,
        setCustomer: updateCustomer,
        logoutAdmin,
        logoutSeller,
        logoutCustomer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
