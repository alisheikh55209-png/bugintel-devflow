import { NextResponse } from 'next/server';

const mockProjects = [
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
  {
    id: '6',
    name: 'Testing & QA',
    description: 'Automated testing and quality assurance',
    status: 'active',
    bugs: 18,
    team: 3,
    progress: 85,
    lead: 'Muhammad Ali Sheikh',
  },
];

export async function GET() {
  return NextResponse.json({ projects: mockProjects });
}
