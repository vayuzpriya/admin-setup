import React, { useState } from 'react';
import { AlertCircle, RotateCcw, Home, HelpCircle } from 'lucide-react';
import Button from '../common/Button';

export default function ErrorPages({ onBackToDashboard }) {
  const [activeError, setActiveError] = useState('404'); // '404' | '500'

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Toggles */}
      <div className="flex justify-between items-center flex-wrap gap-4 border-b border-[var(--border-color)] pb-4">
        <div>
          <h1 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
            Error Pages Mockups
          </h1>
          <p className="text-xs text-[var(--text-muted)]">
            Switch between 404 Not Found and 500 Server Error designs.
          </p>
        </div>
        <div className="flex rounded-lg border border-[var(--border-color)] p-0.5 bg-[var(--bg-surface-2)]">
          <button
            onClick={() => setActiveError('404')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeError === '404'
                ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            404 Page
          </button>
          <button
            onClick={() => setActiveError('500')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeError === '500'
                ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            500 Page
          </button>
        </div>
      </div>

      {/* Error layout viewport */}
      <div className="flex items-center justify-center py-10 min-h-[50vh]">
        {activeError === '404' ? (
          <div className="max-w-md w-full text-center space-y-6 animate-fade-in-up">
            {/* 404 Vector Block */}
            <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-purple)] leading-none tracking-tighter">
              404
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                Candidate Pipeline Not Found
              </h2>
              <p className="text-sm text-[var(--text-muted)] max-w-sm mx-auto leading-relaxed">
                The folder directory you are searching for might have been archived or moved to another integration channel.
              </p>
            </div>
            <div className="flex justify-center gap-3">
              <Button variant="outline" size="sm" onClick={onBackToDashboard}>
                <Home className="w-4 h-4 mr-2" />
                Return Overview
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => alert('Search index diagnostics triggered.')}
              >
                Scan Directories
              </Button>
            </div>
          </div>
        ) : (
          <div className="max-w-md w-full bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-3xl p-8 text-center shadow-xl space-y-6 animate-fade-in-up">
            {/* 500 Warning Icon */}
            <div className="mx-auto w-14 h-14 rounded-2xl bg-[var(--color-warning-bg)] text-[var(--color-warning)] flex items-center justify-center border border-[var(--color-warning-bg)]">
              <AlertCircle className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                500 — System Failure
              </h2>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                An internal server error occurred while retrieving Greenhouse API webhook logs. Our engineering team is currently investigating.
              </p>
            </div>

            {/* Error Code readout */}
            <div className="p-3.5 bg-[var(--bg-inverse)] text-[var(--color-danger)] rounded-xl text-left font-mono text-[11px] border border-[var(--border-color)] overflow-x-auto select-all">
              <div>CRITICAL: Database connection pool timed out.</div>
              <div>REASON: Connection timeout after 30000ms.</div>
              <div>CODE: ERR_POSTGRES_POOL_LIMIT_EXCEEDED</div>
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  alert('Reloading logs and connection pool...');
                }}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Retry connection
              </Button>
              <Button variant="secondary" size="sm" onClick={onBackToDashboard}>
                Go to Dashboard
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
