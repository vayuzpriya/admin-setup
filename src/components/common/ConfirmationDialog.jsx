import React, { useState, useEffect } from 'react';
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
  confirmationText,
  confirmationLabel,
  confirmationPlaceholder,
}) {
  const [typedValue, setTypedValue] = useState('');

  useEffect(() => {
    if (isOpen) setTypedValue('');
  }, [isOpen]);

  const isMatch =
    !confirmationText ||
    typedValue.trim().toLowerCase() === confirmationText.trim().toLowerCase();

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
          <Button variant="danger" onClick={onConfirm} isLoading={isLoading} disabled={isLoading || !isMatch}>
            {confirmLabel}
          </Button>
        </div>
      }
    >
      <div className="flex items-start gap-4 p-1">
        <div className="p-2.5 rounded-xl bg-[var(--color-danger-bg)] text-[var(--color-danger)] flex-shrink-0">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div className="space-y-1.5 flex-1">
          <p className="text-sm font-semibold text-[var(--text-primary)]">
            Critical System Warning
          </p>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {confirmationText && (
        <div className="mt-4 space-y-1.5">
          <label className="text-xs font-semibold text-[var(--text-label)] uppercase tracking-wider block">
            {confirmationLabel || `Type "${confirmationText}" to confirm`}
          </label>
          <input
            type="text"
            value={typedValue}
            onChange={(e) => setTypedValue(e.target.value)}
            placeholder={confirmationPlaceholder || confirmationText}
            className="w-full h-10 px-3.5 text-sm rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] text-[var(--text-primary)]"
          />
        </div>
      )}
    </Modal>
  );
}
