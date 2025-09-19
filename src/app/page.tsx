import Link from 'next/link';
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  FileSearch,
  Fingerprint,
  Globe2,
  Layers,
  LineChart,
  MessageCircle,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users
} from 'lucide-react';

const brands = ['HarvardX', 'Coursera', 'Indie Media Lab', 'Drafted.ai', 'Orbit Research', 'Brightline'];

const highlights = [
  {
    title: 'Instantly Humanize Any Draft',
    description: 'Turn robotic copy into authentic prose with tone controls, brand vocabularies, and compliance checkpoints.',
    icon: Sparkles,
  },
  {
    title: 'Stay Invisible to AI Detectors',
    description: 'Blend sentence structures, vary semantics, and preserve citations so your writing passes rigorous detection scans.',
    icon: Fingerprint,
  },
  {
    title: 'Enterprise-Grade Guardrails',
    description: 'Granular policies, version history, and team governance keep every edit transparent and audit ready.',
    icon: ShieldCheck,
  },
  {
    title: 'Write in 35+ Languages',
    description: 'Deliver culturally accurate translations, summaries, and rewrites that sound local to every audience.',
    icon: Globe2,
  },
];

const stats = [
  {
    value: '98%',
    label: 'Authenticity rating',
    detail: 'Average score after Integrity AI rewrites across 12k+ submissions.',
  },
  {
    value: '4.9/5',
    label: 'Team satisfaction',
    detail: 'Writers and reviewers highlight speed, accuracy, and clarity.',
  },
  {
    value: '10x',
    label: 'Faster approvals',
    detail: 'Policies, tone presets, and AI detection reports reduce review cycles.',
  },
];

const workflowSteps = [
  {
    title: 'Drop in your draft',
    description: 'Paste text, upload a document, or connect your editor to sync workspaces instantly.',
    icon: FileSearch,
  },
  {
    title: 'Select the transformation',
    description: 'Humanize, explain, translate, summarize, or check originality with guided templates.',
    icon: Bot,
  },
  {
    title: 'Collaborate with your team',
    description: 'Route versions to reviewers, leave inline feedback, and approve with audit trails.',
    icon: Users,
  },
  {
    title: 'Publish with confidence',
    description: 'Export polished content, share branded reports, and document compliance automatically.',
    icon: Rocket,
  },
];

const solutionAreas = [
  {
    title: 'Academic & Research Integrity',
    description: 'Protect credibility with plagiarism, citation, and AI-detection safeguards purpose-built for universities.',
    bullets: ['Course-level tone profiles', 'Automated citation preservation', 'Secure student workspaces'],
    icon: Layers,
  },
  {
    title: 'Marketing & Growth Teams',
    description: 'Scale human-sounding campaigns that satisfy brand, legal, and regional stakeholders in record time.',
    bullets: ['Persona-based tone engines', 'One-click summaries for leadership', 'Localization without rework'],
    icon: LineChart,
  },
  {
    title: 'Operations & Support',
    description: 'Standardize knowledge bases and customer communication while keeping responses compassionate and compliant.',
    bullets: ['Guided empathy rewrites', 'Live QA insights from AI checker', 'Multi-channel publishing handoffs'],
    icon: MessageCircle,
  },
];

const testimonials = [
  {
    quote: 'We reduced manual rewrites by 80 percent while staying comfortably ahead of every AI detector our university uses.',
    name: 'Dr. Alicia Greene',
    role: 'Director of Academic Writing, Northridge University',
  },
  {
    quote: 'The tone presets feel handcrafted. Our legal, marketing, and customer teams finally approve copy in a single pass.',
    name: 'Marcus Hsu',
    role: 'VP of Growth, Resonance Labs',
  },
  {
    quote: 'From translation to plagiarism control, Integrity AI keeps our global taskforce aligned without slowing us down.',
    name: 'Sana Patel',
    role: 'Head of Content Operations, Horizon Collective',
  },
];

const faqs = [
  {
    question: 'Does Integrity AI work with sensitive or confidential data?',
    answer: 'Yes. We offer on-premise and region-locked deployments, granular retention policies, and opt-out models for using customer data in training.',
  },
  {
    question: 'How accurate is the AI checker compared to other tools?',
    answer: 'Our ensemble of third-party detectors and proprietary heuristics provides blended scoring to minimize false positives and surface actionable edits.',
  },
  {
    question: 'Can I customize tone and vocabulary?',
    answer: 'Absolutely. Upload brand guides, banned phrases, and style samples to generate reusable tone recipes that any teammate can apply.',
  },
  {
    question: 'What kind of support is included?',
    answer: 'Every plan includes onboarding workshops, live chat, and a dedicated success manager once you deploy to more than 10 seats.',
  },
];

