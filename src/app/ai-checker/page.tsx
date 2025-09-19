"use client";

import { useState, useEffect, type ChangeEvent } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  BarChart3,
  ClipboardList,
  FileText,
  ShieldAlert,
  UploadCloud,
  Zap,
  Sparkles,
  ShieldCheck,
  ScrollText,
  Activity
} from "lucide-react";
import { checkAI, getAICheckerData } from "@/lib/apiClient";
import { ResponsibleUseBanner } from "@/components/ResponsibleUseModal";
import toast from "react-hot-toast";

const confidenceBands = [
  {
    icon: ShieldCheck,
    title: "Confidently human",
    range: "0 - 35%",
    description: "Strong evidence of human authorship. Archive the report for compliance records.",
  },
  {
    icon: Sparkles,
    title: "Mixed signals",
    range: "36 - 65%",
    description: "Recommend a focused humanization pass and a follow-up review before publishing.",
  },
  {
    icon: ShieldAlert,
    title: "Likely AI generated",
    range: "66 - 100%",
    description: "Escalate to editors, capture sources, and compare with past approved submissions.",
  },
];

const verificationTips = [
  {
    icon: ClipboardList,
    headline: "Check context",
    detail: "Upload related briefs or policy documents so reviewers can verify references quickly.",
  },
  {
    icon: ScrollText,
    headline: "Log decisions",
    detail: "Integrity AI records verdicts and comments so stakeholders can trace approvals.",
  },
  {
    icon: Activity,
    headline: "Promote best practice",
    detail: "Pair every high-likelihood detection with coaching resources for your writers.",
  },
];

