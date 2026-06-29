import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  // Get token from localStorage
  const token = localStorage.getItem("token");

  // If not logged in redirect to login
  if (!token) {
    return <Navigate to="/" replace />;
  }
  // Otherwise render the child routes
  return <Outlet />;
}

export default ProtectedRoute;