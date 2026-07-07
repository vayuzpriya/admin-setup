import React, { useState } from 'react';
import { Search, Mail, Calendar, Key, AlertCircle, Sparkles, Clipboard, ChevronDown, Check, RefreshCw } from 'lucide-react';
import Card, { CardHeader, CardBody, CardFooter } from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';

export default function FormElementsShowcase({ addToast }) {
  // Showcase Form State
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'Developer',
    scheduleDate: '',
    channels: { linkedin: true, indeed: false, greenhouse: true },
    contractType: 'Full-time',
    autoMatch: true,
    feedbackNotes: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleCheckboxChange = (name) => {
    setFormData((prev) => ({
      ...prev,
      channels: {
        ...prev.channels,
        [name]: !prev.channels[name],
      },
    }));
  };

  const handleToggleChange = () => {
    setFormData((prev) => ({ ...prev, autoMatch: !prev.autoMatch }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.username) errors.username = 'Username is required.';
    if (!formData.email) errors.email = 'Email address is required.';
    if (!formData.password) errors.password = 'Security password is required.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      addToast('Please correct form validation errors.', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      addToast('Showcase form submitted successfully! Check console logs.', 'success');
      console.log('Submitted Form Data:', formData);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 tracking-tight mb-1.5 flex items-center gap-2">
          Form Elements Showcase <Clipboard className="w-5 h-5 text-brand-500" />
        </h1>
        <p className="text-sm text-slate-455 dark:text-slate-500">
          A dedicated presentation of premium form components, text inputs, selectors, and state buttons.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Card 1: Standard & Icon Input Fields */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                Text Inputs & Selects
              </h3>
            </CardHeader>
            <CardBody className="p-6 space-y-5">
              
              {/* Username Input with Validation State */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-450 dark:text-slate-500 uppercase tracking-wider block">Username</label>
                  {formErrors.username && (
                    <span className="text-[10px] text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.username}
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="e.g. sophia_rod"
                  className={`w-full h-10 px-3.5 text-sm rounded-xl border bg-white dark:bg-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500/20 ${
                    formErrors.username
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10'
                      : 'border-slate-200 dark:border-slate-800 focus:border-brand-500'
                  } dark:text-slate-200`}
                />
              </div>

              {/* Email Input with Icon */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-450 dark:text-slate-500 uppercase tracking-wider block">Email Address</label>
                  {formErrors.email && (
                    <span className="text-[10px] text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.email}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-550">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="sophia@company.com"
                    className={`w-full h-10 pl-10 pr-3.5 text-sm rounded-xl border bg-white dark:bg-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500/20 ${
                      formErrors.email
                        ? 'border-red-400 focus:border-red-500'
                        : 'border-slate-200 dark:border-slate-800 focus:border-brand-500'
                    } dark:text-slate-200`}
                  />
                </div>
              </div>

              {/* Password Input with Suffix Icon */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-450 dark:text-slate-500 uppercase tracking-wider block">Password</label>
                  {formErrors.password && (
                    <span className="text-[10px] text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.password}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className={`w-full h-10 pl-3.5 pr-10 text-sm rounded-xl border bg-white dark:bg-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500/20 ${
                      formErrors.password
                        ? 'border-red-400 focus:border-red-500'
                        : 'border-slate-200 dark:border-slate-800 focus:border-brand-500'
                    } dark:text-slate-200`}
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-450 dark:text-slate-550">
                    <Key className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Dropdown / Select Control */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-450 dark:text-slate-500 uppercase tracking-wider block">Pipeline Role</label>
                <div className="relative">
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3.5 pr-10 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 dark:text-slate-200 cursor-pointer appearance-none"
                  >
                    <option value="Developer">Developer</option>
                    <option value="Designer">Designer</option>
                    <option value="Manager">Product Manager</option>
                    <option value="DevOps">DevOps Engineer</option>
                  </select>
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-450 dark:text-slate-550 pointer-events-none">
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Date Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-450 dark:text-slate-500 uppercase tracking-wider block">Interview Date</label>
                <div className="relative">
                  <input
                    type="date"
                    name="scheduleDate"
                    value={formData.scheduleDate}
                    onChange={handleInputChange}
                    className="w-full h-10 pl-10 pr-3.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 dark:text-slate-200 cursor-pointer"
                  />
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-455 dark:text-slate-550 pointer-events-none">
                    <Calendar className="w-4 h-4" />
                  </span>
                </div>
              </div>

            </CardBody>
          </Card>

          {/* Form State Buttons Demo */}
          <Card>
            <CardHeader>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                Action Button States
              </h3>
            </CardHeader>
            <CardBody className="p-6 space-y-4">
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="primary" isLoading disabled>
                  Loading
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Card 2: Checkbox, Radio, and Switches Showcase */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                Selections & Toggles
              </h3>
            </CardHeader>
            <CardBody className="p-6 space-y-6">
              
              {/* Checkboxes Group */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-450 dark:text-slate-500 uppercase tracking-wider block">Sourcing Channels</label>
                <div className="space-y-2.5">
                  {Object.keys(formData.channels).map((channel) => (
                    <label key={channel} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-350 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={formData.channels[channel]}
                        onChange={() => handleCheckboxChange(channel)}
                        className="rounded border-slate-350 text-brand-655 focus:ring-brand-500/20 w-4 h-4 cursor-pointer"
                      />
                      <span className="capitalize font-medium group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
                        {channel}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Radios Group */}
              <div className="space-y-3 border-t border-slate-100 dark:border-slate-850 pt-5">
                <label className="text-xs font-semibold text-slate-455 dark:text-slate-500 uppercase tracking-wider block">Target Contract Type</label>
                <div className="space-y-2.5">
                  {['Full-time', 'Part-time', 'Contract'].map((type) => (
                    <label key={type} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-350 cursor-pointer group">
                      <input
                        type="radio"
                        name="contractType"
                        value={type}
                        checked={formData.contractType === type}
                        onChange={handleInputChange}
                        className="border-slate-350 text-brand-655 focus:ring-brand-500/20 w-4 h-4 cursor-pointer"
                      />
                      <span className="font-medium group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Switches Group */}
              <div className="space-y-3 border-t border-slate-100 dark:border-slate-850 pt-5">
                <label className="text-xs font-semibold text-slate-455 dark:text-slate-500 uppercase tracking-wider block">Integration Options</label>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-200">Auto-Match Candidates</h4>
                    <p className="text-xs text-slate-450 dark:text-slate-500">Run resume extraction parsing hooks instantly.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.autoMatch}
                    onChange={handleToggleChange}
                    className="w-10 h-6 bg-slate-200 dark:bg-slate-800 rounded-full appearance-none cursor-pointer checked:bg-brand-600 transition-colors relative before:absolute before:h-4 before:w-4 before:bg-white before:rounded-full before:top-1 before:left-1 checked:before:translate-x-4 before:transition-transform"
                  />
                </div>
              </div>

            </CardBody>
          </Card>

          {/* Textareas */}
          <Card>
            <CardHeader>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                Textarea & Feedback
              </h3>
            </CardHeader>
            <CardBody className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-455 dark:text-slate-550 uppercase tracking-wider block">Candidate Review Notes</label>
                <textarea
                  name="feedbackNotes"
                  value={formData.feedbackNotes}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Provide interview summary details, technical score levels, and feedback..."
                  className="w-full p-3.5 text-sm rounded-xl border border-slate-200 dark:border-slate-808 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 dark:text-slate-200 resize-y"
                />
              </div>
            </CardBody>
            <CardFooter className="flex justify-end gap-3 bg-slate-50/50 dark:bg-slate-900/20 border-t border-slate-100 dark:border-slate-808">
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  setFormData({
                    username: '',
                    email: '',
                    password: '',
                    role: 'Developer',
                    scheduleDate: '',
                    channels: { linkedin: true, indeed: false, greenhouse: true },
                    contractType: 'Full-time',
                    autoMatch: true,
                    feedbackNotes: '',
                  });
                  setFormErrors({});
                  addToast('Form elements reset.', 'info');
                }}
              >
                Reset Showcase
              </Button>
              <Button
                variant="primary"
                type="submit"
                isLoading={isSubmitting}
                className="shadow-sm shadow-brand-500/10 font-semibold"
              >
                Submit Form
              </Button>
            </CardFooter>
          </Card>
        </div>

      </form>
    </div>
  );
}
