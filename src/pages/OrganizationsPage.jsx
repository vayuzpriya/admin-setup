import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Button from '../components/common/Button';
import OrganizationTable from '../components/dashboard/OrganizationTable';
import { useApp } from '../context/AppContext';

export default function OrganizationsPage() {
  const navigate = useNavigate();
  const {
    organizations,
    requestSuspendOrganization,
    requestTerminateOrganization,
    handleReactivateOrganization,
    addToast,
  } = useApp();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight mb-1.5">
            Organization Management
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            Onboard, monitor, and configure client organizations on the ReX platform.
          </p>
        </div>
        <Button
          variant="primary"
          icon={Plus}
          onClick={() => navigate('/organizations/new')}
          className="shadow-sm shadow-[var(--color-orange-shadow)]"
        >
          Create New Organization
        </Button>
      </div>

      <OrganizationTable
        data={organizations}
        onViewDetails={(org) => navigate(`/organizations/${org.id}`)}
        onEdit={(org) => navigate(`/organizations/${org.id}`)}
        onSuspend={requestSuspendOrganization}
        onReactivate={(org) => handleReactivateOrganization(org.id)}
        onTerminate={requestTerminateOrganization}
        onCreateNew={() => navigate('/organizations/new')}
        onStubAction={(message) => addToast(message, 'info')}
      />
    </div>
  );
}
