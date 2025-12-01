import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children, userType = "customer" }) {
  const { seller, customer, admin, loading } = useAuth();

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Check authentication based on userType
  if (userType === "admin") {
    if (!admin) {
      console.log("❌ No admin found, redirecting to admin login");
      return <Navigate to="/admin/login" replace />;
    }
  } else if (userType === "seller") {
    if (!seller) {
      console.log("❌ No seller found, redirecting to seller login");
      return <Navigate to="/seller/login" replace />;
    }
  } else {
    if (!customer) {
      console.log("❌ No customer found, redirecting to login");
      return <Navigate to="/login" replace />;
    }
  }

  return children;
}