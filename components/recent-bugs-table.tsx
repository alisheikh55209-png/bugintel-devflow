'use client';

import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Bug {
  id: string;
  title: string;
  project: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  assignee: string;
  date: string;
}

interface RecentBugsTableProps {
  bugs: Bug[];
}

const severityStyles = {
  critical: 'bg-red-500/10 text-red-400 border-red-500/20',
  high: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  low: 'bg-green-500/10 text-green-400 border-green-500/20',
};

const statusStyles = {
  open: 'bg-red-500/10 text-red-400 border-red-500/20',
  'in-progress': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  resolved: 'bg-green-500/10 text-green-400 border-green-500/20',
  closed: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
};

export function RecentBugsTable({ bugs }: RecentBugsTableProps) {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground">Bug Title</TableHead>
            <TableHead className="text-muted-foreground">Project</TableHead>
            <TableHead className="text-muted-foreground">Severity</TableHead>
            <TableHead className="text-muted-foreground">Status</TableHead>
            <TableHead className="text-muted-foreground">Assignee</TableHead>
            <TableHead className="text-muted-foreground">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bugs.map((bug) => (
            <TableRow
              key={bug.id}
              className="border-border hover:bg-muted/30 transition-colors cursor-pointer"
            >
              <TableCell className="font-medium text-foreground">{bug.title}</TableCell>
              <TableCell className="text-muted-foreground">{bug.project}</TableCell>
              <TableCell>
                <Badge variant="outline" className={severityStyles[bug.severity]}>
                  {bug.severity.charAt(0).toUpperCase() + bug.severity.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={statusStyles[bug.status]}>
                  {bug.status.charAt(0).toUpperCase() + bug.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">{bug.assignee}</TableCell>
              <TableCell className="text-muted-foreground text-sm">{bug.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
