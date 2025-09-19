'use client';

import AccountLayout from '@/components/AccountLayout';
import { CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function AccountBillingPage() {
  return (
    <AccountLayout>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <CreditCard size={40} className="text-muted-foreground" />
          <h2 className="text-2xl font-bold">Billing & Plan</h2>
        </div>
        <div className="bg-card border rounded-lg p-6 space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Current Plan</h3>
            <div className="border p-4 rounded-lg bg-muted flex justify-between items-center">
              <div className="space-y-1">
                <p className="font-semibold">Free Plan</p>
                <p className="text-sm text-muted-foreground">1,000 words per month</p>
              </div>
              <Link href="/pricing" className="text-primary hover:underline font-semibold">
                Change Plan
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
            <p className="text-muted-foreground">
              No payment method on file.
            </p>
            <button
              className="mt-4 px-4 py-2 font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => alert('This is a mock UI. No real payment processing.')}
            >
              Add Payment Method
            </button>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
}

