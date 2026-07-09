import React from 'react';

export default function Skeleton({
  className = '',
  variant = 'text', // 'text' | 'circular' | 'rectangular'
  ...props
}) {
  const base = 'bg-[var(--border-medium)] animate-pulse';
  
  const variants = {
    text: 'h-3 w-full rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-xl',
  };

  return (
    <div
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}

export function TableSkeleton({ rows = 5, cols = 4 }) {
  return (
    <div className="w-full space-y-4">
      {/* Header skeleton */}
      <div className="flex gap-4 px-6 py-4 border-b border-[var(--border-color)]">
        {[...Array(cols)].map((_, i) => (
          <Skeleton key={i} variant="text" className={`h-4 ${i === 0 ? 'w-1/4' : 'w-1/6'}`} />
        ))}
      </div>
      {/* Rows skeleton */}
      <div className="space-y-4 px-6 py-2">
        {[...Array(rows)].map((_, rowIndex) => (
          <div key={rowIndex} className="flex gap-4 py-2 items-center">
            {[...Array(cols)].map((_, colIndex) => (
              <Skeleton
                key={colIndex}
                variant={colIndex === 0 ? 'rectangular' : 'text'}
                className={`h-4 ${colIndex === 0 ? 'w-1/4 h-5 rounded' : 'w-1/6'} ${
                  colIndex === cols - 1 ? 'ml-auto w-12' : ''
                }`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="p-6 border border-[var(--border-color)] bg-[var(--bg-surface)] rounded-2xl space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" className="w-10 h-10" />
        <div className="space-y-2 flex-1">
          <Skeleton variant="text" className="w-1/3 h-4" />
          <Skeleton variant="text" className="w-1/4 h-3" />
        </div>
      </div>
      <Skeleton variant="rectangular" className="h-32 w-full" />
      <div className="flex justify-between items-center pt-2">
        <Skeleton variant="text" className="w-16 h-3" />
        <Skeleton variant="text" className="w-20 h-4 rounded-lg" />
      </div>
    </div>
  );
}
