import React from 'react';
import LoginView from '../components/dashboard/LoginView';
import { useApp } from '../context/AppContext';

export default function LoginPage() {
  const { addToast } = useApp();
  return <LoginView addToast={addToast} />;
}
