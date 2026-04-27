'use client';

import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const projects = [
  {
    id: '1',
    name: 'Frontend',
    description: 'React and Next.js frontend application',
    status: 'active',
    bugs: 45,
    team: 5,
    progress: 75,
    lead: 'Alice Chen',
  },
  {
    id: '2',
    name: 'Backend',
    description: 'Node.js and Express backend API',
    status: 'active',
    bugs: 28,
    team: 4,
    progress: 82,
    lead: 'Bob Smith',
  },
  {
    id: '3',
    name: 'Infrastructure',
    description: 'DevOps and infrastructure management',
    status: 'active',
    bugs: 12,
    team: 3,
    progress: 90,
    lead: 'Carol White',
  },
  {
    id: '4',
    name: 'Mobile App',
    description: 'React Native mobile application',
    status: 'in-planning',
    bugs: 8,
    team: 2,
    progress: 15,
    lead: 'David Brown',
  },
  {
    id: '5',
    name: 'Documentation',
    description: 'API documentation and guides',
    status: 'active',
    bugs: 3,
    team: 1,
    progress: 60,
    lead: 'Eve Johnson',
  },
];

export default function ProjectsPage() {
  return (
    <div className="space-y-8 animate-page-transition-in">
      {/* Header */}
      <div className="animate-slide-in-down">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-8 h-8 text-primary animate-floating-up" />
            <h1 className="text-3xl font-bold text-foreground">Projects</h1>
          </div>
          <Button className="bg-primary hover:bg-primary/80 text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary/50">
            + New Project
          </Button>
        </div>
        <p className="text-muted-foreground mt-2">
          Manage all your projects and track their progress
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group cursor-pointer animate-stagger-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {project.description}
                </p>
              </div>
              <Badge
                variant="outline"
                className={
                  project.status === 'active'
                    ? 'bg-green-500/10 text-green-400 border-green-500/20'
                    : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                }
              >
                {project.status === 'active' ? 'Active' : 'Planning'}
              </Badge>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Progress</span>
                <span className="text-xs font-medium text-foreground">
                  {project.progress}%
                </span>
              </div>
              <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border">
              <div>
                <p className="text-xs text-muted-foreground">Bugs</p>
                <p className="text-lg font-bold text-foreground">{project.bugs}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Team</p>
                <p className="text-lg font-bold text-foreground">{project.team}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Lead</p>
                <p className="text-xs font-medium text-primary">
                  {project.lead.split(' ')[0]}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
