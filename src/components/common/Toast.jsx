import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({
  id,
  message,
  type = 'info', // 'success' | 'warning' | 'error' | 'info'
  duration = 4000,
  onClose,
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-[var(--color-success)]" />,
    warning: <AlertTriangle className="w-5 h-5 text-[var(--color-warning)]" />,
    error: <AlertCircle className="w-5 h-5 text-[var(--color-danger)]" />,
    info: <Info className="w-5 h-5 text-[var(--color-info)]" />,
  };

  const borders = {
    success: 'border-[var(--color-success-border)] bg-[var(--color-success-bg)]',
    warning: 'border-transparent bg-[var(--color-warning-bg)]',
    error: 'border-transparent bg-[var(--color-danger-bg)]',
    info: 'border-transparent bg-[var(--color-info-bg)]',
  };

  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-xl border backdrop-blur-md shadow-lg transition-all duration-300 animate-slide-in max-w-sm w-full ${borders[type]}`}
      role="alert"
    >
      <div className="flex-shrink-0">{icons[type]}</div>
      <div className="flex-1 text-sm font-medium text-[var(--text-primary)]">
        {message}
      </div>
      <button
        onClick={() => onClose(id)}
        className="flex-shrink-0 text-[var(--text-muted)] hover:text-[var(--text-primary)] p-0.5 rounded-lg hover:bg-[var(--bg-hover)] transition-colors"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// Toast Container component to display stacked toasts
export function ToastContainer({ toasts = [], onClose }) {
  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-3 w-full max-w-sm p-4 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast
            id={toast.id}
            type={toast.type}
            message={toast.message}
            onClose={onClose}
          />
        </div>
      ))}
    </div>
  );
}
