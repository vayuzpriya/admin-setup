import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import Button from './Button';

export default function Drawer({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md', // 'sm' | 'md' | 'lg'
}) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
  };

  return (
    <div className={`fixed inset-0 z-50 overflow-hidden transition-all duration-300 ${
      isOpen ? 'pointer-events-auto' : 'pointer-events-none'
    }`}>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-[var(--overlay-backdrop)] backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Slide-over panel container */}
      <div className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
        <div
          className={`w-screen ${sizes[size]} bg-[var(--bg-surface)] border-l border-[var(--border-color)] shadow-xl flex flex-col transform transition-transform duration-350 ease-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-[var(--border-color)] flex items-center justify-between">
            {title && (
              <h3 className="text-base font-semibold text-[var(--text-primary)]">
                {title}
              </h3>
            )}
            <button
              onClick={onClose}
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1.5 rounded-lg hover:bg-[var(--bg-hover)] transition-colors"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-5 text-sm text-[var(--text-secondary)]">
            {children}
          </div>

          {/* Footer */}
          {footer ? (
            <div className="px-6 py-4 border-t border-[var(--border-color)] bg-[var(--bg-surface-2)]">
              {footer}
            </div>
          ) : (
            <div className="px-6 py-4 border-t border-[var(--border-color)] bg-[var(--bg-surface-2)] flex justify-end gap-3">
              <Button variant="outline" onClick={onClose}>
                Close Panel
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
