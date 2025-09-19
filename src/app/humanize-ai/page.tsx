"use client";

import { Suspense, useEffect, useState, type ChangeEvent } from "react";
import { useSearchParams } from "next/navigation";
import {
  FileText,
  Scan,
  Scissors,
  Copy,
  Download,
  UploadCloud,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Target,
  Wand2,
  Clock,
  Lightbulb
} from "lucide-react";
import toast from "react-hot-toast";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import DiffViewer from "react-diff-viewer";
import { motion, AnimatePresence } from "framer-motion";
import { ResponsibleUseBanner } from "@/components/ResponsibleUseModal";
import { humanize, getHumanizeData } from "@/lib/apiClient";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const tabs = [
  { name: "Output", icon: <FileText size={18} /> },
  { name: "Phrase Changes", icon: <Scissors size={18} /> },
  { name: "Structural Changes", icon: <Scan size={18} /> },
];

const tonePresets = [
  "Standard",
  "Academic",
  "Professional",
  "Creative",
  "Informal",
];

const heroStats = [
  {
    label: "Voice preserved",
    value: "92%",
    detail: "Average consistency score when teams apply Integrity AI humanization.",
  },
  {
    label: "Detection pass rate",
    value: "98.5%",
    detail: "Drafts that cleared internal or third-party AI detectors after refining.",
  },
  {
    label: "Minutes saved",
    value: "12.7",
    detail: "Median time Integrity AI saves per long-form review cycle.",
  },
];

const assuranceHighlights = [
  {
    icon: Sparkles,
    title: "Calibrated tone recipes",
    description:
      "Blend preset styles with custom vocab to keep policy, product, and academic voices aligned.",
  },
  {
    icon: ShieldCheck,
    title: "Citation safeguards",
    description:
      "Lock references, quotes, and attributions so Integrity AI never rewrites what should remain intact.",
  },
  {
    icon: Target,
    title: "Reviewer dashboards",
    description:
      "Instantly surface every change Integrity AI suggests, with rationales for reviewers and audit trails.",
  },
];

const workflowSignals = [
  {
    icon: Wand2,
    title: "Style accelerators",
    description: "Apply brand phrases, reading-level targets, and clarity boosts with a single toggle.",
  },
  {
    icon: Clock,
    title: "Turnaround forecasts",
    description: "Predict how long a rewrite will take based on word count, tone complexity, and history.",
  },
  {
    icon: Lightbulb,
    title: "Guided coaching",
    description: "Receive contextual feedback on how Integrity AI restructured sentences and why.",
  },
];

