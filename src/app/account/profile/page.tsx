'use client';

import AccountLayout from '@/components/AccountLayout';
import { User } from 'lucide-react';

export default function AccountProfilePage() {
  return (
    <AccountLayout>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <User size={40} className="text-muted-foreground" />
          <h2 className="text-2xl font-bold">Profile Settings</h2>
        </div>
        <div className="bg-card border rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              defaultValue="John Doe"
              className="w-full px-4 py-2 border rounded-lg bg-muted text-muted-foreground cursor-not-allowed"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              defaultValue="john.doe@example.com"
              className="w-full px-4 py-2 border rounded-lg bg-muted text-muted-foreground cursor-not-allowed"
              readOnly
            />
          </div>
          <button
            className="px-4 py-2 font-semibold rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80"
            onClick={() => alert('This is a mock UI. User data cannot be updated.')}
          >
            Update Profile (Mocked)
          </button>
        </div>
      </div>
    </AccountLayout>
  );
}

