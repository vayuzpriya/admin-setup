import React from 'react';

export default function Badge({
  children,
  className = '',
  variant = 'neutral',
  dot = false,
  ...props
}) {
  const variants = {
    success: 'bg-[var(--color-success-bg)] text-[var(--color-success-dark)] border-[var(--color-success-border)]',
    warning: 'bg-[var(--color-warning-bg)] text-[var(--color-warning)] border-transparent',
    danger: 'bg-[var(--color-danger-bg)] text-[var(--color-danger)] border-transparent',
    info: 'bg-[var(--color-info-bg)] text-[var(--color-info)] border-transparent',
    brand: 'bg-[var(--color-primary-light)] text-[var(--color-primary)] border-transparent',
    neutral: 'bg-[var(--bg-surface-2)] text-[var(--text-secondary)] border-[var(--border-color)]',
  };

  const dots = {
    success: 'bg-[var(--color-success)]',
    warning: 'bg-[var(--color-warning)]',
    danger: 'bg-[var(--color-danger)]',
    info: 'bg-[var(--color-info)]',
    brand: 'bg-[var(--color-primary)]',
    neutral: 'bg-[var(--text-muted)]',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}
      {...props}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${dots[variant]}`} />
      )}
      {children}
    </span>
  );
}
