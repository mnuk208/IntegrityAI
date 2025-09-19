'use client';

import { useState, type ChangeEvent } from 'react';
import {
  AlertTriangle,
  BookMarked,
  FileText,
  Link as LinkIcon,
  Scale,
  Search,
  Shield,
  UploadCloud,
  Users
} from 'lucide-react';
import { checkPlagiarism, getPlagiarismData } from '@/lib/apiClient';
import { ResponsibleUseBanner } from '@/components/ResponsibleUseModal';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const riskBands = [
  {
    icon: Shield,
    title: 'Low overlap',
    range: '0 - 20%',
    description: 'Minor similarity, typically citations or shared terminology. Document and approve as needed.',
  },
  {
    icon: Scale,
    title: 'Review recommended',
    range: '21 - 49%',
    description: 'Investigate paraphrased sections, confirm citations, and coach the author on attribution.',
  },
  {
    icon: AlertTriangle,
    title: 'High risk',
    range: '50%+',
    description: 'Gather sources, request revisions, and require proof of original work before publishing.',
  },
];

const escalationTips = [
  {
    icon: BookMarked,
    title: 'Maintain audit trails',
    detail: 'Export the Integrity AI report and attach it to the manuscript or student record.',
  },
  {
    icon: Users,
    title: 'Collaborate quickly',
    detail: 'Share flagged passages with reviewers directly—annotated text helps them respond faster.',
  },
  {
    icon: Search,
    title: 'Validate sources',
    detail: 'Integrity AI surfaces source URLs so you can confirm accuracy, context, and citation format.',
  },
];

const highlightColorMap: Record<string, string> = {
  exact: '#f87171',
  paraphrase: '#fbbf24',
  similar: '#a855f7',
};

