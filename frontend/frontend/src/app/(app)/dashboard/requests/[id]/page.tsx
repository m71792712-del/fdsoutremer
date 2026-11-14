import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { requireUser } from '@/lib/auth';
import { getHistory, getLoan } from '@/lib/data';
import { getT } from '@/lib/i18n';
import { purposeLabel } from '@/lib/i18n/shared';
import { createClient } from '@/lib/supabase/server';
import { UUID_RE, formatDate, formatMoney } from '@/lib/utils';

export const metadata: Metadata = { title: 'Détail de la demande' };

export default async function RequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { t, locale } = await getT();
  const user = await requireUser();
  const { id } = await params;
  if (!UUID_RE.test(id)) notFound();

  const supabase = await createClient();
  const loan = await getLoan(supabase, user.id, id); // la demande d'un autre utilisateur renvoie 404
  if (!loan) notFound();
  const history = await getHistory(supabase, id);

  const purpose = loan.loan_purposes ? purposeLabel(loan.loan_purposes, locale) : loan.purpose_code;
  const bank = loan.banks?.name ?? (loan.custom_bank_name ? t('req.customBank', { name: loan.custom_bank_name }) : t('common.none'));
  const fields: [string, string][] = [
    [t('req.currency'), loan.currency],
    [t('req.createdAt'), formatDate(loan.created_at, locale, true)],
    [t('req.bank'), bank],
    [t('req.cardType'), loan.card_types?.name ?? (loan.custom_card_name ? t('req.customCard', { name: loan.custom_card_name }) : t('common.none'))],
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <Link href="/dashboard/requests" className="link mb-5 inline-flex items-center gap-1.5 text-sm">
        <ArrowLeft className="h-4 w-4" aria-hidden /> {t('common.back')}
      </Link>
      <h1 className="mb-8 text-3xl tracking-[-0.03em] sm:text-4xl">{t('req.detail.title')}</h1>
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="card overflow-hidden p-0 sm:p-0">
          <div className="relative isolate bg-gradient-to-br from-navy-800 to-navy-950 p-6 text-white sm:p-8">
            <div aria-hidden className="absolute -right-10 -top-10 -z-10 h-40 w-40 rounded-full bg-lagoon-500/40 blur-3xl" />
            <div className="flex flex-wrap items-start justify-between gap-3">
              <p className="text-sm font-medium text-navy-100">{t('req.amount')}</p>
              <span className="rounded-full bg-white p-0.5"><StatusBadge status={loan.status} /></span>
            </div>
            <p className="mt-2 font-display text-5xl font-bold tracking-tight tabular-nums">{formatMoney(Number(loan.amount), loan.currency, locale)}</p>
            <p className="mt-4 text-sm text-navy-100">{t('req.purpose')}</p>
            <h2 className="font-display text-xl font-semibold text-white">{purpose}</h2>
            {loan.purpose_details && <p className="text-sm text-navy-100">{loan.purpose_details}</p>}
          </div>
          <dl className="grid gap-x-6 gap-y-5 p-6 text-sm sm:grid-cols-2 sm:p-8">
            {fields.map(([k, v]) => (
              <div key={k}><dt className="text-navy-500">{k}</dt><dd className="mt-0.5 font-semibold text-navy-900">{v}</dd></div>
            ))}
            {loan.description && <div className="sm:col-span-2"><dt className="text-navy-500">{t('req.description')}</dt><dd className="mt-0.5 whitespace-pre-wrap text-navy-800">{loan.description}</dd></div>}
          </dl>
        </section>

        <section className="card">
          <h2 className="text-xl">{t('req.history')}</h2>
          <ol className="mt-6 space-y-6 border-l-2 border-lagoon-200 pl-6">
            {history.map((h) => (
              <li key={h.id} className="relative">
                <span className="absolute -left-[1.95rem] top-1 h-3 w-3 rounded-full bg-lagoon-500 ring-4 ring-white" aria-hidden />
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  {h.old_status ? <><StatusBadge status={h.old_status} /><span aria-hidden className="text-navy-300">→</span></> : <span className="font-semibold text-navy-700">{t('req.created')}</span>}
                  <StatusBadge status={h.new_status} />
                </div>
                <p className="mt-1.5 text-xs text-navy-500">{formatDate(h.created_at, locale, true)}</p>
                {h.comment && <p className="mt-1.5 rounded-xl bg-navy-50 px-3 py-2 text-sm text-navy-700">{h.comment}</p>}
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
