'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function VerifyEmail() {
  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState('Verifying your email address...');

  // Mock verification logic
  useState(() => {
    setTimeout(() => {
      setStatus('success');
      setMessage('Your email address has been successfully verified! You can now log in.');
    }, 2000);
  });

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-card rounded-xl shadow-lg border border-border max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Verify Email</h1>
      <p className="text-center text-muted-foreground mb-6">
        {message}
      </p>
      {status === 'success' && (
        <Link href="/login" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg shadow-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
          Go to Login
        </Link>
      )}
    </div>
  );
}
