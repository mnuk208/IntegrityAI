'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MagicLink() {
  const [status, setStatus] = useState('pending'); // 'pending', 'success', 'error'

  useState(() => {
    setTimeout(() => {
      setStatus('success');
    }, 2000);
  });

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-card rounded-xl shadow-lg border border-border max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Magic Link Login</h1>
      {status === 'success' ? (
        <div className="text-center">
          <p className="text-lg text-green-600 mb-4">You are now logged in!</p>
          <Link href="/dashboard" className="text-primary hover:underline">
            Go to Dashboard
          </Link>
        </div>
      ) : (
        <p className="text-center text-muted-foreground mb-6">
          Please wait while we log you in securely...
        </p>
      )}
    </div>
  );
}
