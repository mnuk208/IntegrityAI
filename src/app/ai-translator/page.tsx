'use client';

import { useState, type ChangeEvent } from 'react';
import {
  ArrowLeftRight,
  Copy,
  Download,
  FileText,
  Globe2,
  Languages,
  Sparkles,
  UploadCloud,
  Wand2,
  ChevronDown
} from 'lucide-react';
import { translateText, getTranslationData } from '@/lib/apiClient';
import { ResponsibleUseBanner } from '@/components/ResponsibleUseModal';
import toast from 'react-hot-toast';

const languages = [
  'English',
  'Spanish',
  'French',
  'German',
  'Japanese',
  'Korean',
  'Chinese (Simplified)',
  'Arabic',
  'Portuguese',
];

const tonePresets = ['Standard', 'Professional', 'Creative', 'Academic', 'Supportive'];

const localizationHighlights = [
  {
    icon: Globe2,
    title: 'Localized nuance',
    description: 'Integrity AI maps idioms, honorifics, and cultural references so your message lands naturally.',
  },
  {
    icon: Sparkles,
    title: 'Tone-perfect output',
    description: 'Match leadership updates, support replies, or marketing copy with consistent tone recipes.',
  },
  {
    icon: Languages,
    title: 'Terminology banks',
    description: 'Upload approved glossaries and Integrity AI will preserve brand-specific phrases every time.',
  },
];

export default function TranslatorPage() {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [sourceLang, setSourceLang] = useState('auto');
  const [targetLang, setTargetLang] = useState('English');
  const [tone, setTone] = useState('Standard');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleTranslate = async () => {
    setLoading(true);
    setTranslatedText('');
    try {
      const response = await translateText(text);
      setTranslatedText(response.translatedText);
      toast.success('Translation complete.');
    } catch (error: any) {
      toast.error(error.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadSample = async () => {
    setLoading(true);
    try {
      const data = await getTranslationData();
      setText(data.originalText);
      setTranslatedText(data.translatedText);
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
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.15),transparent_60%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.14),transparent_55%)]" />
        <div className="absolute -top-24 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 rounded-3xl border border-border/60 bg-card/85 p-10 shadow-2xl backdrop-blur-lg sm:p-14">
          <div className="flex flex-col gap-6 text-center">
            <span className="mx-auto inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-secondary-foreground">
              Integrity AI translator
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Communicate with clarity across every language and channel
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              Combine neural translation with custom tone profiles, terminology banks, and trust safeguards so international teams stay aligned.
            </p>
          </div>
          <ResponsibleUseBanner />
          <div className="grid gap-6 sm:grid-cols-3">
            {localizationHighlights.map(item => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex h-full flex-col gap-3 rounded-2xl border border-border/70 bg-background/80 p-6 text-left shadow-sm">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </span>
                  <p className="text-base font-semibold text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
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
                <h2 className="text-2xl font-semibold text-foreground">Prepare your source text</h2>
                <p className="text-sm text-muted-foreground">
                  Upload or paste content. Integrity AI will detect the source language automatically or honour your chosen configuration.
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
              placeholder="Paste your announcement, support reply, or lesson plan here."
              value={text}
              onChange={event => setText(event.target.value)}
            />
            <div className="grid gap-3 md:grid-cols-2">
              <div className="relative">
                <select
                  className="w-full appearance-none rounded-full border border-border/70 bg-background/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  value={sourceLang}
                  onChange={event => setSourceLang(event.target.value)}
                >
                  <option value="auto">From: Auto-detect</option>
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
              <div className="relative">
                <select
                  className="w-full appearance-none rounded-full border border-border/70 bg-background/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  value={targetLang}
                  onChange={event => setTargetLang(event.target.value)}
                >
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
            <div className="relative">
              <select
                className="w-full appearance-none rounded-full border border-border/70 bg-background/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                value={tone}
                onChange={event => setTone(event.target.value)}
              >
                {tonePresets.map(preset => (
                  <option key={preset} value={preset}>{preset}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <button
                onClick={() => document.getElementById('translator-upload')?.click()}
                className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-primary"
              >
                <UploadCloud className="h-4 w-4" />
                Attach document
              </button>
              {uploadedFile && <span className="rounded-full bg-muted px-3 py-1 text-xs">{uploadedFile}</span>}
              <input id="translator-upload" type="file" className="hidden" accept=".txt,.doc,.docx,.pdf" onChange={handleFileChange} />
              <label className="ml-auto inline-flex items-center gap-2 text-xs">
                <input type="checkbox" className="rounded border-primary/40 text-primary focus:ring-primary/50" />
                Preserve formatting and hyperlinks
              </label>
            </div>
            <button
              onClick={handleTranslate}
              disabled={loading || !text}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Translating' : 'Translate now'}
            </button>
          </div>

          <div className="flex flex-col gap-6 rounded-3xl border border-border bg-card/95 p-8 shadow-lg">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Localized output</h2>
              <p className="text-sm text-muted-foreground">
                Review Integrity AI translations, switch tone presets, or export a ready-to-send message.
              </p>
            </div>
            <div className="min-h-[260px] rounded-2xl border border-border/70 bg-background/80 p-5">
              {loading && (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                  Translating your text...
                </div>
              )}
              {!loading && !translatedText && (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
                  <FileText size={48} />
                  Your translation will appear here.
                </div>
              )}
              {!loading && translatedText && (
                <div className="flex h-full flex-col gap-4">
                  <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4">
                    <p className="text-sm font-semibold text-primary">Translated text</p>
                    <div className="mt-2 max-h-48 overflow-auto rounded-xl border border-primary/20 bg-background/80 p-4 text-sm text-foreground">
                      {translatedText}
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      onClick={() => navigator.clipboard.writeText(translatedText)}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary/10"
                    >
                      <Copy className="h-4 w-4" /> Copy translation
                    </button>
                    <button
                      onClick={() => {
                        const blob = new Blob([translatedText], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const anchor = document.createElement('a');
                        anchor.href = url;
                        anchor.download = 'integrity-ai_translation.txt';
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
              )}
            </div>
            <div className="rounded-2xl border border-border/60 bg-background/80 p-5 text-sm text-muted-foreground">
              <p className="font-semibold text-muted-foreground">Quality tips</p>
              <ul className="mt-3 space-y-2">
                <li className="flex items-start gap-2">
                  <ArrowLeftRight className="mt-1 h-4 w-4 text-primary" />
                  Pair Integrity AI translation with Detect Text to ensure the localized version still reads authentically human.
                </li>
                <li className="flex items-start gap-2">
                  <Wand2 className="mt-1 h-4 w-4 text-primary" />
                  Use tone presets to adjust formality or empathy before sending to specific audiences.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
