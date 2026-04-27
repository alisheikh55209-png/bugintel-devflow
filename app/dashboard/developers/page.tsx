'use client';

import { Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const developers = [
  {
    id: '1',
    name: 'Muhammad Ali Sheikh',
    role: 'Lead Developer & Admin',
    email: 'admin@bugintel.com',
    avatar: 'MAS',
    bugsAssigned: 42,
    bugsResolved: 40,
    resolutionRate: 95,
    status: 'active',
  },
  {
    id: '2',
    name: 'Shaffan Asher',
    role: 'Senior Backend Developer',
    email: 'shaffan@bugintel.com',
    avatar: 'SA',
    bugsAssigned: 28,
    bugsResolved: 26,
    resolutionRate: 93,
    status: 'active',
  },
  {
    id: '3',
    name: 'Faraz Ahmad Butt',
    role: 'Full Stack Developer',
    email: 'faraz@bugintel.com',
    avatar: 'FAB',
    bugsAssigned: 35,
    bugsResolved: 33,
    resolutionRate: 94,
    status: 'active',
  },
];

export default function DevelopersPage() {
  return (
    <div className="space-y-8 animate-page-transition-in">
      {/* Header */}
      <div className="animate-slide-in-down">
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-8 h-8 text-primary animate-floating-up" />
          <h1 className="text-3xl font-bold text-foreground">Team Members</h1>
        </div>
        <p className="text-muted-foreground">
          Monitor your team&apos;s performance and productivity
        </p>
      </div>

      {/* Developers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {developers.map((dev, index) => (
          <div
            key={dev.id}
            className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group animate-stagger-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Header */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                {dev.avatar}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">
                  {dev.name}
                </h3>
                <p className="text-xs text-muted-foreground">{dev.role}</p>
              </div>
            </div>

            {/* Email and Status */}
            <div className="mb-4 pb-4 border-b border-border">
              <p className="text-xs text-muted-foreground mb-2">{dev.email}</p>
              <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                Active
              </Badge>
            </div>

            {/* Stats */}
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">
                    Bugs Assigned
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    {dev.bugsAssigned}
                  </span>
                </div>
                <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${(dev.bugsAssigned / 35) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">
                    Resolved
                  </span>
                  <span className="text-sm font-bold text-green-400">
                    {dev.bugsResolved}
                  </span>
                </div>
                <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${(dev.bugsResolved / 35) * 100}%` }}
                  />
                </div>
              </div>

              <div className="pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Resolution Rate
                  </span>
                  <span className="text-sm font-bold text-secondary">
                    {dev.resolutionRate}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
