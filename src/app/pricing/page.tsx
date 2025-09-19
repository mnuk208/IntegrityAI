import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const tiers = [
  {
    name: 'Explorer',
    label: 'Free tier',
    description: 'Discover the Integrity AI toolkit with curated limits ideal for individuals and curious teams.',
    investment: 'Free access',
    features: [
      'Humanize: 200 words per humanization.',
      'Detect Text: 1,000 words per scan.',
      'Grammar: 1,000 words per scan.',
      'Plagiarism: 500 words per scan.',
      'Workspace Chat: 2 conversations per month.',
      'Translator: 500 words per translation.',
    ],
    cta: 'Choose Explorer',
  },
  {
    name: 'Pro',
    label: 'Registered tier',
    description: 'Scale collaborations with richer allowances, reporting, and limitless creative rewrites.',
    investment: 'Free access',
    features: [
      'Humanize: 1,000 words per humanization.',
      'Detect Text: 5,000 words per scan.',
      'Grammar: 5,000 words per scan.',
      'Plagiarism: 2,000 words per scan.',
      'Workspace Chat: Unlimited conversations.',
      'Translator: 5,000 words per translation.',
      'Automation Recipes: Unlimited access.',
    ],
    cta: 'Unlock Pro',
    highlight: true,
  },
  {
    name: 'Elite',
    label: 'Loyal tier',
    description: 'Empower loyal teams and reviewers with unlimited access across every Integrity AI capability.',
    investment: 'Free access',
    features: [
      'Agentic Mode: Unlock advanced AI agent capabilities.',
      'Humanize: Unlimited words per humanization.',
      'Detect Text: Unlimited words per scan.',
      'Grammar: Unlimited words per scan.',
      'Plagiarism: Unlimited words per scan.',
      'All Other Features: Unlimited access.',
    ],
    cta: 'Join Elite',
  },
];

const featureMatrix = [
  {
    feature: 'Humanize',
    explorer: '200 words per humanization',
    pro: '1,000 words per humanization',
    elite: 'Unlimited words per humanization',
  },
  {
    feature: 'Detect Text',
    explorer: '1,000 words per scan',
    pro: '5,000 words per scan',
    elite: 'Unlimited words per scan',
  },
  {
    feature: 'Grammar',
    explorer: '1,000 words per scan',
    pro: '5,000 words per scan',
    elite: 'Unlimited words per scan',
  },
  {
    feature: 'Plagiarism',
    explorer: '500 words per scan',
    pro: '2,000 words per scan',
    elite: 'Unlimited words per scan',
  },
  {
    feature: 'Workspace Chat',
    explorer: '2 conversations per month',
    pro: 'Unlimited conversations',
    elite: 'Unlimited conversations',
  },
  {
    feature: 'Translator',
    explorer: '500 words per translation',
    pro: '5,000 words per translation',
    elite: 'Unlimited words per translation',
  },
  {
    feature: 'Automation Recipes',
    explorer: 'Not included',
    pro: 'Unlimited access',
    elite: 'Unlimited access',
  },
  {
    feature: 'All Other Features',
    explorer: 'Core tools only',
    pro: 'Expanded collaboration & reports',
    elite: 'Unlimited access across suite',
  },
];

export default function PlansAndFeaturesPage() {
  return (
    <div className="space-y-16">
      <div className="space-y-6 text-center">
        <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          Plans & features
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Plans & Features</h1>
        <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
          Explorer, Pro, and Elite are all free to activate. Choose the plan that fits your workflow today and expand seamlessly as your team grows.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 text-sm text-muted-foreground sm:flex-row">
          <span>Need guidance?</span>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-4 py-2 font-semibold text-primary transition hover:border-primary hover:bg-primary/10">
            Talk with our team
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {tiers.map((tier) => {
          const isHighlight = Boolean(tier.highlight);
          const cardClasses = isHighlight
            ? 'border-primary bg-primary text-primary-foreground shadow-xl shadow-primary/40'
            : 'border-border bg-background/90 text-foreground shadow';
          const badgeClasses = isHighlight
            ? 'bg-primary-foreground/20 text-primary-foreground'
            : 'bg-primary/10 text-primary';
          const featureTextClasses = isHighlight ? 'text-primary-foreground/85' : 'text-muted-foreground';
          const iconClasses = isHighlight ? 'text-primary-foreground' : 'text-primary';
          const ctaClasses = isHighlight
            ? 'w-full rounded-full bg-primary-foreground/10 px-4 py-3 font-semibold text-primary-foreground transition hover:bg-primary-foreground/20'
            : 'w-full rounded-full border border-primary/30 px-4 py-3 font-semibold text-primary transition hover:border-primary hover:bg-primary/10';
          return (
            <article key={tier.name} className={`flex h-full flex-col gap-5 rounded-3xl border p-8 text-left ${cardClasses}`}>
              <span className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] ${badgeClasses}`}>
                {tier.label}
              </span>
              <div>
                <h2 className="text-2xl font-bold">{tier.name}</h2>
                <p className={`mt-3 text-sm ${isHighlight ? 'text-primary-foreground/90' : 'text-muted-foreground'}`}>{tier.description}</p>
              </div>
              <p className={`text-sm font-semibold ${isHighlight ? 'text-primary-foreground' : 'text-primary'}`}>{tier.investment}</p>
              <ul className="space-y-2 text-sm">
                {tier.features.map((feature) => (
                  <li key={feature} className={`flex items-start gap-2 ${featureTextClasses}`}>
                    <CheckCircle2 className={`mt-1 h-4 w-4 ${iconClasses}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/resgister" className={ctaClasses}>
                {tier.cta}
              </Link>
            </article>
          );
        })}
      </div>

      <div className="rounded-3xl border border-border bg-card/95 p-8 shadow-lg">
        <h2 className="text-2xl font-semibold text-foreground">Feature comparison</h2>
        <p className="mt-2 text-sm text-muted-foreground">Quickly compare allowances across Explorer, Pro, and Elite.</p>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-border/60 text-left text-sm">
            <thead>
              <tr className="text-muted-foreground">
                <th className="py-3 pr-6 font-semibold">Capability</th>
                <th className="py-3 pr-6 font-semibold">Explorer</th>
                <th className="py-3 pr-6 font-semibold">Pro</th>
                <th className="py-3 font-semibold">Elite</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {featureMatrix.map((row) => (
                <tr key={row.feature} className="align-top">
                  <td className="py-4 pr-6 font-medium text-foreground">{row.feature}</td>
                  <td className="py-4 pr-6 text-muted-foreground">{row.explorer}</td>
                  <td className="py-4 pr-6 text-muted-foreground">{row.pro}</td>
                  <td className="py-4 text-muted-foreground">{row.elite}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-3xl border border-primary/40 bg-primary/10 p-8 text-center shadow-md">
        <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">Choose the plan that feels right and start refining today</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Every tier is free forever. Upgrade or switch plans anytime, backed by transparent usage reporting and support from our team.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/resgister" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-primary/90">
            Create your account
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/history" className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-6 py-3 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary/10">
            Explore usage dashboards
          </Link>
        </div>
      </div>
    </div>
  );
}
