import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/login";
import Signup from "../pages/auth/signup";
import Dashboard from "../pages/dashboard/index";

import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";
function AppRoutes() {
  return (
    <Routes>
      {/* Default */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* 404 */}
      <Route
        path="*"
        element={
          <div className="flex h-screen items-center justify-center bg-slate-950 text-white">
            <h1 className="text-5xl font-bold">404 Page Not Found</h1>
          </div>
        }
      />
    </Routes>
  );
}

export default AppRoutes;