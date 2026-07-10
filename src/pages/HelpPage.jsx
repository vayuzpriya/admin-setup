import React from 'react';
import { BookOpen } from 'lucide-react';
import Card, { CardHeader, CardBody } from '../components/common/Card';

export default function HelpPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight mb-1.5 flex items-center gap-2">
          Developer Documentation <BookOpen className="w-5 h-5 text-[var(--color-primary)]" />
        </h1>
        <p className="text-sm text-[var(--text-label)]">
          Quick start guidelines, API structures, and components usage.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-base font-semibold text-[var(--text-primary)]">
              Clean Component Design
            </h3>
          </CardHeader>
          <CardBody className="p-6 text-sm text-[var(--text-secondary)] space-y-3">
            <p>
              The RexRecruit components follow functional designs using Tailwind CSS utilities bound to design tokens. Do not install external stylesheet dependencies.
            </p>
            <div className="bg-[var(--bg-surface-2)] p-3 rounded-xl border border-[var(--border-color)]">
              <code className="text-xs text-[var(--text-primary)]">
                {`import Button from './components/common/Button';\n\n<Button variant="primary">Add Organization</Button>`}
              </code>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-base font-semibold text-[var(--text-primary)]">
              Theme Tokens (Dark/Light)
            </h3>
          </CardHeader>
          <CardBody className="p-6 text-sm text-[var(--text-secondary)] space-y-3">
            <p>
              Every color resolves to a CSS variable defined in <code className="text-xs bg-[var(--bg-surface-2)] px-1 py-0.5 rounded text-[var(--text-primary)]">rex-design-system.css</code>. Switching themes sets <code className="text-xs bg-[var(--bg-surface-2)] px-1 py-0.5 rounded text-[var(--text-primary)]">data-theme</code> on the html element — no per-component dark: overrides needed.
            </p>
            <div className="bg-[var(--bg-surface-2)] p-3 rounded-xl border border-[var(--border-color)]">
              <code className="text-xs text-[var(--text-primary)]">
                {`<div className="bg-[var(--bg-surface)]">\n  <span className="text-[var(--text-primary)]" />\n</div>`}
              </code>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
