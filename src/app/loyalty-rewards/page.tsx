'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Award,
  Copy,
  Gift,
  Sparkles,
  Star,
  Trophy,
  Users
} from 'lucide-react';
import toast from 'react-hot-toast';

const milestones = [
  { value: 1000, title: 'Launchpad', description: 'Unlock bonus tone presets and weekly office hours.' },
  { value: 2500, title: 'Momentum', description: 'Enable workflow automations and advanced analytics.' },
  { value: 5000, title: 'Elite Upgrade', description: 'Automatic promotion from Pro to Elite for your account.' },
  { value: 10000, title: 'Galaxy', description: 'Invite-only roadmap previews and co-design workshops.' },
];

const benefitHighlights = [
  {
    icon: Sparkles,
    title: 'Earn with every invite',
    description: 'Every teammate that activates a plan adds 500 loyalty points to your balance instantly.',
  },
  {
    icon: Gift,
    title: 'Stackable bonuses',
    description: 'Hit weekly streaks, complete onboarding lessons, and earn up to 15% bonus accelerators.',
  },
  {
    icon: Users,
    title: 'Teamwide recognition',
    description: 'Once you reach Elite, every member of your workspace enjoys unlimited access automatically.',
  },
];

const rewardCatalog = [
  { icon: Award, title: 'Early Access Drops', detail: 'Preview experimental features before public release.' },
  { icon: Star, title: 'Spotlight in Community', detail: 'Feature your workflow in Integrity AI case studies and live showcases.' },
  { icon: Trophy, title: 'Personalized Strategy Session', detail: 'Book 1:1 time with our adoption strategists once you cross Momentum.' },
];

