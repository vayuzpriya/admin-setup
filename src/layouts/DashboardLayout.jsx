import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Avatar from '../components/common/Avatar';
import Modal from '../components/common/Modal';
import Drawer from '../components/common/Drawer';
import ConfirmationDialog from '../components/common/ConfirmationDialog';
import { ToastContainer } from '../components/common/Toast';
import { useApp } from '../context/AppContext';

export default function DashboardLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const {
    isDarkMode,
    setIsDarkMode,
    toasts,
    addToast,
    removeToast,
    isUserModalOpen,
    setIsUserModalOpen,
    currentUser,
    formData,
    setFormData,
    handleSaveUser,
    handleAddNewUser,
    isSettingsModalOpen,
    setIsSettingsModalOpen,
    dbReplicaList,
    isDrawerOpen,
    setIsDrawerOpen,
    selectedUserForDetail,
    setSelectedUserForDetail,
    isConfirmOpen,
    setIsConfirmOpen,
    setSelectedUserForDelete,
    handleConfirmDelete,
  } = useApp();

  return (
    <div className="min-h-screen bg-[var(--bg-page)] font-sans flex relative overflow-hidden">
      {/* Background glowing gradients */}
      {/* <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-500/10 dark:bg-brand-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-500/10 dark:bg-purple-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[90px] pointer-events-none" /> */}

      {/* Sidebar Navigation */}
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* Main Content Outer Container */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          isCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        {/* Navbar / Header */}
        <Navbar
          isSidebarCollapsed={isCollapsed}
          setIsSidebarCollapsed={setIsCollapsed}
          onOpenSettings={() => setIsSettingsModalOpen(true)}
          onTriggerNotification={() => addToast('Recruiting notification: Greenhouse webhook received new application.', 'info')}
          onAddNewItem={handleAddNewUser}
        />

        {/* Routed page content */}
        <main className="flex-1 p-6 md:p-8 space-y-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* CREATE/EDIT CANDIDATE MODAL */}
      <Modal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        title={currentUser ? 'Modify Candidate Records' : 'Add New Candidate'}
        footer={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsUserModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveUser}>
              {currentUser ? 'Save Changes' : 'Create Record'}
            </Button>
          </div>
        }
      >
        <form onSubmit={handleSaveUser} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--text-label)] uppercase tracking-wider block">Full Name</label>
            <input
              type="text"
              placeholder="e.g. Sophia Rodriguez"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full h-10 px-3 text-sm rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] text-[var(--text-primary)]"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--text-label)] uppercase tracking-wider block">Email Address</label>
            <input
              type="email"
              placeholder="e.g. sophia.rod@gmail.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full h-10 px-3 text-sm rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] text-[var(--text-primary)]"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--text-label)] uppercase tracking-wider block">Target Position</label>
            <input
              type="text"
              placeholder="e.g. Senior Frontend Architect"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full h-10 px-3 text-sm rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] text-[var(--text-primary)]"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--text-label)] uppercase tracking-wider block">Interview Stage</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full h-10 px-3 text-sm rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] text-[var(--text-primary)] cursor-pointer"
            >
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offered">Offered</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </form>
      </Modal>

      {/* QUICK SYSTEM SETTINGS MODAL */}
      <Modal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        title="Admin Settings Panel"
        footer={
          <Button variant="primary" onClick={() => setIsSettingsModalOpen(false)}>
            Close Settings
          </Button>
        }
      >
        <div className="space-y-4">
          <p className="text-sm text-[var(--text-muted)]">
            Quick configuration options for the RexRecruit dashboard view.
          </p>
          <div className="p-4 bg-[var(--bg-surface-2)] rounded-xl space-y-2 border border-[var(--border-color)]">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-[var(--text-secondary)]">Dark Mode Status:</span>
              <Badge variant={isDarkMode ? 'brand' : 'neutral'}>{isDarkMode ? 'Enabled' : 'Disabled'}</Badge>
            </div>
            <div className="flex justify-between items-center text-xs pt-1">
              <span className="font-semibold text-[var(--text-secondary)]">Active Job Board Integrations:</span>
              <span className="font-mono text-[var(--text-secondary)]">{dbReplicaList.length} Connected APIs</span>
            </div>
          </div>
        </div>
      </Modal>

      {/* DRAWER VIEW CANDIDATE DETAIL */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => { setIsDrawerOpen(false); setSelectedUserForDetail(null); }}
        title="Candidate Profile Details"
        size="md"
        footer={
          <div className="flex justify-between items-center w-full">
            <Badge variant={selectedUserForDetail?.status === 'Offered' ? 'success' : selectedUserForDetail?.status === 'Interviewing' ? 'info' : selectedUserForDetail?.status === 'Applied' ? 'warning' : 'danger'}>
              Stage: {selectedUserForDetail?.status || 'N/A'}
            </Badge>
            <Button variant="outline" onClick={() => { setIsDrawerOpen(false); setSelectedUserForDetail(null); }}>
              Dismiss Details
            </Button>
          </div>
        }
      >
        {selectedUserForDetail ? (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-4 border-b border-[var(--border-color)] pb-5">
              <Avatar src={selectedUserForDetail.avatar} name={selectedUserForDetail.name} size="xl" />
              <div className="space-y-1">
                <h4 className="text-base font-bold text-[var(--text-primary)]">{selectedUserForDetail.name}</h4>
                <p className="text-xs text-[var(--text-muted)]">{selectedUserForDetail.email}</p>
                <Badge variant="brand">{selectedUserForDetail.role}</Badge>
              </div>
            </div>
            <div className="space-y-4 text-xs">
              <div className="flex justify-between">
                <span className="font-semibold text-[var(--text-muted)]">Application Date:</span>
                <span className="text-[var(--text-primary)]">{selectedUserForDetail.joinDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-[var(--text-muted)]">Verification ID:</span>
                <span className="font-mono text-[var(--text-secondary)]">USR-0028{selectedUserForDetail.id}</span>
              </div>
              <div className="space-y-1.5 pt-2">
                <span className="font-semibold text-[var(--text-muted)] block">System Activity Logs:</span>
                <div className="bg-[var(--bg-inverse)] text-white p-3 rounded-xl border border-[var(--border-color)] text-[10px] leading-relaxed font-mono">
                  <div>[14:52:10] Resume parse task: extracted 12 skills.</div>
                  <div>[14:55:00] Automated skills match score: 94.2%.</div>
                  <div>[15:10:00] Stage advanced to: {selectedUserForDetail.status}.</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 text-[var(--text-muted)]">No profile selected.</div>
        )}
      </Drawer>

      {/* SYSTEM CONFIRMATION DIALOG */}
      <ConfirmationDialog
        isOpen={isConfirmOpen}
        onClose={() => { setIsConfirmOpen(false); setSelectedUserForDelete(null); }}
        onConfirm={handleConfirmDelete}
        title="Remove Candidate Record?"
        description="Are you absolutely sure you want to delete this applicant profile? This action will permanently wipe their history logs and connection parameters from Greenhouse Sync."
        confirmLabel="Wipe Record"
      />

      {/* Active Toasts stack notifications */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}
