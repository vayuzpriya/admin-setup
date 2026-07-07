import React, { useState, useEffect } from 'react';
import {
  Users,
  Settings,
  DollarSign,
  Activity,
  Database,
  BookOpen,
  Sparkles,
  Plus,
  Terminal,
  Server,
  Lock,
  Globe,
  Bell,
  ArrowRight,
  RefreshCw,
  HardDrive,
  Shield,
  Layers,
  Clipboard,
  AlertTriangle,
  Key,
  Check
} from 'lucide-react';

// Layout & Common components
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Button from './components/common/Button';
import Card, { CardHeader, CardBody, CardFooter } from './components/common/Card';
import Badge from './components/common/Badge';
import Avatar from './components/common/Avatar';
import Modal from './components/common/Modal';
import Drawer from './components/common/Drawer';
import ConfirmationDialog from './components/common/ConfirmationDialog';
import { ToastContainer } from './components/common/Toast';
import Skeleton, { TableSkeleton, CardSkeleton } from './components/common/Skeleton';

// Dashboard components
import StatsCard from './components/dashboard/StatsCard';
import ChartsPlaceholder from './components/dashboard/ChartsPlaceholder';
import DataTable from './components/dashboard/DataTable';
import EmptyState from './components/dashboard/EmptyState';
import FormElementsShowcase from './components/dashboard/FormElementsShowcase';
import RoleManagement from './components/dashboard/RoleManagement';
import NoPermission from './components/dashboard/NoPermission';
import ErrorPages from './components/dashboard/ErrorPages';
import LoginView from './components/dashboard/LoginView';

// Mock Data
import { initialUsers, databaseMetrics, databaseLogs } from './data/mockData';

