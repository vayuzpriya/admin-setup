import React, { useState } from 'react';
import { ShieldCheck, Mail, Lock, Sparkles, ArrowRight } from 'lucide-react';
import Button from '../common/Button';
import Card, { CardBody } from '../common/Card';

export default function LoginView({ addToast }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      addToast('Please complete both email and password.', 'error');
      return;
    }

    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      addToast('Successfully authenticated Olivia Vance.', 'success');
    }, 1500);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <Card className="max-w-md w-full relative overflow-hidden shadow-2xl rounded-3xl border border-slate-200 dark:border-slate-800">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-tr from-brand-500 to-purple-600 opacity-15 rounded-full blur-3xl pointer-events-none" />

        <CardBody className="p-8 space-y-6">
          {/* Logo & Headline */}
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-brand-500/20">
              <ShieldCheck className="w-6 h-6 animate-pulse" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 tracking-tight pt-2">
              Welcome to RexRecruit
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-455">
              Enter your corporate credentials to sign in to the ATS workspace.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-450 dark:text-slate-550 uppercase tracking-wider block">Corporate Email</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-550">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="olivia.vance@company.com"
                  className="w-full h-11 pl-10 pr-4 text-sm rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all dark:text-slate-200"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-455 dark:text-slate-550 uppercase tracking-wider block">Security Password</label>
                <a href="#" className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-550">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full h-11 pl-10 pr-4 text-sm rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all dark:text-slate-200"
                  required
                />
              </div>
            </div>

            {/* Remember Switch */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-455 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-slate-300 text-brand-600 focus:ring-brand-500/20 w-4 h-4"
                  defaultChecked
                />
                Keep session logged in
              </label>
            </div>

            {/* Submit Button */}
            <Button
              variant="primary"
              type="submit"
              isLoading={isLoggingIn}
              className="w-full h-11 font-semibold text-sm shadow-md shadow-brand-500/10"
              icon={ArrowRight}
              iconPosition="right"
            >
              Sign In to Workspace
            </Button>
          </form>

          {/* Social / SSO Auth indicator */}
          <div className="border-t border-slate-100 dark:border-slate-850 pt-5 flex items-center justify-center gap-2">
            <span className="text-[10px] text-slate-450 dark:text-slate-550 uppercase tracking-widest font-semibold">
              Authorized via OKTA SSO
            </span>
          </div>

        </CardBody>
      </Card>
    </div>
  );
}
