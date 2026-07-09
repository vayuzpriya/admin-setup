import React from 'react';
import {
  LayoutDashboard,
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
  HelpCircle
} from 'lucide-react';

export default function Sidebar({
  isCollapsed,
  setIsCollapsed,
  activeTab,
  setActiveTab,
  isDarkMode,
  setIsDarkMode,
}) {
  const menuItems = [
    { id: 'dashboard', name: 'Overview', icon: LayoutDashboard },
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'roles', name: 'Role Management', icon: Shield },
    { id: 'forms', name: 'Form Elements', icon: Clipboard },
    { id: 'overlays', name: 'Drawer & Modals', icon: Layers },
    { id: 'toasts', name: 'Toast Alerts', icon: Bell },
    { id: 'permission', name: 'No Permission', icon: Lock },
    { id: 'errors', name: 'Error Pages', icon: AlertTriangle },
    { id: 'login', name: 'Login Screen', icon: Key },
  ];

  const subItems = [
    { id: 'settings', name: 'Settings', icon: Settings },
    { id: 'help', name: 'Docs & Help', icon: HelpCircle },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen border-r border-[var(--border-color)] bg-[var(--bg-surface)] backdrop-blur-lg flex flex-col justify-between transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="p-5 flex items-center justify-between border-b border-[var(--border-color)] flex-shrink-0">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-purple)] text-white shadow-md shadow-[var(--color-orange-shadow)] flex-shrink-0">
            <Layers className="w-5 h-5 animate-pulse" />
          </div>
          {!isCollapsed && (
            <span className="font-bold text-lg text-[var(--text-primary)] tracking-tight whitespace-nowrap animate-fade-in">
              Rex<span className="text-[var(--color-primary)]">Admin</span>
            </span>
          )}
        </div>
        {!isCollapsed && (
          <button
            onClick={() => setIsCollapsed(true)}
            className="hidden md:flex p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors"
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
              const isActive = activeTab === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group relative ${
                      isActive
                        ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)]'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <Icon className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                      isActive ? 'text-[var(--color-primary)]' : 'text-[var(--text-muted)]'
                    }`} />
                    {!isCollapsed && (
                      <span className="whitespace-nowrap truncate">{item.name}</span>
                    )}
                    {/* Active highlight pill */}
                    {isActive && (
                      <span className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-[var(--color-primary)] rounded-r-md" />
                    )}
                    {/* Tooltip on collapse */}
                    {isCollapsed && (
                      <span className="absolute left-16 scale-0 rounded bg-[var(--bg-inverse)] px-2 py-1 text-xs text-white group-hover:scale-100 transition-all z-50 whitespace-nowrap shadow-md pointer-events-none">
                        {item.name}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Separator / Sub list */}
        <div className="pt-4 border-t border-[var(--border-color)]">
          {!isCollapsed && (
            <span className="px-3.5 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block mb-2.5">
              Support & settings
            </span>
          )}
          <ul className="space-y-1.5">
            {subItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group relative ${
                      isActive
                        ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)]'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <Icon className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                      isActive ? 'text-[var(--color-primary)]' : 'text-[var(--text-muted)]'
                    }`} />
                    {!isCollapsed && (
                      <span className="whitespace-nowrap truncate">{item.name}</span>
                    )}
                    {isCollapsed && (
                      <span className="absolute left-16 scale-0 rounded bg-[var(--bg-inverse)] px-2 py-1 text-xs text-white group-hover:scale-100 transition-all z-50 whitespace-nowrap shadow-md pointer-events-none">
                        {item.name}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Footer / Toggle Theme */}
      <div className="p-4 border-t border-[var(--border-color)] space-y-3.5 flex-shrink-0">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] font-medium text-sm transition-colors group relative"
        >
          {isDarkMode ? (
            <>
              <Sun className="w-5 h-5 text-[var(--color-warning)] animate-spin-slow flex-shrink-0" />
              {!isCollapsed && <span>Light Mode</span>}
            </>
          ) : (
            <>
              <Moon className="w-5 h-5 text-[var(--text-muted)] flex-shrink-0" />
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
            className="flex md:hidden mx-auto p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </aside>
  );
}
