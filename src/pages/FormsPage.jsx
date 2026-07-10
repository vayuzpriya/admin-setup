import React from 'react';
import FormElementsShowcase from '../components/dashboard/FormElementsShowcase';
import { useApp } from '../context/AppContext';

export default function FormsPage() {
  const { addToast } = useApp();
  return <FormElementsShowcase addToast={addToast} />;
}
