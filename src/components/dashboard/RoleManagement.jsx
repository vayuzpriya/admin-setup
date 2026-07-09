import React, { useState } from 'react';
import { Shield, Check, Info, Users } from 'lucide-react';
import Card, { CardHeader, CardBody, CardFooter } from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';

export default function RoleManagement({ addToast }) {
  // Roles Mock State
  const [roles, setRoles] = useState([
    {
      id: 'r-1',
      name: 'Workspace Owner',
      usersCount: 1,
      description: 'Full permissions control over all billing, candidates, roles, and integrations.',
      permissions: { read: true, edit: true, invite: true, config: true },
    },
    {
      id: 'r-2',
      name: 'Lead Recruiter',
      usersCount: 3,
      description: 'Manage talent pipelines, edit candidate details, and schedule interview tasks.',
      permissions: { read: true, edit: true, invite: true, config: false },
    },
    {
      id: 'r-3',
      name: 'Sourcing Associate',
      usersCount: 2,
      description: 'Add new candidates, parse resumes, and configure third-party boards sync.',
      permissions: { read: true, edit: false, invite: true, config: false },
    },
    {
      id: 'r-4',
      name: 'Hiring Reviewer',
      usersCount: 4,
      description: 'Read-only candidate ledger access. Add comments and feedback reviews.',
      permissions: { read: true, edit: false, invite: false, config: false },
    },
  ]);

  const handlePermissionToggle = (roleId, permissionKey) => {
    // Prevent modifying Workspace Owner roles
    const targetRole = roles.find((r) => r.id === roleId);
    if (targetRole.name === 'Workspace Owner') {
      addToast('Cannot modify system Workspace Owner permission scopes.', 'warning');
      return;
    }

    setRoles((prev) =>
      prev.map((r) =>
        r.id === roleId
          ? {
              ...r,
              permissions: {
                ...r.permissions,
                [permissionKey]: !r.permissions[permissionKey],
              },
            }
          : r
      )
    );
    addToast('Workspace role scopes updated.', 'success');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight mb-1.5 flex items-center gap-2">
          Role & Permission Control <Shield className="w-5 h-5 text-[var(--color-primary)]" />
        </h1>
        <p className="text-sm text-[var(--text-muted)]">
          Review, assign, and customize access rights for recruitment roles in your workspace.
        </p>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 gap-6">
        <Card className="overflow-hidden">
          <CardHeader>
            <h3 className="text-base font-semibold text-[var(--text-primary)]">
              System Workspace Roles
            </h3>
          </CardHeader>
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[var(--border-color)] bg-[var(--bg-surface-2)] text-xs font-semibold text-[var(--text-label)] uppercase tracking-wider">
                  <th className="px-6 py-4">Role Identifier</th>
                  <th className="px-6 py-4">Sourcing Members</th>
                  <th className="px-6 py-4 w-[35%]">Core Description</th>
                  <th className="px-6 py-4">Access Permissions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)] text-sm">
                {roles.map((role) => (
                  <tr key={role.id} className="hover:bg-[var(--bg-hover)] transition-colors">
                    {/* Role Title */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-[var(--bg-surface-2)] rounded-lg text-[var(--text-secondary)]">
                          <Shield className="w-4 h-4" />
                        </div>
                        <span className="font-semibold text-[var(--text-primary)]">
                          {role.name}
                        </span>
                      </div>
                    </td>

                    {/* Sourcing Members count */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-[var(--text-secondary)] font-medium">
                        <Users className="w-4 h-4 text-[var(--text-muted)]" />
                        {role.usersCount} member{role.usersCount > 1 ? 's' : ''}
                      </div>
                    </td>

                    {/* Core Description */}
                    <td className="px-6 py-4 text-[var(--text-muted)]">
                      {role.description}
                    </td>

                    {/* Checkbox columns */}
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-x-5 gap-y-2">
                        {Object.keys(role.permissions).map((key) => {
                          const isChecked = role.permissions[key];
                          const labelMap = {
                            read: 'Read Candidates',
                            edit: 'Edit Pipeline',
                            invite: 'Sourcing APIs',
                            config: 'Manage Workspace',
                          };
                          return (
                            <label
                              key={key}
                              className={`flex items-center gap-1.5 text-xs font-semibold select-none cursor-pointer ${
                                isChecked
                                  ? 'text-[var(--color-primary)]'
                                  : 'text-[var(--text-muted)]'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handlePermissionToggle(role.id, key)}
                                className="rounded border-[var(--border-medium)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]/20 w-3.5 h-3.5 cursor-pointer"
                              />
                              {labelMap[key]}
                            </label>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Info card */}
      <div className="flex items-start gap-3.5 p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface-2)]">
        <Info className="w-5 h-5 text-[var(--text-muted)] flex-shrink-0 mt-0.5" />
        <div className="space-y-1.5">
          <p className="text-xs font-bold text-[var(--text-primary)]">
            System Permission Inheritance
          </p>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            By default, all workspace configurations inherit from the Workspace Owner. Sourcing Associates and Hiring Reviewers are restricted from altering API endpoints or webhook configurations.
          </p>
        </div>
      </div>
    </div>
  );
}
