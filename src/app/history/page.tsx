'use client';

import { useState, useMemo, useEffect, type JSX } from 'react';
import Link from 'next/link';
import {
  CalendarClock,
  Filter,
  FileText,
  Globe,
  MessageSquare,
  Repeat,
  ShieldCheck,
  Sparkles,
  Trash2
} from 'lucide-react';
import { ResponsibleUseBanner } from '@/components/ResponsibleUseModal';

const toolRoutes: Record<string, string> = {
  Humanize: '/humanize-ai',
  'Detect Text': '/ai-checker',
  Grammar: '/grammar-checker',
  Plagiarism: '/plagiarism-checker',
  Translator: '/ai-translator',
  Chat: '/chat',
};

const mockHistory = [
  { id: '1', tool: 'Humanize', date: '2024-07-20', owner: 'Alex Morgan', content: 'The role of large language models in modern society is becoming...' },
  { id: '2', tool: 'Detect Text', date: '2024-07-19', owner: 'Priya Kapoor', content: 'The rapid advancement of artificial intelligence has led to its...' },
  { id: '3', tool: 'Grammar', date: '2024-07-18', owner: 'Samira Ortiz', content: 'The boy was running fastly and he saw a big dog...' },
  { id: '4', tool: 'Translator', date: '2024-07-17', owner: 'Ethan Chen', content: 'The rapid development of artificial intelligence has opened new doors...' },
];

const toolIconMap: Record<string, JSX.Element> = {
  Humanize: <Sparkles size={18} className="text-primary" />,
  'Detect Text': <ShieldCheck size={18} className="text-primary" />,
  Grammar: <FileText size={18} className="text-primary" />,
  Plagiarism: <ShieldCheck size={18} className="text-primary" />,
  Translator: <Globe size={18} className="text-primary" />,
  Chat: <MessageSquare size={18} className="text-primary" />,
};

export default function HistoryPage() {
  const [history, setHistory] = useState(mockHistory);
  const [activeToolFilter, setActiveToolFilter] = useState<'All' | keyof typeof toolRoutes | 'Chat'>('All');

  useEffect(() => {
    setHistory(mockHistory);
  }, []);

  const filteredHistory = useMemo(() => {
    if (activeToolFilter === 'All') return history;
    return history.filter(item => item.tool === activeToolFilter);
  }, [history, activeToolFilter]);

  const handleDelete = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const getToolIcon = (tool: string) => toolIconMap[tool] ?? <FileText size={18} className="text-primary" />;

  const getToolHref = (tool: string, content: string) => {
    const base = toolRoutes[tool];
    if (!base) return '#';
    const encoded = encodeURIComponent(content);
    return `${base}?text=${encoded}`;
  };

  return (
    <div className="space-y-20 pb-24">
      <section className="relative isolate overflow-hidden px-6 pt-20 sm:px-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.15),transparent_60%),radial-gradient(circle_at_bottom,_rgba(55,65,81,0.12),transparent_55%)]" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 rounded-3xl border border-border/60 bg-card/85 p-10 shadow-2xl backdrop-blur-lg sm:p-14">
          <div className="flex flex-col gap-6 text-center">
            <span className="mx-auto inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-secondary-foreground">
              Integrity AI activity log
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Stay accountable with a tamper-evident history of every Integrity AI run
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              Review past humanize passes, detection scans, grammar corrections, translations, and chat conversations in one centralized timeline.
            </p>
          </div>
          <ResponsibleUseBanner />
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-border/70 bg-background/80 p-6 text-left shadow-sm">
              <p className="text-sm font-semibold text-muted-foreground">Entries captured</p>
              <p className="mt-2 text-3xl font-bold text-primary">{history.length}</p>
              <p className="mt-2 text-sm text-muted-foreground">Integrity AI stores essential metadata—tool, owner, and timestamps—for every run.</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background/80 p-6 text-left shadow-sm">
              <p className="text-sm font-semibold text-muted-foreground">Last activity</p>
              <p className="mt-2 text-3xl font-bold text-primary">{history[0]?.date ?? 'N/A'}</p>
              <p className="mt-2 text-sm text-muted-foreground">Use history to rerun a workflow with the same input or send it to another reviewer.</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background/80 p-6 text-left shadow-sm">
              <p className="text-sm font-semibold text-muted-foreground">Export ready</p>
              <p className="mt-2 text-3xl font-bold text-primary">JSON & CSV</p>
              <p className="mt-2 text-sm text-muted-foreground">Download history for audits or pipeline automation in moments.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-12">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 rounded-3xl border border-border bg-card/95 p-8 shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Activity timeline</h2>
              <p className="text-sm text-muted-foreground">Filter by tool and quickly relaunch the same request or archive the record.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-sm text-muted-foreground">
                <Filter className="h-4 w-4" />
                Filter by tool
              </div>
              <select
                value={activeToolFilter}
                onChange={event => setActiveToolFilter(event.target.value as typeof activeToolFilter)}
                className="rounded-full border border-border/70 bg-background/80 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <option value="All">All activity</option>
                {Object.keys(toolRoutes).map(tool => (
                  <option key={tool} value={tool}>{tool}</option>
                ))}
                <option value="Chat">Chat</option>
              </select>
            </div>
          </div>

          {filteredHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-border/70 bg-background/80 p-12 text-muted-foreground">
              <CalendarClock className="h-10 w-10" />
              <p>No entries match this filter.</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-border">
              <table className="min-w-full divide-y divide-border text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Tool</th>
                    <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Owner</th>
                    <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Run date</th>
                    <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Preview</th>
                    <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-card">
                  {filteredHistory.map(item => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 font-semibold text-foreground">
                        <div className="flex items-center gap-2">
                          {getToolIcon(item.tool)}
                          {item.tool}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{item.owner}</td>
                      <td className="px-6 py-4 text-muted-foreground">{item.date}</td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {item.content.substring(0, 60)}...
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={getToolHref(item.tool, item.content)}
                            className="inline-flex items-center gap-1 rounded-full border border-primary/30 px-3 py-1 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary/10"
                          >
                            <Repeat className="h-4 w-4" /> Retry
                          </Link>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="inline-flex items-center gap-1 rounded-full border border-red-200 px-3 py-1 text-sm font-semibold text-red-500 transition hover:border-red-400 hover:bg-red-500/10"
                          >
                            <Trash2 className="h-4 w-4" /> Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
