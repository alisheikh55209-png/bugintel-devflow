'use client';

import { Bell, Search, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

export function TopBar() {
  return (
    <div className="fixed top-0 right-0 left-64 h-16 bg-card border-b border-border flex items-center justify-between px-8 z-30">
      {/* Search */}
      <div className="flex items-center flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search bugs, projects..."
            className="pl-10 bg-muted/30 border-border hover:bg-muted/50 focus:bg-muted/50 transition-colors"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground hover:text-foreground hover:bg-muted/50"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
        </Button>

        {/* Profile */}
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground hover:bg-muted/50"
        >
          <User className="w-5 h-5" />
        </Button>

        {/* User Avatar */}
        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div>
            <p className="text-sm font-medium text-foreground">Muhammad Ali Sheikh</p>
            <p className="text-xs text-muted-foreground">Admin</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold text-white">
            MAS
          </div>
        </div>
      </div>
    </div>
  );
}
