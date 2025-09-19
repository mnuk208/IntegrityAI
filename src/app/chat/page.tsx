'use client';

import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';
import {
  ArrowUpCircle,
  Link2,
  Loader2,
  MessageSquare,
  Paperclip,
  Search,
  Sparkles,
  Zap
} from 'lucide-react';
import toast from 'react-hot-toast';

interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

type Mode = 'think' | 'search';

const suggestionPhrases = [
  'Outline a human-sounding introduction for my ethics essay.',
  'Scan this paragraph for AI fingerprints.',
  'Translate my summary to Spanish with a compassionate tone.',
  'Draft a loyalty announcement for our Elite tier upgrade.',
];

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<Mode>('think');
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [tier, setTier] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedName =
      localStorage.getItem('Integrity AI-username') ||
      sessionStorage.getItem('Integrity AI-username');
    const storedTier =
      localStorage.getItem('Integrity AI-tier') ||
      sessionStorage.getItem('Integrity AI-tier');
    setUsername(storedName);
    setTier(storedTier);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const loadHistory = async () => {
      try {
        const response = await fetch('/api/v1/chat/respond');
        if (!response.ok) return;
        const data = await response.json();
        if (!cancelled && Array.isArray(data.messages)) {
          setMessages(data.messages as ChatMessage[]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    loadHistory();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [messages, isSending]);

  const greeting = useMemo(() => {
    if (tier && tier.toLowerCase() === 'explorer') {
      return 'What can I help you with today?';
    }
    if (username) {
      return `${username}, what can I help you with today?`;
    }
    return 'Welcome back, what can I help you with today?';
  }, [tier, username]);

  const generateAssistantReply = (prompt: string) => {
    const trimmed = prompt.trim();
    const modeLabel = mode === 'think' ? 'deep reasoning' : 'search-assisted insights';
    const searchLine = searchEnabled
      ? '\n\nI also surfaced supporting references from your workspace knowledge base for extra context.'
      : '';
    return `Here is a ${modeLabel} plan for: “${trimmed}”.\n\n1. Clarify the goal and constraints.\n2. Use Humanize to match your tone.\n3. Run Detect Text to validate authenticity.\n4. Translate or adapt for your next channel.\n\nLet me know if you would like a draft, checklist, or translated snippet.${searchLine}`;
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = { role: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsSending(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        text: generateAssistantReply(trimmed),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsSending(false);
    }
  };

  const handleAttach = () => {
    fileInputRef.current?.click();
  };

  const toggleSearch = () => {
    const next = !searchEnabled;
    setSearchEnabled(next);
    if (next) {
      toast.success('Knowledge search enabled.');
    } else {
      toast('Knowledge search paused.', { icon: 'i' });
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast.success(`${file.name} attached`);
    }
  };

  return (
    <div className="flex flex-col gap-10 pb-16">
      <section className="relative isolate overflow-hidden rounded-3xl border border-border bg-card/85 p-10 shadow-xl backdrop-blur">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.12),transparent_60%),radial-gradient(circle_at_bottom,_rgba(16,185,233,0.12),transparent_55%)]" />
        <div className="flex flex-col gap-4">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-secondary-foreground">
            Workspace chat
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Co-create with Integrity AI in real time
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Think through ideas, search trusted sources, and attach context without leaving the Integrity AI experience. Chat blends seamlessly with Humanize, Detect Text, Grammar, Plagiarism, and Translator.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground/90">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-3 py-1">
              <Sparkles className="h-4 w-4 text-primary" /> Reason with tone awareness
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-3 py-1">
              <Search className="h-4 w-4 text-primary" /> Optional knowledge search
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-3 py-1">
              <Paperclip className="h-4 w-4 text-primary" /> Attach drafts & briefs
            </span>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="flex flex-col rounded-3xl border border-border bg-card/95 shadow-lg">
          <div
            ref={containerRef}
            className="flex flex-col gap-6 overflow-y-auto px-6 pt-6"
            style={{ maxHeight: '540px' }}
          >
            {messages.length === 0 && !isSending ? (
              <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-primary/30 bg-background/80 p-10 text-center">
                <MessageSquare className="h-10 w-10 text-primary" />
                <p className="text-lg font-semibold text-foreground">{greeting}</p>
                <p className="text-sm text-muted-foreground">Try one of the trending prompts below or attach context to begin.</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {suggestionPhrases.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setInput(suggestion)}
                      className="rounded-full border border-primary/30 px-4 py-2 text-sm font-medium text-primary transition hover:border-primary hover:bg-primary/10"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-5 py-4 text-sm leading-relaxed shadow-md ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background/80 text-foreground border border-border/60'
                    }`}
                  >
                    {message.text.split('\n').map((line, lineIndex) => (
                      <p key={lineIndex} className="whitespace-pre-wrap">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))
            )}
            {isSending && (
              <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-background/80 px-5 py-4 text-sm text-muted-foreground w-max">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                Drafting your response...
              </div>
            )}
          </div>

          <div className="mt-6 border-t border-border/80 bg-background/90 px-6 py-5">
            <div className="mb-3 flex flex-wrap items-center gap-3 text-sm">
              <button
                onClick={() => setMode('think')}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold transition ${
                  mode === 'think'
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                    : 'border border-border text-muted-foreground hover:border-primary/50 hover:text-primary'
                }`}
              >
                <Zap className="h-4 w-4" /> Think
              </button>
              <button
                onClick={() => setMode('search')}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold transition ${
                  mode === 'search'
                    ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/30'
                    : 'border border-border text-muted-foreground hover:border-accent/50 hover:text-accent-foreground'
                }`}
              >
                <Search className="h-4 w-4" /> Search
              </button>
              <button
                onClick={toggleSearch}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 font-semibold transition ${
                  searchEnabled
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:border-primary/40 hover:text-primary'
                }`}
              >
                <Link2 className="h-4 w-4" /> Knowledge graph
              </button>
              <button
                onClick={handleAttach}
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-semibold text-muted-foreground transition hover:border-primary/60 hover:text-primary"
              >
                <Paperclip className="h-4 w-4" /> Attach
              </button>
              <input ref={fileInputRef} type="file" onChange={handleFileChange} className="hidden" />
            </div>
            <div className="flex flex-col gap-3 rounded-2xl border border-border/80 bg-background/95 p-4 shadow-inner">
              <textarea
                rows={3}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={greeting}
                className="w-full resize-none rounded-xl bg-transparent text-sm text-foreground outline-none"
              />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{mode === 'think' ? 'Deep reasoning with tone awareness.' : 'Guided by trusted sources and citations.'}</span>
                <button
                  onClick={handleSend}
                  disabled={isSending || !input.trim()}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
                >
                  {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowUpCircle className="h-4 w-4" />}
                  {isSending ? 'Sending' : 'Send'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <aside className="flex flex-col gap-4 rounded-3xl border border-border/70 bg-background/95 p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-foreground">Workspace modes</h2>
          <p className="text-sm text-muted-foreground">
            Integrity AI Chat adapts to your tier. Explorer users can start conversations freely, while Pro and Elite colleagues unlock search, attachments, and compliance logging.
          </p>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <Sparkles className="mt-1 h-4 w-4 text-primary" />
              <span>Think mode rewrites drafts with the same tone settings you use inside Humanize.</span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="mt-1 h-4 w-4 text-primary" />
              <span>Search mode checks shared knowledge bases before suggesting actions.</span>
            </li>
            <li className="flex items-start gap-3">
              <Paperclip className="mt-1 h-4 w-4 text-primary" />
              <span>Attach research, outlines, or transcripts to keep your conversation grounded.</span>
            </li>
          </ul>
          <div className="rounded-2xl border border-primary/40 bg-primary/10 p-5 text-sm text-primary">
            Upgrade tip: reaching 5,000 loyalty points moves Pro accounts to Elite automatically, unlocking unlimited chat history and advanced audit trails.
          </div>
        </aside>
      </section>
    </div>
  );
}
