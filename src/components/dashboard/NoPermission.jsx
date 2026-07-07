import React from 'react';
import { Lock, ArrowLeft, ShieldAlert } from 'lucide-react';
import Button from '../common/Button';

export default function NoPermission({ onBackToDashboard }) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center shadow-xl space-y-6 animate-fade-in-up relative overflow-hidden">
        {/* Glow halo */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Lock Shield Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center border border-red-100 dark:border-red-950/20 shadow-sm">
          <ShieldAlert className="w-8 h-8" />
        </div>

        {/* Text descriptions */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
            403 — Access Denied
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-455 leading-relaxed">
            You do not have permission to access the **Global Workspace Ledger**. Please contact your workspace administrator to request access.
          </p>
        </div>

        {/* Meta values */}
        <div className="p-4 bg-slate-50 dark:bg-slate-850/40 rounded-2xl text-xs text-left border border-slate-100 dark:border-slate-850 space-y-2">
          <div className="flex justify-between">
            <span className="font-semibold text-slate-400">Required Scope:</span>
            <code className="text-red-550 dark:text-red-400 font-mono font-bold">workspace:ledger:write</code>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-slate-400">Current Role:</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">Hiring Reviewer</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-slate-400">Assigned Admin:</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">olivia.vance@company.com</span>
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
            className="w-full sm:flex-1 shadow-sm shadow-brand-500/10"
          >
            Request Access
          </Button>
        </div>
      </div>
    </div>
  );
}
