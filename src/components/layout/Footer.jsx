import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-auto py-6 border-t border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/20 text-slate-500 dark:text-slate-400 text-xs transition-colors duration-250">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6">
        <div className="flex items-center gap-1.5 order-2 sm:order-1">
          <span className="font-semibold text-slate-800 dark:text-slate-200">RexAdmin</span>
          <span>© {new Date().getFullYear()} Inc. All rights reserved.</span>
        </div>

        {/* Policies and Status Dot */}
        <div className="flex flex-wrap items-center gap-6 order-1 sm:order-2 font-medium">
          <a href="#" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Support</a>
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] text-slate-600 dark:text-slate-400">All services online</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
