'use client';

import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Bug, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { MetricCard } from '@/components/metric-card';
import { RecentBugsTable } from '@/components/recent-bugs-table';
import { AIInsightsPanel } from '@/components/ai-insights-panel';

// Mock data
const lineChartData = [
  { name: 'Jan', bugs: 65, resolved: 45 },
  { name: 'Feb', bugs: 78, resolved: 52 },
  { name: 'Mar', bugs: 92, resolved: 68 },
  { name: 'Apr', bugs: 85, resolved: 71 },
  { name: 'May', bugs: 110, resolved: 94 },
  { name: 'Jun', bugs: 125, resolved: 108 },
];

const barChartData = [
  { name: 'Alice', bugs: 24, resolved: 22 },
  { name: 'Bob', bugs: 18, resolved: 15 },
  { name: 'Carol', bugs: 32, resolved: 31 },
  { name: 'David', bugs: 21, resolved: 18 },
  { name: 'Eve', bugs: 28, resolved: 26 },
];

const pieChartData = [
  { name: 'Critical', value: 12, color: '#EF4444' },
  { name: 'High', value: 25, color: '#F59E0B' },
  { name: 'Medium', value: 40, color: '#EABB16' },
  { name: 'Low', value: 28, color: '#10B981' },
];

const recentBugs = [
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
];

const insights = [
  {
    title: 'Resolution Time Improving',
    description: 'Average bug resolution time decreased by 23% this month',
    impact: 'high' as const,
  },
  {
    title: 'Critical Bug Alert',
    description: '3 critical bugs reported in the last 24 hours',
    impact: 'high' as const,
  },
  {
    title: 'Team Performance',
    description: 'Carol has the highest bug resolution rate this week',
    impact: 'medium' as const,
  },
];

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-8 animate-page-transition-in">
      {/* Page Header */}
      <div className="animate-slide-in-down">
        <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">Welcome to BugIntel Dashboard</h1>
        <p className="text-muted-foreground">
          Real-time insights into your bug tracking metrics and team performance
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mounted && (
          <>
            <div className="animate-slide-in-left" style={{ animationDelay: '0s' }}>
              <MetricCard
                title="Total Bugs"
                value={347}
                change={12}
                icon={Bug}
                color="indigo"
              />
            </div>
            <div className="animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
              <MetricCard
                title="In Progress"
                value={82}
                change={8}
                icon={TrendingUp}
                color="cyan"
              />
            </div>
            <div className="animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
              <MetricCard
                title="Critical Issues"
                value={12}
                change={-3}
                icon={AlertCircle}
                color="purple"
              />
            </div>
            <div className="animate-slide-in-left" style={{ animationDelay: '0.3s' }}>
              <MetricCard
                title="Resolved"
                value={253}
                change={15}
                icon={CheckCircle}
                color="amber"
              />
            </div>
          </>
        )}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart - Bug Trends */}
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 animate-page-transition-in animation-delay-100">
          <h3 className="text-lg font-semibold text-foreground mb-4">Bug Trends</h3>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(31, 41, 55, 0.5)" />
                <XAxis stroke="rgba(107, 114, 128, 0.7)" />
                <YAxis stroke="rgba(107, 114, 128, 0.7)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111827',
                    border: '1px solid #1F2937',
                    borderRadius: '0.5rem',
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: '1rem' }} />
                <Line
                  type="monotone"
                  dataKey="bugs"
                  stroke="#6366F1"
                  strokeWidth={2}
                  dot={{ fill: '#6366F1', r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="resolved"
                  stroke="#22D3EE"
                  strokeWidth={2}
                  dot={{ fill: '#22D3EE', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart - Severity Distribution */}
        <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 animate-page-transition-in animation-delay-200">
          <h3 className="text-lg font-semibold text-foreground mb-4">Bug Severity</h3>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111827',
                    border: '1px solid #1F2937',
                    borderRadius: '0.5rem',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bar Chart - Developer Performance */}
      <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 animate-page-transition-in animation-delay-300">
        <h3 className="text-lg font-semibold text-foreground mb-4">Developer Performance</h3>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(31, 41, 55, 0.5)" />
              <XAxis stroke="rgba(107, 114, 128, 0.7)" />
              <YAxis stroke="rgba(107, 114, 128, 0.7)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#111827',
                  border: '1px solid #1F2937',
                  borderRadius: '0.5rem',
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '1rem' }} />
              <Bar dataKey="bugs" fill="#6366F1" radius={[8, 8, 0, 0]} />
              <Bar dataKey="resolved" fill="#22D3EE" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Insights */}
      <AIInsightsPanel insights={insights} />

      {/* Recent Bugs Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 animate-page-transition-in animation-delay-400">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Recent Bugs</h3>
        </div>
        <RecentBugsTable bugs={recentBugs} />
      </div>
    </div>
  );
}
