'use client';

import AccountLayout from '@/components/AccountLayout';
import { Key, RotateCw, Trash2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const apiKeysMock = [
  { id: '1', key: 'iai_user_key_789ghi', created: '2024-05-10', lastUsed: '2024-07-20' },
];

export default function AccountAPIKeysPage() {
  const [apiKeys, setApiKeys] = useState(apiKeysMock);

  const handleCreateKey = () => {
    const newKey = `iai_user_key_${Math.random().toString(36).substring(2, 10)}`;
    setApiKeys([...apiKeys, { id: Date.now().toString(), key: newKey, created: new Date().toISOString().split('T')[0], lastUsed: 'Never' }]);
    toast.success('New API key created.');
  };

  const handleRotateKey = (id: string) => {
    setApiKeys((prevKeys) =>
      prevKeys.map((key) =>
        key.id === id ? { ...key, key: `iai_rotated_key_${Math.random().toString(36).substring(2, 10)}` } : key
      )
    );
    toast.success('API key rotated successfully.');
  };

  const handleRevokeKey = (id: string) => {
    setApiKeys((prevKeys) => prevKeys.filter((key) => key.id !== id));
    toast.success('API key revoked.');
  };

  return (
    <AccountLayout>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Key size={40} className="text-muted-foreground" />
          <h2 className="text-2xl font-bold">API Keys</h2>
        </div>
        <div className="bg-card border rounded-lg p-6 space-y-4">
          <p className="text-muted-foreground">Manage your personal API keys for programmatic access to our tools.</p>
          <div className="flex justify-end">
            <button
              onClick={handleCreateKey}
              className="px-4 py-2 font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Create New Key
            </button>
          </div>
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-muted">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Key
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Created
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Last Used
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {apiKeys.map((key) => (
                  <tr key={key.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">{key.key}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{key.created}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{key.lastUsed}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleRotateKey(key.id)}
                        className="text-primary hover:text-primary/80 mr-4"
                        title="Rotate"
                      >
                        <RotateCw size={18} />
                      </button>
                      <button
                        onClick={() => handleRevokeKey(key.id)}
                        className="text-red-500 hover:text-red-400"
                        title="Revoke"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
}
