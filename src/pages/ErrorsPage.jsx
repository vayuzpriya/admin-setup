import React from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorPages from '../components/dashboard/ErrorPages';

export default function ErrorsPage() {
  const navigate = useNavigate();
  return <ErrorPages onBackToDashboard={() => navigate('/')} />;
}
