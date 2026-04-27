'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  BarChart3,
  Bug,
  FileText,
  Home,
  LogOut,
  Settings,
  Users,
} from 'lucide-react';

const sidebarItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    label: 'Projects',
    href: '/dashboard/projects',
    icon: FileText,
  },
  {
    label: 'Bugs',
    href: '/dashboard/bugs',
    icon: Bug,
  },
  {
    label: 'Developers',
    href: '/dashboard/developers',
    icon: Users,
  },
  {
    label: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart3,
  },
];

const bottomItems = [
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
  {
    label: 'Sign Out',
    href: '/',
    icon: LogOut,
    isLogout: true,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border flex flex-col p-6 z-40 overflow-y-auto">
      {/* Logo */}
      <Link href="/dashboard" className="flex items-center gap-3 mb-8">
        <Image
          src="/logo-bugintel.jpg"
          alt="BugIntel"
          width={40}
          height={40}
          className="rounded-lg"
        />
        <span className="text-xl font-bold text-foreground">BugIntel</span>
      </Link>

      {/* Main Menu */}
      <nav className="flex-1 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-2 h-2 rounded-full bg-secondary" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Menu */}
      <div className="space-y-2 border-t border-border pt-4">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                item.isLogout
                  ? 'text-red-400 hover:bg-red-500/10'
                  : isActive
                    ? 'bg-primary text-white'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