export default function LoyaltyRewardsPage() {
  const [summary, setSummary] = useState({
    currentPoints: 0,
    threshold: 5000,
    nextTier: 'Elite',
    referrals: 0,
    bonus: 0,
  });
  const [referralEmail, setReferralEmail] = useState('');
  const [loading, setLoading] = useState(true);

  const shareLink = useMemo(() => 'https://integrity.ai/r/your-code', []);
  const pointsRemaining = Math.max(summary.threshold - summary.currentPoints, 0);
  const progress = Math.min((summary.currentPoints / summary.threshold) * 100, 100);
  const formattedPoints = loading ? '--' : summary.currentPoints.toLocaleString();
  const formattedReferrals = loading ? '--' : summary.referrals.toString();
  const formattedBonus = loading ? '--' : summary.bonus.toString();
  const progressLabel = loading
    ? 'Syncing...'
    : progress >= 100
    ? 'Elite tier unlocked!'
    : `${Math.round(progress)}% complete`;
  const remainingLabel = loading
    ? 'Calculating...'
    : pointsRemaining > 0
    ? `${pointsRemaining.toLocaleString()} points until Elite`
    : 'Elite unlocked!';

  useEffect(() => {
    let isMounted = true;
    const loadSummary = async () => {
      try {
        const response = await fetch('/api/v1/loyalty/summary');
        const data = await response.json();
        if (!isMounted) return;
        setSummary(data);
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadSummary();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      toast.success('Referral link copied!');
    } catch (error) {
      toast.error('Unable to copy link.');
    }
  };

  const handleSendInvite = () => {
    if (!referralEmail) {
      toast.error('Add an email address first.');
      return;
    }
    toast.success(`Invite sent to ${referralEmail}!`);
    setReferralEmail('');
  };

  return (
    <div className="space-y-24 pb-24">
      <section className="relative isolate overflow-hidden px-6 pt-24 pb-20 sm:px-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.15),transparent_60%),radial-gradient(circle_at_bottom,_rgba(31,159,255,0.12),transparent_55%)]" />
        <div className="absolute -top-32 right-10 -z-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-24 left-0 -z-10 h-80 w-80 translate-x-1/3 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center rounded-3xl border border-border/60 bg-card/85 p-10 shadow-2xl backdrop-blur-lg sm:p-14">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-secondary-foreground">
            Loyalty rewards
          </span>
          <h1 className="mb-6 max-w-3xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Grow together, unlock Elite access automatically
          </h1>
          <p className="mb-10 max-w-3xl text-lg text-muted-foreground sm:text-xl">
            Every referral and collaboration you share fuels your progress. Reach 5,000 points to elevate your account from Pro to Elite - no billing required.
          </p>
          <div className="grid w-full gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-border/70 bg-background/80 p-6 text-center">
              <p className="text-sm font-medium text-muted-foreground">Current points</p>
              <p className="mt-2 text-3xl font-bold text-primary">{formattedPoints}</p>
              <p className="text-xs text-muted-foreground mt-1">{remainingLabel}</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background/80 p-6 text-center">
              <p className="text-sm font-medium text-muted-foreground">Active referrals</p>
              <p className="mt-2 text-3xl font-bold text-foreground">{formattedReferrals}</p>
              <p className="text-xs text-muted-foreground mt-1">+500 points per activated teammate</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background/80 p-6 text-center">
              <p className="text-sm font-medium text-muted-foreground">Bonus accelerators</p>
              <p className="mt-2 text-3xl font-bold text-foreground">{formattedBonus}</p>
              <p className="text-xs text-muted-foreground mt-1">Earned from weekly streaks & workshops</p>
            </div>
          </div>

          <div className="mt-10 w-full rounded-3xl border border-primary/30 bg-primary/10 p-6 shadow-inner">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-primary">Progress to Elite ({summary.threshold.toLocaleString()} pts)</p>
                <div className="mt-2 h-4 w-full overflow-hidden rounded-full bg-primary/15">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${loading ? 0 : progress}%` }}
                  />
                </div>
              </div>
              <div className="text-sm font-semibold text-primary-foreground/70 sm:text-right">
                {progressLabel}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 rounded-3xl border border-border bg-card/95 p-10 shadow-lg">
          <div className="flex flex-col gap-3 text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Share, reward, repeat</h2>
            <p className="text-lg text-muted-foreground">Send invites, track conversions, and watch your tier grow. We keep every step transparent.</p>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <label className="block text-left text-sm font-semibold text-muted-foreground">Invite teammates via email</label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  value={referralEmail}
                  onChange={(event) => setReferralEmail(event.target.value)}
                  placeholder="colleague@organization.com"
                  className="w-full rounded-xl border border-border bg-background/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                <button
                  onClick={handleSendInvite}
                  className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-primary/90"
                >
                  Send invite
                </button>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/80 p-5">
                <p className="text-sm font-semibold text-muted-foreground">Share your personal link</p>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <input
                    value={shareLink}
                    readOnly
                    className="w-full rounded-xl border border-dashed border-primary/40 bg-background/80 px-4 py-3 text-sm font-medium"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/40 px-4 py-3 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary/10"
                  >
                    <Copy size={16} />
                    Copy link
                  </button>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">Tip: Add the link to your onboarding docs or LMS to earn points faster.</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {benefitHighlights.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div key={benefit.title} className="flex h-full flex-col gap-3 rounded-2xl border border-border/70 bg-background/70 p-5 shadow-sm">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </span>
                    <p className="text-base font-semibold text-foreground">{benefit.title}</p>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-12">
        <div className="mx-auto max-w-6xl rounded-3xl border border-border bg-card/95 p-10 shadow-lg">
          <div className="mb-10 flex flex-col gap-3 text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Milestones that matter</h2>
            <p className="text-lg text-muted-foreground">Chart your journey from first invite to Elite status and beyond.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {milestones.map((milestone) => (
              <div key={milestone.value} className="flex flex-col gap-3 rounded-3xl border border-border/70 bg-background/80 p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">{milestone.title}</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {milestone.value.toLocaleString()} pts
                  </span>
                </div>
                <p className="text-base text-foreground">{milestone.description}</p>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${loading ? 0 : Math.min((summary.currentPoints / milestone.value) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {rewardCatalog.map((reward) => {
              const Icon = reward.icon;
              return (
                <div key={reward.title} className="flex h-full flex-col gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-5 text-left">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="text-base font-semibold text-foreground">{reward.title}</p>
                  <p className="text-sm text-muted-foreground">{reward.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-12">
        <div className="mx-auto max-w-6xl rounded-3xl border border-primary/40 bg-primary/10 p-10 text-center shadow-xl">
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Ready to unlock Elite?</h2>
            <p className="text-lg text-muted-foreground">
              Keep sharing Integrity AI, mentor your team, and we will elevate your workspace automatically at 5,000 points.
            </p>
          </div>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={handleSendInvite}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-primary/90"
            >
              Send another invite
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-background/80 px-8 py-3 text-base font-semibold text-primary transition hover:border-primary hover:bg-primary/10"
            >
              Share your link
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
