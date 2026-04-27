import { NextResponse } from 'next/server';

const mockDevelopers = [
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
    joinedDate: '2023-01-15',
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
    joinedDate: '2023-03-20',
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
    joinedDate: '2023-02-10',
  },
];

export async function GET() {
  return NextResponse.json({ developers: mockDevelopers });
}
