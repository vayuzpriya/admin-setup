import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Users,
  Shield,
  Clipboard,
  Layers,
  Bell,
  Lock,
  AlertTriangle,
  Key,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Settings,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

export default function Sidebar({
  isCollapsed,
  setIsCollapsed,
  isDarkMode,
  setIsDarkMode,
}) {
  const menuItems = [
    { path: '/', end: true, name: 'Dashbaord', icon: LayoutDashboard },
    { path: '/organizations', name: 'Org', icon: Building2 },
    { path: '/users', name: 'My Team', icon: Users },
    { path: '/roles', name: 'Role Management', icon: Shield },
    // { path: '/forms', name: 'Form Elements', icon: Clipboard },
    // { path: '/overlays', name: 'Drawer & Modals', icon: Layers },
    // { path: '/toasts', name: 'Toast Alerts', icon: Bell },
    // { path: '/permission', name: 'No Permission', icon: Lock },
    // { path: '/errors', name: 'Error Pages', icon: AlertTriangle },
    { path: '/login', name: 'Login Screen', icon: Key },
  ];

  const subItems = [
    { path: '/settings', name: 'Settings', icon: Settings },
    { path: '/help', name: 'Docs & Help', icon: HelpCircle },
  ];

  const linkClasses = ({ isActive }) =>
    `w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group relative ${
      isActive
        ? 'bg-white/15 text-white'
        : 'text-white/65 hover:bg-white/10 hover:text-white'
    }`;

  return (
    <aside
      className={`bg-gradient-brand-vertical fixed top-0 left-0 z-40 h-screen flex flex-col justify-between transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="p-5 flex items-center justify-between border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <Sparkles className="w-5 h-5 text-white flex-shrink-0" />
          {!isCollapsed && (
            <span className="font-bold text-lg text-white tracking-tight whitespace-nowrap animate-fade-in">
              Rex<span className="text-white/70">Admin</span>
            </span>
          )}
        </div>
        {!isCollapsed && (
          <button
            onClick={() => setIsCollapsed(true)}
            className="hidden md:flex p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            title="Collapse Sidebar"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 py-6 px-3 space-y-7 overflow-y-auto">
        <div>
          <ul className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <NavLink to={item.path} end={item.end} className={linkClasses}>
                    <Icon className="w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-105" />
                    {!isCollapsed && (
                      <span className="whitespace-nowrap truncate">{item.name}</span>
                    )}
                    {/* Tooltip on collapse */}
                    {isCollapsed && (
                      <span className="absolute left-16 scale-0 rounded bg-[var(--bg-inverse)] px-2 py-1 text-xs text-white group-hover:scale-100 transition-all z-50 whitespace-nowrap shadow-md pointer-events-none">
                        {item.name}
                      </span>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Separator / Sub list */}
        <div className="pt-4 border-t border-white/10">
          {!isCollapsed && (
            <span className="px-3.5 text-xs font-semibold text-white/50 uppercase tracking-wider block mb-2.5">
              Support & settings
            </span>
          )}
          <ul className="space-y-1.5">
            {subItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <NavLink to={item.path} className={linkClasses}>
                    <Icon className="w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-105" />
                    {!isCollapsed && (
                      <span className="whitespace-nowrap truncate">{item.name}</span>
                    )}
                    {isCollapsed && (
                      <span className="absolute left-16 scale-0 rounded bg-[var(--bg-inverse)] px-2 py-1 text-xs text-white group-hover:scale-100 transition-all z-50 whitespace-nowrap shadow-md pointer-events-none">
                        {item.name}
                      </span>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Footer / Toggle Theme */}
      <div className="p-4 border-t border-white/10 space-y-3.5 flex-shrink-0">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-white/65 hover:bg-white/10 hover:text-white font-medium text-sm transition-colors group relative"
        >
          {isDarkMode ? (
            <>
              <Sun className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span>Light Mode</span>}
            </>
          ) : (
            <>
              <Moon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span>Dark Mode</span>}
            </>
          )}
          {isCollapsed && (
            <span className="absolute left-16 scale-0 rounded bg-[var(--bg-inverse)] px-2 py-1 text-xs text-white group-hover:scale-100 transition-all z-50 whitespace-nowrap shadow-md pointer-events-none">
              Toggle Theme
            </span>
          )}
        </button>

        {isCollapsed && (
          <button
            onClick={() => setIsCollapsed(false)}
            className="flex md:hidden mx-auto p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </aside>
  );
}
