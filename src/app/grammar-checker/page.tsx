'use client';

import { useState, type ChangeEvent } from 'react';
import {
  BookOpenCheck,
  Compass,
  Copy,
  Download,
  FileText,
  Highlighter,
  Quote,
  ShieldCheck,
  UploadCloud,
  Wand2,
  PenSquare
} from 'lucide-react';
import { checkGrammar, getGrammarData } from '@/lib/apiClient';
import { ResponsibleUseBanner } from '@/components/ResponsibleUseModal';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const qualityMetrics = [
  {
    icon: ShieldCheck,
    label: 'Compliance ready',
    value: '99%',
    description: 'Integrity AI grammar checks resolve flagged issues before legal review.',
  },
  {
    icon: Highlighter,
    label: 'Style consistency',
    value: '87%',
    description: 'Average improvement in brand style adherence across global teams.',
  },
  {
    icon: Quote,
    label: 'Clarity boost',
    value: '4.6/5',
    description: 'Editors rate Integrity AI revisions highly for clarity and readability.',
  },
];

const guidanceCards = [
  {
    icon: Wand2,
    title: 'Rewrite with intent',
    description: 'Choose inclusive, academic, or conversational rewrites while keeping citations intact.',
  },
  {
    icon: Compass,
    title: 'Surface coaching',
    description: 'Integrity AI explains every change and ties it back to your editorial guidelines.',
  },
  {
    icon: PenSquare,
    title: 'Version snapshots',
    description: 'Capture before-and-after comparisons for instructors, reviewers, and clients.',
  },
];

