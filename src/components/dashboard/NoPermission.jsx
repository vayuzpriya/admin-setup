import React from 'react';
import { Lock, ArrowLeft, ShieldAlert } from 'lucide-react';
import Button from '../common/Button';

export default function NoPermission({ onBackToDashboard }) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-3xl p-8 text-center shadow-xl space-y-6 animate-fade-in-up relative overflow-hidden">
        {/* Glow halo */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-[var(--color-danger-bg)] rounded-full blur-3xl pointer-events-none" />

        {/* Lock Shield Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-[var(--color-danger-bg)] text-[var(--color-danger)] flex items-center justify-center border border-[var(--color-danger-bg)] shadow-sm">
          <ShieldAlert className="w-8 h-8" />
        </div>

        {/* Text descriptions */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
            403 — Access Denied
          </h2>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            You do not have permission to access the **Global Workspace Ledger**. Please contact your workspace administrator to request access.
          </p>
        </div>

        {/* Meta values */}
        <div className="p-4 bg-[var(--bg-surface-2)] rounded-2xl text-xs text-left border border-[var(--border-color)] space-y-2">
          <div className="flex justify-between">
            <span className="font-semibold text-[var(--text-muted)]">Required Scope:</span>
            <code className="text-[var(--color-danger)] font-mono font-bold">workspace:ledger:write</code>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-[var(--text-muted)]">Current Role:</span>
            <span className="font-semibold text-[var(--text-secondary)]">Hiring Reviewer</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-[var(--text-muted)]">Assigned Admin:</span>
            <span className="font-semibold text-[var(--text-secondary)]">olivia.vance@company.com</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            variant="outline"
            icon={ArrowLeft}
            onClick={onBackToDashboard}
            className="w-full sm:flex-1"
          >
            Go Back
          </Button>
          <Button
            variant="primary"
            onClick={() => alert('Access request submitted to Olivia Vance.')}
            className="w-full sm:flex-1"
          >
            Request Access
          </Button>
        </div>
      </div>
    </div>
  );
}
