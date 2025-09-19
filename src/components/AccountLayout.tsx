'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { User, Lock, CreditCard, Key, Settings } from 'lucide-react';

const accountLinks = [
  { name: 'Profile', href: '/account/profile', icon: <User size={20} /> },
  { name: 'Security', href: '/account/security', icon: <Lock size={20} /> },
  { name: 'Billing', href: '/account/billing', icon: <CreditCard size={20} /> },
  { name: 'API Keys', href: '/account/api-keys', icon: <Key size={20} /> },
];

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <Settings size={30} /> Account Settings
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1 bg-card border rounded-lg p-6 h-fit">
          <nav className="space-y-2">
            {accountLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-3 px-4 py-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
              >
                {link.icon}
                <span className="font-medium">{link.name}</span>
              </Link>
            ))}
          </nav>
        </aside>
        <div className="lg:col-span-3">
          {children}
        </div>
      </div>
    </div>
  );
}


