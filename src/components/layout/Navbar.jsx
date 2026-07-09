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
    <header className="sticky top-0 z-35 flex h-16 w-full items-center justify-between border-b border-[var(--border-color)] bg-[var(--bg-surface)]/70 backdrop-blur-md px-6 transition-all duration-200">
      <div className="flex items-center gap-4 flex-1">
        {/* Toggle Sidebar Button for small screens / collapsible state */}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="p-2 -ml-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors"
          title="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb / Title */}
        <nav className="hidden sm:flex items-center space-x-2 text-sm font-medium text-[var(--text-muted)]">
          <span className="hover:text-[var(--text-primary)] cursor-pointer">Workspace</span>
          <span>/</span>
          <span className="text-[var(--text-primary)] font-semibold">{getTabLabel()}</span>
        </nav>
      </div>

      {/* Global Actions */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative hidden md:block w-64">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-[var(--text-muted)]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="search"
            placeholder="Search candidates, roles..."
            className="w-full h-9 pl-9 pr-8 text-xs rounded-xl bg-[var(--bg-input)] border border-[var(--border-color)] hover:border-[var(--border-medium)] focus:bg-[var(--bg-surface)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-all text-[var(--text-primary)]"
          />
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-medium tracking-widest text-[var(--text-muted)] border border-[var(--border-color)] rounded px-1.5 py-0.2 bg-[var(--bg-surface)]">
            ⌘K
          </span>
        </div>

        {/* Create Quick Action Button */}
        <Button
          size="sm"
          variant="primary"
          icon={Plus}
          onClick={onAddNewItem}
          className="hidden sm:inline-flex"
        >
          Add Candidate
        </Button>

        {/* Notifications Button */}
        <button
          onClick={onTriggerNotification}
          className="relative p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] rounded-xl transition-colors"
          aria-label="View notifications"
        >
          <Bell className="w-5 h-5" />
          {/* Active notification indicator dot */}
          <span className="absolute top-1.5 right-1.5 block w-2 h-2 rounded-full bg-[var(--color-primary)] ring-2 ring-[var(--bg-surface)]" />
        </button>

        <div className="h-5 w-[1px] bg-[var(--border-color)]" />

        {/* Profile Dropdown */}
        <Dropdown
          align="right"
          trigger={
            <button className="flex items-center gap-2.5 p-1 -mr-1 rounded-xl hover:bg-[var(--bg-hover)] transition-colors">
              <Avatar
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256"
                name="Olivia Vance"
                size="sm"
                status="online"
              />
              <span className="hidden lg:flex flex-col text-left">
                <span className="text-xs font-semibold text-[var(--text-primary)] leading-tight">
                  Olivia Vance
                </span>
                <span className="text-[10px] text-[var(--text-muted)] leading-none">
                  Recruiting Owner
                </span>
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[var(--text-muted)] hidden lg:block" />
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
          <DropdownItem icon={LogOut} className="text-[var(--color-danger)]">
            Sign out
          </DropdownItem>
        </Dropdown>
      </div>
    </header>
  );
}
