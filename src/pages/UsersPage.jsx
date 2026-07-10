import React from 'react';
import { Plus } from 'lucide-react';
import Button from '../components/common/Button';
import DataTable from '../components/dashboard/DataTable';
import { useApp } from '../context/AppContext';

export default function UsersPage() {
  const {
    users,
    handleAddNewUser,
    handleEditUser,
    handleDeleteUser,
    setSelectedUserForDetail,
    setIsDrawerOpen,
  } = useApp();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight mb-1.5">
            Staff Management
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            Manage staff profiles, roles, and permissions using full search, filters, and tables.
          </p>
        </div>
        <Button
          variant="primary"
          icon={Plus}
          onClick={handleAddNewUser}
          className="shadow-sm shadow-[var(--color-orange-shadow)]"
        >
          Add Staff Member
        </Button>
      </div>

      {/* Data Table with Search, Filters, Badges, and Pagination */}
      <DataTable
        data={users}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        onViewDetails={(item) => {
          setSelectedUserForDetail(item);
          setIsDrawerOpen(true);
        }}
      />
    </div>
  );
}
