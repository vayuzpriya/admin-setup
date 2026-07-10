import React from 'react';
import RoleManagement from '../components/dashboard/RoleManagement';
import { useApp } from '../context/AppContext';

export default function RolesPage() {
  const { addToast } = useApp();
  return <RoleManagement addToast={addToast} />;
}
