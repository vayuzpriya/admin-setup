import React from 'react';
import { Users, Globe, Activity, Check, Sparkles } from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import ChartsPlaceholder from '../components/dashboard/ChartsPlaceholder';
import EmptyState from '../components/dashboard/EmptyState';
import Skeleton from '../components/common/Skeleton';
import { useApp } from '../context/AppContext';

export default function DashboardPage() {
  const { addToast } = useApp();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight mb-1.5 flex items-center gap-2">
          Recruiting Overview <Sparkles className="w-5 h-5 text-[var(--color-primary)]" />
        </h1>
        <p className="text-sm text-[var(--text-muted)]">
          Track talent acquisition metrics, weekly activity, and API sourcing integrations.
        </p>
      </div>

      {/* Stats Cards Row (KPI Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Applicants"
          value="4,852"
          change="+12.5%"
          changeType="positive"
          icon={Users}
          sparklineData={[3800, 4000, 4100, 4300, 4600, 4852]}
        />
        <StatsCard
          title="Active Job Postings"
          value="42"
          change="+8.2%"
          changeType="positive"
          icon={Globe}
          sparklineData={[30, 32, 35, 38, 40, 42]}
        />
        <StatsCard
          title="Interviews Booked"
          value="124"
          change="+3.1%"
          changeType="positive"
          icon={Activity}
          sparklineData={[105, 110, 115, 112, 118, 124]}
        />
        <StatsCard
          title="Offer Accept Rate"
          value="88.5%"
          change="-1.5%"
          changeType="negative"
          icon={Check}
          sparklineData={[92, 91, 90, 89, 88.2, 88.5]}
        />
      </div>

      {/* Graphical Charts Placeholder */}
      <ChartsPlaceholder />

      {/* Skeletons Loading & Empty State Demo */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Skeletons Demo */}
        <div className="lg:col-span-1 space-y-6">
          <div className="text-xs font-semibold text-[var(--text-label)] uppercase tracking-wider">Loading Skeletons Demo</div>
          <Skeleton variant="text" className="w-2/3 h-4" />
          <div className="flex items-center gap-3">
            <Skeleton variant="circular" className="w-10 h-10" />
            <div className="space-y-1.5 flex-1">
              <Skeleton variant="text" className="w-1/2 h-3" />
              <Skeleton variant="text" className="w-1/3 h-3" />
            </div>
          </div>
          <Skeleton variant="rectangular" className="h-24 w-full" />
        </div>

        {/* Empty State Demo */}
        <div className="lg:col-span-2 space-y-6">
          <div className="text-xs font-semibold text-[var(--text-label)] uppercase tracking-wider">Empty State Template</div>
          <EmptyState
            title="No Interview slots set"
            description="You currently do not have any candidate interview slots locked in for today."
            actionLabel="Book a slot"
            onAction={() => addToast('Redirecting to calendar bookings...', 'info')}
          />
        </div>
      </div>
    </div>
  );
}
