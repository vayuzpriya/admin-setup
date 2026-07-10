import React from 'react';
import { Check } from 'lucide-react';

export default function Stepper({ steps, currentStep, onStepClick }) {
  return (
    <div className="flex items-start w-full">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isClickable = onStepClick && (isCompleted || isCurrent);

        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={() => isClickable && onStepClick(index)}
                disabled={!isClickable}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-colors flex-shrink-0 ${
                  isCompleted
                    ? 'bg-[var(--color-primary)] text-white cursor-pointer'
                    : isCurrent
                      ? 'border-2 border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--bg-surface)]'
                      : 'border border-[var(--border-medium)] text-[var(--text-muted)] bg-[var(--bg-surface-2)] cursor-not-allowed'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
              </button>
              <span
                className={`text-xs font-semibold text-center whitespace-nowrap ${
                  isCurrent ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mt-[18px] ${
                  isCompleted ? 'bg-[var(--color-primary)]' : 'bg-[var(--border-color)]'
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
