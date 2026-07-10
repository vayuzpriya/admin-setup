import React from 'react';

export default function ProgressBar({
  value,
  max,
  label,
  showValueText = true,
  size = 'sm',
  tone = 'quota', // 'quota' (higher = more alarming, e.g. quota usage) | 'positive' (higher = better, e.g. completion progress)
}) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  const ratio = max > 0 ? value / max : 0;

  const fillColor =
    tone === 'positive'
      ? 'bg-[var(--color-success)]'
      : ratio >= 0.95
        ? 'bg-[var(--color-danger)]'
        : ratio >= 0.8
          ? 'bg-[var(--color-warning)]'
          : 'bg-[var(--color-success)]';

  const trackHeight = size === 'md' ? 'h-2' : 'h-1.5';

  return (
    <div className="w-full">
      {(label || showValueText) && (
        <div className="flex items-center justify-between mb-1">
          {label && <span className="text-xs font-medium text-[var(--text-secondary)]">{label}</span>}
          {showValueText && (
            <span className="text-xs font-semibold text-[var(--text-muted)]">
              {value}/{max}
            </span>
          )}
        </div>
      )}
      <div className={`w-full ${trackHeight} bg-[var(--bg-hover)] rounded-full overflow-hidden`}>
        <div
          className={`${trackHeight} ${fillColor} rounded-full transition-all duration-300`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
