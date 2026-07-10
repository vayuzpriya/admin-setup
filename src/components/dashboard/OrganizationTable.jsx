import React, { useState, useMemo } from 'react';
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Edit2,
  Eye,
  MoreHorizontal,
  PauseCircle,
  PlayCircle,
  Trash2,
  CreditCard,
  Bell,
  Search,
  Building2,
} from 'lucide-react';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Dropdown, { DropdownItem } from '../common/Dropdown';
import Card from '../common/Card';
import ProgressBar from '../common/ProgressBar';
import HealthGauge from '../common/HealthGauge';
import EmptyState from './EmptyState';
import { planTiers } from '../../data/mockData';

function getOrganizationStatusVariant(status) {
  switch (status) {
    case 'Active':
      return 'success';
    case 'Trial':
      return 'info';
    case 'Suspended':
      return 'warning';
    case 'Terminated':
      return 'danger';
    default:
      return 'neutral';
  }
}

function getHealthBand(score) {
  if (score >= 80) return 'Healthy';
  if (score >= 50) return 'Fair';
  return 'At Risk';
}

export default function OrganizationTable({
  data = [],
  onViewDetails,
  onEdit,
  onSuspend,
  onReactivate,
  onTerminate,
  onCreateNew,
  onStubAction,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [planFilter, setPlanFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [healthFilter, setHealthFilter] = useState('All');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredData = useMemo(() => {
    return data
      .filter((org) => {
        const term = searchTerm.toLowerCase();
        const matchesSearch =
          org.name.toLowerCase().includes(term) ||
          org.subdomain.toLowerCase().includes(term) ||
          org.adminEmail.toLowerCase().includes(term);

        const matchesPlan = planFilter === 'All' || org.plan === planFilter;
        const matchesStatus = statusFilter === 'All' || org.status === statusFilter;
        const matchesHealth = healthFilter === 'All' || getHealthBand(org.healthScore) === healthFilter;

        return matchesSearch && matchesPlan && matchesStatus && matchesHealth;
      })
      .sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];
        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }
        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
  }, [data, searchTerm, planFilter, statusFilter, healthFilter, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setPlanFilter('All');
    setStatusFilter('All');
    setHealthFilter('All');
  };

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, filteredData.length);

  const selectClasses =
    'h-10 pl-3 pr-8 text-sm rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] text-[var(--text-primary)] cursor-pointer appearance-none';

  return (
    <Card className="overflow-hidden">
      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-center px-6 py-5 border-b border-[var(--border-color)] bg-[var(--bg-surface)]">
        <div className="relative w-full lg:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search by name, subdomain, or SPOC email..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full h-10 pl-9 pr-4 text-sm rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all text-[var(--text-primary)]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
          <div className="relative">
            <select
              value={planFilter}
              onChange={(e) => { setPlanFilter(e.target.value); setCurrentPage(1); }}
              className={selectClasses}
            >
              <option value="All">All Plans</option>
              {planTiers.map((tier) => (
                <option key={tier.id} value={tier.name}>{tier.name}</option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[var(--text-muted)] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className={selectClasses}
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Trial">Trial</option>
              <option value="Suspended">Suspended</option>
              <option value="Terminated">Terminated</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[var(--text-muted)] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={healthFilter}
              onChange={(e) => { setHealthFilter(e.target.value); setCurrentPage(1); }}
              className={selectClasses}
            >
              <option value="All">All Health</option>
              <option value="Healthy">Healthy</option>
              <option value="Fair">Fair</option>
              <option value="At Risk">At Risk</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[var(--text-muted)] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        {filteredData.length === 0 ? (
          <div className="p-8">
            <EmptyState
              title={data.length === 0 ? 'No organizations onboarded yet' : 'No organizations match filters'}
              description={
                data.length === 0
                  ? 'Get started by provisioning your first client workspace.'
                  : 'Try adjusting your filters or search parameters to find an organization.'
              }
              actionLabel={data.length === 0 ? 'Create New Organization' : 'Reset Filters'}
              onAction={data.length === 0 ? onCreateNew : resetFilters}
              icon={Building2}
            />
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--border-color)] bg-[var(--bg-surface-2)] text-xs font-semibold text-[var(--text-label)] uppercase tracking-wider">
                <th
                  onClick={() => handleSort('name')}
                  className="px-6 py-4 cursor-pointer hover:text-[var(--text-primary)] transition-colors group w-[26%]"
                >
                  <div className="flex items-center gap-1.5">
                    Organization
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th className="px-6 py-4">Plan</th>
                <th
                  onClick={() => handleSort('status')}
                  className="px-6 py-4 cursor-pointer hover:text-[var(--text-primary)] transition-colors group"
                >
                  <div className="flex items-center gap-1.5">
                    Status
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th className="px-6 py-4 w-[14%]">Users</th>
                <th
                  onClick={() => handleSort('healthScore')}
                  className="px-6 py-4 cursor-pointer hover:text-[var(--text-primary)] transition-colors group"
                >
                  <div className="flex items-center gap-1.5">
                    Health Score
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('lastActive')}
                  className="px-6 py-4 cursor-pointer hover:text-[var(--text-primary)] transition-colors group"
                >
                  <div className="flex items-center gap-1.5">
                    Last Active
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th className="px-6 py-4 text-right w-16">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] text-sm">
              {paginatedData.map((org) => (
                <tr key={org.id} className="hover:bg-[var(--bg-hover)] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[var(--bg-surface-2)] rounded-lg text-[var(--text-secondary)] flex-shrink-0">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-[var(--text-primary)] truncate">{org.name}</span>
                        <span className="text-xs text-[var(--text-muted)] truncate">{org.domain}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="brand">{org.plan}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={getOrganizationStatusVariant(org.status)} dot>
                      {org.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <ProgressBar value={org.users.used} max={org.users.allocated} showValueText />
                  </td>
                  <td className="px-6 py-4">
                    <HealthGauge score={org.healthScore} size="sm" />
                  </td>
                  <td className="px-6 py-4 text-[var(--text-muted)] font-medium">
                    {new Date(org.lastActive).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Dropdown
                      align="right"
                      trigger={
                        <button className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-lg hover:bg-[var(--bg-hover)] transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      }
                    >
                      <DropdownItem icon={Eye} onClick={() => onViewDetails(org)}>
                        View Details
                      </DropdownItem>
                      <DropdownItem icon={Edit2} onClick={() => onEdit(org)}>
                        Edit Configuration
                      </DropdownItem>
                      {(org.status === 'Active' || org.status === 'Trial') && (
                        <DropdownItem
                          icon={PauseCircle}
                          onClick={() => onSuspend(org)}
                          className="text-[var(--color-warning)]"
                        >
                          Suspend Organization
                        </DropdownItem>
                      )}
                      {org.status === 'Suspended' && (
                        <DropdownItem icon={PlayCircle} onClick={() => onReactivate(org)}>
                          Reactivate Organization
                        </DropdownItem>
                      )}
                      <DropdownItem icon={CreditCard} onClick={() => onStubAction('Billing module coming soon')}>
                        View Billing
                      </DropdownItem>
                      <DropdownItem icon={Bell} onClick={() => onStubAction('Notification module coming soon')}>
                        Send Notification
                      </DropdownItem>
                      {org.status !== 'Terminated' && (
                        <DropdownItem
                          icon={Trash2}
                          onClick={() => onTerminate(org)}
                          className="text-[var(--color-danger)]"
                        >
                          Terminate Organization
                        </DropdownItem>
                      )}
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {filteredData.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-[var(--border-color)] bg-[var(--bg-surface-2)]">
          <span className="text-xs font-semibold text-[var(--text-label)]">
            Showing <span className="text-[var(--text-primary)] font-semibold">{startIndex}</span> to{' '}
            <span className="text-[var(--text-primary)] font-semibold">{endIndex}</span> of{' '}
            <span className="text-[var(--text-primary)] font-semibold">{filteredData.length}</span> organizations
          </span>

          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              icon={ChevronLeft}
              iconPosition="left"
            >
              Previous
            </Button>

            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${
                    currentPage === i + 1
                      ? 'bg-[var(--color-primary)] text-white shadow-sm'
                      : 'hover:bg-[var(--bg-hover)] text-[var(--text-secondary)]'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              icon={ChevronRight}
              iconPosition="right"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}

export { getOrganizationStatusVariant, getHealthBand };
