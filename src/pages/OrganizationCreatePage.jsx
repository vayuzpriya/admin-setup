import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Check } from 'lucide-react';
import Card, { CardHeader, CardBody } from '../components/common/Card';
import Button from '../components/common/Button';
import Toggle from '../components/common/Toggle';
import ProgressBar from '../components/common/ProgressBar';
import Stepper from '../components/common/Stepper';
import { useApp } from '../context/AppContext';
import { planTiers } from '../data/mockData';

const STEPS = [
  { id: 'org', label: 'Organization' },
  { id: 'plan', label: 'Plan' },
  { id: 'admin', label: 'Admin' },
  { id: 'features', label: 'Features' },
  { id: 'review', label: 'Review' },
];

const FEATURE_LABELS = {
  campusManagement: 'Campus Management',
  walkInDrive: 'Walk-in Drive',
  whatsappNotifications: 'WhatsApp Notifications',
  clientPortal: 'Client Portal',
  apiAccess: 'API Access',
};

const inputClasses =
  'w-full h-10 px-3.5 text-sm rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] text-[var(--text-primary)]';
const labelClasses = 'text-xs font-semibold text-[var(--text-label)] uppercase tracking-wider block';
const selectClasses = `${inputClasses} appearance-none pr-9 cursor-pointer`;

