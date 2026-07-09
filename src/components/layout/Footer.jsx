import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-auto py-6 border-t border-[var(--border-color)] bg-[var(--bg-surface)]/40 text-[var(--text-muted)] text-xs transition-colors duration-250">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6">
        <div className="flex items-center gap-1.5 order-2 sm:order-1">
          <span className="font-semibold text-[var(--text-secondary)]">RexAdmin</span>
          <span>© {new Date().getFullYear()} Inc. All rights reserved.</span>
        </div>

        {/* Policies and Status Dot */}
        <div className="flex flex-wrap items-center gap-6 order-1 sm:order-2 font-medium">
          <a href="#" className="hover:text-[var(--text-primary)] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[var(--text-primary)] transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-[var(--text-primary)] transition-colors">Support</a>
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full border border-[var(--border-color)] bg-[var(--bg-surface-2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-pulse" />
            <span className="text-[10px] text-[var(--text-secondary)]">All services online</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
