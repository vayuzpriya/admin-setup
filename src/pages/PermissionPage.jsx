import React from 'react';
import { useNavigate } from 'react-router-dom';
import NoPermission from '../components/dashboard/NoPermission';

export default function PermissionPage() {
  const navigate = useNavigate();
  return <NoPermission onBackToDashboard={() => navigate('/')} />;
}
