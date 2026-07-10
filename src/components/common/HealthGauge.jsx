import React from 'react';

function getHealthTier(score) {
  if (score >= 80) {
    return { label: 'Healthy', bg: 'bg-[var(--color-success-bg)]', text: 'text-[var(--color-success-dark)]' };
  }
  if (score >= 50) {
    return { label: 'Fair', bg: 'bg-[var(--color-warning-bg)]', text: 'text-[var(--color-warning)]' };
  }
  return { label: 'At Risk', bg: 'bg-[var(--color-danger-bg)]', text: 'text-[var(--color-danger)]' };
}

export default function HealthGauge({ score, size = 'sm', showLabel = true }) {
  const tier = getHealthTier(score);

  const sizeClasses =
    size === 'lg'
      ? 'text-base px-3.5 py-2 gap-2'
      : size === 'md'
        ? 'text-sm px-3 py-1.5 gap-1.5'
        : 'text-xs px-2 py-1 gap-1.5';

  return (
    <span className={`inline-flex items-center rounded-lg font-semibold ${tier.bg} ${tier.text} ${sizeClasses}`}>
      <span>{score}</span>
      {showLabel && <span className="opacity-80">{tier.label}</span>}
    </span>
  );
}
