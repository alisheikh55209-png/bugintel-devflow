'use client';

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { BarChart3 } from 'lucide-react';

const monthlyData = [
  { month: 'Jan', bugs: 65, resolved: 45, critical: 8 },
  { month: 'Feb', bugs: 78, resolved: 52, critical: 10 },
  { month: 'Mar', bugs: 92, resolved: 68, critical: 7 },
  { month: 'Apr', bugs: 85, resolved: 71, critical: 5 },
  { month: 'May', bugs: 110, resolved: 94, critical: 6 },
  { month: 'Jun', bugs: 125, resolved: 108, critical: 9 },
];

const weeklyData = [
  { day: 'Mon', bugs: 18, resolved: 12 },
  { day: 'Tue', bugs: 22, resolved: 18 },
  { day: 'Wed', bugs: 19, resolved: 15 },
  { day: 'Thu', bugs: 25, resolved: 20 },
  { day: 'Fri', bugs: 28, resolved: 24 },
  { day: 'Sat', bugs: 12, resolved: 10 },
  { day: 'Sun', bugs: 15, resolved: 12 },
];

const projectPerformance = [
  { project: 'Frontend', score: 85, target: 90 },
  { project: 'Backend', score: 78, target: 85 },
  { project: 'Infrastructure', score: 92, target: 90 },
  { project: 'Mobile', score: 72, target: 80 },
  { project: 'Docs', score: 88, target: 90 },
];

const severityDistribution = [
  { name: 'Critical', value: 45, color: '#EF4444' },
  { name: 'High', value: 128, color: '#F59E0B' },
  { name: 'Medium', value: 342, color: '#3B82F6' },
  { name: 'Low', value: 732, color: '#10B981' },
];

const qaCoverageData = [
  { name: 'Jan', coverage: 72, defectEscape: 2.1 },
  { name: 'Feb', coverage: 75, defectEscape: 1.9 },
  { name: 'Mar', coverage: 78, defectEscape: 1.7 },
  { name: 'Apr', coverage: 81, defectEscape: 1.4 },
  { name: 'May', coverage: 84, defectEscape: 1.2 },
  { name: 'Jun', coverage: 87, defectEscape: 0.9 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <BarChart3 className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        </div>
        <p className="text-muted-foreground">
          Detailed insights into your bug tracking metrics and trends
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 animate-page-transition-in">
          <p className="text-sm text-muted-foreground mb-1">Avg Resolution Time</p>
          <p className="text-2xl font-bold text-foreground">2.5 days</p>
          <p className="text-xs text-emerald-500 dark:text-emerald-400 mt-1">↓ 15% from last month</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 animate-page-transition-in animation-delay-100">
          <p className="text-sm text-muted-foreground mb-1">Bug Escape Rate</p>
          <p className="text-2xl font-bold text-foreground">1.2%</p>
          <p className="text-xs text-red-500 dark:text-red-400 mt-1">↑ 0.3% from last month</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 animate-page-transition-in animation-delay-200">
          <p className="text-sm text-muted-foreground mb-1">Team Efficiency</p>
          <p className="text-2xl font-bold text-foreground">94%</p>
          <p className="text-xs text-emerald-500 dark:text-emerald-400 mt-1">↑ 3% from last month</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 animate-page-transition-in animation-delay-300">
          <p className="text-sm text-muted-foreground mb-1">Total Closed Bugs</p>
          <p className="text-2xl font-bold text-foreground">1,247</p>
          <p className="text-xs text-emerald-500 dark:text-emerald-400 mt-1">↑ 156 this month</p>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 animate-page-transition-in animation-delay-400">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Monthly Bug Trends & Resolution
        </h3>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={monthlyData}>
              <defs>
                <linearGradient id="colorBugs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#22D3EE" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(31, 41, 55, 0.5)" />
              <XAxis stroke="rgba(107, 114, 128, 0.7)" />
              <YAxis stroke="rgba(107, 114, 128, 0.7)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(10, 14, 26, 0.95)',
                  border: '1px solid #1F2937',
                  borderRadius: '0.5rem',
                  boxShadow: '0 0 20px rgba(99, 102, 241, 0.2)',
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '1rem' }} />
              <Area
                type="monotone"
                dataKey="bugs"
                stroke="#6366F1"
                fillOpacity={1}
                fill="url(#colorBugs)"
              />
              <Area
                type="monotone"
                dataKey="resolved"
                stroke="#22D3EE"
                fillOpacity={1}
                fill="url(#colorResolved)"
              />
              <Line
                type="monotone"
                dataKey="critical"
                stroke="#EF4444"
                strokeWidth={2}
                dot={{ fill: '#EF4444', r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weekly and QA Coverage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly */}
        <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 animate-page-transition-in animation-delay-500">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Weekly Bug Activity
          </h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(31, 41, 55, 0.5)" />
                <XAxis stroke="rgba(107, 114, 128, 0.7)" />
                <YAxis stroke="rgba(107, 114, 128, 0.7)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(10, 14, 26, 0.95)',
                    border: '1px solid #1F2937',
                    borderRadius: '0.5rem',
                    boxShadow: '0 0 20px rgba(99, 102, 241, 0.2)',
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: '0.5rem' }} />
                <Bar dataKey="bugs" fill="#6366F1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="resolved" fill="#22D3EE" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* QA Coverage Trend */}
        <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 animate-page-transition-in animation-delay-500">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            QA Coverage & Defect Escape Rate
          </h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={qaCoverageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(31, 41, 55, 0.5)" />
                <XAxis stroke="rgba(107, 114, 128, 0.7)" />
                <YAxis yAxisId="left" stroke="rgba(107, 114, 128, 0.7)" />
                <YAxis yAxisId="right" orientation="right" stroke="rgba(107, 114, 128, 0.7)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(10, 14, 26, 0.95)',
                    border: '1px solid #1F2937',
                    borderRadius: '0.5rem',
                    boxShadow: '0 0 20px rgba(99, 102, 241, 0.2)',
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: '0.5rem' }} />
                <Line yAxisId="left" type="monotone" dataKey="coverage" stroke="#10B981" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="defectEscape" stroke="#F59E0B" strokeWidth={2} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Severity Distribution and Project Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bug Severity Distribution */}
        <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 animate-page-transition-in animation-delay-500">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Bug Severity Distribution
          </h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={severityDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {severityDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(10, 14, 26, 0.95)',
                    border: '1px solid #1F2937',
                    borderRadius: '0.5rem',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Project Performance */}
        <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 animate-page-transition-in animation-delay-500">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Project Health Scores
          </h3>
          <div className="space-y-4">
            {projectPerformance.map((project, index) => (
              <div key={project.project} className="animate-stagger-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">
                    {project.project}
                  </span>
                  <span className="text-sm font-bold text-primary">
                    {project.score}/{project.target}
                  </span>
                </div>
                <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 animate-scale-in"
                    style={{ width: `${(project.score / project.target) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
