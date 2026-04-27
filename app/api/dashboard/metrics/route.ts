import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    metrics: [
      {
        id: 'total-bugs',
        title: 'Total Bugs',
        value: 347,
        change: 12,
        icon: 'bug',
        color: 'indigo',
      },
      {
        id: 'in-progress',
        title: 'In Progress',
        value: 82,
        change: 8,
        icon: 'trending-up',
        color: 'cyan',
      },
      {
        id: 'critical',
        title: 'Critical Issues',
        value: 12,
        change: -3,
        icon: 'alert-circle',
        color: 'purple',
      },
      {
        id: 'resolved',
        title: 'Resolved',
        value: 253,
        change: 15,
        icon: 'check-circle',
        color: 'amber',
      },
    ],
  });
}
