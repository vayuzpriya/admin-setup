import React, { useState, useEffect, useRef } from 'react';

export default function Dropdown({
  trigger,
  children,
  align = 'right', // 'left' | 'right'
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const alignments = {
    left: 'left-0 origin-top-left',
    right: 'right-0 origin-top-right',
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={`absolute mt-2 w-56 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-lg focus:outline-none z-50 transition-all duration-200 animate-fade-in-up ${alignments[align]}`}
          onClick={() => setIsOpen(false)}
        >
          <div className="py-1.5" role="menu" aria-orientation="vertical">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export function DropdownItem({
  children,
  onClick,
  icon: Icon,
  className = '',
  disabled = false,
  ...props
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full text-left px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2.5 disabled:opacity-50 disabled:pointer-events-none ${className}`}
      role="menuitem"
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 text-[var(--text-muted)]" />}
      {children}
    </button>
  );
}

export function DropdownHeader({ children, className = '' }) {
  return (
    <div className={`px-4 py-2 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider ${className}`}>
      {children}
    </div>
  );
}

export function DropdownDivider() {
  return <div className="border-t border-[var(--border-color)] my-1.5" />;
}
