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
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500 dark:text-amber-400" />,
    error: <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400" />,
    info: <Info className="w-5 h-5 text-sky-500 dark:text-sky-400" />,
  };

  const borders = {
    success: 'border-emerald-100 dark:border-emerald-950 bg-emerald-50/80 dark:bg-emerald-950/20',
    warning: 'border-amber-100 dark:border-amber-950 bg-amber-50/80 dark:bg-amber-950/20',
    error: 'border-red-100 dark:border-red-950 bg-red-50/80 dark:bg-red-950/20',
    info: 'border-sky-100 dark:border-sky-950 bg-sky-50/80 dark:bg-sky-950/20',
  };

  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-xl border backdrop-blur-md shadow-lg transition-all duration-300 animate-slide-in max-w-sm w-full ${borders[type]}`}
      role="alert"
    >
      <div className="flex-shrink-0">{icons[type]}</div>
      <div className="flex-1 text-sm font-medium text-slate-800 dark:text-slate-200">
        {message}
      </div>
      <button
        onClick={() => onClose(id)}
        className="flex-shrink-0 text-slate-400 hover:text-slate-655 dark:hover:text-slate-200 p-0.5 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors"
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
