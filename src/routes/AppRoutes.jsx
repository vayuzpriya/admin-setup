import React from 'react';
import { Routes, Route } from 'react-router-dom';

import DashboardLayout from '../layouts/DashboardLayout';
import OrganizationLayout from '../layouts/OrganizationLayout';

import DashboardPage from '../pages/DashboardPage';
import UsersPage from '../pages/UsersPage';
import RolesPage from '../pages/RolesPage';
import FormsPage from '../pages/FormsPage';
import OverlaysPage from '../pages/OverlaysPage';
import ToastsPage from '../pages/ToastsPage';
import PermissionPage from '../pages/PermissionPage';
import ErrorsPage from '../pages/ErrorsPage';
import LoginPage from '../pages/LoginPage';
import SettingsPage from '../pages/SettingsPage';
import HelpPage from '../pages/HelpPage';

import OrganizationsPage from '../pages/OrganizationsPage';
import OrganizationCreatePage from '../pages/OrganizationCreatePage';
import OrganizationDetailPage from '../pages/OrganizationDetailPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="roles" element={<RolesPage />} />
        <Route path="forms" element={<FormsPage />} />
        <Route path="overlays" element={<OverlaysPage />} />
        <Route path="toasts" element={<ToastsPage />} />
        <Route path="permission" element={<PermissionPage />} />
        <Route path="errors" element={<ErrorsPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="help" element={<HelpPage />} />

        <Route path="organizations" element={<OrganizationLayout />}>
          <Route index element={<OrganizationsPage />} />
          <Route path="new" element={<OrganizationCreatePage />} />
          <Route path=":organizationId" element={<OrganizationDetailPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
