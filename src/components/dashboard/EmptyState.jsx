import React from 'react';
import { DatabaseBackup, Plus } from 'lucide-react';
import Button from '../common/Button';

export default function EmptyState({
  title = 'No records found',
  description = 'Get started by creating a new entry in your workspace directory.',
  actionLabel = 'Create Entry',
  onAction,
  icon: Icon = DatabaseBackup,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 md:p-12 border border-dashed border-[var(--border-medium)] rounded-2xl bg-[var(--bg-surface-2)] backdrop-blur-sm">
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--bg-hover)] text-[var(--text-muted)] mb-5">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1">
        {title}
      </h3>
      <p className="text-sm text-[var(--text-muted)] max-w-sm mb-6">
        {description}
      </p>
      {onAction && actionLabel && (
        <Button
          variant="primary"
          icon={Plus}
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
