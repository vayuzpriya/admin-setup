import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Auth
import Login from "../pages/auth/login";
import Signup from "../pages/auth/signup";

// Layout
import DashboardLayout from "../layouts/DashboardLayout";

// Dashboard
import Dashboard from "../pages/dashboard";

// Preview Page
import ComponentPreview from "../pages/ComponentPreview";

// Guards
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* One Preview Page for ALL Components */}
          <Route
            path="/dashboard/:componentName"
            element={<ComponentPreview />}
          />

        </Route>
      </Route>

      {/* 404 */}
      <Route
        path="*"
        element={
          <div className="flex h-screen items-center justify-center bg-slate-950 text-white">
            <div className="text-center">
              <h1 className="text-8xl font-bold">404</h1>
              <p className="mt-4 text-slate-400">
                Page Not Found
              </p>
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default AppRoutes;