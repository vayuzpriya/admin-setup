import React from 'react';

export default function Card({
  children,
  className = '',
  hoverEffect = false,
  ...props
}) {
  return (
    <div
      className={`bg-[var(--bg-surface)] backdrop-blur-md border border-[var(--border-color)] rounded-2xl shadow-sm transition-all duration-300 ${
        hoverEffect ? 'hover:shadow-md hover:border-[var(--border-medium)] hover:-translate-y-0.5' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', ...props }) {
  return (
    <div className={`px-6 py-5 border-b border-[var(--border-color)] ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardBody({ children, className = '', ...props }) {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '', ...props }) {
  return (
    <div className={`px-6 py-4 border-t border-[var(--border-color)] bg-[var(--bg-surface-2)] rounded-b-2xl ${className}`} {...props}>
      {children}
    </div>
  );
}
