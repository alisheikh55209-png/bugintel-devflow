'use client';

import { Lightbulb, TrendingUp } from 'lucide-react';

interface Insight {
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
}

interface AIInsightsPanelProps {
  insights: Insight[];
}

export function AIInsightsPanel({ insights }: AIInsightsPanelProps) {
  const impactStyles = {
    high: 'bg-red-500/10 border-red-500/20 text-red-400',
    medium: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    low: 'bg-green-500/10 border-green-500/20 text-green-400',
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 col-span-full">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-primary/10 border border-primary/20 rounded-lg">
          <Lightbulb className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">AI Insights</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight, idx) => (
          <div
            key={idx}
            className={`border ${impactStyles[insight.impact]} rounded-lg p-4 backdrop-blur-sm`}
          >
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground mb-1">{insight.title}</h4>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
