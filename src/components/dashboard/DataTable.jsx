import React, { useState, useMemo } from 'react';
import { ArrowUpDown, ChevronLeft, ChevronRight, Edit2, Trash2, MoreHorizontal, Check, Search, Filter } from 'lucide-react';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Dropdown, { DropdownItem } from '../common/Dropdown';
import Card from '../common/Card';
import EmptyState from './EmptyState';

export default function DataTable({
  data = [],
  onEdit,
  onDelete,
  onViewDetails,
  isLoading = false,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Search and Filter logic
  const filteredData = useMemo(() => {
    return data
      .filter((item) => {
        const matchesSearch =
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.role.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus =
          statusFilter === 'All' || item.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];

        // Case insensitive sorting for strings
        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
  }, [data, searchTerm, statusFilter, sortField, sortDirection]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  // Handle page changes
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle sorting trigger
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Select Row check
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = paginatedData.map((item) => item.id);
      setSelectedRows(new Set([...selectedRows, ...allIds]));
    } else {
      const paginatedIds = paginatedData.map((item) => item.id);
      const updated = new Set(selectedRows);
      paginatedIds.forEach((id) => updated.delete(id));
      setSelectedRows(updated);
    }
  };

  const handleSelectRow = (id) => {
    const updated = new Set(selectedRows);
    if (updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }
    setSelectedRows(updated);
  };

  const isAllPaginatedSelected = useMemo(() => {
    if (paginatedData.length === 0) return false;
    return paginatedData.every((item) => selectedRows.has(item.id));
  }, [paginatedData, selectedRows]);

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Offered':
        return 'success';
      case 'Interviewing':
        return 'info';
      case 'Applied':
        return 'warning';
      case 'Rejected':
        return 'danger';
      default:
        return 'neutral';
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, filteredData.length);

  return (
    <Card className="overflow-hidden">
      {/* Table Action Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center px-6 py-5 border-b border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900/20">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Filter by candidate, email, or role..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full h-10 pl-9 pr-4 text-sm rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all dark:text-slate-200"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" />
            Stage:
          </span>
          <div className="flex rounded-lg border border-slate-200 dark:border-slate-800 p-0.5 bg-slate-50 dark:bg-slate-900/60">
            {['All', 'Applied', 'Interviewing', 'Offered', 'Rejected'].map((status) => (
              <button
                key={status}
                onClick={() => {
                  setStatusFilter(status);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  statusFilter === status
                    ? 'bg-white text-slate-900 dark:bg-slate-800 dark:text-slate-100 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Row Select Summary Banner */}
      {selectedRows.size > 0 && (
        <div className="bg-brand-50/50 dark:bg-brand-950/20 border-b border-brand-100 dark:border-brand-900/40 px-6 py-2.5 flex items-center justify-between animate-fade-in">
          <span className="text-xs font-medium text-brand-700 dark:text-brand-400 flex items-center gap-2">
            <Check className="w-4 h-4" />
            {selectedRows.size} candidate{selectedRows.size > 1 ? 's' : ''} selected
          </span>
          <button
            onClick={() => setSelectedRows(new Set())}
            className="text-xs font-semibold text-brand-600 hover:text-brand-750 dark:text-brand-400 dark:hover:text-brand-350 transition-colors"
          >
            Deselect all
          </button>
        </div>
      )}

      {/* Data Table */}
      <div className="w-full overflow-x-auto">
        {filteredData.length === 0 ? (
          <div className="p-8">
            <EmptyState
              title="No candidates match filters"
              description="Try adjusting your status filter or search parameters to find the candidate records."
              actionLabel="Reset Search"
              onAction={() => {
                setSearchTerm('');
                setStatusFilter('All');
              }}
            />
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-150 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/10 text-xs font-semibold text-slate-450 dark:text-slate-500 uppercase tracking-wider">
                {/* Checkbox column */}
                <th className="px-6 py-4 w-12">
                  <input
                    type="checkbox"
                    checked={isAllPaginatedSelected}
                    onChange={handleSelectAll}
                    className="rounded border-slate-300 text-brand-600 focus:ring-brand-500/20 w-4 h-4 cursor-pointer"
                  />
                </th>

                {/* Name / Profile Info */}
                <th
                  onClick={() => handleSort('name')}
                  className="px-6 py-4 cursor-pointer hover:text-slate-805 dark:hover:text-slate-200 transition-colors group w-[35%]"
                >
                  <div className="flex items-center gap-1.5">
                    Candidate Info
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>

                {/* Role */}
                <th
                  onClick={() => handleSort('role')}
                  className="px-6 py-4 cursor-pointer hover:text-slate-805 dark:hover:text-slate-200 transition-colors group"
                >
                  <div className="flex items-center gap-1.5">
                    Target Position
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>

                {/* Status */}
                <th
                  onClick={() => handleSort('status')}
                  className="px-6 py-4 cursor-pointer hover:text-slate-805 dark:hover:text-slate-200 transition-colors group"
                >
                  <div className="flex items-center gap-1.5">
                    Interview Stage
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>

                {/* Created date */}
                <th
                  onClick={() => handleSort('joinDate')}
                  className="px-6 py-4 cursor-pointer hover:text-slate-805 dark:hover:text-slate-200 transition-colors group"
                >
                  <div className="flex items-center gap-1.5">
                    Applied Date
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>

                {/* Actions column */}
                <th className="px-6 py-4 text-right w-20">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-850 text-sm">
              {paginatedData.map((item) => {
                const isSelected = selectedRows.has(item.id);
                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-slate-50/50 dark:hover:bg-slate-900/40 transition-colors ${
                      isSelected ? 'bg-brand-50/10 dark:bg-brand-500/5' : ''
                    }`}
                  >
                    {/* Row checkbox */}
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectRow(item.id)}
                        className="rounded border-slate-300 text-brand-600 focus:ring-brand-500/20 w-4 h-4 cursor-pointer"
                      />
                    </td>

                    {/* Member avatar and email */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar src={item.avatar} name={item.name} size="sm" />
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-900 dark:text-slate-100">
                            {item.name}
                          </span>
                          <span className="text-xs text-slate-400 dark:text-slate-500">
                            {item.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-medium">
                      {item.role}
                    </td>

                    {/* Status badge */}
                    <td className="px-6 py-4">
                      <Badge variant={getStatusVariant(item.status)} dot>
                        {item.status}
                      </Badge>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-500 font-medium">
                      {new Date(item.joinDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>

                    {/* Actions Menu */}
                    <td className="px-6 py-4 text-right">
                      <Dropdown
                        align="right"
                        trigger={
                          <button className="p-1.5 text-slate-400 hover:text-slate-655 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        }
                      >
                        {onViewDetails && (
                          <DropdownItem icon={Check} onClick={() => onViewDetails(item)}>
                            View Info (Drawer)
                          </DropdownItem>
                        )}
                        <DropdownItem icon={Edit2} onClick={() => onEdit(item)}>
                          Edit Candidate
                        </DropdownItem>
                        <DropdownItem
                          icon={Trash2}
                          onClick={() => onDelete(item.id)}
                          className="text-red-655 dark:text-red-400"
                        >
                          Remove Record
                        </DropdownItem>
                      </Dropdown>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Controls */}
      {filteredData.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/10">
          <span className="text-xs font-semibold text-slate-450 dark:text-slate-550">
            Showing <span className="text-slate-800 dark:text-slate-300 font-semibold">{startIndex}</span> to{' '}
            <span className="text-slate-800 dark:text-slate-300 font-semibold">{endIndex}</span> of{' '}
            <span className="text-slate-800 dark:text-slate-300 font-semibold">{filteredData.length}</span> candidates
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
            
            {/* Page number indicators */}
            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${
                    currentPage === i + 1
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
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
