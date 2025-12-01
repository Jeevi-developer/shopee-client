// SellerProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function SellerProtectedRoute({ children }) {
  const token = localStorage.getItem("authToken");
  const userType = localStorage.getItem("userType");

  if (!token || userType !== "seller") {
    return <Navigate to="/" replace />;
  }

  return children;
}