const plans = [
  {
    name: 'Explorer',
    label: 'Free tier',
    description: 'Discover humanized writing with generous starting limits for individuals and small teams.',
    investment: 'Free access',
    features: [
      'Humanize: 200 words per humanization.',
      'Detect Text: 1,000 words per scan.',
      'Grammar: 1,000 words per scan.',
      'Plagiarism: 500 words per scan.',
      'Workspace Chat: 2 conversations per month.',
      'Translator: 500 words per translation.',
    ],
  },
  {
    name: 'Pro',
    label: 'Registered tier',
    description: 'Unlock expanded allowances, collaboration, and full creative tooling for committed writers.',
    investment: 'Free access',
    highlight: true,
    features: [
      'Humanize: 1,000 words per humanization.',
      'Detect Text: 5,000 words per scan.',
      'Grammar: 5,000 words per scan.',
      'Plagiarism: 2,000 words per scan.',
      'Workspace Chat: Unlimited conversations.',
      'Translator: 5,000 words per translation.',
      'Automation Recipes: Unlimited access.',
    ],
  },
  {
    name: 'Elite',
    label: 'Loyal tier',
    description: 'Give power users and reviewers unlimited access across every Integrity AI capability.',
    investment: 'Free access',
    features: [
      'Humanize: Unlimited words per humanization.',
      'Detect Text: Unlimited words per scan.',
      'Grammar: Unlimited words per scan.',
      'Plagiarism: Unlimited words per scan.',
      'All Other Features: Unlimited access.',
    ],
  },
];

