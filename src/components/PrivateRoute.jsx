import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, allowedRoles }) {
  // ✅ Use localStorage instead of sessionStorage
  const token = localStorage.getItem("authToken");
  const userType = localStorage.getItem("userType");

  console.log("🛡 PrivateRoute Check → Token:", token);
  console.log("🛡 PrivateRoute Check → userType:", userType);
  console.log("🛡 Allowed Roles:", allowedRoles);

  // If no token → redirect to login
  if (!token) return <Navigate to="/Login" replace />;

  // If user type not allowed → redirect to unauthorized
  if (!allowedRoles.includes(userType)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ All good → render children
  return children;
}
