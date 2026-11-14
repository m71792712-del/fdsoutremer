import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CircleCheck, CircleX, Clock, FileText, Plus } from 'lucide-react';
import { RequestsTable } from '@/components/loan/RequestsTable';
import { EmptyState } from '@/components/ui/EmptyState';
import { getProfile, requireUser } from '@/lib/auth';
import { getLoanStats, getLoans } from '@/lib/data';
import { getT } from '@/lib/i18n';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = { title: 'Tableau de bord' };

export default async function DashboardPage() {
  const { t, locale } = await getT();
  const user = await requireUser();
  const profile = await getProfile();
  const supabase = await createClient();
  const [stats, { loans }] = await Promise.all([getLoanStats(supabase, user.id), getLoans(supabase, user.id, 1, 5)]);

  const cards = [
    { icon: Clock, label: t('dash.stat.inprogress'), value: stats.inProgress, tone: 'bg-ocean-500/10 text-ocean-600' },
    { icon: CircleCheck, label: t('dash.stat.approved'), value: stats.approved, tone: 'bg-lagoon-100 text-lagoon-700' },
    { icon: CircleX, label: t('dash.stat.rejected'), value: stats.rejected, tone: 'bg-hibiscus-500/10 text-hibiscus-600' },
  ];
  const name = profile ? `${profile.first_name} ${profile.last_name}`.trim() : (user.email ?? '');

  return (
    <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[1fr_300px]">
      <div className="min-w-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl tracking-[-0.03em] sm:text-4xl">{t('dash.hello', { name })}</h1>
            <p className="mt-1.5 text-navy-500">{t('dash.overview')}</p>
          </div>
          <Link href="/apply" className="btn btn-green px-6"><Plus className="h-4 w-4" aria-hidden /> {t('shell.apply')}</Link>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <li className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-navy-800 to-navy-950 p-5 text-white shadow-lift lg:col-span-1">
            <div aria-hidden className="absolute -right-8 -top-8 -z-10 h-28 w-28 rounded-full bg-lagoon-500/40 blur-2xl" />
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/15"><FileText className="h-5 w-5" aria-hidden /></span>
            <p className="mt-4 text-sm font-medium text-navy-100">{t('dash.stat.total')}</p>
            <p className="font-display text-5xl font-bold tabular-nums">{stats.total}</p>
          </li>
          {cards.map(({ icon: Icon, label, value, tone }) => (
            <li key={label} className="rounded-3xl border border-navy-100 bg-white p-5 shadow-soft">
              <span className={`grid h-10 w-10 place-items-center rounded-2xl ${tone}`}><Icon className="h-5 w-5" aria-hidden /></span>
              <p className="mt-4 text-sm font-medium text-navy-500">{label}</p>
              <p className="font-display text-5xl font-bold tabular-nums text-navy-900">{value}</p>
            </li>
          ))}
        </ul>

        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-2xl">{t('dash.latest')}</h2>
            {loans.length > 0 && <Link href="/dashboard/requests" className="link inline-flex items-center gap-1 text-sm">{t('dash.seeAll')} <ArrowRight className="h-4 w-4" aria-hidden /></Link>}
          </div>
          {loans.length === 0 ? (
            <EmptyState title={t('dash.empty.title')} text={t('dash.empty.text')}>
              <Link href="/apply" className="btn btn-primary">{t('shell.apply')}</Link>
            </EmptyState>
          ) : (
            <RequestsTable loans={loans} t={t} locale={locale} />
          )}
        </section>
      </div>

      <aside className="relative hidden min-h-[520px] overflow-hidden rounded-[2rem] shadow-lift xl:block" aria-label={t('dash.panel')}>
        <Image src="/images/panel.webp" alt="" fill sizes="300px" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/10 to-transparent" aria-hidden />
        <p className="absolute inset-x-6 bottom-7 font-display text-2xl font-bold leading-tight tracking-tight text-white">{t('dash.panel')}</p>
      </aside>
    </div>
  );
}
