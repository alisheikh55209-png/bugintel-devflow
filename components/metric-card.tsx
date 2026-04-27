'use client';

import { useEffect, useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  change: number;
  icon: LucideIcon;
  color: 'indigo' | 'cyan' | 'purple' | 'amber';
}

const colorStyles = {
  indigo: {
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    icon: 'text-indigo-400',
    text: 'text-indigo-400',
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    icon: 'text-cyan-400',
    text: 'text-cyan-400',
  },
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    icon: 'text-purple-400',
    text: 'text-purple-400',
  },
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    icon: 'text-amber-400',
    text: 'text-amber-400',
  },
};

export function MetricCard({ title, value, change, icon: Icon, color }: MetricCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const styles = colorStyles[color];

  useEffect(() => {
    let current = 0;
    const increment = value / 30;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [value]);

  const isPositive = change >= 0;

  return (
    <div
      className={`${styles.bg} border ${styles.border} rounded-lg p-6 backdrop-blur-sm hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 group cursor-pointer`}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className={`p-2.5 rounded-lg ${styles.bg} border ${styles.border}`}>
          <Icon className={`w-5 h-5 ${styles.icon}`} />
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-3xl font-bold text-foreground">
          {displayValue.toLocaleString()}
        </div>
        <div className="flex items-center gap-1">
          <span className={`text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? '+' : ''}{change}%
          </span>
          <span className="text-xs text-muted-foreground">from last month</span>
        </div>
      </div>
    </div>
  );
}
