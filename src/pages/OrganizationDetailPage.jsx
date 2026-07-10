import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Building2, PauseCircle, PlayCircle, Trash2 } from 'lucide-react';
import Card, { CardHeader, CardBody } from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Toggle from '../components/common/Toggle';
import ProgressBar from '../components/common/ProgressBar';
import HealthGauge from '../components/common/HealthGauge';
import EmptyState from '../components/dashboard/EmptyState';
import { getOrganizationStatusVariant } from '../components/dashboard/OrganizationTable';
import { useApp } from '../context/AppContext';

const FEATURE_LABELS = {
  campusManagement: 'Campus Management',
  walkInDrive: 'Walk-in Drive',
  whatsappNotifications: 'WhatsApp Notifications',
  clientPortal: 'Client Portal',
  apiAccess: 'API Access',
};

const HEALTH_FACTOR_LABELS = {
  loginFrequency: 'Login Frequency',
  jdActivity: 'JD Activity',
  resumeUploads: 'Resume Uploads',
  aiCreditUtilization: 'AI Credit Utilization',
};

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'configuration', label: 'Configuration' },
  { id: 'onboarding', label: 'Onboarding Checklist' },
];

export default function OrganizationDetailPage() {
  const { organizationId } = useParams();
  const navigate = useNavigate();
  const {
    organizations,
    requestSuspendOrganization,
    requestTerminateOrganization,
    handleReactivateOrganization,
    handleUpdateOrganizationFeature,
    handleToggleOrganizationOnboardingItem,
    addToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState('overview');

  const organization = organizations.find((o) => String(o.id) === organizationId);

  if (!organization) {
    return (
      <EmptyState
        title="Organization not found"
        description="This organization may have been removed, or the link is incorrect."
        actionLabel="Back to Organizations"
        onAction={() => navigate('/organizations')}
        icon={Building2}
      />
    );
  }

  const completedCount = organization.onboardingChecklist.filter((i) => i.completed).length;
  const currencySymbol = organization.currency === 'USD' ? '$' : '₹';

  const tabButtonClass = (tabId) =>
    `px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
      activeTab === tabId
        ? 'active-choice'
        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
    }`;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero */}
      <Card>
        <CardBody className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[var(--bg-surface-2)] rounded-xl text-[var(--text-secondary)]">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">{organization.name}</h1>
                <Badge variant={getOrganizationStatusVariant(organization.status)} dot>
                  {organization.status}
                </Badge>
              </div>
              <p className="text-sm text-[var(--text-muted)]">{organization.domain}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <HealthGauge score={organization.healthScore} size="lg" />
          </div>
        </CardBody>
        <div className="px-6 pb-6 flex flex-wrap gap-3">
          {(organization.status === 'Active' || organization.status === 'Trial') && (
            <Button variant="outline" icon={PauseCircle} onClick={() => requestSuspendOrganization(organization)}>
              Suspend
            </Button>
          )}
          {organization.status === 'Suspended' && (
            <Button variant="outline" icon={PlayCircle} onClick={() => handleReactivateOrganization(organization.id)}>
              Reactivate
            </Button>
          )}
          {organization.status !== 'Terminated' && (
            <Button variant="danger" icon={Trash2} onClick={() => requestTerminateOrganization(organization)}>
              Terminate
            </Button>
          )}
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-2">
        {TABS.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={tabButtonClass(tab.id)}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <h3 className="text-base font-semibold text-[var(--text-primary)]">Company Information</h3>
              </CardHeader>
              <CardBody className="p-6 grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-[var(--text-muted)] block text-xs">Industry</span><span className="font-semibold text-[var(--text-primary)]">{organization.industry}</span></div>
                <div><span className="text-[var(--text-muted)] block text-xs">Company Size</span><span className="font-semibold text-[var(--text-primary)]">{organization.companySize}</span></div>
                <div><span className="text-[var(--text-muted)] block text-xs">Location</span><span className="font-semibold text-[var(--text-primary)]">{organization.city}, {organization.country}</span></div>
                <div><span className="text-[var(--text-muted)] block text-xs">Timezone</span><span className="font-semibold text-[var(--text-primary)]">{organization.timezone}</span></div>
                <div><span className="text-[var(--text-muted)] block text-xs">Admin</span><span className="font-semibold text-[var(--text-primary)]">{organization.adminName}</span></div>
                <div><span className="text-[var(--text-muted)] block text-xs">Admin Email</span><span className="font-semibold text-[var(--text-primary)]">{organization.adminEmail}</span></div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-base font-semibold text-[var(--text-primary)]">Plan &amp; Quota Usage</h3>
              </CardHeader>
              <CardBody className="p-6 space-y-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-[var(--text-muted)]">Plan</span>
                  <Badge variant="brand">{organization.plan}</Badge>
                </div>
                <ProgressBar value={organization.users.used} max={organization.users.allocated} label="Users" />
                <ProgressBar value={organization.jdQuota.used} max={organization.jdQuota.allocated} label="JD Quota" />
                <ProgressBar value={organization.resumeQuota.used} max={organization.resumeQuota.allocated} label="Resume Quota" />
                <ProgressBar value={organization.aiCredits.used} max={organization.aiCredits.allocated} label="AI Credits" />
              </CardBody>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <h3 className="text-base font-semibold text-[var(--text-primary)]">Health Breakdown</h3>
            </CardHeader>
            <CardBody className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.keys(HEALTH_FACTOR_LABELS).map((key) => (
                <ProgressBar
                  key={key}
                  value={organization.healthBreakdown[key]}
                  max={100}
                  label={HEALTH_FACTOR_LABELS[key]}
                  tone="positive"
                />
              ))}
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-base font-semibold text-[var(--text-primary)]">Recent Activity Log</h3>
            </CardHeader>
            <CardBody className="p-6">
              <div className="bg-[var(--bg-inverse)] text-white p-3 rounded-xl text-[10px] leading-relaxed font-mono space-y-1 overflow-x-auto">
                {organization.lastActivityLog.length > 0 ? (
                  organization.lastActivityLog.map((line, i) => <div key={i}>{line}</div>)
                ) : (
                  <div className="opacity-60">No recent activity recorded.</div>
                )}
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {activeTab === 'configuration' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-base font-semibold text-[var(--text-primary)]">Feature Toggles</h3>
            </CardHeader>
            <CardBody className="p-6 space-y-5">
              {Object.keys(FEATURE_LABELS).map((key) => (
                <Toggle
                  key={key}
                  id={`org-feature-${key}`}
                  checked={organization.features[key]}
                  onChange={(value) => handleUpdateOrganizationFeature(organization.id, key, value)}
                  label={FEATURE_LABELS[key]}
                />
              ))}
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-base font-semibold text-[var(--text-primary)]">Plan &amp; Billing</h3>
            </CardHeader>
            <CardBody className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-sm space-y-1">
                <p><span className="text-[var(--text-muted)]">Plan:</span> <span className="font-semibold text-[var(--text-primary)]">{organization.plan}</span></p>
                <p><span className="text-[var(--text-muted)]">Billing Cycle:</span> <span className="font-semibold text-[var(--text-primary)]">{organization.billingCycle}</span></p>
                <p><span className="text-[var(--text-muted)]">Currency:</span> <span className="font-semibold text-[var(--text-primary)]">{currencySymbol} {organization.currency}</span></p>
              </div>
              <Button variant="outline" onClick={() => addToast('Plan change flow coming soon', 'info')}>
                Change Plan
              </Button>
            </CardBody>
          </Card>
        </div>
      )}

      {activeTab === 'onboarding' && (
        <Card>
          <CardHeader>
            <h3 className="text-base font-semibold text-[var(--text-primary)]">Onboarding Checklist</h3>
          </CardHeader>
          <CardBody className="p-6 space-y-5">
            <ProgressBar
              value={completedCount}
              max={organization.onboardingChecklist.length}
              label={`${completedCount} of ${organization.onboardingChecklist.length} complete`}
              showValueText={false}
              tone="positive"
            />
            <div className="space-y-3 pt-2">
              {organization.onboardingChecklist.map((item) => (
                <label key={item.id} className="flex items-center justify-between gap-3 text-sm cursor-pointer">
                  <span className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => handleToggleOrganizationOnboardingItem(organization.id, item.id)}
                      className="rounded border-[var(--border-medium)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]/20 w-4 h-4 cursor-pointer"
                    />
                    <span className={item.completed ? 'text-[var(--text-primary)] font-medium' : 'text-[var(--text-secondary)]'}>
                      {item.label}
                    </span>
                  </span>
                  {item.date && <span className="text-xs text-[var(--text-muted)]">{item.date}</span>}
                </label>
              ))}
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