export default function App() {
  // Theme & Layout state
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  // Data states
  const [users, setUsers] = useState(initialUsers);
  const [dbReplicaList, setDbReplicaList] = useState(databaseMetrics);
  const [logs, setLogs] = useState(databaseLogs);
  const [toasts, setToasts] = useState([]);

  // Modals & Drawer states
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // null for create, object for edit
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedUserForDetail, setSelectedUserForDetail] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedUserForDelete, setSelectedUserForDelete] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    status: 'Applied',
  });

  // Settings state (Olivia Profile)
  const [profileSettings, setProfileSettings] = useState({
    name: 'Olivia Vance',
    email: 'olivia.vance@company.com',
    notifications: true,
    mfa: true,
  });

  // Effect to apply dark mode class
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Toast Helpers
  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // User Actions
  const handleAddNewUser = () => {
    setCurrentUser(null);
    setFormData({
      name: '',
      email: '',
      role: '',
      status: 'Applied',
    });
    setIsUserModalOpen(true);
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setIsUserModalOpen(true);
  };

  const handleDeleteUser = (id) => {
    setSelectedUserForDelete(id);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedUserForDelete) {
      setUsers((prev) => prev.filter((u) => u.id !== selectedUserForDelete));
      addToast('Candidate record removed from database.', 'success');
    }
    setIsConfirmOpen(false);
    setSelectedUserForDelete(null);
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.role) {
      addToast('Please complete all form fields.', 'error');
      return;
    }

    if (currentUser) {
      // Edit User
      setUsers((prev) =>
        prev.map((u) =>
          u.id === currentUser.id
            ? { ...u, ...formData }
            : u
        )
      );
      addToast('Candidate records updated.', 'success');
    } else {
      // Add User
      const newId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
      const newUser = {
        id: newId,
        ...formData,
        joinDate: new Date().toISOString().split('T')[0],
        avatar: `https://images.unsplash.com/photo-${1500000000000 + newId * 10000}?auto=format&fit=crop&q=80&w=256`,
      };
      setUsers((prev) => [...prev, newUser]);
      addToast('New candidate added to pipeline.', 'success');
    }
    setIsUserModalOpen(false);
  };

  const handleDatabaseAction = (actionName) => {
    addToast(`Executing sourcing synchronization: ${actionName}`, 'info');
    setTimeout(() => {
      if (actionName === 'Sync') {
        const newLog = {
          timestamp: new Date().toTimeString().split(' ')[0],
          type: 'info',
          message: 'Manual API sync complete. Greenhouse webhook import finished. Synced 4 candidate profiles.',
        };
        setLogs((prev) => [newLog, ...prev]);
        addToast('greenhouse sync task finished.', 'success');
      } else if (actionName === 'Reboot') {
        addToast('LinkedIn API connection pool recycled.', 'warning');
        const newLog = {
          timestamp: new Date().toTimeString().split(' ')[0],
          type: 'warning',
          message: 'Connection recycled on api.linkedin.com/v2. Latency dropped to 14ms.',
        };
        setLogs((prev) => [newLog, ...prev]);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans flex relative overflow-hidden">
      {/* Background glowing gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-500/10 dark:bg-brand-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-500/10 dark:bg-purple-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[90px] pointer-events-none" />
      {/* Sidebar Navigation */}
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
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
          activeTab={activeTab}
          onOpenSettings={() => setIsSettingsModalOpen(true)}
          onTriggerNotification={() => addToast('Recruiting notification: Greenhouse webhook received new application.', 'info')}
          onAddNewItem={handleAddNewUser}
        />

        {/* Content Container */}
        <main className="flex-1 p-6 md:p-8 space-y-8 max-w-7xl w-full mx-auto">
          
          {/* Tab Content Router */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fade-in">
              {/* Heading */}
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-55 tracking-tight mb-1.5 flex items-center gap-2">
                  Recruiting Overview <Sparkles className="w-5 h-5 text-brand-500" />
                </h1>
                <p className="text-sm text-slate-455 dark:text-slate-500">
                  Track talent acquisition metrics, weekly activity, and API sourcing integrations.
                </p>
              </div>

              {/* Stats Cards Row (KPI Cards) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                  title="Total Applicants"
                  value="4,852"
                  change="+12.5%"
                  changeType="positive"
                  icon={Users}
                  sparklineData={[3800, 4000, 4100, 4300, 4600, 4852]}
                />
                <StatsCard
                  title="Active Job Postings"
                  value="42"
                  change="+8.2%"
                  changeType="positive"
                  icon={Globe}
                  sparklineData={[30, 32, 35, 38, 40, 42]}
                />
                <StatsCard
                  title="Interviews Booked"
                  value="124"
                  change="+3.1%"
                  changeType="positive"
                  icon={Activity}
                  sparklineData={[105, 110, 115, 112, 118, 124]}
                />
                <StatsCard
                  title="Offer Accept Rate"
                  value="88.5%"
                  change="-1.5%"
                  changeType="negative"
                  icon={Check}
                  sparklineData={[92, 91, 90, 89, 88.2, 88.5]}
                />
              </div>

              {/* Graphical Charts Placeholder */}
              <ChartsPlaceholder />

              {/* Skeletons Loading & Empty State Demo */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Skeletons Demo */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="text-xs font-semibold text-slate-455 uppercase tracking-wider">Loading Skeletons Demo</div>
                  <Skeleton variant="text" className="w-2/3 h-4" />
                  <div className="flex items-center gap-3">
                    <Skeleton variant="circular" className="w-10 h-10" />
                    <div className="space-y-1.5 flex-1">
                      <Skeleton variant="text" className="w-1/2 h-3" />
                      <Skeleton variant="text" className="w-1/3 h-3" />
                    </div>
                  </div>
                  <Skeleton variant="rectangular" className="h-24 w-full" />
                </div>

                {/* Empty State Demo */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="text-xs font-semibold text-slate-455 uppercase tracking-wider">Empty State Template</div>
                  <EmptyState
                    title="No Interview slots set"
                    description="You currently do not have any candidate interview slots locked in for today."
                    actionLabel="Book a slot"
                    onAction={() => addToast('Redirecting to calendar bookings...', 'info')}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 tracking-tight mb-1.5">
                    User Management (Candidates)
                  </h1>
                  <p className="text-sm text-slate-455 dark:text-slate-500">
                    Manage applicant profiles, interview stages, and target job postings using full search, filters, and tables.
                  </p>
                </div>
                <Button
                  variant="primary"
                  icon={Plus}
                  onClick={handleAddNewUser}
                  className="shadow-sm shadow-brand-500/10"
                >
                  Add Candidate
                </Button>
              </div>

              {/* Data Table with Search, Filters, Badges, and Pagination */}
              <DataTable
                data={users}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
                onViewDetails={(item) => {
                  setSelectedUserForDetail(item);
                  setIsDrawerOpen(true);
                }}
              />
            </div>
          )}

          {activeTab === 'roles' && (
            <RoleManagement addToast={addToast} />
          )}

          {activeTab === 'forms' && (
            <FormElementsShowcase addToast={addToast} />
          )}

          {activeTab === 'overlays' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-55 tracking-tight mb-1.5">
                  Overlays & Modal Dialogs
                </h1>
                <p className="text-sm text-slate-455 dark:text-slate-500">
                  Trigger and verify drawer overlays, modals, and dangerous action confirmation windows.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card hoverEffect>
                  <CardHeader>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Slide-over Drawer</h3>
                  </CardHeader>
                  <CardBody className="p-6 text-center space-y-4">
                    <p className="text-xs text-slate-500 dark:text-slate-455">Renders candidate log details panel sliding from the right screen boundary.</p>
                    <Button variant="outline" size="sm" onClick={() => {
                      setSelectedUserForDetail(users[0]);
                      setIsDrawerOpen(true);
                    }}>Open Sample Drawer</Button>
                  </CardBody>
                </Card>
                <Card hoverEffect>
                  <CardHeader>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Standard Modal Dialog</h3>
                  </CardHeader>
                  <CardBody className="p-6 text-center space-y-4">
                    <p className="text-xs text-slate-500 dark:text-slate-455">Displays focus modal boxes, overlay backdrops, and form actions.</p>
                    <Button variant="outline" size="sm" onClick={() => setIsUserModalOpen(true)}>Open Sample Modal</Button>
                  </CardBody>
                </Card>
                <Card hoverEffect>
                  <CardHeader>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Confirmation Dialog</h3>
                  </CardHeader>
                  <CardBody className="p-6 text-center space-y-4">
                    <p className="text-xs text-slate-500 dark:text-slate-455">Presents safety alerts before carrying out dangerous/critical deletions.</p>
                    <Button variant="danger" size="sm" onClick={() => {
                      setSelectedUserForDelete(1);
                      setIsConfirmOpen(true);
                    }}>Open Warning Dialog</Button>
                  </CardBody>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'toasts' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-55 tracking-tight mb-1.5">
                  Toast Notification Alerts
                </h1>
                <p className="text-sm text-slate-455 dark:text-slate-500">
                  Trigger success and error notification boxes displaying status signals.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card hoverEffect>
                  <CardHeader>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Success Toast</h3>
                  </CardHeader>
                  <CardBody className="p-6 flex flex-col items-center gap-4">
                    <p className="text-xs text-slate-500 dark:text-slate-455 text-center">Trigger a success check popup.</p>
                    <Button variant="primary" onClick={() => addToast('Candidate invitation sent to Sophia Rodriguez.', 'success')}>Trigger Success Toast</Button>
                  </CardBody>
                </Card>
                <Card hoverEffect>
                  <CardHeader>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Error Toast</h3>
                  </CardHeader>
                  <CardBody className="p-6 flex flex-col items-center gap-4">
                    <p className="text-xs text-slate-500 dark:text-slate-455 text-center">Trigger an error warn block.</p>
                    <Button variant="danger" onClick={() => addToast('LinkedIn API connections timed out after 30000ms.', 'error')}>Trigger Error Toast</Button>
                  </CardBody>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'permission' && (
            <NoPermission onBackToDashboard={() => setActiveTab('dashboard')} />
          )}

          {activeTab === 'errors' && (
            <ErrorPages onBackToDashboard={() => setActiveTab('dashboard')} />
          )}

          {activeTab === 'login' && (
            <LoginView addToast={addToast} />
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-55">
                  Global Settings
                </h1>
                <p className="text-sm text-slate-455 dark:text-slate-500">
                  Update recruiting owner profiles, API keys, and notification triggers.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                        Profile Information
                      </h3>
                    </CardHeader>
                    <CardBody className="p-6 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-450 dark:text-slate-500 uppercase tracking-wider block">Full Name</label>
                          <input
                            type="text"
                            value={profileSettings.name}
                            onChange={(e) => setProfileSettings({ ...profileSettings, name: e.target.value })}
                            className="w-full h-10 px-3 text-sm rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 dark:text-slate-200"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-455 dark:text-slate-500 uppercase tracking-wider block">Email Address</label>
                          <input
                            type="email"
                            value={profileSettings.email}
                            onChange={(e) => setProfileSettings({ ...profileSettings, email: e.target.value })}
                            className="w-full h-10 px-3 text-sm rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 dark:text-slate-200"
                          />
                        </div>
                      </div>
                    </CardBody>
                    <CardFooter className="flex justify-end gap-3">
                      <Button variant="primary" onClick={() => addToast('Profile details updated.', 'success')}>
                        Save Changes
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardBody className="p-6 flex flex-col items-center text-center space-y-4">
                      <Avatar
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256"
                        name="Olivia Vance"
                        size="xl"
                      />
                      <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-slate-55">{profileSettings.name}</h3>
                        <p className="text-xs text-slate-400 dark:text-slate-500">{profileSettings.email}</p>
                      </div>
                      <Badge variant="brand">Recruiting Owner</Badge>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'help' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-55 tracking-tight mb-1.5 flex items-center gap-2">
                  Developer Documentation <BookOpen className="w-5 h-5 text-brand-500" />
                </h1>
                <p className="text-sm text-slate-450 dark:text-slate-500">
                  Quick start guidelines, API structures, and components usage.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                      Clean Component Design
                    </h3>
                  </CardHeader>
                  <CardBody className="p-6 text-sm text-slate-600 dark:text-slate-400 space-y-3">
                    <p>
                      The RexRecruit components follow functional designs using Tailwind CSS utilities. Do not install external stylesheet dependencies.
                    </p>
                    <div className="bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                      <code className="text-xs text-slate-800 dark:text-slate-300">
                        {`import Button from './components/common/Button';\n\n<Button variant="primary">Add Candidate</Button>`}
                      </code>
                    </div>
                  </CardBody>
                </Card>

                <Card>
                  <CardHeader>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                      Theme Tokens (Dark/Light)
                    </h3>
                  </CardHeader>
                  <CardBody className="p-6 text-sm text-slate-600 dark:text-slate-400 space-y-3">
                    <p>
                      Toggle light and dark palettes by binding a toggle state that attaches the class <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-slate-950 dark:text-slate-200">.dark</code> to the html element.
                    </p>
                    <div className="bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                      <code className="text-xs text-slate-800 dark:text-slate-300">
                        {`<div className="bg-white dark:bg-slate-900">\n  <span className="text-slate-900 dark:text-slate-55" />\n</div>`}
                      </code>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>
          )}

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
            <label className="text-xs font-semibold text-slate-450 dark:text-slate-550 uppercase tracking-wider block">Full Name</label>
            <input
              type="text"
              placeholder="e.g. Sophia Rodriguez"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full h-10 px-3 text-sm rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 dark:text-slate-200"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-455 dark:text-slate-555 uppercase tracking-wider block">Email Address</label>
            <input
              type="email"
              placeholder="e.g. sophia.rod@gmail.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full h-10 px-3 text-sm rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 dark:text-slate-200"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-455 dark:text-slate-555 uppercase tracking-wider block">Target Position</label>
            <input
              type="text"
              placeholder="e.g. Senior Frontend Architect"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full h-10 px-3 text-sm rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 dark:text-slate-200"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-455 dark:text-slate-555 uppercase tracking-wider block">Interview Stage</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full h-10 px-3 text-sm rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 dark:text-slate-200 cursor-pointer"
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
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Quick configuration options for the RexRecruit dashboard view.
          </p>
          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl space-y-2 border border-slate-100 dark:border-slate-850">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Dark Mode Status:</span>
              <Badge variant={isDarkMode ? 'brand' : 'neutral'}>{isDarkMode ? 'Enabled' : 'Disabled'}</Badge>
            </div>
            <div className="flex justify-between items-center text-xs pt-1">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Active Job Board Integrations:</span>
              <span className="font-mono text-slate-600 dark:text-slate-400">{dbReplicaList.length} Connected APIs</span>
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
            <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
              <Avatar src={selectedUserForDetail.avatar} name={selectedUserForDetail.name} size="xl" />
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900 dark:text-slate-50">{selectedUserForDetail.name}</h4>
                <p className="text-xs text-slate-400">{selectedUserForDetail.email}</p>
                <Badge variant="brand">{selectedUserForDetail.role}</Badge>
              </div>
            </div>
            <div className="space-y-4 text-xs">
              <div className="flex justify-between">
                <span className="font-semibold text-slate-400">Application Date:</span>
                <span className="text-slate-800 dark:text-slate-200">{selectedUserForDetail.joinDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-400">Verification ID:</span>
                <span className="font-mono text-slate-655 dark:text-slate-400">USR-0028{selectedUserForDetail.id}</span>
              </div>
              <div className="space-y-1.5 pt-2">
                <span className="font-semibold text-slate-400 block">System Activity Logs:</span>
                <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-[10px] leading-relaxed font-mono">
                  <div>[14:52:10] Resume parse task: extracted 12 skills.</div>
                  <div>[14:55:00] Automated skills match score: 94.2%.</div>
                  <div>[15:10:00] Stage advanced to: {selectedUserForDetail.status}.</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 text-slate-400">No profile selected.</div>
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