export default function PlagiarismPage() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [sourceUrl, setSourceUrl] = useState('');

  const handleCheck = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await checkPlagiarism(text);
      setResult(response);
      toast.success('Plagiarism scan complete.');
    } catch (error: any) {
      toast.error(error.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadSample = async () => {
    setLoading(true);
    try {
      const data = await getPlagiarismData();
      setText(data.text);
      setResult(data);
      setUploadedFile(null);
      setSourceUrl('');
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
      setSourceUrl('');
    };
    reader.readAsText(file);
  };

  const renderHighlightedText = () => {
    if (!result) return <p className="leading-relaxed text-sm text-muted-foreground">{text}</p>;

    const segments: { text: string; type: string }[] = [];
    let lastIndex = 0;

    result.matches.forEach((match: any) => {
      const startIndex = text.indexOf(match.text, lastIndex);
      if (startIndex !== -1) {
        if (startIndex > lastIndex) {
          segments.push({ text: text.substring(lastIndex, startIndex), type: 'none' });
        }
        segments.push({ text: match.text, type: match.type });
        lastIndex = startIndex + match.text.length;
      }
    });

    if (lastIndex < text.length) {
      segments.push({ text: text.substring(lastIndex), type: 'none' });
    }

    return (
      <p className="leading-relaxed text-sm text-muted-foreground">
        {segments.map((segment, index) => (
          <span
            key={`${segment.text}-${index}`}
            style={{
              backgroundColor: highlightColorMap[segment.type] ?? 'transparent',
              borderRadius: segment.type !== 'none' ? '4px' : undefined,
              padding: segment.type !== 'none' ? '0 2px' : undefined,
            }}
          >
            {segment.text}
          </span>
        ))}
      </p>
    );
  };

  const similarityScore = result?.similarityScore ?? null;
  const escalationBadge = similarityScore !== null
    ? similarityScore >= 50
      ? 'text-red-500'
      : similarityScore >= 21
      ? 'text-yellow-500'
      : 'text-green-500'
    : 'text-muted-foreground';

  return (
    <div className="space-y-20 pb-24">
      <section className="relative isolate overflow-hidden px-6 pt-20 sm:px-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.15),transparent_60%),radial-gradient(circle_at_bottom,_rgba(244,114,182,0.14),transparent_55%)]" />
        <div className="absolute -top-28 right-16 -z-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 rounded-3xl border border-border/60 bg-card/85 p-10 shadow-2xl backdrop-blur-lg sm:p-14">
          <div className="flex flex-col gap-6 text-center">
            <span className="mx-auto inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-secondary-foreground">
              Integrity AI plagiarism safeguard
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Protect originality and cite responsibly across every submission
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              Integrity AI surfaces exact matches, paraphrases, and similar phrasing so reviewers can take action with confidence.
            </p>
          </div>
          <ResponsibleUseBanner />
          <div className="grid gap-6 sm:grid-cols-3">
            {riskBands.map(band => {
              const Icon = band.icon;
              return (
                <div key={band.title} className="flex h-full flex-col gap-3 rounded-2xl border border-border/70 bg-background/80 p-6 text-left shadow-sm">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div className="flex items-baseline gap-2">
                    <p className="text-base font-semibold text-foreground">{band.title}</p>
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{band.range}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{band.description}</p>
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
                <h2 className="text-2xl font-semibold text-foreground">Submit content for similarity analysis</h2>
                <p className="text-sm text-muted-foreground">
                  Paste text, upload a manuscript, or paste a source URL. Integrity AI checks open web, academic, and internal repositories.
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
              placeholder="Paste the content you need to verify."
              value={text}
              onChange={event => setText(event.target.value)}
            />
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <button
                onClick={() => document.getElementById('plagiarism-upload')?.click()}
                className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-primary"
              >
                <UploadCloud className="h-4 w-4" />
                Attach document
              </button>
              {uploadedFile && <span className="rounded-full bg-muted px-3 py-1 text-xs">{uploadedFile}</span>}
              <input id="plagiarism-upload" type="file" className="hidden" accept=".txt,.doc,.docx,.pdf" onChange={handleFileChange} />
              <div className="relative flex-1 min-w-[220px]">
                <input
                  type="url"
                  value={sourceUrl}
                  onChange={event => setSourceUrl(event.target.value)}
                  placeholder="Optional source URL"
                  className="w-full rounded-full border border-border/60 bg-background/80 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                <LinkIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
            <button
              onClick={handleCheck}
              disabled={loading || !text}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Scanning' : 'Run similarity scan'}
            </button>
          </div>

          <div className="flex flex-col gap-6 rounded-3xl border border-border bg-card/95 p-8 shadow-lg">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Results & recommended actions</h2>
              <p className="text-sm text-muted-foreground">
                Review Integrity AI findings, explore sources, and choose the appropriate escalation path.
              </p>
            </div>
            <div className="min-h-[260px] rounded-2xl border border-border/70 bg-background/80 p-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={loading ? 'loading' : result ? 'result' : 'empty'}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  {loading && (
                    <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
                      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                      Checking public and internal sources...
                    </div>
                  )}
                  {!loading && !result && (
                    <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
                      <FileText size={48} />
                      Results will appear here once you run a scan.
                    </div>
                  )}
                  {!loading && result && (
                    <>
                      <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4">
                        <p className="text-sm font-semibold text-primary">Similarity score</p>
                        <p className={`mt-2 text-3xl font-bold ${escalationBadge}`}>{result.similarityScore}%</p>
                        <p className="mt-1 text-xs text-primary/80">
                          Integrity AI combines string matching, semantic comparison, and citation detection.
                        </p>
                      </div>
                      <div className="rounded-2xl border border-border/60 bg-background/90 p-4">
                        <p className="text-sm font-semibold text-muted-foreground">Flagged passages</p>
                        <div className="mt-2 max-h-40 overflow-auto rounded-xl border border-border/50 bg-background/80 p-3">
                          {renderHighlightedText()}
                        </div>
                      </div>
                      <div className="rounded-2xl border border-border/60 bg-background/90 p-4">
                        <p className="text-sm font-semibold text-muted-foreground">Matching sources</p>
                        <ul className="mt-3 space-y-3 text-sm text-muted-foreground">
                          {result.sourceList.map((source: any, index: number) => (
                            <li key={index} className="flex items-center gap-2 rounded-xl border border-border/50 bg-background/80 p-3">
                              <Search className="h-4 w-4 text-primary" />
                              <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                {source.title}
                              </a>
                              <span className="ml-auto rounded-full bg-secondary px-2 py-1 text-xs font-semibold text-secondary-foreground">
                                {result.matches.find((m: any) => m.source === source.url)?.type ?? 'match'}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background/80 p-5">
              <p className="text-sm font-semibold text-muted-foreground">Escalation checklist</p>
              <div className="mt-3 grid gap-4 sm:grid-cols-3">
                {escalationTips.map(tip => {
                  const Icon = tip.icon;
                  return (
                    <div key={tip.title} className="flex h-full flex-col gap-2 rounded-xl border border-border/50 bg-background/90 p-4 text-sm text-muted-foreground">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                      <p className="text-sm font-semibold text-foreground">{tip.title}</p>
                      <p>{tip.detail}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
