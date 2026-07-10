import React from 'react';

export default function Toggle({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  id,
}) {
  return (
    <label
      htmlFor={id}
      className={`flex items-center justify-between gap-4 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {(label || description) && (
        <span className="flex-1">
          {label && <span className="block text-sm font-semibold text-[var(--text-primary)]">{label}</span>}
          {description && <span className="block text-xs text-[var(--text-muted)]">{description}</span>}
        </span>
      )}
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="w-10 h-6 bg-[var(--border-medium)] rounded-full appearance-none cursor-pointer checked:bg-[var(--color-primary)] transition-colors relative before:absolute before:h-4 before:w-4 before:bg-white before:rounded-full before:top-1 before:left-1 checked:before:translate-x-4 before:transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
      />
    </label>
  );
}
