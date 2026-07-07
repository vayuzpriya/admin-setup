import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Modal from './Modal';
import Button from './Button';

export default function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Dangerous Action',
  description = 'Are you absolutely sure you want to perform this action? This operation cannot be undone.',
  confirmLabel = 'Delete Record',
  cancelLabel = 'Cancel',
  isLoading = false,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            {cancelLabel}
          </Button>
          <Button variant="danger" onClick={onConfirm} isLoading={isLoading}>
            {confirmLabel}
          </Button>
        </div>
      }
    >
      <div className="flex items-start gap-4 p-1">
        <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 flex-shrink-0">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div className="space-y-1.5 flex-1">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Critical System Warning
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-455 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </Modal>
  );
}
