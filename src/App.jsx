import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

import { Provider } from "react-redux";
import store from "./redux/store";

import { AuthProvider } from "./contexts/AuthContext";

// Components
import TopNavbar from "./components/navbar/TopNavbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import ProtectedRoute from "./routes/ProtectedRoute";

// Pages
import Homepage from "./components/navbar/Homepage";
import CustomerLogin from "./pages/client/CustomerLogin";
import CustomerRegistration from "./pages/client/CustomerRegistration";
import CustomerProfile from "./pages/client/CustomerProfile";
import CustomerDashboard from "./pages/client/CustomerDashboard";

import SellerLogin from "./pages/seller/SellerLogin";
import SellerRegistration from "./pages/SellerRegistration";
import SellerDashboard from "./pages/seller/SellerDashboard";
import SellerForgotPassword from "./pages/SellerForgotPassword";
import SellerResetPassword from "./pages/SellerResetPassword";

import SellersManagement from "./pages/admin/SellersManagement";
import AdminDashboard from "./pages/admin/AdminDashboard";

import About from "./pages/About";
import AddProduct from "./pages/AddProduct";
import CartPage from "./pages/CartPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import SearchPage from "./pages/SearchPage";
import Register from "./components/Register";
import Unauthorized from "./pages/Unauthorized";
import AboutUs from "./pages/AboutUsPage";
import ContactUsPage from "./pages/ContactUsPage";

// ======================
// LAYOUT WITH NAVBAR LOGIC
// ======================
function Layout() {
  const location = useLocation();

  const hideNavbarRoutes = [
    "/CustomerRegistration",
    "/Login",
    "/SellerLogin",
    "/SellerRegistration",
    "/SellerDashboard",
    "/AddProduct",
    "/TopNavbar",
    "/admin/dashboard",
    "/AdminDashboard",
    "/SearchPage",
    "/ContactUsPage",
    "/AboutUs",
    
  ];

  const isProductDetailsPage = location.pathname.startsWith("/product/");

  const shouldHideNavbar =
    hideNavbarRoutes.includes(location.pathname) || isProductDetailsPage;

  return (
    <>
      {/* Navbar Animation */}
      <AnimatePresence mode="wait">
        {!shouldHideNavbar && (
          <motion.div
            key="navbar"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <TopNavbar />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Animations */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* PUBLIC ROUTES */}
          <Route path="/Login" element={<CustomerLogin />} />
          <Route
            path="/CustomerRegistration"
            element={<CustomerRegistration />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/ContactUsPage" element={<ContactUsPage />} />

          {/* HOME ROUTE */}
          <Route path="/" element={<Homepage />} />

          {/* CUSTOMER ROUTES */}
          <Route
            path="/client/profile"
            element={
              <PrivateRoute allowedRoles={["customer"]}>
                <CustomerProfile />
              </PrivateRoute>
            }
          />

          <Route
            path="/CustomerDashboard"
            element={
              <PrivateRoute allowedRoles={["customer"]}>
                <CustomerDashboard />
              </PrivateRoute>
            }
          />

          {/* PRODUCT ROUTES */}
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route
            path="/CartPage"
            element={
              <PrivateRoute allowedRoles={["customer"]}>
                <CartPage />
              </PrivateRoute>
            }
          />

          <Route path="/search" element={<SearchPage />} />

          {/* SELLER ROUTES */}
          <Route path="/SellerLogin" element={<SellerLogin />} />
          <Route path="/SellerRegistration" element={<SellerRegistration />} />
          <Route
            path="/seller/forgot-password"
            element={<SellerForgotPassword />}
          />
          <Route
            path="/seller/reset-password/:token"
            element={<SellerResetPassword />}
          />

          <Route
            path="/SellerDashboard"
            element={
              <PrivateRoute allowedRoles={["seller"]}>
                <SellerDashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/AddProduct"
            element={
              <PrivateRoute allowedRoles={["seller"]}>
                <AddProduct />
              </PrivateRoute>
            }
          />

          <Route path="/admin/sellers" element={<SellersManagement />} />

          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />

          {/* Duplicate Admin Route (role-based) */}
          <Route
            path="/AdminDashboard"
            element={
              <ProtectedRoute userType="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* FALLBACK */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>

      <Footer />
    </>
  );
}

// ======================
// FINAL APP COMPONENT
// ======================
export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router future={{ v7_startTransition: true }}>
          <Layout />
        </Router>
      </AuthProvider>
    </Provider>
  );
}