export default function GrammarPage() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleCheck = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await checkGrammar(text);
      setResult(response);
      toast.success('Grammar review complete.');
    } catch (error: any) {
      toast.error(error.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadSample = async () => {
    setLoading(true);
    try {
      const data = await getGrammarData();
      setText(data.originalText);
      setResult(data);
      setUploadedFile(null);
    } catch (error) {
      toast.error('Failed to load sample data.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = loadEvent => {
      setText(String(loadEvent.target?.result || ''));
      setUploadedFile(file.name);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-20 pb-24">
      <section className="relative isolate overflow-hidden px-6 pt-20 sm:px-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.15),transparent_60%),radial-gradient(circle_at_bottom,_rgba(52,211,153,0.14),transparent_55%)]" />
        <div className="absolute -top-28 left-1/3 -z-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 rounded-3xl border border-border/60 bg-card/85 p-10 shadow-2xl backdrop-blur-lg sm:p-14">
          <div className="flex flex-col gap-6 text-center">
            <span className="mx-auto inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-secondary-foreground">
              Integrity AI grammar review
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Deliver polished, consistent writing without losing your voice
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              Integrity AI unifies grammar, style, and inclusive language rules while giving your team actionable feedback on every edit.
            </p>
          </div>
          <ResponsibleUseBanner />
          <div className="grid gap-6 sm:grid-cols-3">
            {qualityMetrics.map(metric => {
              const Icon = metric.icon;
              return (
                <div key={metric.label} className="flex h-full flex-col gap-3 rounded-2xl border border-border/70 bg-background/80 p-6 text-left shadow-sm">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </span>
                  <p className="text-sm font-semibold text-muted-foreground">{metric.label}</p>
                  <p className="text-3xl font-bold text-primary">{metric.value}</p>
                  <p className="text-sm text-muted-foreground">{metric.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-12">
        <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1.05fr_1fr]">
          <div className="flex flex-col gap-5 rounded-3xl border border-border bg-card/95 p-8 shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-foreground">Paste or upload your draft</h2>
                <p className="text-sm text-muted-foreground">
                  Integrity AI analyses grammar, style, and inclusive language in one pass so nothing slips through.
                </p>
              </div>
              <button
                onClick={handleLoadSample}
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary/10"
              >
                Load sample
              </button>
            </div>
            <textarea
              className="h-64 w-full resize-none rounded-2xl border border-border/70 bg-background/80 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="Paste a paragraph, transcript, or academic section that needs attention."
              value={text}
              onChange={event => setText(event.target.value)}
            />
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <button
                onClick={() => document.getElementById('grammar-upload')?.click()}
                className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-primary"
              >
                <UploadCloud className="h-4 w-4" />
                Attach document
              </button>
              {uploadedFile && <span className="rounded-full bg-muted px-3 py-1 text-xs">{uploadedFile}</span>}
              <input id="grammar-upload" type="file" className="hidden" accept=".txt,.doc,.docx,.pdf" onChange={handleFileChange} />
              <label className="ml-auto inline-flex items-center gap-2 text-xs">
                <input type="checkbox" className="rounded border-primary/40 text-primary focus:ring-primary/50" />
                Track this review for quality scoring
              </label>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                onClick={handleCheck}
                disabled={loading || !text}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Reviewing' : 'Run grammar review'}
              </button>
              <button
                onClick={() => {
                  setText('');
                  setUploadedFile(null);
                  setResult(null);
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 px-6 py-3 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary/10"
              >
                Clear draft
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-6 rounded-3xl border border-border bg-card/95 p-8 shadow-lg">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Corrections & rationale</h2>
              <p className="text-sm text-muted-foreground">
                Inspect Integrity AI suggestions, copy the corrected version, or download a change log to share.
              </p>
            </div>
            <div className="flex min-h-[260px] flex-col gap-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={loading ? 'loading' : result ? 'result' : 'empty'}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1"
                >
                  {loading && (
                    <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
                      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                      Reviewing grammar, style, and tone...
                    </div>
                  )}
                  {!loading && !result && (
                    <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
                      <FileText size={48} />
                      Your corrected draft and explanation timeline will appear here.
                    </div>
                  )}
                  {!loading && result && (
                    <div className="flex h-full flex-col gap-5">
                      <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4">
                        <p className="text-sm font-semibold text-primary">Corrected draft</p>
                        <p className="mt-2 text-sm text-primary/80">
                          Integrity AI applied grammar, clarity, and inclusivity updates in one pass.
                        </p>
                        <div className="mt-3 max-h-48 overflow-auto rounded-xl border border-primary/20 bg-background/80 p-4 text-sm text-foreground">
                          {result.correctedText}
                        </div>
                        <div className="mt-3 grid gap-3 sm:grid-cols-2">
                          <button
                            onClick={() => navigator.clipboard.writeText(result.correctedText)}
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary/10"
                          >
                            <Copy className="h-4 w-4" /> Copy result
                          </button>
                          <button
                            onClick={() => {
                              const blob = new Blob([result.correctedText], { type: 'text/plain' });
                              const url = URL.createObjectURL(blob);
                              const anchor = document.createElement('a');
                              anchor.href = url;
                              anchor.download = 'integrity-ai_grammar.txt';
                              anchor.click();
                              URL.revokeObjectURL(url);
                              toast.success('File downloaded.');
                            }}
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/90"
                          >
                            <Download className="h-4 w-4" /> Export .txt
                          </button>
                        </div>
                      </div>
                      {result.changes?.length > 0 && (
                        <div className="flex-1 rounded-2xl border border-border/70 bg-background/80 p-5">
                          <p className="text-sm font-semibold text-muted-foreground">Change timeline</p>
                          <div className="mt-3 space-y-3 text-sm">
                            {result.changes.map((change: any, index: number) => (
                              <div key={index} className="rounded-xl border border-border/60 bg-background/90 p-4 shadow-sm">
                                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Rule: {change.rule}</p>
                                <p className="mt-2 text-sm text-foreground">
                                  <span className="font-semibold text-primary">{change.original}</span>{' -> '}<span className="pl-1 font-semibold text-foreground">{change.corrected}</span>
                                </p>
                                <p className="mt-2 text-xs text-muted-foreground">Explanation: {change.explanation}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-12">
        <div className="mx-auto max-w-6xl rounded-3xl border border-border bg-card/95 p-10 shadow-lg">
          <div className="mb-10 flex flex-col gap-3 text-center">
            <h3 className="text-3xl font-bold text-foreground sm:text-4xl">Coach writers with transparency</h3>
            <p className="text-lg text-muted-foreground">
              Integrity AI grammar insights help mentors and editors move faster while sharing rationale with learners.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {guidanceCards.map(card => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="flex h-full flex-col gap-3 rounded-2xl border border-border/70 bg-background/80 p-6 shadow-sm">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </span>
                  <p className="text-base font-semibold text-foreground">{card.title}</p>
                  <p className="text-sm text-muted-foreground">{card.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

