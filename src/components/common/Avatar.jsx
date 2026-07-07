import React from 'react';

export default function Avatar({
  src,
  alt = 'User avatar',
  name = '',
  size = 'md',
  status = null, // 'online' | 'offline' | 'away'
  className = '',
  ...props
}) {
  const sizes = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  const statusColors = {
    online: 'bg-emerald-500 ring-white dark:ring-slate-900',
    offline: 'bg-slate-400 ring-white dark:ring-slate-900',
    away: 'bg-amber-500 ring-white dark:ring-slate-900',
  };

  const getInitials = (userName) => {
    if (!userName) return '';
    return userName
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={`relative inline-block flex-shrink-0 ${className}`} {...props}>
      {src ? (
        <img
          className={`${sizes[size]} rounded-full object-cover border border-slate-200 dark:border-slate-800`}
          src={src}
          alt={alt}
        />
      ) : (
        <div
          className={`${sizes[size]} rounded-full flex items-center justify-center font-semibold bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400 border border-brand-200/50 dark:border-brand-800/50`}
        >
          {getInitials(name) || '?'}
        </div>
      )}
      {status && (
        <span
          className={`absolute bottom-0 right-0 block w-2.5 h-2.5 rounded-full ring-2 ${statusColors[status]}`}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
