'use client';

import { useState } from 'react';
import {
  Activity,
  Code,
  FileText,
  Key,
  LayoutList,
  RotateCw,
  ShieldCheck,
  TrafficCone,
  Trash2,
  Zap
} from 'lucide-react';
import toast from 'react-hot-toast';
import { ResponsibleUseBanner } from '@/components/ResponsibleUseModal';

const tabs = [
  { name: 'Docs', icon: <FileText size={18} /> },
  { name: 'Examples', icon: <Code size={18} /> },
  { name: 'Keys', icon: <Key size={18} /> },
];

const codeExamples: Record<'curl' | 'js' | 'python', string> = {
  curl: `curl -X POST 'https://api.integrity.ai/v1/humanize' \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "text": "The rapid advancement of AI..."
  }'`,
  js: `fetch('https://api.integrity.ai/v1/humanize', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    text: 'The rapid advancement of AI...'
  })
});`,
  python: `import requests
import json

url = 'https://api.integrity.ai/v1/humanize'
headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}
data = {
    'text': 'The rapid advancement of AI...'
}

response = requests.post(url, headers=headers, data=json.dumps(data))
print(response.json())`,
};

const apiKeysMock = [
  { id: '1', key: 'iai_test_key_123abc', created: '2023-01-15', lastUsed: '2024-07-20' },
  { id: '2', key: 'iai_demo_key_456def', created: '2023-03-22', lastUsed: '2024-06-10' },
];

const platformHighlights = [
  {
    icon: ShieldCheck,
    title: 'Secure by default',
    detail: 'Keys are scoped by workspace with role-based access control and audit logging.',
  },
  {
    icon: TrafficCone,
    title: 'Rate limits that scale',
    detail: 'Start with 200 requests/minute and work with us to raise limits for production workloads.',
  },
  {
    icon: Activity,
    title: 'Unified orchestration',
    detail: 'Trigger humanize, detection, grammar, plagiarism, and translation workflows via a single API.',
  },
];

export default function APIPage() {
  const [apiKeys, setApiKeys] = useState(apiKeysMock);
  const [activeTab, setActiveTab] = useState('Docs');
  const [activeCodeExample, setActiveCodeExample] = useState<'curl' | 'js' | 'python'>('curl');

  const handleCreateKey = () => {
    const newKey = `iai_mock_${Math.random().toString(36).slice(2, 10)}`;
    setApiKeys(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        key: newKey,
        created: new Date().toISOString().split('T')[0],
        lastUsed: 'Never',
      },
    ]);
    toast.success('New API key created.');
  };

  const handleRotateKey = (id: string) => {
    setApiKeys(prev =>
      prev.map(key =>
        key.id === id
          ? { ...key, key: `iai_rotated_${Math.random().toString(36).slice(2, 10)}` }
          : key
      )
    );
    toast.success('API key rotated successfully.');
  };

  const handleRevokeKey = (id: string) => {
    setApiKeys(prev => prev.filter(key => key.id !== id));
    toast.success('API key revoked.');
  };

  return (
    <div className="space-y-20 pb-24">
      <section className="relative isolate overflow-hidden px-6 pt-20 sm:px-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.15),transparent_60%),radial-gradient(circle_at_bottom,_rgba(96,165,250,0.12),transparent_55%)]" />
        <div className="absolute -top-24 right-12 -z-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 rounded-3xl border border-border/60 bg-card/85 p-10 shadow-2xl backdrop-blur-lg sm:p-14">
          <div className="flex flex-col gap-6 text-center">
            <span className="mx-auto inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-secondary-foreground">
              Integrity AI API platform
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Ship trusted writing experiences directly from your product
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              Access the same humanize, detection, grammar, translation, and plagiarism safeguards we use in Integrity AI via a secure, well-documented API.
            </p>
          </div>
          <ResponsibleUseBanner />
          <div className="grid gap-6 sm:grid-cols-3">
            {platformHighlights.map(item => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex h-full flex-col gap-3 rounded-2xl border border-border/70 bg-background/80 p-6 text-left shadow-sm">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </span>
                  <p className="text-base font-semibold text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-12">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 rounded-3xl border border-border bg-card/95 p-8 shadow-lg">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {tabs.map(tab => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  activeTab === tab.name
                    ? 'border-transparent bg-primary text-primary-foreground shadow'
                    : 'border-border/70 bg-background/80 text-muted-foreground hover:border-primary/40 hover:text-primary'
                }`}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </div>

          {activeTab === 'Docs' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-foreground">REST endpoints</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Authenticate every request with a bearer token. All responses are JSON and include request identifiers for audit logs.
                </p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/80 p-5 text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li><span className="font-semibold text-foreground">POST /v1/humanize</span> — Transform AI-heavy drafts into authentic writing.</li>
                  <li><span className="font-semibold text-foreground">POST /v1/detect</span> — Run ensemble detection and retrieve per-detector results.</li>
                  <li><span className="font-semibold text-foreground">POST /v1/grammar/check</span> — Get grammar, tone, and inclusivity corrections.</li>
                  <li><span className="font-semibold text-foreground">POST /v1/plagiarism/check</span> — Compare text against public web and institutional repositories.</li>
                  <li><span className="font-semibold text-foreground">POST /v1/translate</span> — Localize content with tone and terminology controls.</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/80 p-5">
                <p className="text-sm font-semibold text-muted-foreground">Webhook events</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Optionally register webhooks to receive completion notifications (humanize.completed, detect.completed) and attach reviewer action links.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'Examples' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-foreground">Code samples</h2>
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Copy & play</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(codeExamples) as Array<typeof activeCodeExample>).map(lang => (
                  <button
                    key={lang}
                    onClick={() => setActiveCodeExample(lang)}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      activeCodeExample === lang
                        ? 'border-transparent bg-primary text-primary-foreground shadow'
                        : 'border-border/70 bg-background/80 text-muted-foreground hover:border-primary/40 hover:text-primary'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
              <pre className="max-h-[340px] overflow-auto rounded-2xl border border-border/70 bg-slate-950 p-4 text-sm text-slate-100">
                <code>{codeExamples[activeCodeExample]}</code>
              </pre>
            </div>
          )}\r\n\r\n          {activeTab === 'Keys' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground">API key management</h2>
                  <p className="text-sm text-muted-foreground">Create, rotate, or revoke keys instantly. Use separate keys for staging and production.</p>
                </div>
                <button
                  onClick={handleCreateKey}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/90"
                >
                  <Zap className="h-4 w-4" /> New key
                </button>
              </div>
              <div className="overflow-hidden rounded-2xl border border-border">
                <table className="min-w-full divide-y divide-border text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Key</th>
                      <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Created</th>
                      <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Last used</th>
                      <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card">
                    {apiKeys.map(key => (
                      <tr key={key.id}>
                        <td className="px-6 py-4 font-mono">{key.key}</td>
                        <td className="px-6 py-4 text-muted-foreground">{key.created}</td>
                        <td className="px-6 py-4 text-muted-foreground">{key.lastUsed}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleRotateKey(key.id)}
                              className="text-primary hover:text-primary/80"
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
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}















