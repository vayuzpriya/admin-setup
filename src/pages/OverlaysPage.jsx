import React from 'react';
import Card, { CardHeader, CardBody } from '../components/common/Card';
import Button from '../components/common/Button';
import { useApp } from '../context/AppContext';

export default function OverlaysPage() {
  const {
    users,
    setSelectedUserForDetail,
    setIsDrawerOpen,
    setIsUserModalOpen,
    setSelectedUserForDelete,
    setIsConfirmOpen,
  } = useApp();

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight mb-1.5">
          Overlays & Modal Dialogs
        </h1>
        <p className="text-sm text-[var(--text-muted)]">
          Trigger and verify drawer overlays, modals, and dangerous action confirmation windows.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card hoverEffect>
          <CardHeader>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">Slide-over Drawer</h3>
          </CardHeader>
          <CardBody className="p-6 text-center space-y-4">
            <p className="text-xs text-[var(--text-muted)]">Renders candidate log details panel sliding from the right screen boundary.</p>
            <Button variant="outline" size="sm" onClick={() => {
              setSelectedUserForDetail(users[0]);
              setIsDrawerOpen(true);
            }}>Open Sample Drawer</Button>
          </CardBody>
        </Card>
        <Card hoverEffect>
          <CardHeader>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">Standard Modal Dialog</h3>
          </CardHeader>
          <CardBody className="p-6 text-center space-y-4">
            <p className="text-xs text-[var(--text-muted)]">Displays focus modal boxes, overlay backdrops, and form actions.</p>
            <Button variant="outline" size="sm" onClick={() => setIsUserModalOpen(true)}>Open Sample Modal</Button>
          </CardBody>
        </Card>
        <Card hoverEffect>
          <CardHeader>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">Confirmation Dialog</h3>
          </CardHeader>
          <CardBody className="p-6 text-center space-y-4">
            <p className="text-xs text-[var(--text-muted)]">Presents safety alerts before carrying out dangerous/critical deletions.</p>
            <Button variant="danger" size="sm" onClick={() => {
              setSelectedUserForDelete(1);
              setIsConfirmOpen(true);
            }}>Open Warning Dialog</Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
