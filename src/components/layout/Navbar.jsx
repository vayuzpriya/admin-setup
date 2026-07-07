import React from 'react';
import { Menu, Search, Bell, ChevronDown, User, Settings, CreditCard, LogOut, Plus } from 'lucide-react';
import Avatar from '../common/Avatar';
import Dropdown, { DropdownItem, DropdownHeader, DropdownDivider } from '../common/Dropdown';
import Button from '../common/Button';

export default function Navbar({
  isSidebarCollapsed,
  setIsSidebarCollapsed,
  activeTab,
  onOpenSettings,
  onTriggerNotification,
  onAddNewItem,
}) {
  const getTabLabel = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Overview';
      case 'users':
        return 'User Management';
      case 'roles':
        return 'Role Management';
      case 'forms':
        return 'Form Components Showcase';
      case 'overlays':
        return 'Drawer & Modals Showcase';
      case 'toasts':
        return 'Toast Alerts Showcase';
      case 'permission':
        return 'Access Denied (403)';
      case 'errors':
        return 'System Errors (404/500)';
      case 'login':
        return 'Corporate Login Screen';
      case 'settings':
        return 'Global Settings';
      case 'help':
        return 'Documentation';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-35 flex h-16 w-full items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md px-6 transition-all duration-200">
      <div className="flex items-center gap-4 flex-1">
        {/* Toggle Sidebar Button for small screens / collapsible state */}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="p-2 -ml-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-colors"
          title="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb / Title */}
        <nav className="hidden sm:flex items-center space-x-2 text-sm font-medium text-slate-450 dark:text-slate-500">
          <span className="hover:text-slate-655 dark:hover:text-slate-350 cursor-pointer">Workspace</span>
          <span>/</span>
          <span className="text-slate-900 dark:text-slate-50 font-semibold">{getTabLabel()}</span>
        </nav>
      </div>

      {/* Global Actions */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative hidden md:block w-64">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="search"
            placeholder="Search candidates, roles..."
            className="w-full h-9 pl-9 pr-8 text-xs rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 dark:bg-slate-900/40 dark:border-slate-800 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500 transition-all dark:text-slate-200"
          />
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-medium tracking-widest text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-800 rounded px-1.5 py-0.2 bg-white dark:bg-slate-850">
            ⌘K
          </span>
        </div>

        {/* Create Quick Action Button */}
        <Button
          size="sm"
          variant="primary"
          icon={Plus}
          onClick={onAddNewItem}
          className="hidden sm:inline-flex shadow-sm shadow-brand-500/10"
        >
          Add Candidate
        </Button>

        {/* Notifications Button */}
        <button
          onClick={onTriggerNotification}
          className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 rounded-xl transition-colors"
          aria-label="View notifications"
        >
          <Bell className="w-5 h-5" />
          {/* Active notification indicator dot */}
          <span className="absolute top-1.5 right-1.5 block w-2 h-2 rounded-full bg-brand-500 ring-2 ring-white dark:ring-slate-950" />
        </button>

        <div className="h-5 w-[1px] bg-slate-200 dark:bg-slate-800" />

        {/* Profile Dropdown */}
        <Dropdown
          align="right"
          trigger={
            <button className="flex items-center gap-2.5 p-1 -mr-1 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors">
              <Avatar
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256"
                name="Olivia Vance"
                size="sm"
                status="online"
              />
              <span className="hidden lg:flex flex-col text-left">
                <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 leading-tight">
                  Olivia Vance
                </span>
                <span className="text-[10px] text-slate-450 dark:text-slate-500 leading-none">
                  Recruiting Owner
                </span>
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 hidden lg:block" />
            </button>
          }
        >
          <DropdownHeader>My Account</DropdownHeader>
          <DropdownItem icon={User}>Profile Info</DropdownItem>
          <DropdownItem icon={CreditCard}>Billing Details</DropdownItem>
          <DropdownItem icon={Settings} onClick={onOpenSettings}>
            Settings
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem icon={LogOut} className="text-red-655 dark:text-red-400">
            Sign out
          </DropdownItem>
        </Dropdown>
      </div>
    </header>
  );
}
