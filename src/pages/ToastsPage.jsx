import React from 'react';
import Card, { CardHeader, CardBody } from '../components/common/Card';
import Button from '../components/common/Button';
import { useApp } from '../context/AppContext';

export default function ToastsPage() {
  const { addToast } = useApp();

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight mb-1.5">
          Toast Notification Alerts
        </h1>
        <p className="text-sm text-[var(--text-muted)]">
          Trigger success and error notification boxes displaying status signals.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card hoverEffect>
          <CardHeader>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">Success Toast</h3>
          </CardHeader>
          <CardBody className="p-6 flex flex-col items-center gap-4">
            <p className="text-xs text-[var(--text-muted)] text-center">Trigger a success check popup.</p>
            <Button variant="primary" onClick={() => addToast('Candidate invitation sent to Sophia Rodriguez.', 'success')}>Trigger Success Toast</Button>
          </CardBody>
        </Card>
        <Card hoverEffect>
          <CardHeader>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">Error Toast</h3>
          </CardHeader>
          <CardBody className="p-6 flex flex-col items-center gap-4">
            <p className="text-xs text-[var(--text-muted)] text-center">Trigger an error warn block.</p>
            <Button variant="danger" onClick={() => addToast('LinkedIn API connections timed out after 30000ms.', 'error')}>Trigger Error Toast</Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
