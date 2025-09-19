'use client';

import AccountLayout from '@/components/AccountLayout';
import { Lock } from 'lucide-react';

export default function AccountSecurityPage() {
  return (
    <AccountLayout>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Lock size={40} className="text-muted-foreground" />
          <h2 className="text-2xl font-bold">Security</h2>
        </div>
        <div className="bg-card border rounded-lg p-6 space-y-4">
          <div className="border p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Change Password</h3>
            <div className="space-y-2">
              <input type="password" placeholder="Current Password" className="w-full px-4 py-2 border rounded-lg" />
              <input type="password" placeholder="New Password" className="w-full px-4 py-2 border rounded-lg" />
              <input type="password" placeholder="Confirm New Password" className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <button
              className="mt-4 px-4 py-2 font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => alert('Password change is a mock feature.')}
            >
              Change Password
            </button>
          </div>
          <div className="border p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Two-Factor Authentication</h3>
            <p className="text-muted-foreground mb-2">
              Enable 2FA for an extra layer of security.
            </p>
            <button
              className="px-4 py-2 font-semibold rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80"
              onClick={() => alert('2FA setup is a mock feature.')}
            >
              Enable 2FA
            </button>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
}

