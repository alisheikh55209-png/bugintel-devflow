'use client';

import { useState } from 'react';
import { Settings, Bell, Lock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="space-y-8 animate-page-transition-in">
      {/* Header */}
      <div className="animate-slide-in-down">
        <div className="flex items-center gap-2 mb-2">
          <Settings className="w-8 h-8 text-primary animate-floating-up" />
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        </div>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-border">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'profile'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`px-4 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'notifications'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Notifications
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'security'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Security
        </button>
        <button
          onClick={() => setActiveTab('team')}
          className={`px-4 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'team'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Team
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="bg-card border border-border rounded-lg p-6 max-w-2xl space-y-6 animate-page-transition-in">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Profile Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Full Name
                </label>
                <Input
                  defaultValue="Muhammad Ali Sheikh"
                  className="bg-muted/30 border-border"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Email
                </label>
                <Input
                  defaultValue="admin@bugintel.com"
                  className="bg-muted/30 border-border"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Role
                </label>
                <Input
                  defaultValue="Admin"
                  disabled
                  className="bg-muted/30 border-border"
                />
              </div>
              <Button className="bg-primary hover:bg-primary/80 text-white">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="bg-card border border-border rounded-lg p-6 max-w-2xl space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Preferences
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Critical Bugs', description: 'Notify about critical issues' },
                {
                  label: 'Assigned Bugs',
                  description: 'Notify when bugs are assigned to you',
                },
                { label: 'Daily Digest', description: 'Receive daily summary' },
                { label: 'Team Updates', description: 'Notify about team changes' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {item.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-5 h-5 rounded border-border bg-muted/30 cursor-pointer"
                  />
                </div>
              ))}
            </div>
            <Button className="mt-4 bg-primary hover:bg-primary/80 text-white">
              Save Preferences
            </Button>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="bg-card border border-border rounded-lg p-6 max-w-2xl space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Security Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Current Password
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="bg-muted/30 border-border"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  New Password
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="bg-muted/30 border-border"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Confirm Password
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="bg-muted/30 border-border"
                />
              </div>
              <Button className="bg-primary hover:bg-primary/80 text-white">
                Change Password
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Team Tab */}
      {activeTab === 'team' && (
        <div className="bg-card border border-border rounded-lg p-6 max-w-2xl space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Team Management
            </h3>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Invite team members to collaborate on projects
              </p>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Team Member Email
                </label>
                <Input
                  type="email"
                  placeholder="member@example.com"
                  className="bg-muted/30 border-border"
                />
              </div>
              <Button className="bg-primary hover:bg-primary/80 text-white">
                Send Invite
              </Button>

              <div className="pt-4 border-t border-border mt-6">
                <h4 className="text-sm font-medium text-foreground mb-3">
                  Team Members
                </h4>
                <div className="space-y-3">
                  {['Alice Chen', 'Bob Smith', 'Carol White'].map((member) => (
                    <div key={member} className="flex items-center justify-between">
                      <p className="text-sm text-foreground">{member}</p>
                      <Button variant="ghost" size="sm" className="text-red-400 hover:bg-red-500/10">
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
