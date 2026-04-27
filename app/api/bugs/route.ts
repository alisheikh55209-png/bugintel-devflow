import { NextRequest, NextResponse } from 'next/server';

const mockBugs = [
  {
    id: '1',
    title: 'Login page crashes on mobile',
    description: 'The login page throws an error when accessed from mobile devices',
    project: 'Frontend',
    severity: 'critical',
    status: 'open',
    assignee: 'Alice Chen',
    date: '2024-01-15',
    priority: 'high',
    labels: ['mobile', 'login', 'bug'],
  },
  {
    id: '2',
    title: 'Database connection timeout',
    description: 'API occasionally times out when connecting to the database',
    project: 'Backend',
    severity: 'high',
    status: 'in-progress',
    assignee: 'Bob Smith',
    date: '2024-01-14',
    priority: 'high',
    labels: ['database', 'performance', 'backend'],
  },
  {
    id: '3',
    title: 'API response delay under load',
    description: 'Response time increases significantly under heavy load',
    project: 'Infrastructure',
    severity: 'high',
    status: 'in-progress',
    assignee: 'Carol White',
    date: '2024-01-13',
    priority: 'high',
    labels: ['performance', 'optimization', 'critical'],
  },
  {
    id: '4',
    title: 'UI elements not responsive',
    description: 'Some UI elements do not respond properly to user interactions',
    project: 'Frontend',
    severity: 'medium',
    status: 'resolved',
    assignee: 'David Brown',
    date: '2024-01-12',
    priority: 'medium',
    labels: ['ui', 'responsive', 'frontend'],
  },
  {
    id: '5',
    title: 'Email notifications not sending',
    description: 'Email notifications fail to send in certain scenarios',
    project: 'Backend',
    severity: 'medium',
    status: 'in-progress',
    assignee: 'Eve Johnson',
    date: '2024-01-11',
    priority: 'medium',
    labels: ['email', 'notifications', 'backend'],
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const severity = searchParams.get('severity');

  let filtered = [...mockBugs];

  if (status) {
    filtered = filtered.filter((bug) => bug.status === status);
  }

  if (severity) {
    filtered = filtered.filter((bug) => bug.severity === severity);
  }

  return NextResponse.json({ bugs: filtered });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newBug = {
      id: Math.random().toString(36).substr(2, 9),
      ...body,
      date: new Date().toISOString().split('T')[0],
      status: 'open',
    };

    return NextResponse.json({ bug: newBug }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create bug' },
      { status: 400 }
    );
  }
}