function HumanizePageContent() {
  const [activeTab, setActiveTab] = useState("Output");
  const [text, setText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [humanizedText, setHumanizedText] = useState("");
  const [isResponsibleUseAccepted, setIsResponsibleUseAccepted] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const accepted = localStorage.getItem("responsible-use-accepted") === "true";
    setIsResponsibleUseAccepted(accepted);

    const initialText = searchParams.get("text");
    if (initialText) {
      setText(initialText);
    }
  }, [searchParams]);

  const handleHumanize = async () => {
    if (!isResponsibleUseAccepted) {
      toast.error("Please accept the Responsible Use terms before continuing.");
      localStorage.setItem("responsible-use-accepted", "false");
      const event = new Event("show-responsible-use-modal");
      window.dispatchEvent(event);
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      const response = await humanize(text);
      setResult(response);
      setHumanizedText(response.humanizedText);
      toast.success("Draft humanized successfully.");
    } catch (error: any) {
      toast.error(error.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (humanizedText) {
      navigator.clipboard.writeText(humanizedText);
      toast.success("Copied to clipboard.");
    }
  };

  const handleDownload = (format: "txt" | "docx") => {
    if (humanizedText) {
      const blob = new Blob([humanizedText], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `integrity-ai_output.${format}`;
      anchor.click();
      URL.revokeObjectURL(url);
      toast.success("File downloaded.");
    }
  };

  const handleLoadSample = async () => {
    setLoading(true);
    try {
      const data = await getHumanizeData();
      setText(data.originalText);
      setResult(data);
      setHumanizedText(data.humanizedText);
    } catch (error) {
      toast.error("Failed to load sample data.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const content = loadEvent.target?.result as string;
        setText(content);
      };
      reader.readAsText(file);
      toast.success(`${file.name} loaded.`);
    }
  };

  const chartData = result
    ? {
        labels: ["Human-likeness", "AI-likelihood"],
        datasets: [
          {
            label: "Score",
            data: [result.analysis.humanLikeness, result.analysis.aiLikelihood],
            backgroundColor: ["#4f46e5", "#ef4444"],
            borderRadius: 12,
          },
        ],
      }
    : null;

  return (
    <div className="space-y-20 pb-24">
      <section className="relative isolate overflow-hidden px-6 pt-20 sm:px-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.15),transparent_60%),radial-gradient(circle_at_bottom,_rgba(56,189,248,0.12),transparent_55%)]" />
        <div className="absolute -top-24 left-1/2 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 rounded-3xl border border-border/60 bg-card/85 p-10 shadow-2xl backdrop-blur-lg sm:p-14">
          <div className="flex flex-col gap-6 text-center">
            <span className="mx-auto inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-secondary-foreground">
              Integrity AI humanize
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Transform robotic drafts into trusted, human reading experiences
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              Integrity AI preserves your authorial voice, provides transparent diffs, and prepares every draft to withstand compliance and AI-detection reviews.
            </p>
          </div>
          <ResponsibleUseBanner />
          <div className="grid gap-6 sm:grid-cols-3">
            {heroStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-border/70 bg-background/80 p-6 text-left shadow-sm">
                <p className="text-sm font-semibold text-muted-foreground">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold text-primary">{stat.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-12">
        <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card/95 p-8 shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-foreground">Upload or paste your draft</h2>
                <p className="text-sm text-muted-foreground">
                  Calibrate tone, length, and citation handling before Integrity AI begins refining your text.
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
              placeholder="Paste your draft, import from a file, or start from a blank canvas."
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
            <div className="grid gap-3 md:grid-cols-2">
              <div className="relative">
                <select className="w-full appearance-none rounded-xl border border-border/70 bg-background/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40">
                  <option value="auto">Language: Auto-detect</option>
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
                <ChevronDown size={18} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>
              <div className="relative">
                <select className="w-full appearance-none rounded-xl border border-border/70 bg-background/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40">
                  <option value="standard">Output goal: Standard</option>
                  <option value="concise">Make it concise</option>
                  <option value="expand">Expand with supporting detail</option>
                  <option value="inclusive">Inclusive language</option>
                </select>
                <ChevronDown size={18} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <select className="w-full appearance-none rounded-xl border border-border/70 bg-background/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40">
                  <option value="">Tone profile: Standard</option>
                  {tonePresets.map((tone) => (
                    <option key={tone} value={tone}>
                      {tone}
                    </option>
                  ))}
                </select>
                <ChevronDown size={18} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>
              <label className="inline-flex items-center gap-2 rounded-full border border-border/70 px-4 py-2 text-sm text-muted-foreground">
                <input type="checkbox" className="rounded border-primary/50 text-primary focus:ring-primary/50" />
                Preserve citations & quotes
              </label>
              <button
                onClick={() => document.getElementById("humanize-upload")?.click()}
                className="inline-flex items-center gap-2 rounded-full border border-border/70 px-4 py-2 text-sm font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-primary"
              >
                <UploadCloud size={18} />
                Attach document
              </button>
              <input id="humanize-upload" type="file" className="hidden" accept=".txt,.doc,.docx,.pdf" onChange={handleFileChange} />
            </div>
            <button
              onClick={handleHumanize}
              disabled={loading || !text}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Processing" : "Humanize this draft"}
            </button>
          </div>

          <div className="flex flex-col gap-6 rounded-3xl border border-border bg-card/95 p-8 shadow-lg">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Review and export</h2>
              <p className="text-sm text-muted-foreground">
                Inspect Integrity AI suggestions, copy the refined version, or export for your preferred workflow.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-muted/60 p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    activeTab === tab.name
                      ? "bg-primary text-primary-foreground shadow"
                      : "text-muted-foreground hover:bg-background/70"
                  }`}
                >
                  {tab.icon}
                  {tab.name}
                </button>
              ))}
            </div>
            <div className="min-h-[280px] flex-1 overflow-hidden rounded-2xl border border-border/70 bg-background/80">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  {loading && (
                    <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
                      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                      Preparing your rewrite...
                    </div>
                  )}
                  {!loading && !result && (
                    <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
                      <FileText size={48} />
                      Your humanized draft will appear here.
                    </div>
                  )}
                  {!loading && result && activeTab === "Output" && (
                    <div className="flex h-full flex-col gap-4 p-5">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4 text-sm">
                          <p className="font-semibold text-primary">Human-likeness</p>
                          <p className="mt-1 text-2xl font-bold text-primary">
                            {result.analysis.humanLikeness}%
                          </p>
                          <p className="mt-1 text-xs text-primary/80">
                            Integrity AI aligns the draft with human cadence and clarity.
                          </p>
                        </div>
                        <div className="rounded-2xl border border-border/70 bg-background/90 p-4 text-sm">
                          <p className="font-semibold text-muted-foreground">AI-likelihood</p>
                          <p className="mt-1 text-2xl font-bold text-foreground">
                            {result.analysis.aiLikelihood}%
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            Re-run Detect Text after exporting to confirm compliance.
                          </p>
                        </div>
                      </div>
                      <textarea
                        className="flex-1 resize-none rounded-xl border border-border/60 bg-background/90 p-4 text-sm focus:outline-none"
                        value={humanizedText}
                        readOnly
                      />
                      <div className="grid gap-3 sm:grid-cols-2">
                        <button
                          onClick={handleCopy}
                          className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/40 px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary/10"
                        >
                          <Copy size={16} />
                          Copy result
                        </button>
                        <button
                          onClick={() => handleDownload("txt")}
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/90"
                        >
                          <Download size={16} />
                          Export as .txt
                        </button>
                      </div>
                    </div>
                  )}
                  {!loading && result && activeTab !== "Output" && (
                    <div className="max-h-[420px] overflow-auto p-3">
                      {activeTab === "Phrase Changes" ? (
                        <DiffViewer
                          oldValue={result.originalText}
                          newValue={result.humanizedText}
                          splitView={false}
                          hideLineNumbers
                        />
                      ) : (
                        <DiffViewer
                          oldValue={result.originalText}
                          newValue={result.humanizedText}
                          splitView
                          hideLineNumbers
                        />
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            {chartData && (
              <div className="rounded-2xl border border-border/70 bg-background/80 p-5">
                <p className="text-sm font-semibold text-muted-foreground">Performance snapshot</p>
                <Bar
                  data={chartData}
                  options={{
                    plugins: { legend: { display: false } },
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        min: 0,
                        max: 100,
                        ticks: { stepSize: 20 },
                        grid: { color: "rgba(148, 163, 184, 0.2)" },
                      },
                      x: {
                        grid: { display: false },
                      },
                    },
                  }}
                  height={180}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-12">
        <div className="mx-auto max-w-6xl space-y-10 rounded-3xl border border-border bg-card/95 p-10 shadow-lg">
          <div className="flex flex-col gap-3 text-center">
            <h3 className="text-3xl font-bold text-foreground sm:text-4xl">Why teams trust Integrity AI humanization</h3>
            <p className="text-lg text-muted-foreground">
              Extend your editorial standards across regions and departments with workflows designed for transparency.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {assuranceHighlights.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex h-full flex-col gap-3 rounded-2xl border border-border/70 bg-background/80 p-6 shadow-sm">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </span>
                  <p className="text-base font-semibold text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {workflowSignals.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex h-full flex-col gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-left">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="text-base font-semibold text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function HumanizePage() {
  return (
    <Suspense fallback={<div className="flex min-h-[320px] items-center justify-center text-muted-foreground">Loading humanizer...</div>}>
      <HumanizePageContent />
    </Suspense>
  );
}