export default function OrganizationCreatePage() {
  const navigate = useNavigate();
  const { handleCreateOrganization, addToast } = useApp();
  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState({
    name: '',
    subdomain: '',
    industry: '',
    companySize: '',
    city: '',
    country: '',
    timezone: 'Asia/Kolkata',
    currency: 'INR',
    plan: 'starter',
    isAnnual: false,
    overageEnabled: false,
    overageBuffer: 10,
    adminName: '',
    adminEmail: '',
    adminPhone: '',
    sendWelcomeEmail: true,
    features: {
      campusManagement: false,
      walkInDrive: false,
      whatsappNotifications: false,
      clientPortal: false,
      apiAccess: false,
    },
  });

  const update = (patch) => setFormData((prev) => ({ ...prev, ...patch }));
  const updateFeature = (key, value) =>
    setFormData((prev) => ({ ...prev, features: { ...prev.features, [key]: value } }));

  const selectedPlan = planTiers.find((tier) => tier.id === formData.plan) || planTiers[0];

  const validateStep = () => {
    if (currentStep === 0) {
      if (!formData.name || !formData.subdomain || !formData.industry || !formData.city || !formData.country) {
        addToast('Please complete all required organization fields.', 'error');
        return false;
      }
    }
    if (currentStep === 2) {
      if (!formData.adminName || !formData.adminEmail) {
        addToast('Please provide the admin name and email.', 'error');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const handleBack = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const handleSubmit = () => {
    const domain = `${formData.subdomain}.rexapp.io`;
    const newId = handleCreateOrganization({
      ...formData,
      domain,
      plan: selectedPlan.name,
      billingCycle: formData.isAnnual ? 'Annual' : 'Monthly',
      maxUsers: selectedPlan.maxUsers,
      maxJDs: selectedPlan.maxJDs,
      maxResumes: selectedPlan.maxResumes,
      aiCredits: selectedPlan.aiCredits,
    });
    navigate(`/organizations/${newId}`);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight mb-1.5">
          Create New Organization
        </h1>
        <p className="text-sm text-[var(--text-muted)]">
          Provision a new isolated client workspace on the ReX platform.
        </p>
      </div>

      <Card>
        <CardBody className="p-6 md:p-8 space-y-8">
          <Stepper steps={STEPS} currentStep={currentStep} onStepClick={setCurrentStep} />

          {currentStep === 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5 sm:col-span-2">
                <label className={labelClasses}>Company Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => update({ name: e.target.value })}
                  placeholder="e.g. Nexora Talent"
                  className={inputClasses}
                />
              </div>
              <div className="space-y-1.5">
                <label className={labelClasses}>Subdomain</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.subdomain}
                    onChange={(e) => update({ subdomain: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                    placeholder="nexora"
                    className={`${inputClasses} pr-28`}
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[var(--text-muted)]">
                    .rexapp.io
                  </span>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className={labelClasses}>Industry</label>
                <div className="relative">
                  <select value={formData.industry} onChange={(e) => update({ industry: e.target.value })} className={selectClasses}>
                    <option value="">Select industry</option>
                    <option>IT Services</option>
                    <option>EdTech</option>
                    <option>BFSI</option>
                    <option>Healthcare</option>
                    <option>Manufacturing</option>
                    <option>Retail</option>
                    <option>Other</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[var(--text-muted)] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className={labelClasses}>Company Size</label>
                <div className="relative">
                  <select value={formData.companySize} onChange={(e) => update({ companySize: e.target.value })} className={selectClasses}>
                    <option value="">Select size</option>
                    <option value="1-50">1-50</option>
                    <option value="51-200">51-200</option>
                    <option value="201-1000">201-1000</option>
                    <option value="1000+">1000+</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[var(--text-muted)] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className={labelClasses}>City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => update({ city: e.target.value })}
                  placeholder="e.g. Bengaluru"
                  className={inputClasses}
                />
              </div>
              <div className="space-y-1.5">
                <label className={labelClasses}>Country</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => update({ country: e.target.value })}
                  placeholder="e.g. India"
                  className={inputClasses}
                />
              </div>
              <div className="space-y-1.5">
                <label className={labelClasses}>Timezone</label>
                <div className="relative">
                  <select value={formData.timezone} onChange={(e) => update({ timezone: e.target.value })} className={selectClasses}>
                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                    <option value="America/New_York">America/New_York (ET)</option>
                    <option value="America/Chicago">America/Chicago (CT)</option>
                    <option value="Europe/London">Europe/London (GMT)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[var(--text-muted)] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className={labelClasses}>Currency</label>
                <div className="relative">
                  <select value={formData.currency} onChange={(e) => update({ currency: e.target.value })} className={selectClasses}>
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[var(--text-muted)] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <Toggle
                id="billing-cycle"
                checked={formData.isAnnual}
                onChange={(value) => update({ isAnnual: value })}
                label="Annual Billing"
                description="Switch on for annual pricing (discounted vs. monthly)."
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {planTiers.map((tier) => {
                  const isSelected = formData.plan === tier.id;
                  const price = formData.isAnnual ? tier.annualPrice : tier.monthlyPrice;
                  return (
                    <Card
                      key={tier.id}
                      selected={isSelected}
                      className="p-5 cursor-pointer"
                      onClick={() => update({ plan: tier.id })}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-base font-bold text-[var(--text-primary)]">{tier.name}</h3>
                        {isSelected && <Check className="w-4 h-4 text-[var(--color-primary)]" />}
                      </div>
                      <p className="text-lg font-bold text-[var(--text-primary)] mb-3">
                        {price === null ? 'Custom' : `${formData.currency === 'USD' ? '$' : '₹'}${price.toLocaleString()}`}
                        {price !== null && <span className="text-xs font-normal text-[var(--text-muted)]">/{formData.isAnnual ? 'yr' : 'mo'}</span>}
                      </p>
                      <ul className="space-y-1.5 text-xs text-[var(--text-secondary)]">
                        <li>{tier.maxUsers === -1 ? 'Unlimited' : tier.maxUsers} Users</li>
                        <li>{tier.maxJDs === -1 ? 'Unlimited' : tier.maxJDs} JDs/month</li>
                        <li>{tier.maxResumes === -1 ? 'Unlimited' : tier.maxResumes} Resumes/month</li>
                        <li>{tier.aiCredits === -1 ? 'Unlimited' : tier.aiCredits.toLocaleString()} AI Credits</li>
                      </ul>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className={labelClasses}>Admin Name</label>
                <input
                  type="text"
                  value={formData.adminName}
                  onChange={(e) => update({ adminName: e.target.value })}
                  placeholder="e.g. Priya Sharma"
                  className={inputClasses}
                />
              </div>
              <div className="space-y-1.5">
                <label className={labelClasses}>Admin Work Email</label>
                <input
                  type="email"
                  value={formData.adminEmail}
                  onChange={(e) => update({ adminEmail: e.target.value })}
                  placeholder="admin@company.com"
                  className={inputClasses}
                />
              </div>
              <div className="space-y-1.5">
                <label className={labelClasses}>Admin Phone</label>
                <input
                  type="tel"
                  value={formData.adminPhone}
                  onChange={(e) => update({ adminPhone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className={inputClasses}
                />
              </div>
              <div className="flex items-end pb-2">
                <label className="flex items-center gap-3 text-sm text-[var(--text-secondary)] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.sendWelcomeEmail}
                    onChange={(e) => update({ sendWelcomeEmail: e.target.checked })}
                    className="rounded border-[var(--border-medium)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]/20 w-4 h-4 cursor-pointer"
                  />
                  Send welcome email to admin
                </label>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-5">
                {Object.keys(FEATURE_LABELS).map((key) => (
                  <Toggle
                    key={key}
                    id={`feature-${key}`}
                    checked={formData.features[key]}
                    onChange={(value) => updateFeature(key, value)}
                    label={FEATURE_LABELS[key]}
                  />
                ))}
              </div>
              <div className="border-t border-[var(--border-color)] pt-5 space-y-5">
                <Toggle
                  id="overage"
                  checked={formData.overageEnabled}
                  onChange={(value) => update({ overageEnabled: value })}
                  label="Overage Handling"
                  description="Charge overage per unit instead of pausing AI features at quota limit."
                />
                {formData.overageEnabled && (
                  <div className="space-y-1.5 max-w-xs">
                    <label className={labelClasses}>Overage Buffer (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.overageBuffer}
                      onChange={(e) => update({ overageBuffer: Number(e.target.value) })}
                      className={inputClasses}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="space-y-1"><span className="text-[var(--text-muted)]">Company Name</span><p className="font-semibold text-[var(--text-primary)]">{formData.name || '—'}</p></div>
                <div className="space-y-1"><span className="text-[var(--text-muted)]">Subdomain</span><p className="font-semibold text-[var(--text-primary)]">{formData.subdomain || '—'}.rexapp.io</p></div>
                <div className="space-y-1"><span className="text-[var(--text-muted)]">Industry</span><p className="font-semibold text-[var(--text-primary)]">{formData.industry || '—'}</p></div>
                <div className="space-y-1"><span className="text-[var(--text-muted)]">Location</span><p className="font-semibold text-[var(--text-primary)]">{formData.city || '—'}, {formData.country || '—'}</p></div>
                <div className="space-y-1"><span className="text-[var(--text-muted)]">Plan</span><p className="font-semibold text-[var(--text-primary)]">{selectedPlan.name} ({formData.isAnnual ? 'Annual' : 'Monthly'})</p></div>
                <div className="space-y-1"><span className="text-[var(--text-muted)]">Admin</span><p className="font-semibold text-[var(--text-primary)]">{formData.adminName || '—'} ({formData.adminEmail || '—'})</p></div>
              </div>

              <div className="space-y-3 border-t border-[var(--border-color)] pt-5">
                <span className={labelClasses}>Quota Preview</span>
                <ProgressBar value={0} max={selectedPlan.maxUsers === -1 ? 1 : selectedPlan.maxUsers} label="Users" />
                <ProgressBar value={0} max={selectedPlan.maxJDs === -1 ? 1 : selectedPlan.maxJDs} label="JDs / month" />
                <ProgressBar value={0} max={selectedPlan.maxResumes === -1 ? 1 : selectedPlan.maxResumes} label="Resumes / month" />
                <ProgressBar value={0} max={selectedPlan.aiCredits === -1 ? 1 : selectedPlan.aiCredits} label="AI Credits / month" />
              </div>
            </div>
          )}
        </CardBody>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
          Back
        </Button>
        {currentStep < STEPS.length - 1 ? (
          <Button variant="primary" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button variant="primary" onClick={handleSubmit}>
            Create Organization
          </Button>
        )}
      </div>
    </div>
  );
}