export default function DetectTextPage() {
  const [text, setText] = useState("");
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  useEffect(() => {
    setUploadedFileName(null);
  }, [text]);

  const handleCheck = async () => {
    setLoading(true);
    setResults(null);
    try {
      const response = await checkAI(text);
      setResults(response);
      toast.success("Detection complete.");
    } catch (error: any) {
      toast.error(error.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadSample = async () => {
    setLoading(true);
    try {
      const data = await getAICheckerData();
      setText(data.text);
      setResults(data);
      setUploadedFileName(null);
    } catch (error) {
      toast.error("Failed to load sample data.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      setText(String(loadEvent.target?.result || ""));
      setUploadedFileName(file.name);
    };
    reader.readAsText(file);
  };

  const overallScore = results?.overallScore;
  const overallVerdict = results?.overallVerdict;
  const verdictBadge = overallScore !== undefined
    ? overallScore <= 35
      ? "text-green-500"
      : overallScore <= 65
      ? "text-yellow-500"
      : "text-red-500"
    : "text-muted-foreground";

  return (
    <div className="space-y-20 pb-24">
      <section className="relative isolate overflow-hidden px-6 pt-20 sm:px-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.15),transparent_60%),radial-gradient(circle_at_bottom,_rgba(251,146,60,0.14),transparent_55%)]" />
        <div className="absolute -top-24 right-10 -z-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 rounded-3xl border border-border/60 bg-card/85 p-10 shadow-2xl backdrop-blur-lg sm:p-14">
          <div className="flex flex-col gap-6 text-center">
            <span className="mx-auto inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-secondary-foreground">
              Integrity AI detect text
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Verify authorship with detector ensembles and transparent evidence
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              Combine Integrity AI signals with leading third-party engines, then guide writers toward the next best step with contextual recommendations.
            </p>
          </div>
          <ResponsibleUseBanner />
          <div className="grid gap-6 sm:grid-cols-3">
            {confidenceBands.map((band) => {
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
                <h2 className="text-2xl font-semibold text-foreground">Submit content for evaluation</h2>
                <p className="text-sm text-muted-foreground">
                  Paste or upload text to benchmark against Integrity AI ensembles. Add context so reviewers can share final decisions.
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
              placeholder="Paste a suspect paragraph, policy draft, or student submission."
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <button
                onClick={() => document.getElementById("detect-upload")?.click()}
                className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-primary"
              >
                <UploadCloud className="h-4 w-4" />
                Attach document
              </button>
              {uploadedFileName && <span className="rounded-full bg-muted px-3 py-1 text-xs">{uploadedFileName}</span>}
              <input id="detect-upload" type="file" className="hidden" accept=".txt,.doc,.docx,.pdf" onChange={handleFileChange} />
              <label className="ml-auto inline-flex items-center gap-2 text-xs">
                <input type="checkbox" className="rounded border-primary/40 text-primary focus:ring-primary/50" />
                Log this scan for compliance report
              </label>
            </div>
            <button
              onClick={handleCheck}
              disabled={loading || !text}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Analyzing" : "Run detection"}
            </button>
          </div>

          <div className="flex flex-col gap-6 rounded-3xl border border-border bg-card/95 p-8 shadow-lg">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Report & next actions</h2>
              <p className="text-sm text-muted-foreground">
                Interpret the ensemble verdict, scan per-detector scores, and send feedback to writers.
              </p>
            </div>
            <div className="min-h-[260px] rounded-2xl border border-border/70 bg-background/80 p-5">
              {loading && (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                  Scanning text across Integrity AI detectors...
                </div>
              )}
              {!loading && !results && (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
                  <FileText size={48} />
                  No scan yet. Upload or paste content to begin.
                </div>
              )}
              {!loading && results && (
                <div className="space-y-6">
                  <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4">
                    <p className="text-sm font-semibold text-primary">Overall verdict</p>
                    <p className={`mt-1 text-3xl font-bold ${verdictBadge}`}>{overallVerdict}</p>
                    <p className="mt-1 text-xs text-primary/80">
                      Integrity AI blends multiple detectors and linguistic heuristics to surface a balanced view.
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {results.results.map((detector: any, index: number) => (
                      <div key={index} className="rounded-2xl border border-border/70 bg-background/90 p-4 text-center shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{detector.detector}</p>
                        <p className="mt-2 text-2xl font-bold text-foreground">{detector.score}%</p>
                        <p className="mt-1 text-xs text-muted-foreground">{detector.verdict}</p>
                      </div>
                    ))}
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Link
                      href={`/humanize-ai?text=${encodeURIComponent(text)}`}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/90"
                    >
                      <Sparkles className="h-4 w-4" />
                      Humanize this draft
                    </Link>
                    <Link
                      href={`/grammar-checker?text=${encodeURIComponent(text)}`}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary/10"
                    >
                      <BarChart3 className="h-4 w-4" />
                      Send to reviewers
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div className="rounded-2xl border border-border/60 bg-background/80 p-5">
              <p className="text-sm font-semibold text-muted-foreground">Reviewer checklist</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="mt-1 h-4 w-4 text-primary" />
                  Document the prompt or source context used to generate the submission.
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="mt-1 h-4 w-4 text-primary" />
                  Flag high-likelihood passages and forward to Integrity AI Humanize in a single click.
                </li>
                <li className="flex items-start gap-2">
                  <FileText className="mt-1 h-4 w-4 text-primary" />
                  Archive the detection PDF alongside human reviewer notes for transparency.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-12">
        <div className="mx-auto max-w-6xl rounded-3xl border border-border bg-card/95 p-10 shadow-lg">
          <div className="mb-10 flex flex-col gap-3 text-center">
            <h3 className="text-3xl font-bold text-foreground sm:text-4xl">Elevate your integrity program</h3>
            <p className="text-lg text-muted-foreground">
              Align faculty, compliance, and editorial teams around shared definitions of trustworthy writing.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {verificationTips.map((tip) => {
              const Icon = tip.icon;
              return (
                <div key={tip.headline} className="flex h-full flex-col gap-3 rounded-2xl border border-border/70 bg-background/80 p-6 shadow-sm">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </span>
                  <p className="text-base font-semibold text-foreground">{tip.headline}</p>
                  <p className="text-sm text-muted-foreground">{tip.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}