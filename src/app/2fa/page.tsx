'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function TwoFactorAuth() {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (code !== '123456') { // Mock correct 2FA code
      setError('Invalid 2FA code. Please try again.');
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-card rounded-xl shadow-lg border border-border max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Two-Factor Authentication</h1>
      <p className="text-center text-muted-foreground mb-6">
        Please enter the 6-digit code from your authenticator app to log in.
      </p>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-4">
          <Label htmlFor="2fa-code">2FA Code</Label>
          <Input id="2fa-code" type="text" value={code} onChange={(e) => setCode(e.target.value)} required className="mt-1" />
        </div>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        <Button type="submit" className="w-full" disabled={status === 'loading'}>
          {status === 'loading' ? 'Verifying...' : 'Verify Code'}
        </Button>
      </form>
    </div>
  );
}
