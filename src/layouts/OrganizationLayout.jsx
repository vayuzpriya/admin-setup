import React from 'react';
import { Outlet } from 'react-router-dom';
import ConfirmationDialog from '../components/common/ConfirmationDialog';
import { useApp } from '../context/AppContext';

export default function OrganizationLayout() {
  const {
    isOrgConfirmOpen,
    setIsOrgConfirmOpen,
    orgConfirmTarget,
    orgConfirmAction,
    handleConfirmOrgAction,
  } = useApp();

  const isTerminate = orgConfirmAction === 'terminate';

  return (
    <>
      <Outlet />

      <ConfirmationDialog
        isOpen={isOrgConfirmOpen}
        onClose={() => setIsOrgConfirmOpen(false)}
        onConfirm={handleConfirmOrgAction}
        title={isTerminate ? 'Terminate Organization?' : 'Suspend Organization?'}
        description={
          isTerminate
            ? 'This will permanently terminate the organization and revoke all workspace access after the grace period. This action cannot be undone.'
            : 'This will immediately suspend the organization’s workspace access. They can be reactivated at any time.'
        }
        confirmLabel={isTerminate ? 'Terminate Organization' : 'Suspend Organization'}
        confirmationText={orgConfirmTarget?.name}
      />
    </>
  );
}
