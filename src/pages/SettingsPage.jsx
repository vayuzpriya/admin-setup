import React from 'react';
import { Sun, Moon } from 'lucide-react';
import Card, { CardHeader, CardBody, CardFooter } from '../components/common/Card';
import Badge from '../components/common/Badge';
import Avatar from '../components/common/Avatar';
import Button from '../components/common/Button';
import { useApp } from '../context/AppContext';

export default function SettingsPage() {
  const { profileSettings, setProfileSettings, isDarkMode, setIsDarkMode, addToast } = useApp();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          Global Settings
        </h1>
        <p className="text-sm text-[var(--text-muted)]">
          Update recruiting owner profiles, API keys, and notification triggers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-base font-semibold text-[var(--text-primary)]">
                Profile Information
              </h3>
            </CardHeader>
            <CardBody className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--text-label)] uppercase tracking-wider block">Full Name</label>
                  <input
                    type="text"
                    value={profileSettings.name}
                    onChange={(e) => setProfileSettings({ ...profileSettings, name: e.target.value })}
                    className="w-full h-10 px-3 text-sm rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] text-[var(--text-primary)]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block">Email Address</label>
                  <input
                    type="email"
                    value={profileSettings.email}
                    onChange={(e) => setProfileSettings({ ...profileSettings, email: e.target.value })}
                    className="w-full h-10 px-3 text-sm rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] text-[var(--text-primary)]"
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

          <Card>
            <CardHeader>
              <h3 className="text-base font-semibold text-[var(--text-primary)]">
                Appearance
              </h3>
            </CardHeader>
            <CardBody className="p-6 flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h4 className="text-sm font-semibold text-[var(--text-primary)]">Theme</h4>
                <p className="text-xs text-[var(--text-muted)]">Choose how RexAdmin looks on this device.</p>
              </div>
              <div className="flex rounded-xl border border-[var(--border-color)] p-1 bg-[var(--bg-surface-2)]">
                <button
                  type="button"
                  onClick={() => {
                    setIsDarkMode(false);
                    addToast('Light theme enabled.', 'info');
                  }}
                  aria-pressed={!isDarkMode}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    !isDarkMode
                      ? 'bg-[var(--color-primary)] text-white shadow-sm'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  Light
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsDarkMode(true);
                    addToast('Dark theme enabled.', 'info');
                  }}
                  aria-pressed={isDarkMode}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isDarkMode
                      ? 'bg-[var(--color-primary)] text-white shadow-sm'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  Dark
                </button>
              </div>
            </CardBody>
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
                <h3 className="text-base font-bold text-[var(--text-primary)]">{profileSettings.name}</h3>
                <p className="text-xs text-[var(--text-muted)]">{profileSettings.email}</p>
              </div>
              <Badge variant="brand">Recruiting Owner</Badge>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
