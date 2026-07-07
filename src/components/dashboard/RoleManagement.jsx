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
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 tracking-tight mb-1.5 flex items-center gap-2">
          Role & Permission Control <Shield className="w-5 h-5 text-brand-500" />
        </h1>
        <p className="text-sm text-slate-455 dark:text-slate-500">
          Review, assign, and customize access rights for recruitment roles in your workspace.
        </p>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 gap-6">
        <Card className="overflow-hidden">
          <CardHeader>
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">
              System Workspace Roles
            </h3>
          </CardHeader>
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/10 text-xs font-semibold text-slate-450 dark:text-slate-550 uppercase tracking-wider">
                  <th className="px-6 py-4">Role Identifier</th>
                  <th className="px-6 py-4">Sourcing Members</th>
                  <th className="px-6 py-4 w-[35%]">Core Description</th>
                  <th className="px-6 py-4">Access Permissions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-850 text-sm">
                {roles.map((role) => (
                  <tr key={role.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/40 transition-colors">
                    {/* Role Title */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400">
                          <Shield className="w-4 h-4" />
                        </div>
                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                          {role.name}
                        </span>
                      </div>
                    </td>

                    {/* Sourcing Members count */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
                        <Users className="w-4 h-4 text-slate-400" />
                        {role.usersCount} member{role.usersCount > 1 ? 's' : ''}
                      </div>
                    </td>

                    {/* Core Description */}
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-455">
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
                                  ? 'text-brand-600 dark:text-brand-400'
                                  : 'text-slate-400 dark:text-slate-600'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handlePermissionToggle(role.id, key)}
                                className="rounded border-slate-300 text-brand-600 focus:ring-brand-500/20 w-3.5 h-3.5 cursor-pointer"
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
      <div className="flex items-start gap-3.5 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/10">
        <Info className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1.5">
          <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
            System Permission Inheritance
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-455 leading-relaxed">
            By default, all workspace configurations inherit from the Workspace Owner. Sourcing Associates and Hiring Reviewers are restricted from altering API endpoints or webhook configurations.
          </p>
        </div>
      </div>
    </div>
  );
}
