'use client';

import { Sidebar } from './sidebar';
import { TopBar } from './top-bar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <TopBar />
      <main className="ml-64 mt-16 p-8">
        {children}
      </main>
    </div>
  );
}
