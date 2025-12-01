import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import PrivateRoute from "./components/PrivateRoute";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

// Context
import { AuthProvider } from "./contexts/AuthContext";

// ✅ Reusable Ecommerce Navbar
import Navbar from "./components/navbar/Homepage";

// Pages
import CustomerRegistration from "./pages/client/CustomerRegistration";
import CustomerLogin from "./pages/client/CustomerLogin";
import CustomerProfile from "./pages/client/CustomerProfile";
import CustomerDashboard from "./pages/client/CustomerDashboard";
import SellerLogin from "./pages/seller/SellerLogin";
import About from "./pages/About";
import SellerRegistration from "./pages/SellerRegistration";
import AddProduct from "./pages/AddProduct";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import SellerDashboard from "./pages/seller/SellerDashboard";
import SellerForgotPassword from "./pages/SellerForgotPassword";
import SellerResetPassword from "./pages/SellerResetPassword";
import Register from "./components/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminAuthPage from "./pages/admin/AdminAuthPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Unauthorized from "./pages/Unauthorized";
import Homepage from "./components/navbar/Homepage";
import Footer from "./components/Footer";

// ✅ Layout wrapper to control Navbar visibility
function Layout() {
  const location = useLocation();

  // ✅ Navbar hidden in these routes
  const hideNavbarRoutes = [
    "/SellerRegistration",
    "/CustomerRegistration",
    "/client/profile",
    "/Homepage",
    "/Login",
    "/SellerLogin",
    "/CartPage",
    "/AddProduct",
    "/SellerDashboard",
  ];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {/* ✅ Animate Navbar */}
      <AnimatePresence mode="wait">
        {!shouldHideNavbar && (
          <motion.div
            key="navbar"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* ✅ Your reusable Navbar */}
            <Navbar />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Page Content */}
      <Routes location={location} key={location.pathname}>
        <Route path="/Login" element={<CustomerLogin />} />
        <Route path="/client/profile" element={<CustomerProfile />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        {/* Customer Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute allowedRoles={["customer", "seller", "admin"]}>
              <Homepage />
            </PrivateRoute>
          }
        />

        {/* ========== PRODUCT ROUTES ========== */}
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route
          path="/CartPage"
          element={
            <PrivateRoute allowedRoles={["customer"]}>
              <CartPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/CustomerRegistration"
          element={<CustomerRegistration />}
        />
        <Route path="/SellerLogin" element={<SellerLogin />} />
        <Route path="/about" element={<About />} />
        <Route path="/CartPage" element={<CartPage />} />
        <Route path="/AddProduct" element={<AddProduct />} />
        <Route path="/SellerRegistration" element={<SellerRegistration />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/seller/forgot-password"
          element={<SellerForgotPassword />}
        />
        <Route
          path="/seller/reset-password/:token"
          element={<SellerResetPassword />}
        />

        {/* <Route
          path="/MainDashboard"
          element={
            <PrivateRoute allowedRoles={["customer"]}>
              <MainDashboard />
            </PrivateRoute>
          }
        /> */}

        {/* ✅ Seller Protected Routes */}
        <Route
          path="/SellerDashboard"
          element={
            <PrivateRoute allowedRoles={["seller"]}>
              <SellerDashboard />
            </PrivateRoute>
          }
        />
        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        {/* ✅ Admin Routes */}
        <Route path="/admin/Login" element={<AdminAuthPage />} />
        <Route
          path="/AdminDashboard"
          element={
            <ProtectedRoute userType="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* ✅ Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}

// ✅ Final App Component
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
