'use client';

import { useEffect, useState } from 'react';
import { Bug, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RecentBugsTable } from '@/components/recent-bugs-table';

const allBugs = [
  {
    id: '1',
    title: 'Login page crashes on mobile',
    project: 'Frontend',
    severity: 'critical' as const,
    status: 'open' as const,
    assignee: 'Alice Chen',
    date: '2 hours ago',
  },
  {
    id: '2',
    title: 'Database connection timeout',
    project: 'Backend',
    severity: 'high' as const,
    status: 'in-progress' as const,
    assignee: 'Bob Smith',
    date: '5 hours ago',
  },
  {
    id: '3',
    title: 'API response delay under load',
    project: 'Infrastructure',
    severity: 'high' as const,
    status: 'in-progress' as const,
    assignee: 'Carol White',
    date: '1 day ago',
  },
  {
    id: '4',
    title: 'UI elements not responsive',
    project: 'Frontend',
    severity: 'medium' as const,
    status: 'resolved' as const,
    assignee: 'David Brown',
    date: '2 days ago',
  },
  {
    id: '5',
    title: 'Email notifications not sending',
    project: 'Backend',
    severity: 'medium' as const,
    status: 'in-progress' as const,
    assignee: 'Eve Johnson',
    date: '3 days ago',
  },
  {
    id: '6',
    title: 'Cache invalidation issue',
    project: 'Backend',
    severity: 'high' as const,
    status: 'open' as const,
    assignee: 'Bob Smith',
    date: '4 days ago',
  },
  {
    id: '7',
    title: 'Font rendering on Safari',
    project: 'Frontend',
    severity: 'low' as const,
    status: 'open' as const,
    assignee: 'Alice Chen',
    date: '5 days ago',
  },
  {
    id: '8',
    title: 'Memory leak in background service',
    project: 'Infrastructure',
    severity: 'critical' as const,
    status: 'open' as const,
    assignee: 'Carol White',
    date: '6 days ago',
  },
];

export default function BugsPage() {
  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [filteredBugs, setFilteredBugs] = useState(allBugs);

  useEffect(() => {
    let filtered = allBugs;

    if (selectedSeverity) {
      filtered = filtered.filter((bug) => bug.severity === selectedSeverity);
    }

    if (selectedStatus) {
      filtered = filtered.filter((bug) => bug.status === selectedStatus);
    }

    setFilteredBugs(filtered);
  }, [selectedSeverity, selectedStatus]);

  const severities = ['critical', 'high', 'medium', 'low'];
  const statuses = ['open', 'in-progress', 'resolved', 'closed'];

  return (
    <div className="space-y-8 animate-page-transition-in">
      {/* Header */}
      <div className="animate-slide-in-down">
        <div className="flex items-center gap-2 mb-2">
          <Bug className="w-8 h-8 text-primary animate-floating-up" />
          <h1 className="text-3xl font-bold text-foreground">Bug Management</h1>
        </div>
        <p className="text-muted-foreground">
          Manage and track all reported bugs in your projects
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 animate-stagger-in animation-delay-100">
          <p className="text-sm text-muted-foreground mb-1">Total Bugs</p>
          <p className="text-2xl font-bold text-foreground">{allBugs.length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300 animate-stagger-in animation-delay-200">
          <p className="text-sm text-muted-foreground mb-1">Open</p>
          <p className="text-2xl font-bold text-red-500 dark:text-red-400">
            {allBugs.filter((b) => b.status === 'open').length}
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 animate-stagger-in animation-delay-300">
          <p className="text-sm text-muted-foreground mb-1">In Progress</p>
          <p className="text-2xl font-bold text-blue-500 dark:text-blue-400">
            {allBugs.filter((b) => b.status === 'in-progress').length}
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 animate-stagger-in animation-delay-400">
          <p className="text-sm text-muted-foreground mb-1">Critical</p>
          <p className="text-2xl font-bold text-orange-500 dark:text-orange-400">
            {allBugs.filter((b) => b.severity === 'critical').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-6 animate-page-transition-in animation-delay-200">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Severity Filter */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Severity</h4>
            <div className="flex flex-wrap gap-2">
              {severities.map((severity) => (
                <Button
                  key={severity}
                  onClick={() =>
                    setSelectedSeverity(
                      selectedSeverity === severity ? null : severity
                    )
                  }
                  variant={selectedSeverity === severity ? 'default' : 'outline'}
                  size="sm"
                  className={selectedSeverity === severity ? 'bg-primary' : ''}
                >
                  {severity.charAt(0).toUpperCase() + severity.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Status</h4>
            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => (
                <Button
                  key={status}
                  onClick={() =>
                    setSelectedStatus(selectedStatus === status ? null : status)
                  }
                  variant={selectedStatus === status ? 'default' : 'outline'}
                  size="sm"
                  className={selectedStatus === status ? 'bg-primary' : ''}
                >
                  {status.charAt(0).toUpperCase() +
                    status.slice(1).replace('-', ' ')}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {(selectedSeverity || selectedStatus) && (
          <Button
            onClick={() => {
              setSelectedSeverity(null);
              setSelectedStatus(null);
            }}
            variant="ghost"
            size="sm"
            className="mt-4 text-muted-foreground hover:text-foreground"
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Bugs Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 animate-page-transition-in animation-delay-300">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Bugs ({filteredBugs.length})
            </h3>
            <p className="text-sm text-muted-foreground">
              Showing {filteredBugs.length} of {allBugs.length} bugs
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/80 text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary/50">
            + Report Bug
          </Button>
        </div>
        <RecentBugsTable bugs={filteredBugs} />
      </div>
    </div>
  );
}