export default function LandingPage() {
  return (
    <div className="space-y-24 pb-24">
      <section className="relative isolate overflow-hidden px-6 pt-24 pb-20 text-center sm:px-12">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.18),transparent_60%),radial-gradient(circle_at_bottom,_rgba(31,159,255,0.14),transparent_55%)]" />
        <div className="absolute -top-40 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 -z-10 h-80 w-80 translate-x-1/4 translate-y-1/4 rounded-full bg-accent/25 blur-3xl" />
        <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center rounded-3xl border border-border/70 bg-card/80 p-10 shadow-2xl backdrop-blur-lg sm:p-14">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-secondary-foreground">
            Refine with confidence
          </span>
          <h1 className="mb-6 max-w-3xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            The Future of Ethical Writing, Powered by You
          </h1>
          <p className="mb-10 max-w-3xl text-lg text-muted-foreground sm:text-xl">
            Integrity AI is an innovative writing assistant designed to help you refine and enhance your text. Our tools empower you to create clear, compelling, and authentically human content, while upholding the highest standards of academic and creative integrity.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="/humanize-ai"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/40"
            >
              Try the Humanizer
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/ai-checker"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 text-base font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent/85 hover:shadow-xl hover:shadow-accent/30"
            >
              Check Your Text
            </Link>
          </div>
          <dl className="mt-12 grid w-full gap-6 text-left sm:grid-cols-3">
            {stats.map((item) => (
              <div key={item.label} className="rounded-2xl border border-border/60 bg-background/70 p-6 shadow-sm">
                <dt className="text-sm font-semibold text-primary">{item.label}</dt>
                <dd className="mt-2 text-3xl font-bold text-foreground">{item.value}</dd>
                <p className="mt-3 text-sm text-muted-foreground">{item.detail}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="px-6 sm:px-12">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Trusted by ethical writing leaders
          </p>
          <div className="flex w-full flex-wrap items-center justify-center gap-x-10 gap-y-6 text-lg font-semibold text-muted-foreground/80">
            {brands.map((brand) => (
              <span key={brand} className="opacity-80 transition-opacity hover:opacity-100">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex flex-col gap-3 text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Everything you need to sound unmistakably human</h2>
            <p className="text-lg text-muted-foreground">
              Mix and match Integrity AI tools to polish voice, guarantee originality, and collaborate securely across your organization.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="group rounded-3xl border border-border bg-card p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
                  <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 rounded-3xl border border-border bg-card/90 p-10 shadow-lg backdrop-blur">
          <div className="flex flex-col gap-3 text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">A guided workflow built for modern teams</h2>
            <p className="text-lg text-muted-foreground">Every stage is supported with transparent reporting, version control, and reviewer insights.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {workflowSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="flex h-full flex-col gap-4 rounded-3xl border border-border/70 bg-background/70 p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="text-sm font-semibold text-muted-foreground">Step {index + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex flex-col gap-3 text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Purpose-built for the teams who rely on you</h2>
            <p className="text-lg text-muted-foreground">Activate dedicated spaces for every department while keeping a unified visibility layer.</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {solutionAreas.map((solution) => {
              const Icon = solution.icon;
              return (
                <article key={solution.title} className="flex h-full flex-col gap-6 rounded-3xl border border-border bg-background/80 p-8 shadow-sm">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{solution.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground">{solution.description}</p>
                  </div>
                  <ul className="mt-auto space-y-2 text-sm text-muted-foreground">
                    {solution.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-1 h-4 w-4 text-primary" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-12">
        <div className="mx-auto max-w-6xl rounded-3xl border border-border bg-card/95 p-10 shadow-lg">
          <div className="mb-12 flex flex-col gap-3 text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Loved by reviewers, writers, and compliance leaders</h2>
            <p className="text-lg text-muted-foreground">Integrity AI keeps everyone aligned without sacrificing authenticity.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((item) => (
              <figure key={item.name} className="flex h-full flex-col gap-6 rounded-3xl border border-border/70 bg-background/70 p-6 text-left shadow-sm">
                <p className="text-sm text-muted-foreground">{item.quote}</p>
                <figcaption className="mt-auto text-sm font-semibold text-foreground">
                  {item.name}
                  <span className="block text-xs font-normal text-muted-foreground">{item.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex flex-col gap-3 text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Plans & features to fit every stage</h2>
            <p className="text-lg text-muted-foreground">Explorer, Pro, and Elite are all free to activate - choose the allowances that match your workflow and expand whenever you need more.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {plans.map((plan) => {
              const isHighlight = Boolean(plan.highlight);
              const cardClasses = isHighlight
                ? 'border-primary bg-primary text-primary-foreground shadow-xl shadow-primary/40'
                : 'border-border bg-background/90 text-foreground shadow';
              const badgeClasses = isHighlight
                ? 'bg-primary-foreground/15 text-primary-foreground'
                : 'bg-primary/10 text-primary';
              const descriptionClasses = isHighlight ? 'text-primary-foreground/90' : 'text-muted-foreground';
              const featureTextClasses = isHighlight ? 'text-primary-foreground/85' : 'text-muted-foreground';
              const iconClasses = isHighlight ? 'text-primary-foreground' : 'text-primary';
              const ctaClasses = isHighlight
                ? 'mt-auto inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary-foreground/20'
                : 'mt-auto inline-flex items-center gap-2 rounded-full border border-primary/30 px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary/10';
              return (
                <article key={plan.name} className={`flex h-full flex-col gap-5 rounded-3xl border p-6 ${cardClasses}`}>
                  <span className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] ${badgeClasses}`}>
                    {plan.label}
                  </span>
                  <div>
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <p className={`mt-3 text-sm ${descriptionClasses}`}>{plan.description}</p>
                  </div>
                  <p className={`text-sm font-semibold ${isHighlight ? 'text-primary-foreground' : 'text-primary'}`}>{plan.investment}</p>
                  <ul className="space-y-2 text-sm">
                    {plan.features.map((feature) => (
                      <li key={feature} className={`flex items-start gap-2 ${featureTextClasses}`}>
                        <CheckCircle2 className={`mt-1 h-4 w-4 ${iconClasses}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/pricing" className={ctaClasses}>
                    Compare full plans
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-6 py-3 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary/10"
            >
              Visit the Plans & Features page
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Frequently asked questions</h2>
            <p className="mt-3 text-lg text-muted-foreground">Everything you need to know before your team adopts Integrity AI.</p>
          </div>
          <div className="space-y-6">
            {faqs.map((item) => (
              <details key={item.question} className="group rounded-3xl border border-border bg-background/80 p-6 shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between text-left text-lg font-semibold text-foreground">
                  {item.question}
                  <span className="ml-4 text-primary transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-12">
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 overflow-hidden rounded-3xl border border-primary/40 bg-gradient-to-r from-primary/20 via-primary/15 to-accent/20 p-10 text-center shadow-xl">
          <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute -bottom-12 right-0 h-52 w-52 rounded-full bg-accent/30 blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Bring Integrity AI to your workflow today</h2>
            <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
              Launch in minutes, invite your collaborators, and ship writing that is undeniably human across every touchpoint.
            </p>
          </div>
          <div className="relative flex flex-col items-center gap-4 sm:flex-row">
            <Link href="/resgister" className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-primary/90">
              Create your account
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-background/80 px-8 py-3 text-base font-semibold text-primary transition hover:border-primary hover:text-primary">
              Talk with our team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
