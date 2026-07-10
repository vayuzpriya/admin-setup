import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialUsers, databaseMetrics, initialOrganizations } from '../data/mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Theme
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    window.document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [isDarkMode]);

  // Data
  const [users, setUsers] = useState(initialUsers);
  const [dbReplicaList] = useState(databaseMetrics);
  const [toasts, setToasts] = useState([]);

  // Modals & Drawer state
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // null for create, object for edit
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedUserForDetail, setSelectedUserForDetail] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedUserForDelete, setSelectedUserForDelete] = useState(null);

  // Create/Edit form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    status: 'Applied',
  });

  // Settings state (profile owner)
  const [profileSettings, setProfileSettings] = useState({
    name: 'Olivia Vance',
    email: 'olivia.vance@company.com',
    notifications: true,
    mfa: true,
  });

  // Organization (tenant) management state — kept parallel to the Users-shaped state above
  const [organizations, setOrganizations] = useState(initialOrganizations);
  const [isOrgConfirmOpen, setIsOrgConfirmOpen] = useState(false);
  const [orgConfirmTarget, setOrgConfirmTarget] = useState(null);
  const [orgConfirmAction, setOrgConfirmAction] = useState(null); // 'suspend' | 'terminate'

  // Toast helpers
  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // User actions
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
      setUsers((prev) =>
        prev.map((u) => (u.id === currentUser.id ? { ...u, ...formData } : u))
      );
      addToast('Candidate records updated.', 'success');
    } else {
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

  // Organization actions
  const requestSuspendOrganization = (org) => {
    setOrgConfirmTarget(org);
    setOrgConfirmAction('suspend');
    setIsOrgConfirmOpen(true);
  };

  const requestTerminateOrganization = (org) => {
    setOrgConfirmTarget(org);
    setOrgConfirmAction('terminate');
    setIsOrgConfirmOpen(true);
  };

  const handleReactivateOrganization = (orgId) => {
    setOrganizations((prev) =>
      prev.map((o) => (o.id === orgId ? { ...o, status: 'Active' } : o))
    );
    addToast('Organization reactivated.', 'success');
  };

  const handleConfirmOrgAction = () => {
    if (!orgConfirmTarget) return;
    if (orgConfirmAction === 'suspend') {
      setOrganizations((prev) =>
        prev.map((o) => (o.id === orgConfirmTarget.id ? { ...o, status: 'Suspended' } : o))
      );
      addToast('Organization suspended.', 'warning');
    } else if (orgConfirmAction === 'terminate') {
      setOrganizations((prev) =>
        prev.map((o) => (o.id === orgConfirmTarget.id ? { ...o, status: 'Terminated' } : o))
      );
      addToast('Organization terminated.', 'error');
    }
    setIsOrgConfirmOpen(false);
    setOrgConfirmTarget(null);
    setOrgConfirmAction(null);
  };

  const handleCreateOrganization = (formData) => {
    const newId =
      organizations.length > 0 ? Math.max(...organizations.map((o) => o.id)) + 1 : 1;
    const newOrg = {
      id: newId,
      status: 'Trial',
      users: { used: 0, allocated: formData.maxUsers || 5 },
      jdQuota: { used: 0, allocated: formData.maxJDs || 10 },
      resumeQuota: { used: 0, allocated: formData.maxResumes || 500 },
      aiCredits: { used: 0, allocated: formData.aiCredits || 2000 },
      lastActive: new Date().toISOString().split('T')[0],
      healthScore: 100,
      healthBreakdown: { loginFrequency: 100, jdActivity: 100, resumeUploads: 100, aiCreditUtilization: 0 },
      createdDate: new Date().toISOString().split('T')[0],
      features: {
        campusManagement: false,
        walkInDrive: false,
        whatsappNotifications: false,
        clientPortal: false,
        apiAccess: false,
      },
      lastActivityLog: [],
      onboardingChecklist: [
        { id: 1, label: 'Branding uploaded', completed: false, date: null },
        { id: 2, label: 'First Tenant Admin logged in', completed: false, date: null },
        { id: 3, label: 'First JD created', completed: false, date: null },
        { id: 4, label: 'First resume uploaded', completed: false, date: null },
        { id: 5, label: 'First candidate matched', completed: false, date: null },
        { id: 6, label: 'First pipeline stage move', completed: false, date: null },
      ],
      ...formData,
    };
    setOrganizations((prev) => [...prev, newOrg]);
    addToast('New organization onboarded successfully.', 'success');
    return newId;
  };

  const handleUpdateOrganizationFeature = (orgId, key, value) => {
    setOrganizations((prev) =>
      prev.map((o) =>
        o.id === orgId ? { ...o, features: { ...o.features, [key]: value } } : o
      )
    );
    addToast('Feature settings updated.', 'success');
  };

  const handleToggleOrganizationOnboardingItem = (orgId, itemId) => {
    setOrganizations((prev) =>
      prev.map((o) =>
        o.id === orgId
          ? {
              ...o,
              onboardingChecklist: o.onboardingChecklist.map((item) =>
                item.id === itemId
                  ? {
                      ...item,
                      completed: !item.completed,
                      date: !item.completed ? new Date().toISOString().split('T')[0] : null,
                    }
                  : item
              ),
            }
          : o
      )
    );
  };

  const value = {
    isDarkMode,
    setIsDarkMode,
    users,
    dbReplicaList,
    toasts,
    addToast,
    removeToast,
    isUserModalOpen,
    setIsUserModalOpen,
    currentUser,
    isSettingsModalOpen,
    setIsSettingsModalOpen,
    isDrawerOpen,
    setIsDrawerOpen,
    selectedUserForDetail,
    setSelectedUserForDetail,
    isConfirmOpen,
    setIsConfirmOpen,
    setSelectedUserForDelete,
    formData,
    setFormData,
    profileSettings,
    setProfileSettings,
    handleAddNewUser,
    handleEditUser,
    handleDeleteUser,
    handleConfirmDelete,
    handleSaveUser,
    organizations,
    isOrgConfirmOpen,
    setIsOrgConfirmOpen,
    orgConfirmTarget,
    orgConfirmAction,
    requestSuspendOrganization,
    requestTerminateOrganization,
    handleReactivateOrganization,
    handleConfirmOrgAction,
    handleCreateOrganization,
    handleUpdateOrganizationFeature,
    handleToggleOrganizationOnboardingItem,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within an AppProvider');
  return ctx;
}
